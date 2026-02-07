"""
Audit Logging Utility
Provides functions to log admin actions for security and compliance
"""
from sqlalchemy.orm import Session
from fastapi import Request
from app.models.audit_log import AuditLog
from app.models.user import User
from typing import Any, Dict, Optional
import json


def log_admin_action(
    db: Session,
    admin: User,
    action: str,
    entity_type: str,
    entity_id: str,
    old_value: Optional[Dict[str, Any]] = None,
    new_value: Optional[Dict[str, Any]] = None,
    description: Optional[str] = None,
    request: Optional[Request] = None,
    metadata: Optional[Dict[str, Any]] = None
) -> AuditLog:
    """
    Log an admin action to the audit trail
    
    Args:
        db: Database session
        admin: The admin user performing the action
        action: Action type (e.g., "order_milestone_updated", "user_role_changed")
        entity_type: Type of entity affected (e.g., "order", "user", "document")
        entity_id: ID of the affected entity
        old_value: Previous state of the entity (optional)
        new_value: New state of the entity (optional)
        description: Human-readable description (optional)
        request: FastAPI request object for IP/UA capture (optional)
        metadata: Additional context data (optional)
    
    Returns:
        The created AuditLog entry
    """
    # Extract request metadata
    ip_address = None
    user_agent = None
    if request:
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
    
    # Create audit log entry
    audit_log = AuditLog(
        admin_id=admin.id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        old_value=old_value,
        new_value=new_value,
        description=description,
        ip_address=ip_address,
        user_agent=user_agent,
        metadata=metadata
    )
    
    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)
    
    return audit_log


def get_audit_logs(
    db: Session,
    entity_type: Optional[str] = None,
    entity_id: Optional[str] = None,
    admin_id: Optional[str] = None,
    action: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
) -> list[AuditLog]:
    """
    Retrieve audit logs with optional filtering
    
    Args:
        db: Database session
        entity_type: Filter by entity type (optional)
        entity_id: Filter by specific entity ID (optional)
        admin_id: Filter by admin user (optional)
        action: Filter by action type (optional)
        limit: Maximum number of results
        offset: Number of results to skip
    
    Returns:
        List of AuditLog entries
    """
    query = db.query(AuditLog)
    
    if entity_type:
        query = query.filter(AuditLog.entity_type == entity_type)
    
    if entity_id:
        query = query.filter(AuditLog.entity_id == entity_id)
    
    if admin_id:
        query = query.filter(AuditLog.admin_id == admin_id)
    
    if action:
        query = query.filter(AuditLog.action == action)
    
    query = query.order_by(AuditLog.created_at.desc())
    query = query.offset(offset).limit(limit)
    
    return query.all()


# Common action constants for consistency
class AuditActions:
    # Order actions
    ORDER_CREATED = "order_created"
    ORDER_STATUS_UPDATED = "order_status_updated"
    ORDER_MILESTONE_UPDATED = "order_milestone_updated"
    ORDER_ASSIGNED = "order_assigned"
    ORDER_CANCELLED = "order_cancelled"
    
    # Document actions
    DOCUMENT_APPROVED = "document_approved"
    DOCUMENT_REJECTED = "document_rejected"
    DOCUMENT_UPLOADED = "document_uploaded"
    DOCUMENT_DELETED = "document_deleted"
    
    # User actions
    USER_ROLE_CHANGED = "user_role_changed"
    USER_ACTIVATED = "user_activated"
    USER_DEACTIVATED = "user_deactivated"
    USER_IMPERSONATED = "user_impersonated"
    USER_PASSWORD_RESET = "user_password_reset"
    
    # Ticket actions
    TICKET_STATUS_UPDATED = "ticket_status_updated"
    TICKET_PRIORITY_UPDATED = "ticket_priority_updated"
    TICKET_ASSIGNED = "ticket_assigned"
    TICKET_REPLIED = "ticket_replied"
    TICKET_NOTE_ADDED = "ticket_note_added"
    
    # System actions
    SETTINGS_UPDATED = "settings_updated"
    NOTIFICATION_SENT = "notification_sent"
    EXPORT_GENERATED = "export_generated"
