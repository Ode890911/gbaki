from sqlalchemy import Column, String, Integer, DECIMAL, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid


class Order(Base):
    __tablename__ = "orders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Package details
    package_type = Column(String(50), nullable=False)  # starter, growth, premium
    status = Column(String(50), default="pending", index=True)
    progress = Column(Integer, default=0)  # 0-100
    
    # Pricing
    amount = Column(DECIMAL(10, 2), nullable=False)
    currency = Column(String(3), default="USD")
    payment_status = Column(String(20), default="pending")
    
    # Dates
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    estimated_completion = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    
    # Assignment
    assigned_manager_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # Relationships
    user = relationship("User", foreign_keys=[user_id], backref="orders")
    assigned_manager = relationship("User", foreign_keys=[assigned_manager_id])
    
    def __repr__(self):
        return f"<Order {self.order_number}>"


class OrderService(Base):
    __tablename__ = "order_services"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    service_name = Column(String(100), nullable=False)
    service_type = Column(String(50), nullable=False)
    status = Column(String(50), default="pending")
    completed_at = Column(DateTime(timezone=True))
    
    # Relationship
    order = relationship("Order", backref="services")

