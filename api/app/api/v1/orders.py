from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from decimal import Decimal
from app.database import get_db
from app.models.user import User
from app.models.order import Order, OrderService
from app.schemas.order import OrderCreate, OrderResponse, OrderUpdate
from app.api.deps import get_current_active_user, get_current_superuser
from app.services.notification_service import NotificationService
from app.core.email import EmailService
from uuid import UUID
import random
import string

router = APIRouter()


def generate_order_number() -> str:
    """Generate unique order number"""
    timestamp = datetime.now().strftime("%Y%m%d")
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"ORD-{timestamp}-{random_str}"


def get_package_price(package_type: str) -> Decimal:
    """Get price for package type"""
    prices = {
        "starter": Decimal("997.00"),
        "growth": Decimal("2497.00"),
        "premium": Decimal("4997.00")
    }
    return prices.get(package_type, Decimal("0.00"))


def get_package_services(package_type: str) -> List[dict]:
    """Get services included in package"""
    services = {
        "starter": [
            {"name": "LLC Formation", "type": "legal"},
            {"name": "EIN Registration", "type": "legal"},
            {"name": "Website (5 pages)", "type": "web"},
            {"name": "Business Phone", "type": "communication"},
            {"name": "Business Email", "type": "communication"},
        ],
        "growth": [
            {"name": "LLC Formation", "type": "legal"},
            {"name": "EIN Registration", "type": "legal"},
            {"name": "Registered Agent (1 year)", "type": "legal"},
            {"name": "Website (10 pages)", "type": "web"},
            {"name": "E-commerce (50 products)", "type": "web"},
            {"name": "AI Chatbot", "type": "ai"},
            {"name": "SEO Optimization", "type": "marketing"},
            {"name": "IVR Phone System", "type": "communication"},
        ],
        "premium": [
            {"name": "LLC Formation", "type": "legal"},
            {"name": "EIN Registration", "type": "legal"},
            {"name": "Registered Agent (1 year)", "type": "legal"},
            {"name": "Website (Unlimited pages)", "type": "web"},
            {"name": "E-commerce (Unlimited products)", "type": "web"},
            {"name": "AI Voice Assistant", "type": "ai"},
            {"name": "SEO Optimization", "type": "marketing"},
            {"name": "WhatsApp Business", "type": "communication"},
            {"name": "Annual Compliance", "type": "legal"},
            {"name": "Dedicated Manager", "type": "support"},
        ]
    }
    return services.get(package_type, [])


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    order_data: OrderCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create new order"""
    
    # Generate order number
    order_number = generate_order_number()
    
    # Get package price
    amount = get_package_price(order_data.package_type)
    
    # Calculate estimated completion (21 days)
    estimated_completion = datetime.utcnow() + timedelta(days=21)
    
    # Create order
    db_order = Order(
        order_number=order_number,
        user_id=current_user.id,
        package_type=order_data.package_type,
        amount=amount,
        status="pending",
        progress=0,
        payment_status="pending",
        estimated_completion=estimated_completion
    )
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Add services
    services = get_package_services(order_data.package_type)
    for service in services:
        db_service = OrderService(
            order_id=db_order.id,
            service_name=service["name"],
            service_type=service["type"],
            status="pending"
        )
        db.add(db_service)
    
    db.commit()
    db.refresh(db_order)
    
    # ✅ Send order confirmation email (background task)
    user_name = f"{current_user.first_name} {current_user.last_name}".strip() if current_user.first_name else current_user.email
    background_tasks.add_task(
        EmailService.send_order_confirmation_email,
        current_user.email,
        user_name,
        order_number,
        order_data.package_type,
        float(amount)
    )
    
    # ✅ Send document request email (background task)
    background_tasks.add_task(
        EmailService.send_document_request_email,
        current_user.email,
        user_name,
        order_number,
        str(db_order.id)
    )
    
    # ✅ CREATE NOTIFICATION
    NotificationService.notify_order_created(db, db_order)
    
    # TODO: Create Stripe payment intent
    
    return OrderResponse.model_validate(db_order)


@router.get("/", response_model=List[OrderResponse])
async def list_orders(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """List current user's orders"""
    orders = db.query(Order).filter(
        Order.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get order by ID"""
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.user_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    return OrderResponse.model_validate(order)


@router.put("/{order_id}", response_model=OrderResponse)
async def update_order(
    order_id: UUID,
    order_update: OrderUpdate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_superuser),
    db: Session = Depends(get_db)
):
    """Update order (admin only)"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Get old status before update
    old_status = order.status
    
    # Update fields
    update_data = order_update.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(order, field, value)
    
    db.commit()
    db.refresh(order)
    
    # ✅ Send order status update email if status changed (background task)
    if old_status != order.status:
        user_name = f"{order.user.first_name} {order.user.last_name}".strip() if order.user.first_name else order.user.email
        background_tasks.add_task(
            EmailService.send_order_status_update_email,
            order.user.email,
            user_name,
            order.order_number,
            old_status,
            order.status,
            f"Your order status has been updated to {order.status.replace('_', ' ').title()}"
        )
        
        # ✅ CREATE NOTIFICATION
        NotificationService.notify_order_status_updated(db, order, old_status, order.status)
    
    # TODO: Log activity
    
    return OrderResponse.model_validate(order)


@router.patch("/{order_id}/milestone")
async def update_order_milestone(
    order_id: UUID,
    milestone: str,
    background_tasks: BackgroundTasks,
    completed: bool = True,
    current_user: User = Depends(get_current_superuser),
    db: Session = Depends(get_db)
):
    """Admin: Update order milestone"""
    
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Update milestone (simplified - adjust based on your order model)
    # This assumes you have milestone tracking fields
    # If not, you'll need to add them to the Order model
    
    # Calculate progress based on milestone
    milestone_progress_map = {
        "order_placed": 10,
        "documents_submitted": 20,
        "documents_approved": 30,
        "llc_filed": 50,
        "website_ready": 70,
        "services_setup": 90,
        "completed": 100
    }
    
    if completed and milestone in milestone_progress_map:
        order.progress = max(order.progress, milestone_progress_map[milestone])
    
    db.commit()
    db.refresh(order)
    
    # ✅ CREATE NOTIFICATION AND SEND EMAIL
    if completed:
        notification = NotificationService.notify_milestone_completed(db, order, milestone)
        
        # Send milestone completion email (background task)
        milestone_titles = {
            "documents_approved": "Documents Approved",
            "llc_filed": "LLC Filed",
            "website_ready": "Website Ready",
            "services_setup": "Services Setup",
            "completed": "Order Completed"
        }
        milestone_title = milestone_titles.get(milestone, milestone.replace('_', ' ').title())
        user_name = f"{order.user.first_name} {order.user.last_name}".strip() if order.user.first_name else order.user.email
        
        background_tasks.add_task(
            EmailService.send_milestone_completed_email,
            order.user.email,
            user_name,
            milestone_title,
            str(order.id)
        )
    
    return {
        "message": f"Milestone {milestone} updated",
        "order": OrderResponse.model_validate(order)
    }


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def cancel_order(
    order_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Cancel order (before processing starts)"""
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.user_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    if order.status not in ["pending", "processing"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order cannot be cancelled at this stage"
        )
    
    old_status = order.status
    order.status = "cancelled"
    db.commit()
    
    # ✅ CREATE NOTIFICATION
    NotificationService.notify_order_status_updated(db, order, old_status, "cancelled")
    
    # TODO: Process refund if payment made
    # TODO: Send cancellation email
    
    return None
