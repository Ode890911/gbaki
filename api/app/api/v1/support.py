from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.user import User
from app.models.support import SupportTicket, TicketMessage
from app.models.notification import NotificationType, NotificationPriority
from app.schemas.support import (
    TicketCreate,
    TicketResponse,
    TicketUpdate,
    TicketMessageCreate
)
from app.api.deps import get_current_active_user, get_current_superuser
from app.services.notification_service import NotificationService
from app.core.email import EmailService
from uuid import UUID
import random
import string
from datetime import datetime

router = APIRouter()


def generate_ticket_number() -> str:
    """Generate unique ticket number"""
    timestamp = datetime.now().strftime("%Y%m%d")
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"TKT-{timestamp}-{random_str}"


@router.post("/", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
async def create_ticket(
    ticket_data: TicketCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create support ticket"""
    
    # Generate ticket number
    ticket_number = generate_ticket_number()
    
    # Create ticket
    db_ticket = SupportTicket(
        ticket_number=ticket_number,
        user_id=current_user.id,
        order_id=ticket_data.order_id,
        subject=ticket_data.subject,
        category=ticket_data.category,
        status="open",
        priority="normal"
    )
    
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    
    # Add initial message
    db_message = TicketMessage(
        ticket_id=db_ticket.id,
        user_id=current_user.id,
        message=ticket_data.message,
        is_staff=False
    )
    
    db.add(db_message)
    db.commit()
    db.refresh(db_ticket)
    
    # TODO: Send notification to support team
    # TODO: Send confirmation email to user
    
    return TicketResponse.model_validate(db_ticket)


@router.get("/", response_model=List[TicketResponse])
async def list_tickets(
    status_filter: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """List user's tickets"""
    query = db.query(SupportTicket).filter(SupportTicket.user_id == current_user.id)
    
    if status_filter:
        query = query.filter(SupportTicket.status == status_filter)
    
    tickets = query.order_by(SupportTicket.created_at.desc()).offset(skip).limit(limit).all()
    return tickets


@router.get("/{ticket_id}", response_model=TicketResponse)
async def get_ticket(
    ticket_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get ticket by ID"""
    ticket = db.query(SupportTicket).filter(
        SupportTicket.id == ticket_id,
        SupportTicket.user_id == current_user.id
    ).first()
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    return TicketResponse.model_validate(ticket)


@router.post("/{ticket_id}/messages", status_code=status.HTTP_201_CREATED)
async def add_ticket_message(
    ticket_id: UUID,
    message: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Add message to ticket"""
    ticket = db.query(SupportTicket).filter(
        SupportTicket.id == ticket_id,
        SupportTicket.user_id == current_user.id
    ).first()
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    if ticket.status == "closed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot add message to closed ticket"
        )
    
    # Add message
    db_message = TicketMessage(
        ticket_id=ticket_id,
        user_id=current_user.id,
        message=message,
        is_staff=False
    )
    
    db.add(db_message)
    
    # Update ticket timestamp
    ticket.updated_at = datetime.utcnow()
    
    db.commit()
    
    # TODO: Send notification to support team (if user message)
    
    return {"message": "Message added successfully"}


@router.post("/{ticket_id}/reply")
async def admin_reply(
    ticket_id: UUID,
    message: str,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_superuser),
    db: Session = Depends(get_db)
):
    """Admin: Reply to a ticket"""
    
    ticket = db.query(SupportTicket).filter(SupportTicket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    # Create admin message
    db_message = TicketMessage(
        ticket_id=ticket.id,
        user_id=current_user.id,
        message=message,
        is_staff=True
    )
    
    db.add(db_message)
    
    # Update ticket status
    if ticket.status == "open":
        ticket.status = "in_progress"
    
    # Assign to current admin if not assigned
    if not ticket.assigned_to:
        ticket.assigned_to = current_user.id
    
    ticket.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(ticket)
    
    # ✅ CREATE NOTIFICATION AND SEND EMAIL
    NotificationService.notify_support_reply(db, ticket)
    user_name = f"{ticket.user.first_name} {ticket.user.last_name}".strip() if ticket.user.first_name else ticket.user.email
    background_tasks.add_task(
        EmailService.send_support_reply_email,
        ticket.user.email,
        user_name,
        ticket.ticket_number,
        ticket.subject,
        str(ticket.id)
    )
    
    return {
        "message": "Reply sent successfully",
        "ticket": TicketResponse.model_validate(ticket)
    }


@router.patch("/{ticket_id}/status")
async def update_ticket_status(
    ticket_id: UUID,
    status: str = Body(..., embed=True),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update ticket status (user can close their own tickets)"""
    ticket = db.query(SupportTicket).filter(
        SupportTicket.id == ticket_id,
        SupportTicket.user_id == current_user.id
    ).first()
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    # Validate status
    valid_statuses = ["open", "in_progress", "resolved", "closed"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    # Users can only close their own tickets, not reopen them
    if ticket.status == "closed" and status != "closed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot change status of a closed ticket"
        )
    
    # Update status
    old_status = ticket.status
    ticket.status = status
    
    # If closing ticket, set resolved_at
    if status == "closed" and not ticket.resolved_at:
        ticket.resolved_at = datetime.utcnow()
    
    ticket.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(ticket)
    
    # ✅ CREATE NOTIFICATION if status changed to resolved/closed
    if status in ["resolved", "closed"] and old_status != status:
        NotificationService.create_notification(
            db=db,
            user_id=ticket.user_id,
            notification_type=NotificationType.SUPPORT_RESOLVED.value,
            title="Support Ticket Resolved",
            message=f"Your ticket #{ticket.ticket_number} has been {status}.",
            priority=NotificationPriority.MEDIUM.value,
            ticket_id=ticket.id,
            action_url=f"/dashboard/support/{ticket.id}",
            action_text="View Ticket"
        )
    
    return {
        "message": "Ticket status updated",
        "ticket": TicketResponse.model_validate(ticket)
    }


@router.put("/{ticket_id}", response_model=TicketResponse)
async def update_ticket(
    ticket_id: UUID,
    ticket_update: TicketUpdate,
    current_user: User = Depends(get_current_superuser),
    db: Session = Depends(get_db)
):
    """Update ticket (admin only)"""
    ticket = db.query(SupportTicket).filter(SupportTicket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    # Update fields
    update_data = ticket_update.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(ticket, field, value)
    
    # If closing ticket, set resolved_at
    if ticket_update.status == "closed" and not ticket.resolved_at:
        ticket.resolved_at = datetime.utcnow()
    
    db.commit()
    db.refresh(ticket)
    
    # ✅ CREATE NOTIFICATION if status changed to resolved/closed
    if ticket_update.status in ["resolved", "closed"]:
        NotificationService.create_notification(
            db=db,
            user_id=ticket.user_id,
            notification_type=NotificationType.SUPPORT_RESOLVED.value,
            title="Support Ticket Resolved",
            message=f"Your ticket #{ticket.ticket_number} has been {ticket_update.status}.",
            priority=NotificationPriority.MEDIUM.value,
            ticket_id=ticket.id,
            action_url=f"/dashboard/support/{ticket.id}",
            action_text="View Ticket"
        )
    
    return TicketResponse.model_validate(ticket)
