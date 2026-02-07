# 🔧 **BACKEND SUPPORT TICKET IMPLEMENTATION GUIDE**

This document provides the complete backend implementation for the support ticket flow with order linking, notifications, and status management.

---

## **STEP 1: Create Support Ticket Model**

**File: `apps/backend/app/models/support_ticket.py`**

```python
from sqlalchemy import Column, String, DateTime, Enum as SQLEnum, ForeignKey, Text, Integer, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
import uuid
import enum

class TicketStatus(str, enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    WAITING_ON_CUSTOMER = "waiting_on_customer"
    RESOLVED = "resolved"
    CLOSED = "closed"

class TicketPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class SupportTicket(Base):
    __tablename__ = "support_tickets"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    ticket_number = Column(String, unique=True, nullable=False)
    
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    order_id = Column(String, ForeignKey("orders.id"), nullable=True)  # ✅ Link to order
    
    subject = Column(String, nullable=False)
    category = Column(String, nullable=False)
    priority = Column(SQLEnum(TicketPriority), default=TicketPriority.MEDIUM)
    status = Column(SQLEnum(TicketStatus), default=TicketStatus.OPEN)
    
    description = Column(Text, nullable=False)
    
    # Assignment
    assigned_to = Column(String, nullable=True)  # Admin user ID
    
    # Metrics
    response_time = Column(Integer, nullable=True)  # Minutes to first response
    resolution_time = Column(Integer, nullable=True)  # Minutes to resolution
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    closed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    user = relationship("User", back_populates="support_tickets")
    order = relationship("Order", back_populates="support_tickets")  # ✅ Add relationship
    messages = relationship("TicketMessage", back_populates="ticket", cascade="all, delete-orphan")


class TicketMessage(Base):
    __tablename__ = "ticket_messages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    ticket_id = Column(String, ForeignKey("support_tickets.id"), nullable=False)
    
    sender_id = Column(String, ForeignKey("users.id"), nullable=False)
    sender_type = Column(String, nullable=False)  # "user" or "admin"
    
    message = Column(Text, nullable=False)
    is_internal = Column(Boolean, default=False)  # Internal admin notes
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    ticket = relationship("SupportTicket", back_populates="messages")
    sender = relationship("User")
```

---

## **STEP 2: Update Order Model**

**File: `apps/backend/app/models/order.py`**

Add this relationship to the `Order` class:

```python
# Add this to the Order model relationships:
support_tickets = relationship("SupportTicket", back_populates="order")
```

---

## **STEP 3: Update User Model**

**File: `apps/backend/app/models/user.py`**

Add this relationship to the `User` class:

```python
# Add this to the User model relationships:
support_tickets = relationship("SupportTicket", back_populates="user")
```

---

## **STEP 4: Create Support API Endpoints**

**File: `apps/backend/app/api/v1/support.py`**

