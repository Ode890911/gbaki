import re
from typing import Optional


def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_phone(phone: str) -> bool:
    """Validate US phone number format"""
    # Remove all non-digit characters
    digits = re.sub(r'\D', '', phone)
    # Check if it's 10 or 11 digits (with or without country code)
    return len(digits) in [10, 11] and digits.isdigit()


def validate_ein(ein: str) -> bool:
    """Validate EIN format (XX-XXXXXXX)"""
    pattern = r'^\d{2}-\d{7}$'
    return bool(re.match(pattern, ein))


def sanitize_filename(filename: str) -> str:
    """Sanitize filename for safe storage"""
    # Remove path components
    filename = filename.split('/')[-1].split('\\')[-1]
    # Remove special characters
    filename = re.sub(r'[^\w\s.-]', '', filename)
    # Replace spaces with underscores
    filename = re.sub(r'\s+', '_', filename)
    return filename[:255]  # Limit length

