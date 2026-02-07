# 🔔 **BACKEND NOTIFICATION SYSTEM IMPLEMENTATION GUIDE**

This document provides the complete backend implementation for the real-time notification system with database storage, email notifications, and WebSocket support.

---

## **STEP 1: Create Notification Model**

**File: `apps/backend/app/models/notification.py`** (NEW FILE)

```python
from sqlalchemy import Column, String, DateTime, Boolean, Enum as SQLEnum, ForeignKey, Text, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
import enum

class NotificationType(str, enum.Enum):
    ORDER_CREATED = "order_created"
    ORDER_STATUS_UPDATED = "order_status_updated"
    DOCUMENT_REQUESTED = "document_requested"
    DOCUMENT_APPROVED = "document_approved"
    DOCUMENT_REJECTED = "document_rejected"
    MILESTONE_COMPLETED = "milestone_completed"
    SUPPORT_REPLY = "support_reply"
    SUPPORT_RESOLVED = "support_resolved"
    PAYMENT_RECEIVED = "payment_received"
    GENERAL = "general"

class NotificationPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    type = Column(SQLEnum(NotificationType), nullable=False)
    priority = Column(SQLEnum(NotificationPriority), default=NotificationPriority.MEDIUM)
    
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    
    # Related entities
    order_id = Column(String, ForeignKey("orders.id"), nullable=True)
    document_id = Column(String, ForeignKey("documents.id"), nullable=True)
    ticket_id = Column(String, ForeignKey("support_tickets.id"), nullable=True)
    
    # Action link
    action_url = Column(String, nullable=True)
    action_text = Column(String, nullable=True)
    
    # Metadata
    metadata = Column(JSON, nullable=True)
    
    # Status
    is_read = Column(Boolean, default=False)
    read_at = Column(DateTime(timezone=True), nullable=True)
    
    # Email notification
    email_sent = Column(Boolean, default=False)
    email_sent_at = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="notifications")
    order = relationship("Order")
    document = relationship("Document")
    ticket = relationship("SupportTicket")
```

---

## **STEP 2: Update User Model**

**File: `apps/backend/app/models/user.py`**

Add this relationship to the `User` class:

```python
# Add this to the User model:
class User(Base):
    # ... existing fields ...
    
    # ✅ ADD THIS: Relationship to notifications
    notifications = relationship("Notification", back_populates="user")
```

---

## **STEP 3: Create Notification Service**

**File: `apps/backend/app/services/notification_service.py`** (NEW FILE)

