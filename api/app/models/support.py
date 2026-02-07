from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid


class SupportTicket(Base):
    __tablename__ = "support_tickets"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ticket_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    
    # Ticket details
    subject = Column(String(255), nullable=False)
    category = Column(String(50), nullable=False)
    status = Column(String(20), default="open", index=True)
    priority = Column(String(20), default="normal")
    
    # Assignment
    assigned_to = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    resolved_at = Column(DateTime(timezone=True))
    
    # Relationships
    user = relationship("User", foreign_keys=[user_id], backref="tickets")
    order = relationship("Order", backref="tickets")
    assignee = relationship("User", foreign_keys=[assigned_to])
    
    def __repr__(self):
        return f"<Ticket {self.ticket_number}>"


class TicketMessage(Base):
    __tablename__ = "ticket_messages"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ticket_id = Column(UUID(as_uuid=True), ForeignKey("support_tickets.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Message
    message = Column(Text, nullable=False)
    is_staff = Column(Boolean, default=False)
    is_internal = Column(Boolean, default=False)  # Internal notes
    
    # Timestamp
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    ticket = relationship("SupportTicket", backref="messages")
    user = relationship("User", backref="ticket_messages")
    
    def __repr__(self):
        return f"<TicketMessage {self.id}>"

