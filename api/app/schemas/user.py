from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID
from app.models.user import UserRole


class UserBase(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    marketing_consent: Optional[bool] = None


class UserResponse(UserBase):
    id: UUID
    email_verified: bool
    is_active: bool
    onboarding_completed: bool = False
    role: Optional[UserRole] = UserRole.USER
    is_superuser: Optional[bool] = False  # Legacy field
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserProfile(UserResponse):
    last_login: Optional[datetime] = None
    marketing_consent: bool
    role: Optional[UserRole] = UserRole.USER
    is_superuser: Optional[bool] = False  # Legacy field
    
    class Config:
        from_attributes = True

