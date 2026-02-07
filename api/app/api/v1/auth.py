from fastapi import APIRouter, Depends, HTTPException, status, Body, BackgroundTasks, Response
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token
)
from app.core.auth import supabase_auth
from app.core.email import EmailService
from app.api.deps import get_current_active_user
from app.models.user import User
from pydantic import BaseModel, EmailStr
from typing import Optional

from app.config import settings

router = APIRouter()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


class RegisterRequest(UserCreate):
    pass


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str


@router.post("/register", response_model=LoginResponse, status_code=status.HTTP_201_CREATED)
async def register(
    response: Response,
    user_data: RegisterRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Register new user"""
    
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    try:
        # Register with Supabase Auth (optional - for unified auth)
        # supabase_response = await supabase_auth.sign_up(
        #     user_data.email,
        #     user_data.password
        # )
        
        # Create user in database
        hashed_password = get_password_hash(user_data.password)
        
        db_user = User(
            email=user_data.email,
            password_hash=hashed_password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            phone=user_data.phone,
            address=user_data.address,
            email_verified=False,
            is_active=True
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        # Create tokens
        access_token = create_access_token(data={"sub": str(db_user.id)})
        refresh_token = create_refresh_token(data={"sub": str(db_user.id)})
        
        # Create verification token
        verification_token = create_access_token(
            data={"sub": str(db_user.id), "type": "email_verification"},
            expires_delta=timedelta(days=7)
        )
        
        # ✅ Send welcome email with verification (background task)
        user_name = f"{db_user.first_name} {db_user.last_name}".strip() if db_user.first_name else db_user.email
        background_tasks.add_task(
            EmailService.send_welcome_email,
            db_user.email,
            user_name,
            verification_token
        )
        
        # Set cookies
        is_secure = settings.ENVIRONMENT == "production"
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=is_secure,
            samesite="lax",
            max_age=3600 * 24 * 7  # 7 days
        )
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=is_secure,
            samesite="lax",
            max_age=3600 * 24 * 30  # 30 days
        )
        
        return LoginResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            user=UserResponse.model_validate(db_user)
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )


@router.post("/login", response_model=LoginResponse)
async def login(
    response: Response,
    credentials: LoginRequest,
    db: Session = Depends(get_db)
):
    """Login user"""
    
    # Find user
    user = db.query(User).filter(User.email == credentials.email).first()
    
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create tokens
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    # Set cookies
    is_secure = settings.ENVIRONMENT == "production"
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=is_secure,
        samesite="lax",
        max_age=3600 * 24 * 7  # 7 days
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=is_secure,
        samesite="lax",
        max_age=3600 * 24 * 30  # 30 days
    )
    
    return LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user)
    )


@router.post("/refresh", response_model=dict)
async def refresh_access_token(
    response: Response,
    request: RefreshTokenRequest,
    db: Session = Depends(get_db)
):
    """Refresh access token using refresh token"""
    from app.core.security import decode_token
    
    payload = decode_token(request.refresh_token)
    
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    user_id = payload.get("sub")
    from uuid import UUID
    user = db.query(User).filter(User.id == UUID(user_id)).first()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Create new access token
    access_token = create_access_token(data={"sub": str(user.id)})
    
    # Set cookies
    is_secure = settings.ENVIRONMENT == "production"
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=is_secure,
        samesite="lax",
        max_age=3600 * 24 * 7  # 7 days
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.post("/password-reset", status_code=status.HTTP_200_OK)
async def request_password_reset(
    request: PasswordResetRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Request password reset email"""
    
    user = db.query(User).filter(User.email == request.email).first()
    
    # Always return success to prevent email enumeration
    if not user:
        return {"message": "If the email exists, a reset link has been sent"}
    
    try:
        # Generate reset token
        reset_token = create_access_token(
            data={"sub": str(user.id), "type": "password_reset"},
            expires_delta=timedelta(hours=1)
        )
        
        # ✅ Send password reset email (background task)
        user_name = f"{user.first_name} {user.last_name}".strip() if user.first_name else user.email
        background_tasks.add_task(
            EmailService.send_password_reset_email,
            user.email,
            user_name,
            reset_token
        )
        
        return {"message": "If the email exists, a reset link has been sent"}
        
    except Exception as e:
        # Log error but don't expose to user
        print(f"Password reset error: {str(e)}")
        return {"message": "If the email exists, a reset link has been sent"}


@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password(
    request: PasswordResetConfirm,
    db: Session = Depends(get_db)
):
    """Reset password (alias for frontend compatibility)"""
    return await confirm_password_reset(request, db)


@router.post("/password-reset/confirm", status_code=status.HTTP_200_OK)
async def confirm_password_reset(
    response: Response,
    request: PasswordResetConfirm,
    db: Session = Depends(get_db)
):
    """Confirm password reset with token"""
    from app.core.security import decode_token
    from uuid import UUID
    
    payload = decode_token(request.token)
    
    if not payload or payload.get("type") != "password_reset":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == UUID(user_id)).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update password
    user.password_hash = get_password_hash(request.new_password)
    db.commit()
    
    # Set cookies
    is_secure = settings.ENVIRONMENT == "production"
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=is_secure,
        samesite="lax",
        max_age=3600 * 24 * 7  # 7 days
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=is_secure,
        samesite="lax",
        max_age=3600 * 24 * 30  # 30 days
    )
    
    return {
        "message": "Password successfully reset",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": UserResponse.model_validate(user)
    }


@router.get("/verify-email", status_code=status.HTTP_200_OK)
async def verify_email_get(
    response: Response,
    token: str,
    db: Session = Depends(get_db)
):
    """Verify email with token (GET method for frontend compatibility)"""
    from app.core.security import decode_token
    from uuid import UUID
    
    payload = decode_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token"
        )
    
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == UUID(user_id)).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Return tokens for auto-login
    already_verified = user.email_verified
    if not user.email_verified:
        user.email_verified = True
        db.commit()
    
    # Create tokens for auto-login
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    return {
        "message": "Email successfully verified",
        "already_verified": already_verified,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": UserResponse.model_validate(user)
    }


@router.post("/verify-email", status_code=status.HTTP_200_OK)
async def verify_email_post(
    response: Response,
    token: str = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    """Verify email with token (POST method)"""
    from app.core.security import decode_token
    from uuid import UUID
    
    payload = decode_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token"
        )
    
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == UUID(user_id)).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Return tokens for auto-login
    already_verified = user.email_verified
    if not user.email_verified:
        user.email_verified = True
        db.commit()
    
    # Create tokens for auto-login
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    return {
        "message": "Email successfully verified",
        "already_verified": already_verified,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": UserResponse.model_validate(user)
    }


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_active_user)
):
    """Get current user information"""
    return current_user


@router.post("/logout")
async def logout(
    response: Response,
    current_user: User = Depends(get_current_active_user)
):
    """Logout user"""
    response.delete_cookie(
        key="access_token",
        samesite="lax",
        httponly=True,
        secure=settings.ENVIRONMENT == "production"
    )
    response.delete_cookie(
        key="refresh_token",
        samesite="lax",
        httponly=True,
        secure=settings.ENVIRONMENT == "production"
    )
    return {"message": "Logged out successfully"}
