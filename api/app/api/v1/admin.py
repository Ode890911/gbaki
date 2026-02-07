from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from app.database import get_db
from app.models.user import User
from app.models.order import Order
from app.models.document import Document
from app.models.support import SupportTicket
from app.models.notification import Notification
from app.api.deps import get_current_admin
from app.schemas.pagination import PaginatedResponse, paginate
from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID

router = APIRouter()


@router.get("/stats/overview")
def get_admin_overview(
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get admin dashboard overview statistics"""
    
    # Total counts
    total_users = db.query(User).count()
    total_orders = db.query(Order).count()
    total_revenue = db.query(func.sum(Order.amount)).filter(
        Order.payment_status == "completed"
    ).scalar() or 0
    
    # Active orders (not completed or cancelled)
    active_orders = db.query(Order).filter(
        Order.status.in_(["pending", "processing", "in_progress"])
    ).count()
    
    # Pending documents (not verified)
    pending_documents = db.query(Document).filter(
        Document.is_verified == False
    ).count()
    
    # Open tickets
    open_tickets = db.query(SupportTicket).filter(
        SupportTicket.status.in_(["open", "in_progress"])
    ).count()
    
    # New users this month
    start_of_month = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    new_users_this_month = db.query(User).filter(
        User.created_at >= start_of_month
    ).count()
    
    # Revenue this month
    revenue_this_month = db.query(func.sum(Order.amount)).filter(
        Order.created_at >= start_of_month,
        Order.payment_status == "completed"
    ).scalar() or 0
    
    # Orders by status
    orders_by_status = db.query(
        Order.status,
        func.count(Order.id)
    ).group_by(Order.status).all()
    
    # Recent activity (last 7 days)
    seven_days_ago = datetime.now() - timedelta(days=7)
    recent_orders = db.query(func.count(Order.id)).filter(
        Order.created_at >= seven_days_ago
    ).scalar()
    
    recent_users = db.query(func.count(User.id)).filter(
        User.created_at >= seven_days_ago
    ).scalar()
    
    return {
        "overview": {
            "total_users": total_users,
            "total_orders": total_orders,
            "total_revenue": float(total_revenue),
            "active_orders": active_orders,
            "pending_documents": pending_documents,
            "open_tickets": open_tickets
        },
        "this_month": {
            "new_users": new_users_this_month,
            "revenue": float(revenue_this_month)
        },
        "orders_by_status": {
            status: count for status, count in orders_by_status
        },
        "recent_activity": {
            "orders_last_7_days": recent_orders,
            "users_last_7_days": recent_users
        }
    }


@router.get("/stats/revenue")
def get_revenue_stats(
    days: int = 30,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get revenue statistics over time"""
    
    start_date = datetime.now() - timedelta(days=days)
    
    # Daily revenue
    daily_revenue = db.query(
        func.date(Order.created_at).label('date'),
        func.sum(Order.amount).label('revenue'),
        func.count(Order.id).label('orders')
    ).filter(
        Order.created_at >= start_date,
        Order.payment_status == "completed"
    ).group_by(func.date(Order.created_at)).all()
    
    return {
        "daily_revenue": [
            {
                "date": str(date),
                "revenue": float(revenue or 0),
                "orders": orders
            }
            for date, revenue, orders in daily_revenue
        ]
    }


@router.get("/orders/list")
def list_all_orders(
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    per_page: int = Query(20, ge=1, le=100, description="Items per page"),
    status: Optional[str] = Query(None, description="Filter by order status"),
    search: Optional[str] = Query(None, description="Search by order number, customer name, or email"),
    package_type: Optional[str] = Query(None, description="Filter by package type"),
    payment_status: Optional[str] = Query(None, description="Filter by payment status"),
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """List all orders with pagination and filters (admin only)"""
    
    query = db.query(Order)
    
    # Apply filters
    if status:
        query = query.filter(Order.status == status)
    
    if package_type:
        query = query.filter(Order.package_type == package_type)
    
    if payment_status:
        query = query.filter(Order.payment_status == payment_status)
    
    if search:
        search_filter = f"%{search}%"
        query = query.join(Order.user).filter(
            (Order.order_number.ilike(search_filter)) |
            (User.email.ilike(search_filter)) |
            (User.first_name.ilike(search_filter)) |
            (User.last_name.ilike(search_filter))
        )
    
    # Order by created_at descending
    query = query.order_by(Order.created_at.desc())
    
    # Paginate
    orders, total = paginate(query, page, per_page)
    total_pages = (total + per_page - 1) // per_page
    
    return {
        "data": [
            {
                "id": str(order.id),
                "order_number": order.order_number,
                "package_type": order.package_type,
                "status": order.status,
                "progress": order.progress,
                "amount": float(order.amount),
                "payment_status": order.payment_status,
                "created_at": order.created_at.isoformat() if order.created_at else None,
                "estimated_completion": order.estimated_completion.isoformat() if order.estimated_completion else None,
                "user": {
                    "id": str(order.user.id),
                    "email": order.user.email,
                    "name": f"{order.user.first_name} {order.user.last_name}".strip() if order.user.first_name else None
                } if order.user else None
            }
            for order in orders
        ],
        "page": page,
        "per_page": per_page,
        "total": total,
        "total_pages": total_pages,
        "has_next": page < total_pages,
        "has_prev": page > 1
    }


@router.get("/documents/pending")
def get_pending_documents(
    limit: int = 50,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get all pending documents for review"""
    
    documents = db.query(Document).filter(
        Document.is_verified == False
    ).order_by(Document.uploaded_at.desc()).limit(limit).all()
    
    return {
        "documents": [
            {
                "id": str(doc.id),
                "name": doc.name,
                "document_type": doc.document_type,
                "is_verified": doc.is_verified,
                "file_size": doc.file_size,
                "file_url": doc.file_url,
                "uploaded_at": doc.uploaded_at.isoformat() if doc.uploaded_at else None,
                "order_id": str(doc.order_id) if doc.order_id else None,
                "user": {
                    "id": str(doc.user.id),
                    "email": doc.user.email,
                    "name": f"{doc.user.first_name} {doc.user.last_name}".strip() if doc.user.first_name else None
                } if doc.user else None,
                "order": {
                    "order_number": doc.order.order_number if doc.order else None,
                    "package_type": doc.order.package_type if doc.order else None
                } if doc.order else None
            }
            for doc in documents
        ]
    }


@router.get("/tickets/list")
def list_all_tickets(
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    per_page: int = Query(20, ge=1, le=100, description="Items per page"),
    status: Optional[str] = Query(None, description="Filter by ticket status"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    search: Optional[str] = Query(None, description="Search by ticket number, subject, or user"),
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """List all support tickets with pagination and filters (admin only)"""
    
    query = db.query(SupportTicket)
    
    # Apply filters
    if status:
        query = query.filter(SupportTicket.status == status)
    
    if priority:
        query = query.filter(SupportTicket.priority == priority)
    
    if search:
        search_filter = f"%{search}%"
        query = query.join(SupportTicket.user).filter(
            (SupportTicket.ticket_number.ilike(search_filter)) |
            (SupportTicket.subject.ilike(search_filter)) |
            (User.email.ilike(search_filter)) |
            (User.first_name.ilike(search_filter)) |
            (User.last_name.ilike(search_filter))
        )
    
    # Order by created_at descending
    query = query.order_by(SupportTicket.created_at.desc())
    
    # Paginate
    tickets, total = paginate(query, page, per_page)
    total_pages = (total + per_page - 1) // per_page
    
    return {
        "data": [
            {
                "id": str(ticket.id),
                "ticket_number": ticket.ticket_number,
                "subject": ticket.subject,
                "status": ticket.status,
                "category": ticket.category,
                "priority": ticket.priority,
                "created_at": ticket.created_at.isoformat() if ticket.created_at else None,
                "updated_at": ticket.updated_at.isoformat() if ticket.updated_at else None,
                "message_count": len(ticket.messages) if ticket.messages else 0,
                "assigned_to": str(ticket.assigned_to) if ticket.assigned_to else None,
                "user": {
                    "id": str(ticket.user.id),
                    "email": ticket.user.email,
                    "name": f"{ticket.user.first_name} {ticket.user.last_name}".strip() if ticket.user.first_name else None
                } if ticket.user else None
            }
            for ticket in tickets
        ],
        "page": page,
        "per_page": per_page,
        "total": total,
        "total_pages": total_pages,
        "has_next": page < total_pages,
        "has_prev": page > 1
    }


@router.get("/users/list")
def list_all_users(
    search: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """List all users"""
    
    query = db.query(User)
    
    if search:
        query = query.filter(
            (User.email.ilike(f"%{search}%")) |
            (User.first_name.ilike(f"%{search}%")) |
            (User.last_name.ilike(f"%{search}%"))
        )
    
    total = query.count()
    users = query.order_by(User.created_at.desc()).offset(offset).limit(limit).all()
    
    return {
        "users": [
            {
                "id": str(user.id),
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "phone": user.phone,
                "role": user.role.value if hasattr(user, 'role') and user.role else ("admin" if user.is_superuser else "user"),
                "is_verified": user.email_verified,
                "is_active": user.is_active,
                "created_at": user.created_at.isoformat() if user.created_at else None,
                "orders_count": len(user.orders) if user.orders else 0,
                "tickets_count": len(user.tickets) if user.tickets else 0
            }
            for user in users
        ],
        "total": total,
        "limit": limit,
        "offset": offset
    }
