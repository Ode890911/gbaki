from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserProfile, UserUpdate, UserResponse
from app.schemas.pagination import paginate, create_paginated_response
from app.api.deps import get_current_active_user, get_current_superuser
from app.utils.audit import log_admin_action, AuditActions
from uuid import UUID

router = APIRouter()


@router.get("/me", response_model=UserProfile)
async def get_current_user_profile(
    current_user: User = Depends(get_current_active_user)
):
    """Get current user profile"""
    return UserProfile.model_validate(current_user)


@router.put("/me", response_model=UserProfile)
async def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update current user profile"""
    
    # Update fields
    update_data = user_update.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    
    return UserProfile.model_validate(current_user)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_current_user(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete current user account (GDPR right to erasure)"""
    
    # Soft delete - just deactivate
    current_user.is_active = False
    db.commit()
    
    # TODO: Schedule hard delete after 30 days
    # TODO: Delete associated data (orders, documents, etc.)
    
    return None


@router.get("/me/export", status_code=status.HTTP_200_OK)
async def export_user_data(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Export all user data (GDPR right to data portability)"""
    
    # Collect all user data
    data = {
        "user": UserProfile.model_validate(current_user).dict(),
        "orders": [str(order.id) for order in current_user.orders],
        "businesses": [str(business.id) for business in current_user.businesses],
        "documents": [str(doc.id) for doc in current_user.documents],
        "tickets": [str(ticket.id) for ticket in current_user.tickets],
    }
    
    # TODO: Generate PDF or ZIP file
    # TODO: Email download link
    
    return {
        "message": "Data export requested. You'll receive an email with download link.",
        "data": data
    }


# Admin routes
@router.get("/")
async def list_users(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(20, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search by name or email"),
    role: Optional[str] = Query(None, description="Filter by role"),
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    current_user: User = Depends(get_current_superuser),
    db: Session = Depends(get_db)
):
    """List all users with pagination and filtering (admin only)"""
    
    # Build query
    query = db.query(User)
    
    # Apply search filter
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (User.first_name.ilike(search_filter)) |
            (User.last_name.ilike(search_filter)) |
            (User.email.ilike(search_filter))
        )
    
    # Apply role filter
    if role:
        query = query.filter(User.role == role)
    
    # Apply active status filter
    if is_active is not None:
        query = query.filter(User.is_active == is_active)
    
    # Order by created date (newest first)
    query = query.order_by(User.created_at.desc())
    
    # Paginate
    users, total = paginate(query, page=page, per_page=per_page)
    
    # Convert to response format
    user_data = [UserResponse.model_validate(user) for user in users]
    
    return create_paginated_response(
        items=user_data,
        total=total,
        page=page,
        per_page=per_page
    )


@router.get("/{user_id}", response_model=UserProfile)
async def get_user(
    user_id: UUID,
    current_user: User = Depends(get_current_superuser),
    db: Session = Depends(get_db)
):
    """Get user by ID (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserProfile.model_validate(user)


@router.patch("/{user_id}/toggle-active")
async def toggle_user_active(
    user_id: UUID,
    request: Request,
    current_user: User = Depends(get_current_superuser),
    db: Session = Depends(get_db)
):
    """Toggle user active status (admin only)"""
    user = db.query(User).filter(User.id == str(user_id)).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Store old value for audit
    old_status = user.is_active
    
    # Toggle status
    user.is_active = not user.is_active
    db.commit()
    
    # Log audit
    log_admin_action(
        db=db,
        admin=current_user,
        action=AuditActions.USER_ACTIVATED if user.is_active else AuditActions.USER_DEACTIVATED,
        entity_type="user",
        entity_id=str(user.id),
        old_value={"is_active": old_status},
        new_value={"is_active": user.is_active},
        description=f"User {'activated' if user.is_active else 'deactivated'} by admin",
        request=request
    )
    
    db.refresh(user)
    return UserResponse.model_validate(user)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: UUID,
    request: Request,
    current_user: User = Depends(get_current_superuser),
    db: Session = Depends(get_db)
):
    """Delete user (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Log audit before deletion
    log_admin_action(
        db=db,
        admin=current_user,
        action="user_deleted",
        entity_type="user",
        entity_id=str(user.id),
        old_value=UserResponse.model_validate(user).dict(),
        new_value=None,
        description=f"User {user.email} deleted by admin",
        request=request
    )
    
    db.delete(user)
    db.commit()
    
    return None
