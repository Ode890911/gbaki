"""
Pagination schemas for consistent API responses
"""
from pydantic import BaseModel
from typing import Generic, TypeVar, List

T = TypeVar('T')


class PaginatedResponse(BaseModel, Generic[T]):
    """
    Generic paginated response schema
    """
    data: List[T]
    page: int
    per_page: int
    total: int
    total_pages: int
    has_next: bool
    has_prev: bool
    
    class Config:
        from_attributes = True


def paginate(query, page: int = 1, per_page: int = 20):
    """
    Helper function to paginate a SQLAlchemy query
    
    Args:
        query: SQLAlchemy query object
        page: Page number (1-indexed)
        per_page: Items per page
        
    Returns:
        Tuple of (items, total_count)
    """
    # Get total count
    total = query.count()
    
    # Calculate offset
    offset = (page - 1) * per_page
    
    # Get paginated items
    items = query.offset(offset).limit(per_page).all()
    
    return items, total


def create_paginated_response(
    items: List[T],
    total: int,
    page: int,
    per_page: int
) -> dict:
    """
    Create a paginated response dictionary
    
    Args:
        items: List of items for current page
        total: Total number of items
        page: Current page number
        per_page: Items per page
        
    Returns:
        Dictionary with pagination metadata
    """
    total_pages = (total + per_page - 1) // per_page  # Ceiling division
    
    return {
        "data": items,
        "page": page,
        "per_page": per_page,
        "total": total,
        "total_pages": total_pages,
        "has_next": page < total_pages,
        "has_prev": page > 1
    }
