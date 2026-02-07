from sqlalchemy import Column, String, Boolean, DateTime, Text, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.sql import func
from app.database import Base
import uuid
import enum


class UserRole(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"


class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255))
    first_name = Column(String(100))
    last_name = Column(String(100))
    phone = Column(String(20))
    address = Column(Text)
    
    # Status
    email_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)  # Legacy field
    role = Column(SQLEnum(UserRole), default=UserRole.USER)  # New role field
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True))
    
    # GDPR
    gdpr_consent_date = Column(DateTime(timezone=True))
    marketing_consent = Column(Boolean, default=False)
    data_processing_consent = Column(Boolean, default=True)
    
    # Onboarding
    onboarding_completed = Column(Boolean, default=False)
    onboarding_data = Column(JSON, nullable=True)
    
    def __repr__(self):
        return f"<User {self.email}>"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