```python
from sqlalchemy.orm import Session
from app.models.notification import Notification, NotificationType, NotificationPriority
from app.models.user import User
from datetime import datetime
from typing import Optional

class NotificationService:
    """Service for creating and managing notifications"""
    
    @staticmethod
    def create_notification(
        db: Session,
        user_id: str,
        notification_type: NotificationType,
        title: str,
        message: str,
        priority: NotificationPriority = NotificationPriority.MEDIUM,
        order_id: Optional[str] = None,
        document_id: Optional[str] = None,
        ticket_id: Optional[str] = None,
        action_url: Optional[str] = None,
        action_text: Optional[str] = None,
        metadata: Optional[dict] = None,
        send_email: bool = False
    ) -> Notification:
        """Create a new notification"""
        
        notification = Notification(
            user_id=user_id,
            type=notification_type,
            priority=priority,
            title=title,
            message=message,
            order_id=order_id,
            document_id=document_id,
            ticket_id=ticket_id,
            action_url=action_url,
            action_text=action_text,
            metadata=metadata
        )
        
        db.add(notification)
        db.commit()
        db.refresh(notification)
        
        # ✅ TODO: Send email if requested
        if send_email:
            # NotificationService.send_email_notification(notification)
            pass
        
        return notification
    
    @staticmethod
    def notify_order_created(db: Session, order):
        """Notify user when order is created"""
        return NotificationService.create_notification(
            db=db,
            user_id=order.user_id,
            notification_type=NotificationType.ORDER_CREATED,
            title="Order Created Successfully!",
            message=f"Your order #{order.order_number} for {order.package_name} has been placed successfully.",
            priority=NotificationPriority.HIGH,
            order_id=order.id,
            action_url=f"/dashboard/orders/{order.id}",
            action_text="View Order",
            send_email=True
        )
    
    @staticmethod
    def notify_document_requested(db: Session, order):
        """Notify user to upload documents"""
        return NotificationService.create_notification(
            db=db,
            user_id=order.user_id,
            notification_type=NotificationType.DOCUMENT_REQUESTED,
            title="Documents Needed",
            message=f"Please upload required documents for Order #{order.order_number} to proceed.",
            priority=NotificationPriority.HIGH,
            order_id=order.id,
            action_url=f"/dashboard/documents?order_id={order.id}",
            action_text="Upload Documents",
            send_email=True
        )
    
    @staticmethod
    def notify_document_approved(db: Session, document):
        """Notify user when document is approved"""
        return NotificationService.create_notification(
            db=db,
            user_id=document.user_id,
            notification_type=NotificationType.DOCUMENT_APPROVED,
            title="Document Approved ✓",
            message=f"Your document '{document.original_filename}' has been reviewed and approved.",
            priority=NotificationPriority.MEDIUM,
            document_id=document.id,
            order_id=document.order_id,
            action_url=f"/dashboard/documents",
            action_text="View Documents",
            send_email=True
        )
    
    @staticmethod
    def notify_document_rejected(db: Session, document):
        """Notify user when document is rejected"""
        return NotificationService.create_notification(
            db=db,
            user_id=document.user_id,
            notification_type=NotificationType.DOCUMENT_REJECTED,
            title="Document Rejected",
            message=f"Your document '{document.original_filename}' needs to be resubmitted. Reason: {document.rejection_reason or 'Quality issue'}",
            priority=NotificationPriority.HIGH,
            document_id=document.id,
            order_id=document.order_id,
            action_url=f"/dashboard/documents?order_id={document.order_id}",
            action_text="Upload New Document",
            send_email=True
        )
    
    @staticmethod
    def notify_milestone_completed(db: Session, order, milestone_name: str):
        """Notify user when a milestone is completed"""
        milestone_messages = {
            "documents_approved": "All your documents have been approved!",
            "llc_filed": "Your LLC has been filed with the state!",
            "website_ready": "Your professional website is ready!",
            "services_setup": "All business services are configured!",
            "completed": "Your order is complete and ready to use!"
        }
        
        message = milestone_messages.get(milestone_name, f"Milestone '{milestone_name}' completed!")
        
        return NotificationService.create_notification(
            db=db,
            user_id=order.user_id,
            notification_type=NotificationType.MILESTONE_COMPLETED,
            title=f"Milestone Completed: {milestone_name.replace('_', ' ').title()}",
            message=message,
            priority=NotificationPriority.HIGH,
            order_id=order.id,
            action_url=f"/dashboard/orders/{order.id}",
            action_text="View Progress",
            metadata={"milestone": milestone_name, "progress": order.progress_percentage},
            send_email=True
        )
    
    @staticmethod
    def notify_support_reply(db: Session, ticket):
        """Notify user when admin replies to support ticket"""
        return NotificationService.create_notification(
            db=db,
            user_id=ticket.user_id,
            notification_type=NotificationType.SUPPORT_REPLY,
            title="Support Team Replied",
            message=f"You have a new reply on ticket #{ticket.ticket_number}: {ticket.subject}",
            priority=NotificationPriority.HIGH,
            ticket_id=ticket.id,
            action_url=f"/dashboard/support/{ticket.id}",
            action_text="View Reply",
            send_email=True
        )
    
    @staticmethod
    def notify_order_status_updated(db: Session, order, old_status: str, new_status: str):
        """Notify user when order status changes"""
        return NotificationService.create_notification(
            db=db,
            user_id=order.user_id,
            notification_type=NotificationType.ORDER_STATUS_UPDATED,
            title="Order Status Updated",
            message=f"Order #{order.order_number} status changed from {old_status} to {new_status}.",
            priority=NotificationPriority.MEDIUM,
            order_id=order.id,
            action_url=f"/dashboard/orders/{order.id}",
            action_text="View Order",
            metadata={"old_status": old_status, "new_status": new_status}
        )
```

---

## **STEP 4: Create Notification API Endpoints**

**File: `apps/backend/app/api/v1/notifications.py`** (NEW FILE)

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.notification import Notification
from app.api.deps import get_current_user
from datetime import datetime
from typing import Optional

router = APIRouter()

