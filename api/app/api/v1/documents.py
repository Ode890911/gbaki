from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, BackgroundTasks, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.user import User
from app.models.document import Document
from app.schemas.document import DocumentCreate, DocumentResponse
from app.api.deps import get_current_active_user, get_current_superuser
from app.services.notification_service import NotificationService
from app.core.email import EmailService
from app.config import settings
from uuid import UUID
from datetime import datetime
import os

router = APIRouter()

# Initialize Supabase client for storage
try:
    from supabase import create_client
    supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
except Exception:
    supabase = None


async def upload_to_storage(file: UploadFile, user_id: str, order_id: str) -> dict:
    """Upload file to Supabase Storage"""
    if not supabase:
        # Fallback if Supabase not configured
        return {
            "file_path": f"{user_id}/{order_id}/{file.filename}",
            "file_url": f"https://storage.supabase.co/{settings.SUPABASE_STORAGE_BUCKET}/{user_id}/{order_id}/{file.filename}",
            "file_size": file.size or 0,
            "mime_type": file.content_type
        }
    
    try:
        # Generate unique filename
        file_extension = os.path.splitext(file.filename or "file")[1]
        file_path = f"{user_id}/{order_id}/{file.filename}"
        
        # Read file content
        content = await file.read()
        
        # Upload to Supabase Storage
        response = supabase.storage.from_(settings.SUPABASE_STORAGE_BUCKET).upload(
            file_path,
            content,
            {
                "content-type": file.content_type,
                "x-upsert": "true"
            }
        )
        
        # Get public URL
        public_url = supabase.storage.from_(settings.SUPABASE_STORAGE_BUCKET).get_public_url(file_path)
        
        return {
            "file_path": file_path,
            "file_url": public_url,
            "file_size": len(content),
            "mime_type": file.content_type
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"File upload failed: {str(e)}"
        )


@router.post("/upload", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile = File(...),
    order_id: str = Form(...),
    document_type: str = Form(...),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Upload document"""
    
    # Convert order_id string to UUID
    try:
        order_uuid = UUID(order_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid order_id format"
        )
    
    # Validate file size
    content = await file.read()
    if len(content) > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File too large. Max size: {settings.MAX_FILE_SIZE / 1024 / 1024}MB"
        )
    await file.seek(0)  # Reset file pointer
    
    # Validate file type
    file_extension = os.path.splitext(file.filename or "file")[1].lower().replace(".", "")
    if file_extension not in settings.allowed_file_types_list:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type not allowed. Allowed types: {settings.ALLOWED_FILE_TYPES}"
        )
    
    # Upload to storage
    upload_result = await upload_to_storage(file, str(current_user.id), str(order_uuid))
    
    # Create document record
    db_document = Document(
        order_id=order_uuid,
        user_id=current_user.id,
        name=file.filename or "document",
        document_type=document_type,
        file_url=upload_result["file_url"],
        file_path=upload_result["file_path"],
        file_size=upload_result["file_size"],
        mime_type=upload_result["mime_type"],
        uploaded_by=current_user.id,
        is_verified=False
    )
    
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    # TODO: Send notification
    # TODO: Log activity
    
    return DocumentResponse.model_validate(db_document)


@router.get("/", response_model=List[DocumentResponse])
async def list_documents(
    order_id: UUID = None,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """List user's documents"""
    query = db.query(Document).filter(Document.user_id == current_user.id)
    
    if order_id:
        query = query.filter(Document.order_id == order_id)
    
    documents = query.offset(skip).limit(limit).all()
    return documents


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get document by ID"""
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    return DocumentResponse.model_validate(document)


@router.get("/{document_id}/download")
async def download_document(
    document_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get download URL for document"""
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Generate signed URL (valid for 1 hour)
    if supabase and document.file_path:
        try:
            signed_url = supabase.storage.from_(settings.SUPABASE_STORAGE_BUCKET).create_signed_url(
                document.file_path,
                3600  # 1 hour
            )
            
            return {
                "download_url": signed_url.get("signedURL", document.file_url),
                "expires_in": 3600
            }
        except Exception as e:
            # Fallback to public URL
            return {
                "download_url": document.file_url,
                "expires_in": None
            }
    
    return {
        "download_url": document.file_url,
        "expires_in": None
    }


@router.patch("/{document_id}/review")
async def review_document(
    document_id: UUID,
    status: str,
    background_tasks: BackgroundTasks,
    rejection_reason: Optional[str] = None,
    current_user: User = Depends(get_current_superuser),
    db: Session = Depends(get_db)
):
    """Admin: Approve or reject a document"""
    
    document = db.query(Document).filter(Document.id == document_id).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    if status not in ["approved", "rejected"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be 'approved' or 'rejected'"
        )
    
    # Update document status
    document.is_verified = (status == "approved")
    document.verified_at = datetime.utcnow()
    document.verified_by = current_user.id
    
    db.commit()
    db.refresh(document)
    
    # ✅ CREATE NOTIFICATION AND SEND EMAIL
    if status == "approved":
        NotificationService.notify_document_approved(db, document)
        user_name = f"{document.user.first_name} {document.user.last_name}".strip() if document.user.first_name else document.user.email
        background_tasks.add_task(
            EmailService.send_document_approved_email,
            document.user.email,
            user_name,
            document.name
        )
    elif status == "rejected":
        NotificationService.notify_document_rejected(db, document, rejection_reason)
        # TODO: Add send_document_rejected_email method to EmailService if needed
    
    return {
        "message": f"Document {status} successfully",
        "document": DocumentResponse.model_validate(document)
    }


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete document"""
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Delete from storage
    if supabase and document.file_path:
        try:
            supabase.storage.from_(settings.SUPABASE_STORAGE_BUCKET).remove([document.file_path])
        except Exception as e:
            print(f"Storage deletion error: {str(e)}")
    
    # Delete from database
    db.delete(document)
    db.commit()
    
    return None
