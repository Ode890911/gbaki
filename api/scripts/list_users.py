#!/usr/bin/env python3
"""Script to list all users in the database"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from app.config import settings

def list_users():
    """List all users in database"""
    # Create database connection
    engine = create_engine(settings.DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            # Get all users
            result = conn.execute(
                text("SELECT id, email, first_name, last_name, role, is_superuser, created_at FROM users ORDER BY created_at DESC")
            )
            users = result.fetchall()
            
            if not users:
                print("No users found in database")
                return
            
            print(f"\nFound {len(users)} user(s):\n")
            print(f"{'Email':<40} {'Name':<30} {'Role':<15} {'Superuser':<10}")
            print("-" * 95)
            
            for user in users:
                user_id, email, first_name, last_name, role, is_superuser, created_at = user
                name = f"{first_name or ''} {last_name or ''}".strip() or 'N/A'
                role_str = role or 'NULL'
                superuser_str = 'Yes' if is_superuser else 'No'
                print(f"{email:<40} {name:<30} {role_str:<15} {superuser_str:<10}")
            
            print()
            
    except Exception as e:
        print(f"Error listing users: {str(e)}")
    finally:
        engine.dispose()

if __name__ == "__main__":
    list_users()


