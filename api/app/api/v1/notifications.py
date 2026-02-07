from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.notification import Notification
from app.api.deps import get_current_active_user
from app.services.notification_service import NotificationService
from datetime import datetime
from typing import Optional
from uuid import UUID

router = APIRouter()


@router.get("/list")
def list_notifications(
    unread_only: bool = False,
    limit: int = 50,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """List user's notifications"""
    
    notifications = NotificationService.get_user_notifications(
        db=db,
        user_id=current_user.id,
        unread_only=unread_only,
        skip=0,
        limit=limit
    )
    
    # Get unread count
    unread_count = NotificationService.get_unread_count(db, current_user.id)
    
    return {
        "notifications": [
            {
                "id": str(notif.id),
                "type": notif.type or notif.notification_type,
                "priority": notif.priority or "medium",
                "title": notif.title,
                "message": notif.message,
                "is_read": notif.is_read or notif.read,
                "action_url": notif.action_url,
                "action_text": notif.action_text,
                "order_id": str(notif.order_id) if notif.order_id else None,
                "document_id": str(notif.document_id) if notif.document_id else None,
                "ticket_id": str(notif.ticket_id) if notif.ticket_id else None,
                "metadata": notif.notification_metadata,
                "created_at": notif.created_at.isoformat(),
                "read_at": notif.read_at.isoformat() if notif.read_at else None
            }
            for notif in notifications
        ],
        "unread_count": unread_count,
        "total_count": len(notifications)
    }


@router.patch("/{notification_id}/read")
def mark_as_read(
    notification_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Mark a notification as read"""
    
    notification = NotificationService.mark_as_read(
        db=db,
        notification_id=notification_id,
        user_id=current_user.id
    )
    
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    
    return {
        "message": "Notification marked as read",
        "notification": {
            "id": str(notification.id),
            "is_read": notification.is_read or notification.read
        }
    }


@router.patch("/mark-all-read")
def mark_all_as_read(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Mark all notifications as read"""
    
    count = NotificationService.mark_all_as_read(db, current_user.id)
    
    return {
        "message": f"{count} notifications marked as read",
        "count": count
    }


@router.delete("/{notification_id}")
def delete_notification(
    notification_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a notification"""
    
    success = NotificationService.delete_notification(
        db=db,
        notification_id=notification_id,
        user_id=current_user.id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    
    return {
        "message": "Notification deleted"
    }


@router.get("/unread-count")
def get_unread_count(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get count of unread notifications"""
    
    count = NotificationService.get_unread_count(db, current_user.id)
    
    return {
        "unread_count": count
    }