```python
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.support_ticket import SupportTicket, TicketMessage, TicketStatus, TicketPriority
from app.models.order import Order
from app.api.deps import get_current_user
from pydantic import BaseModel
from typing import Optional
import random
from datetime import datetime

router = APIRouter()

class TicketCreate(BaseModel):
    subject: str
    category: str
    description: str
    priority: Optional[str] = "medium"
    order_id: Optional[str] = None  # ✅ Accept order_id

class MessageCreate(BaseModel):
    message: str

# ✅ Email notification function (placeholder)
def send_ticket_notification_email(ticket: SupportTicket, recipient: str, notification_type: str):
    """Send email notification for ticket events"""
    # TODO: Implement actual email sending (e.g., using SendGrid, AWS SES, etc.)
    print(f"📧 Sending {notification_type} email to {recipient}")
    print(f"   Ticket: #{ticket.ticket_number}")
    print(f"   Subject: {ticket.subject}")


@router.post("/tickets")
def create_ticket(
    ticket_data: TicketCreate,
    background_tasks: BackgroundTasks,  # ✅ For async email sending
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new support ticket"""
    
    # ✅ Validate order_id if provided
    order = None
    if ticket_data.order_id:
        order = db.query(Order).filter(
            Order.id == ticket_data.order_id,
            Order.user_id == current_user.id
        ).first()
        
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
    
    # Generate unique ticket number
    ticket_number = f"TKT-{random.randint(100000, 999999)}"
    
    # Create ticket
    ticket = SupportTicket(
        ticket_number=ticket_number,
        user_id=current_user.id,
        order_id=ticket_data.order_id,  # ✅ Link to order
        subject=ticket_data.subject,
        category=ticket_data.category,
        description=ticket_data.description,
        priority=TicketPriority(ticket_data.priority),
        status=TicketStatus.OPEN
    )
    
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    
    # Create initial message
    initial_message = TicketMessage(
        ticket_id=ticket.id,
        sender_id=current_user.id,
        sender_type="user",
        message=ticket_data.description
    )
    
    db.add(initial_message)
    db.commit()
    
    # ✅ Send email notification to admin (background task)
    background_tasks.add_task(
        send_ticket_notification_email,
        ticket,
        "admin@gbaki.com",  # TODO: Get from settings
        "new_ticket"
    )
    
    return {
        "message": "Support ticket created successfully",
        "ticket": {
            "id": ticket.id,
            "ticket_number": ticket.ticket_number,
            "subject": ticket.subject,
            "status": ticket.status.value,
            "category": ticket.category,
            "order_id": ticket.order_id,
            "created_at": ticket.created_at.isoformat()
        }
    }


@router.get("/tickets")
def list_tickets(
    status: Optional[str] = None,
    order_id: Optional[str] = None,  # ✅ Filter by order
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List user's support tickets"""
    
    query = db.query(SupportTicket).filter(SupportTicket.user_id == current_user.id)
    
    if status:
        query = query.filter(SupportTicket.status == TicketStatus(status))
    
    # ✅ Filter by order
    if order_id:
        query = query.filter(SupportTicket.order_id == order_id)
    
    tickets = query.order_by(SupportTicket.created_at.desc()).all()
    
    return {
        "tickets": [
            {
                "id": ticket.id,
                "ticket_number": ticket.ticket_number,
                "subject": ticket.subject,
                "status": ticket.status.value,
                "category": ticket.category,
                "priority": ticket.priority.value,
                "order_id": ticket.order_id,
                "created_at": ticket.created_at.isoformat(),
                "updated_at": ticket.updated_at.isoformat() if ticket.updated_at else None,
                "message_count": len(ticket.messages)
            }
            for ticket in tickets
        ]
    }


@router.get("/tickets/{ticket_id}")
def get_ticket(
    ticket_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get ticket details with messages"""
    
    ticket = db.query(SupportTicket).filter(
        SupportTicket.id == ticket_id,
        SupportTicket.user_id == current_user.id
    ).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    return {
        "id": ticket.id,
        "ticket_number": ticket.ticket_number,
        "subject": ticket.subject,
        "status": ticket.status.value,
        "category": ticket.category,
        "priority": ticket.priority.value,
        "description": ticket.description,
        "order_id": ticket.order_id,
        "created_at": ticket.created_at.isoformat(),
        "updated_at": ticket.updated_at.isoformat() if ticket.updated_at else None,
        "messages": [
            {
                "id": msg.id,
                "sender_type": msg.sender_type,
                "message": msg.message,
                "created_at": msg.created_at.isoformat(),
                "sender": {
                    "id": msg.sender.id,
                    "name": f"{msg.sender.first_name} {msg.sender.last_name}" if msg.sender.first_name else msg.sender.email
                }
            }
            for msg in sorted(ticket.messages, key=lambda x: x.created_at)
        ]
    }


@router.post("/tickets/{ticket_id}/messages")
def add_message(
    ticket_id: str,
    message_data: MessageCreate,
    background_tasks: BackgroundTasks,  # ✅ For async email
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add a message to a ticket"""
    
    ticket = db.query(SupportTicket).filter(
        SupportTicket.id == ticket_id,
        SupportTicket.user_id == current_user.id
    ).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    # Create message
    message = TicketMessage(
        ticket_id=ticket.id,
        sender_id=current_user.id,
        sender_type="user",
        message=message_data.message
    )
    
    db.add(message)
    
    # ✅ Update ticket status and timestamp
    if ticket.status == TicketStatus.WAITING_ON_CUSTOMER:
        ticket.status = TicketStatus.IN_PROGRESS
    
    ticket.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(message)
    
    # ✅ Send notification to assigned admin
    if ticket.assigned_to:
        background_tasks.add_task(
            send_ticket_notification_email,
            ticket,
            "admin@gbaki.com",  # TODO: Get assigned admin email
            "new_message"
        )
    
    return {
        "message": "Message added successfully",
        "ticket_message": {
            "id": message.id,
            "message": message.message,
            "created_at": message.created_at.isoformat()
        }
    }


# ✅ NEW: Admin reply endpoint
@router.post("/tickets/{ticket_id}/reply")
def admin_reply(
    ticket_id: str,
    message_data: MessageCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Admin: Reply to a ticket"""
    
    # TODO: Add admin check
    # if not current_user.is_admin:
    #     raise HTTPException(status_code=403, detail="Admin access required")
    
    ticket = db.query(SupportTicket).filter(SupportTicket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    # Create admin message
    message = TicketMessage(
        ticket_id=ticket.id,
        sender_id=current_user.id,
        sender_type="admin",
        message=message_data.message
    )
    
    db.add(message)
    
    # ✅ Update ticket status
    if ticket.status == TicketStatus.OPEN:
        ticket.status = TicketStatus.IN_PROGRESS
        
        # Calculate response time (first admin reply)
        if not ticket.response_time:
            response_minutes = int((datetime.utcnow() - ticket.created_at).total_seconds() / 60)
            ticket.response_time = response_minutes
    
    ticket.status = TicketStatus.WAITING_ON_CUSTOMER
    ticket.updated_at = datetime.utcnow()
    
    # Assign to current admin if not assigned
    if not ticket.assigned_to:
        ticket.assigned_to = current_user.id
    
    db.commit()
    
    # ✅ Send email notification to user
    background_tasks.add_task(
        send_ticket_notification_email,
        ticket,
        ticket.user.email,
        "admin_reply"
    )
    
    return {
        "message": "Reply sent successfully",
        "ticket": {
            "id": ticket.id,
            "status": ticket.status.value
        }
    }


@router.patch("/tickets/{ticket_id}/status")
def update_ticket_status(
    ticket_id: str,
    status: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update ticket status"""
    
    # User can only close their own tickets
    ticket = db.query(SupportTicket).filter(
        SupportTicket.id == ticket_id,
        SupportTicket.user_id == current_user.id
    ).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    # Validate status
    try:
        new_status = TicketStatus(status)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    # Users can only mark as resolved or closed
    if new_status not in [TicketStatus.RESOLVED, TicketStatus.CLOSED]:
        raise HTTPException(status_code=403, detail="You can only mark tickets as resolved or closed")
    
    old_status = ticket.status
    ticket.status = new_status
    ticket.updated_at = datetime.utcnow()
    
    if new_status == TicketStatus.RESOLVED:
        ticket.resolved_at = datetime.utcnow()
        # Calculate resolution time
        resolution_minutes = int((ticket.resolved_at - ticket.created_at).total_seconds() / 60)
        ticket.resolution_time = resolution_minutes
    elif new_status == TicketStatus.CLOSED:
        ticket.closed_at = datetime.utcnow()
    
    db.commit()
    
    return {
        "message": f"Ticket status updated from {old_status.value} to {new_status.value}",
        "ticket": {
            "id": ticket.id,
            "status": ticket.status.value
        }
    }
```

