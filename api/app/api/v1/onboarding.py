from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.api.deps import get_current_active_user
from pydantic import BaseModel
from typing import Optional
from app.schemas.user import UserResponse

router = APIRouter()


class OnboardingData(BaseModel):
    firstName: str
    lastName: str
    phone: str
    country: str
    businessName: str
    businessType: str
    industry: str
    businessStage: Optional[str] = None
    mainGoal: str
    timeline: str
    budget: Optional[str] = None
    preferredState: Optional[str] = None
    needWebsite: bool = True
    needPhone: bool = True
    needEmail: bool = True


@router.post("/complete")
def complete_onboarding(
    data: OnboardingData,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Complete user onboarding"""
    # Update user profile
    current_user.first_name = data.firstName
    current_user.last_name = data.lastName
    current_user.phone = data.phone
    current_user.onboarding_completed = True
    current_user.onboarding_data = data.dict()
    
    db.commit()
    db.refresh(current_user)
    
    return {
        "message": "Onboarding completed successfully",
        "user": UserResponse.model_validate(current_user)
    }


@router.get("/status")
def get_onboarding_status(
    current_user: User = Depends(get_current_active_user)
):
    """Check onboarding status"""
    completed = current_user.onboarding_completed
    
    return {
        "completed": completed,
        "data": current_user.onboarding_data
    }

