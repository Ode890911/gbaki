from sqlalchemy.orm import Session
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from fastapi import UploadFile
from app.models.document import Document
from app.models.order import Order
from app.config import settings
from app.utils.validators import sanitize_filename
import uuid


class DocumentService:
    """Service for document business logic"""
    
    @staticmethod
    def upload_document(
        db: Session,
        order_id: UUID,
        user_id: UUID,
        file: UploadFile,
        document_type: str,
        description: Optional[str] = None
    ) -> Optional[Document]:
        """Upload a document"""
        # Verify order belongs to user
        order = db.query(Order).filter(
            Order.id == order_id,
            Order.user_id == user_id
        ).first()
        
        if not order:
            return None
        
        # Validate file
        if file.size and file.size > settings.MAX_FILE_SIZE:
            raise ValueError(f"File size exceeds {settings.MAX_FILE_SIZE / 1024 / 1024}MB")
        
        file_ext = file.filename.split('.')[-1].lower() if file.filename else ''
        if file_ext not in settings.allowed_file_types_list:
            raise ValueError(f"File type not allowed. Allowed types: {settings.ALLOWED_FILE_TYPES}")
        
        # TODO: Upload to Supabase Storage
        # For now, we'll just create the document record
        sanitized_name = sanitize_filename(file.filename or "document")
        file_url = f"https://storage.supabase.co/{settings.SUPABASE_STORAGE_BUCKET}/{uuid.uuid4()}/{sanitized_name}"
        
        db_document = Document(
            order_id=order.id,
            user_id=user_id,
            name=sanitized_name,
            document_type=document_type,
            file_url=file_url,
            file_size=file.size,
            mime_type=file.content_type,
            description=description,
            uploaded_by=user_id
        )
        
        db.add(db_document)
        db.commit()
        db.refresh(db_document)
        
        return db_document
    
    @staticmethod
    def get_document_by_id(
        db: Session,
        document_id: UUID,
        user_id: Optional[UUID] = None
    ) -> Optional[Document]:
        """Get document by ID"""
        query = db.query(Document).filter(Document.id == document_id)
        
        if user_id:
            query = query.filter(Document.user_id == user_id)
        
        return query.first()
    
    @staticmethod
    def get_user_documents(
        db: Session,
        user_id: UUID,
        order_id: Optional[UUID] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Document]:
        """Get all documents for a user"""
        query = db.query(Document).filter(Document.user_id == user_id)
        
        if order_id:
            query = query.filter(Document.order_id == order_id)
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def verify_document(
        db: Session,
        document_id: UUID,
        verified_by: UUID
    ) -> Optional[Document]:
        """Verify a document"""
        document = db.query(Document).filter(Document.id == document_id).first()
        
        if not document:
            return None
        
        document.is_verified = True
        document.verified_at = datetime.utcnow()
        document.verified_by = verified_by
        
        db.commit()
        db.refresh(document)
        
        return document

