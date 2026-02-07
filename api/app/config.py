from pydantic_settings import BaseSettings
from typing import List, Optional
from functools import lru_cache


class Settings(BaseSettings):
    # App
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_VERSION: str = "v1"
    APP_NAME: str = "Gbaki Digital API"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Security
    SECRET_KEY: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Supabase
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_SERVICE_KEY: str
    DATABASE_URL: str
    
    # CORS
    FRONTEND_URL: str
    ALLOWED_ORIGINS: str
    
    @property
    def allowed_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]
    
    # Email
    RESEND_API_KEY: str
    FROM_EMAIL: str
    FROM_NAME: str
    
    # Stripe
    STRIPE_SECRET_KEY: str
    STRIPE_PUBLISHABLE_KEY: str
    STRIPE_WEBHOOK_SECRET: str
    
    # File Storage
    SUPABASE_STORAGE_BUCKET: str = "documents"
    MAX_FILE_SIZE: int = 10485760  # 10MB
    ALLOWED_FILE_TYPES: str = "pdf,jpg,jpeg,png,doc,docx"
    
    @property
    def allowed_file_types_list(self) -> List[str]:
        return [ft.strip() for ft in self.ALLOWED_FILE_TYPES.split(",")]
    
    # Monitoring
    SENTRY_DSN: Optional[str] = None
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_PER_HOUR: int = 1000
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"  # Ignore extra fields in .env file


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

