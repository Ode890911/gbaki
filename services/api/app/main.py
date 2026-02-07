"""
AfriLaunch API - Main Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.config import settings

app = FastAPI(
    title="GBAKI Digital Solutions API",
    description="Business Incubator for African Immigrants - API",
    version="0.1.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Trusted Host Middleware
if not settings.DEBUG:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=settings.ALLOWED_HOSTS,
    )


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "GBAKI Digital Solutions API",
        "version": "0.1.0",
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "database": "connected",  # TODO: Add actual DB check
        "redis": "connected",  # TODO: Add actual Redis check
    }


# Import routers (will be created in next steps)
# from app.routers import auth, users, packages, orders, businesses

# app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
# app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
# app.include_router(packages.router, prefix="/api/v1/packages", tags=["Packages"])
# app.include_router(orders.router, prefix="/api/v1/orders", tags=["Orders"])
# app.include_router(businesses.router, prefix="/api/v1/businesses", tags=["Businesses"])

