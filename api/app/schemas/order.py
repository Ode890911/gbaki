from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from decimal import Decimal


class OrderServiceSchema(BaseModel):
    service_name: str
    service_type: str
    status: str
    
    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    package_type: str = Field(..., pattern="^(starter|growth|premium)$")


class OrderCreate(OrderBase):
    pass


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    progress: Optional[int] = Field(None, ge=0, le=100)
    estimated_completion: Optional[datetime] = None


class OrderResponse(OrderBase):
    id: UUID
    order_number: str
    user_id: UUID
    status: str
    progress: int
    amount: Decimal
    currency: str
    payment_status: str
    created_at: datetime
    updated_at: Optional[datetime]
    estimated_completion: Optional[datetime]
    services: List[OrderServiceSchema] = []
    
    class Config:
        from_attributes = True

