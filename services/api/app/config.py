"""
Application Configuration
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # App
    APP_NAME: str = "GBAKI Digital Solutions API"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"
    
    # API
    API_V1_PREFIX: str = "/api/v1"
    SECRET_KEY: str = "change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/gbaki_digital"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
    ]
    ALLOWED_HOSTS: List[str] = ["localhost", "127.0.0.1"]
    
    # Stripe
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""
    
    # SendGrid
    SENDGRID_API_KEY: str = ""
    
    # Twilio
    TWILIO_ACCOUNT_SID: str = ""
    TWILIO_AUTH_TOKEN: str = ""
    TWILIO_PHONE_NUMBER: str = ""
    
    # AI Services
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    
    # LLC Formation
    ZENBUSINESS_API_KEY: str = ""
    NORTHWEST_API_KEY: str = ""
    
    # AWS
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    AWS_S3_BUCKET: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

