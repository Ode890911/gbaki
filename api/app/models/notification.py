from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
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
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Notification details
    notification_type = Column(String(50), nullable=False, index=True)  # Keep as string for compatibility
    type = Column(String(50), nullable=True)  # New field for enum type
    priority = Column(String(20), default="medium")  # Priority level
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    
    # Related entities
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=True)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"), nullable=True)
    ticket_id = Column(UUID(as_uuid=True), ForeignKey("support_tickets.id"), nullable=True)
    
    # Action
    action_url = Column(Text)
    action_text = Column(String(50))
    
    # Metadata (renamed from 'metadata' to avoid SQLAlchemy conflict)
    notification_metadata = Column(JSON, nullable=True)
    
    # Status
    read = Column(Boolean, default=False, index=True)  # Keep for compatibility
    is_read = Column(Boolean, default=False, index=True)  # New field
    read_at = Column(DateTime(timezone=True))
    
    # Email notification
    email_sent = Column(Boolean, default=False)
    email_sent_at = Column(DateTime(timezone=True))
    
    # Timestamp
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", backref="notifications")
    order = relationship("Order")
    document = relationship("Document")
    ticket = relationship("SupportTicket")
    
    def __repr__(self):
        return f"<Notification {self.title}>"


class ActivityLog(Base):
    __tablename__ = "activity_log"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    
    # Activity details
    activity_type = Column(String(50), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    
    # Metadata
    metadata_json = Column(Text)  # JSON string (renamed from metadata to avoid SQLAlchemy conflict)
    ip_address = Column(String(45))
    user_agent = Column(Text)
    
    # Timestamp
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", backref="activities")
    order = relationship("Order", backref="activities")
    
    def __repr__(self):
        return f"<ActivityLog {self.activity_type}>"

