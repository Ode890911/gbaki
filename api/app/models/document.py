from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid


class Document(Base):
    __tablename__ = "documents"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # File info
    name = Column(String(255), nullable=False)
    document_type = Column(String(100), nullable=False, index=True)
    file_url = Column(Text, nullable=False)
    file_path = Column(Text)  # Storage path
    file_size = Column(Integer)  # Bytes
    mime_type = Column(String(100))
    
    # Status
    is_verified = Column(Boolean, default=False)
    is_public = Column(Boolean, default=False)
    
    # Metadata
    description = Column(Text)
    
    # Timestamps
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    verified_at = Column(DateTime(timezone=True))
    verified_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # Relationships
    order = relationship("Order", backref="documents")
    user = relationship("User", foreign_keys=[user_id], backref="documents")
    uploader = relationship("User", foreign_keys=[uploaded_by])
    verifier = relationship("User", foreign_keys=[verified_by])
    
    def __repr__(self):
        return f"<Document {self.name}>"

