"""
Gbaki Digital Solutions - FastAPI Backend
Business Incubator for African Immigrants
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from routers import auth, users, packages, orders, llc, websites, ai, payments

# Lifespan context manager for startup/shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Gbaki Digital Solutions API starting up...")
    print(f"📍 Environment: {os.getenv('ENVIRONMENT', 'development')}")
    yield
    # Shutdown
    print("👋 Shutting down...")

# Initialize FastAPI app
app = FastAPI(
    title="Gbaki Digital Solutions API",
    description="Business Incubator Platform for African Immigrants",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
    contact={
        "name": "Gbaki Digital Solutions",
        "email": "support@gbakidigital.com",
    },
    license_info={
        "name": "MIT",
    },
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    os.getenv("FRONTEND_URL", "https://gbakidigital.vercel.app"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Health check endpoint
@app.get("/")
async def root():
    """Root endpoint - API status"""
    return {
        "status": "healthy",
        "message": "Gbaki Digital Solutions API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "ok",
        "service": "gbaki-digital-solutions-api",
        "environment": os.getenv("ENVIRONMENT", "development")
    }

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(packages.router, prefix="/api/v1/packages", tags=["Packages"])
app.include_router(orders.router, prefix="/api/v1/orders", tags=["Orders"])
app.include_router(llc.router, prefix="/api/v1/llc", tags=["LLC Formation"])
app.include_router(websites.router, prefix="/api/v1/websites", tags=["Websites"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI Services"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Payments"])

# Global exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc) if os.getenv("DEBUG") == "true" else "An error occurred"
        }
    )

# Run the application
if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    reload = os.getenv("ENVIRONMENT", "development") == "development"
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=reload,
        log_level="info"
    )