---

## **STEP 5: Register Router**

**File: `apps/backend/app/api/v1/router.py`**

Add the support router:

```python
from app.api.v1 import auth, users, orders, documents, support, onboarding

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(support.router, prefix="/support", tags=["support"])  # ✅ ADD THIS
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["onboarding"])
```

---

## **STEP 6: Create Database Migration**

```bash
cd apps/backend
alembic revision --autogenerate -m "Add support tickets with order linking"
alembic upgrade head
```

---

## **STEP 7: Email Notification Implementation**

Replace the placeholder `send_ticket_notification_email` function with your actual email service:

**Example using SendGrid:**

```python
import sendgrid
from sendgrid.helpers.mail import Mail

def send_ticket_notification_email(ticket: SupportTicket, recipient: str, notification_type: str):
    """Send email notification for ticket events"""
    sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
    
    subject_map = {
        "new_ticket": f"New Support Ticket: {ticket.ticket_number}",
        "new_message": f"New Message on Ticket: {ticket.ticket_number}",
        "admin_reply": f"Admin Reply on Ticket: {ticket.ticket_number}"
    }
    
    message = Mail(
        from_email="support@gbaki.com",
        to_emails=recipient,
        subject=subject_map.get(notification_type, "Support Ticket Update"),
        html_content=f"""
        <h2>{subject_map.get(notification_type)}</h2>
        <p>Ticket: {ticket.ticket_number}</p>
        <p>Subject: {ticket.subject}</p>
        <p><a href="{settings.FRONTEND_URL}/dashboard/support/{ticket.id}">View Ticket</a></p>
        """
    )
    
    sg.send(message)
```

---

## ✅ **IMPLEMENTATION CHECKLIST**

- [ ] Create `support_ticket.py` model file
- [ ] Update `order.py` model with relationship
- [ ] Update `user.py` model with relationship
- [ ] Create `support.py` API router
- [ ] Register router in `router.py`
- [ ] Run database migration
- [ ] Implement email notification service
- [ ] Test ticket creation with order_id
- [ ] Test admin reply functionality
- [ ] Test status transitions
- [ ] Test email notifications

---

## **API ENDPOINTS SUMMARY**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/support/tickets` | Create new ticket (with optional `order_id`) |
| GET | `/support/tickets` | List tickets (filter by `status` or `order_id`) |
| GET | `/support/tickets/{id}` | Get ticket details with messages |
| POST | `/support/tickets/{id}/messages` | Add user message |
| POST | `/support/tickets/{id}/reply` | Admin reply (sends email to user) |
| PATCH | `/support/tickets/{id}/status` | Update ticket status |

---

**✅ Frontend is ready! Backend implementation guide provided above.**

