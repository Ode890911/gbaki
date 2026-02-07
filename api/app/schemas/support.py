from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class TicketMessageSchema(BaseModel):
    message: str
    is_staff: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class TicketCreate(BaseModel):
    subject: str
    category: str
    message: str
    order_id: Optional[UUID] = None


class TicketUpdate(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None


class TicketResponse(BaseModel):
    id: UUID
    ticket_number: str
    user_id: UUID
    subject: str
    category: str
    status: str
    priority: str
    created_at: datetime
    updated_at: Optional[datetime]
    messages: List[TicketMessageSchema] = []
    
    class Config:
        from_attributes = True


class TicketMessageCreate(BaseModel):
    ticket_id: UUID
    message: str

