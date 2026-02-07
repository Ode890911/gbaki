from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class DocumentBase(BaseModel):
    name: str
    document_type: str
    description: Optional[str] = None


class DocumentCreate(DocumentBase):
    order_id: UUID


class DocumentResponse(DocumentBase):
    id: UUID
    order_id: UUID
    user_id: UUID
    file_url: str
    file_size: Optional[int]
    mime_type: Optional[str]
    is_verified: bool
    uploaded_at: datetime
    
    class Config:
        from_attributes = True

