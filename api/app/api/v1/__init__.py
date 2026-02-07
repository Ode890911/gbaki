from fastapi import APIRouter
from app.api.v1 import auth, users, orders, documents, support, notifications, onboarding, admin

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(orders.router, prefix="/orders", tags=["Orders"])
api_router.include_router(documents.router, prefix="/documents", tags=["Documents"])
api_router.include_router(support.router, prefix="/support", tags=["Support"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["Onboarding"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
