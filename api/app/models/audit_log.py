"""
Audit Log Model for tracking admin actions
"""
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base


class AuditLog(Base):
    """
    Audit log for tracking all admin actions
    Critical for compliance, security, and debugging
    """
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Who performed the action
    admin_id = Column(String, ForeignKey("users.id"), nullable=False)
    admin = relationship("User", foreign_keys=[admin_id])
    
    # What action was performed
    action = Column(String, nullable=False)  # e.g., "order_milestone_updated", "user_role_changed"
    entity_type = Column(String, nullable=False)  # e.g., "order", "user", "document", "ticket"
    entity_id = Column(String, nullable=False)  # ID of the affected entity
    
    # What changed
    old_value = Column(JSON, nullable=True)  # Previous state
    new_value = Column(JSON, nullable=True)  # New state
    
    # Request metadata
    ip_address = Column(String, nullable=True)
    user_agent = Column(Text, nullable=True)
    
    # Additional context
    description = Column(Text, nullable=True)  # Human-readable description
    metadata = Column(JSON, nullable=True)  # Any additional context
    
    # Timestamp
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<AuditLog {self.action} by {self.admin_id} on {self.entity_type}:{self.entity_id}>"
