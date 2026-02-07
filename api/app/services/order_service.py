from sqlalchemy.orm import Session
from typing import Optional, List
from uuid import UUID, uuid4
from datetime import datetime, timedelta
from app.models.order import Order, OrderService
from app.models.user import User
from app.schemas.order import OrderCreate, OrderUpdate


class OrderService:
    """Service for order business logic"""
    
    @staticmethod
    def create_order(
        db: Session,
        order_data: OrderCreate,
        user_id: UUID
    ) -> Order:
        """Create a new order"""
        # Generate order number
        order_number = f"GBK-{datetime.now().strftime('%Y%m%d')}-{str(uuid4())[:8].upper()}"
        
        # Package pricing
        package_prices = {
            "starter": 999.00,
            "growth": 2499.00,
            "premium": 4999.00
        }
        
        amount = package_prices.get(order_data.package_type, 0)
        
        # Create order
        db_order = Order(
            order_number=order_number,
            user_id=user_id,
            package_type=order_data.package_type,
            amount=amount,
            status="pending",
            progress=0,
            estimated_completion=datetime.utcnow() + timedelta(days=30)
        )
        
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        
        return db_order
    
    @staticmethod
    def get_order_by_id(
        db: Session,
        order_id: UUID,
        user_id: Optional[UUID] = None
    ) -> Optional[Order]:
        """Get order by ID"""
        query = db.query(Order).filter(Order.id == order_id)
        
        if user_id:
            query = query.filter(Order.user_id == user_id)
        
        return query.first()
    
    @staticmethod
    def get_user_orders(
        db: Session,
        user_id: UUID,
        skip: int = 0,
        limit: int = 100
    ) -> List[Order]:
        """Get all orders for a user"""
        return db.query(Order).filter(
            Order.user_id == user_id
        ).offset(skip).limit(limit).all()
    
    @staticmethod
    def update_order(
        db: Session,
        order_id: UUID,
        order_update: OrderUpdate
    ) -> Optional[Order]:
        """Update order"""
        order = db.query(Order).filter(Order.id == order_id).first()
        
        if not order:
            return None
        
        update_data = order_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(order, field, value)
        
        db.commit()
        db.refresh(order)
        
        return order
    
    @staticmethod
    def update_order_progress(
        db: Session,
        order_id: UUID,
        progress: int,
        status: Optional[str] = None
    ) -> Optional[Order]:
        """Update order progress"""
        order = db.query(Order).filter(Order.id == order_id).first()
        
        if not order:
            return None
        
        order.progress = progress
        if status:
            order.status = status
        
        db.commit()
        db.refresh(order)
        
        return order
    
    @staticmethod
    def add_order_service(
        db: Session,
        order_id: UUID,
        service_name: str,
        service_type: str
    ) -> OrderService:
        """Add a service to an order"""
        db_service = OrderService(
            order_id=order_id,
            service_name=service_name,
            service_type=service_type,
            status="pending"
        )
        
        db.add(db_service)
        db.commit()
        db.refresh(db_service)
        
        return db_service

