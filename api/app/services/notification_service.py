from sqlalchemy.orm import Session
from typing import Optional, List, Dict
from uuid import UUID
from datetime import datetime
from app.models.notification import Notification, ActivityLog, NotificationType, NotificationPriority
from app.models.user import User
from app.models.order import Order
from app.models.document import Document
from app.models.support import SupportTicket


class NotificationService:
    """Service for notification management"""
    
    @staticmethod
    def create_notification(
        db: Session,
        user_id: UUID,
        notification_type: str,
        title: str,
        message: str,
        priority: str = "medium",
        order_id: Optional[UUID] = None,
        document_id: Optional[UUID] = None,
        ticket_id: Optional[UUID] = None,
        action_url: Optional[str] = None,
        action_text: Optional[str] = None,
        metadata: Optional[Dict] = None,
        send_email: bool = False
    ) -> Notification:
        """Create a notification"""
        db_notification = Notification(
            user_id=user_id,
            notification_type=notification_type,
            type=notification_type,  # Store enum type
            priority=priority,
            title=title,
            message=message,
            order_id=order_id,
            document_id=document_id,
            ticket_id=ticket_id,
            action_url=action_url,
            action_text=action_text,
            notification_metadata=metadata,
            read=False,  # Compatibility
            is_read=False  # New field
        )
        
        db.add(db_notification)
        db.commit()
        db.refresh(db_notification)
        
        # TODO: Send email if requested
        if send_email:
            # NotificationService.send_email_notification(db_notification)
            pass
        
        return db_notification
    
    @staticmethod
    def get_user_notifications(
        db: Session,
        user_id: UUID,
        unread_only: bool = False,
        skip: int = 0,
        limit: int = 100
    ) -> List[Notification]:
        """Get user notifications"""
        query = db.query(Notification).filter(Notification.user_id == user_id)
        
        if unread_only:
            query = query.filter(Notification.is_read == False)
        
        return query.order_by(Notification.created_at.desc()).offset(skip).limit(limit).all()
    
    @staticmethod
    def mark_as_read(
        db: Session,
        notification_id: UUID,
        user_id: UUID
    ) -> Optional[Notification]:
        """Mark notification as read"""
        notification = db.query(Notification).filter(
            Notification.id == notification_id,
            Notification.user_id == user_id
        ).first()
        
        if not notification:
            return None
        
        if not notification.is_read:
            notification.read = True  # Compatibility
            notification.is_read = True
            notification.read_at = datetime.utcnow()
            db.commit()
            db.refresh(notification)
        
        return notification
    
    @staticmethod
    def mark_all_as_read(
        db: Session,
        user_id: UUID
    ) -> int:
        """Mark all user notifications as read"""
        count = db.query(Notification).filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        ).update({
            "read": True,  # Compatibility
            "is_read": True,
            "read_at": datetime.utcnow()
        })
        
        db.commit()
        return count
    
    @staticmethod
    def get_unread_count(
        db: Session,
        user_id: UUID
    ) -> int:
        """Get unread notification count"""
        return db.query(Notification).filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        ).count()

    @staticmethod
    def notify_order_created(db: Session, order: Order) -> Notification:
        return NotificationService.create_notification(
            db=db,
            user_id=order.user_id,
            notification_type=NotificationType.ORDER_CREATED.value,
            title="Order Created Successfully!",
            message=f"Your order #{order.order_number} for {order.package_type} has been placed successfully.",
            priority=NotificationPriority.HIGH.value,
            order_id=order.id,
            action_url=f"/dashboard/orders/{order.id}",
            action_text="View Order",
            send_email=True
        )
    
    @staticmethod
    def notify_document_requested(db: Session, order: Order) -> Notification:
        """Notify user to upload documents"""
        return NotificationService.create_notification(
            db=db,
            user_id=order.user_id,
            notification_type=NotificationType.DOCUMENT_REQUESTED.value,
            title="Documents Needed",
            message=f"Please upload required documents for Order #{order.order_number} to proceed.",
            priority=NotificationPriority.HIGH.value,
            order_id=order.id,
            action_url=f"/dashboard/documents?order_id={order.id}",
            action_text="Upload Documents",
            send_email=True
        )
    
    @staticmethod
    def notify_document_approved(db: Session, document: Document) -> Notification:
        """Notify user when document is approved"""
        return NotificationService.create_notification(
            db=db,
            user_id=document.user_id,
            notification_type=NotificationType.DOCUMENT_APPROVED.value,
            title="Document Approved ✓",
            message=f"Your document '{document.name}' has been reviewed and approved.",
            priority=NotificationPriority.MEDIUM.value,
            document_id=document.id,
            order_id=document.order_id,
            action_url=f"/dashboard/documents",
            action_text="View Documents",
            send_email=True
        )
    
    @staticmethod
    def notify_document_rejected(db: Session, document: Document, rejection_reason: Optional[str] = None) -> Notification:
        """Notify user when document is rejected"""
        return NotificationService.create_notification(
            db=db,
            user_id=document.user_id,
            notification_type=NotificationType.DOCUMENT_REJECTED.value,
            title="Document Rejected",
            message=f"Your document '{document.name}' needs to be resubmitted. Reason: {rejection_reason or 'Quality issue'}",
            priority=NotificationPriority.HIGH.value,
            document_id=document.id,
            order_id=document.order_id,
            action_url=f"/dashboard/documents?order_id={document.order_id}",
            action_text="Upload New Document",
            send_email=True
        )
    
    @staticmethod
    def notify_milestone_completed(db: Session, order: Order, milestone_name: str) -> Notification:
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
            notification_type=NotificationType.MILESTONE_COMPLETED.value,
            title=f"Milestone Completed: {milestone_name.replace('_', ' ').title()}",
            message=message,
            priority=NotificationPriority.HIGH.value,
            order_id=order.id,
            action_url=f"/dashboard/orders/{order.id}",
            action_text="View Progress",
            metadata={"milestone": milestone_name, "progress": order.progress},
            send_email=True
        )
    
    @staticmethod
    def notify_support_reply(db: Session, ticket: SupportTicket) -> Notification:
        """Notify user when admin replies to support ticket"""
        return NotificationService.create_notification(
            db=db,
            user_id=ticket.user_id,
            notification_type=NotificationType.SUPPORT_REPLY.value,
            title="Support Team Replied",
            message=f"You have a new reply on ticket #{ticket.ticket_number}: {ticket.subject}",
            priority=NotificationPriority.HIGH.value,
            ticket_id=ticket.id,
            action_url=f"/dashboard/support/{ticket.id}",
            action_text="View Reply",
            send_email=True
        )
    
    @staticmethod
    def notify_order_status_updated(db: Session, order: Order, old_status: str, new_status: str) -> Notification:
        """Notify user when order status changes"""
        return NotificationService.create_notification(
            db=db,
            user_id=order.user_id,
            notification_type=NotificationType.ORDER_STATUS_UPDATED.value,
            title="Order Status Updated",
            message=f"Order #{order.order_number} status changed from {old_status} to {new_status}.",
            priority=NotificationPriority.MEDIUM.value,
            order_id=order.id,
            action_url=f"/dashboard/orders/{order.id}",
            action_text="View Order",
            metadata={"old_status": old_status, "new_status": new_status}
        )
    
    @staticmethod
    def notify_order_update(
        db: Session,
        order: Order,
        message: str
    ) -> Notification:
        """Notify user of order update (legacy method for compatibility)"""
        return NotificationService.create_notification(
            db=db,
            user_id=order.user_id,
            notification_type="order_update",
            title=f"Order {order.order_number} Updated",
            message=message,
            action_url=f"/dashboard/orders/{order.id}",
            action_text="View Order"
        )
    
    @staticmethod
    def notify_document_ready(
        db: Session,
        user_id: UUID,
        document_name: str,
        order_id: Optional[UUID] = None
    ) -> Notification:
        """Notify user that document is ready (legacy method for compatibility)"""
        action_url = f"/dashboard/documents"
        if order_id:
            action_url = f"/dashboard/orders/{order_id}"
        
        return NotificationService.create_notification(
            db=db,
            user_id=user_id,
            notification_type="document_ready",
            title="New Document Available",
            message=f"{document_name} is ready for download",
            action_url=action_url,
            action_text="Download"
        )
    
    @staticmethod
    def log_activity(
        db: Session,
        user_id: UUID,
        activity_type: str,
        title: str,
        description: Optional[str] = None,
        order_id: Optional[UUID] = None,
        metadata: Optional[Dict] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ) -> ActivityLog:
        """Log user activity"""
        import json
        
        db_activity = ActivityLog(
            user_id=user_id,
            order_id=order_id,
            activity_type=activity_type,
            title=title,
            description=description,
            metadata_json=json.dumps(metadata) if metadata else None,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        db.add(db_activity)
        db.commit()
        db.refresh(db_activity)
        
        return db_activity

