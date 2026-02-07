#!/usr/bin/env python3
"""Script to update user role in the database"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from app.config import settings

def update_user_role(email: str, role: str = 'admin'):
    """Update user role in database"""
    # Create database connection
    engine = create_engine(settings.DATABASE_URL)
    
    # Validate role
    valid_roles = ['USER', 'ADMIN', 'SUPER_ADMIN']
    if role.upper() not in valid_roles:
        print(f"Error: Invalid role. Must be one of: {', '.join(valid_roles)}")
        return False
    
    role_upper = role.upper()
    
    try:
        with engine.connect() as conn:
            # Check if user exists
            result = conn.execute(
                text("SELECT id, email, role FROM users WHERE email = :email"),
                {"email": email}
            )
            user = result.fetchone()
            
            if not user:
                print(f"Error: User with email '{email}' not found")
                return False
            
            print(f"Found user: {user[1]} (current role: {user[2] or 'NULL'})")
            
            # Update role
            conn.execute(
                text("UPDATE users SET role = :role WHERE email = :email"),
                {"role": role_upper, "email": email}
            )
            conn.commit()
            
            print(f"✅ Successfully updated user '{email}' role to '{role_upper}'")
            return True
            
    except Exception as e:
        print(f"Error updating user role: {str(e)}")
        return False
    finally:
        engine.dispose()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python update_user_role.py <email> [role]")
        print("Example: python update_user_role.py rodadebigni@icloud.com admin")
        sys.exit(1)
    
    email = sys.argv[1]
    role = sys.argv[2] if len(sys.argv) > 2 else 'admin'
    
    success = update_user_role(email, role)
    sys.exit(0 if success else 1)