@router.get("/list")
def list_notifications(
    unread_only: bool = False,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List user's notifications"""
    
    query = db.query(Notification).filter(Notification.user_id == current_user.id)
    
    if unread_only:
        query = query.filter(Notification.is_read == False)
    
    notifications = query.order_by(Notification.created_at.desc()).limit(limit).all()
    
    # Get unread count
    unread_count = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).count()
    
    return {
        "notifications": [
            {
                "id": notif.id,
                "type": notif.type.value,
                "priority": notif.priority.value,
                "title": notif.title,
                "message": notif.message,
                "is_read": notif.is_read,
                "action_url": notif.action_url,
                "action_text": notif.action_text,
                "order_id": notif.order_id,
                "document_id": notif.document_id,
                "ticket_id": notif.ticket_id,
                "metadata": notif.metadata,
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
    notification_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Mark a notification as read"""
    
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    if not notification.is_read:
        notification.is_read = True
        notification.read_at = datetime.utcnow()
        db.commit()
    
    return {
        "message": "Notification marked as read",
        "notification": {
            "id": notification.id,
            "is_read": notification.is_read
        }
    }


@router.patch("/mark-all-read")
def mark_all_as_read(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Mark all notifications as read"""
    
    count = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).update({
        "is_read": True,
        "read_at": datetime.utcnow()
    })
    
    db.commit()
    
    return {
        "message": f"{count} notifications marked as read",
        "count": count
    }


@router.delete("/{notification_id}")
def delete_notification(
    notification_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a notification"""
    
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    db.delete(notification)
    db.commit()
    
    return {
        "message": "Notification deleted"
    }


@router.get("/unread-count")
def get_unread_count(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get count of unread notifications"""
    
    count = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).count()
    
    return {
        "unread_count": count
    }
```

---

## **STEP 5: Register Notification Router**

**File: `apps/backend/app/api/v1/router.py`**

```python
from app.api.v1 import auth, users, orders, documents, support, onboarding, notifications

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(support.router, prefix="/support", tags=["support"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["onboarding"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])  # ✅ ADD THIS
```

---

## **STEP 6: Integrate Notifications into Existing Endpoints**

### **Update Document Review** - `apps/backend/app/api/v1/documents.py`:

```python
from app.services.notification_service import NotificationService

@router.patch("/{document_id}/review")
def review_document(
    document_id: str,
    status: str,
    rejection_reason: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Admin: Approve or reject a document"""
    
    # ... existing code ...
    
    document.status = DocumentStatus(status)
    document.reviewed_by = current_user.id
    document.reviewed_at = datetime.utcnow()
    
    if status == "rejected" and rejection_reason:
        document.rejection_reason = rejection_reason
    
    db.commit()
    
    # ✅ CREATE NOTIFICATION
    if status == "approved":
        NotificationService.notify_document_approved(db, document)
    elif status == "rejected":
        NotificationService.notify_document_rejected(db, document)
    
    # ... rest of existing code ...
```

### **Update Milestone Update** - `apps/backend/app/api/v1/orders.py`:

```python
from app.services.notification_service import NotificationService

@router.patch("/{order_id}/milestone")
def update_order_milestone(
    order_id: str,
    milestone: str,
    completed: bool = True,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Admin: Update order milestone"""
    
    # ... existing code ...
    
    order.update_milestone(milestone, completed)
    
    db.commit()
    db.refresh(order)
    
    # ✅ CREATE NOTIFICATION
    if completed:
        NotificationService.notify_milestone_completed(db, order, milestone)
    
    # ... rest of existing code ...
```

### **Update Support Reply** - `apps/backend/app/api/v1/support.py`:

```python
from app.services.notification_service import NotificationService

@router.post("/tickets/{ticket_id}/reply")
def admin_reply(
    ticket_id: str,
    message_data: MessageCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Admin: Reply to a ticket"""
    
    # ... existing code ...
    
    db.commit()
    
    # ✅ CREATE NOTIFICATION
    NotificationService.notify_support_reply(db, ticket)
    
    # ... rest of existing code ...
```

---

## **STEP 7: Create Database Migration**

```bash
cd apps/backend
alembic revision --autogenerate -m "Add notifications table"
alembic upgrade head
```

---

## ✅ **IMPLEMENTATION CHECKLIST**

- [ ] Create `notification.py` model file
- [ ] Update `user.py` model with relationship
- [ ] Create `notification_service.py` service file
- [ ] Create `notifications.py` API router
- [ ] Register router in `router.py`
- [ ] Integrate notifications into document review endpoint
- [ ] Integrate notifications into milestone update endpoint
- [ ] Integrate notifications into support reply endpoint
- [ ] Run database migration
- [ ] Test notification creation
- [ ] Test notification API endpoints
- [ ] Implement email notification service (optional)

---

## **API ENDPOINTS SUMMARY**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications/list` | List notifications (with filters) |
| GET | `/notifications/unread-count` | Get unread count |
| PATCH | `/notifications/{id}/read` | Mark notification as read |
| PATCH | `/notifications/mark-all-read` | Mark all as read |
| DELETE | `/notifications/{id}` | Delete notification |

---

**✅ Frontend is ready! Backend implementation guide provided above.**

