from sqlalchemy import Column, String, Date, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid


class Business(Base):
    __tablename__ = "businesses"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Business info
    business_name = Column(String(255), nullable=False)
    ein = Column(String(20), unique=True, index=True)
    formation_state = Column(String(2))
    formation_date = Column(Date)
    business_type = Column(String(100))
    industry = Column(String(100))
    
    # Address
    business_address = Column(Text)
    city = Column(String(100))
    state = Column(String(2))
    zip_code = Column(String(10))
    country = Column(String(2), default="US")
    
    # Contact
    business_email = Column(String(255))
    business_phone = Column(String(20))
    website_url = Column(String(255))
    
    # Description
    description = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationship
    user = relationship("User", backref="businesses")
    
    def __repr__(self):
        return f"<Business {self.business_name}>"

