#!/usr/bin/env python3
"""Script to reset user password in the database"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from app.config import settings
from app.core.security import get_password_hash

def reset_user_password(email: str, new_password: str):
    """Reset user password in database"""
    # Create database connection
    engine = create_engine(settings.DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            # Check if user exists
            result = conn.execute(
                text("SELECT id, email FROM users WHERE email = :email"),
                {"email": email}
            )
            user = result.fetchone()
            
            if not user:
                print(f"Error: User with email '{email}' not found")
                return False
            
            print(f"Found user: {user[1]}")
            
            # Hash the new password
            hashed_password = get_password_hash(new_password)
            
            # Update password
            conn.execute(
                text("UPDATE users SET password_hash = :password_hash WHERE email = :email"),
                {"password_hash": hashed_password, "email": email}
            )
            conn.commit()
            
            print(f"✅ Successfully reset password for '{email}'")
            print(f"New password: {new_password}")
            return True
            
    except Exception as e:
        print(f"Error resetting password: {str(e)}")
        return False
    finally:
        engine.dispose()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python reset_user_password.py <email> <new_password>")
        print("Example: python reset_user_password.py rodadebigni@icloud.com MyNewPassword123")
        sys.exit(1)
    
    email = sys.argv[1]
    new_password = sys.argv[2]
    
    if len(new_password) < 8:
        print("Error: Password must be at least 8 characters long")
        sys.exit(1)
    
    success = reset_user_password(email, new_password)
    sys.exit(0 if success else 1)


