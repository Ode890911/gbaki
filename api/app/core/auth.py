from supabase import create_client, Client
from app.config import settings
from typing import Optional
import httpx


class SupabaseAuth:
    def __init__(self):
        self.client: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )
    
    async def sign_up(self, email: str, password: str, metadata: dict = None):
        """Register new user with Supabase Auth"""
        try:
            response = self.client.auth.sign_up({
                "email": email,
                "password": password,
                "options": {
                    "data": metadata or {}
                }
            })
            return response
        except Exception as e:
            raise Exception(f"Signup failed: {str(e)}")
    
    async def sign_in(self, email: str, password: str):
        """Sign in user with Supabase Auth"""
        try:
            response = self.client.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            return response
        except Exception as e:
            raise Exception(f"Sign in failed: {str(e)}")
    
    async def sign_out(self, access_token: str):
        """Sign out user"""
        try:
            self.client.auth.sign_out()
        except Exception as e:
            raise Exception(f"Sign out failed: {str(e)}")
    
    async def get_user(self, access_token: str):
        """Get user from access token"""
        try:
            response = self.client.auth.get_user(access_token)
            return response
        except Exception as e:
            raise Exception(f"Get user failed: {str(e)}")
    
    async def reset_password(self, email: str):
        """Send password reset email"""
        try:
            response = self.client.auth.reset_password_email(email)
            return response
        except Exception as e:
            raise Exception(f"Password reset failed: {str(e)}")
    
    async def verify_email(self, token: str):
        """Verify email with token"""
        try:
            response = self.client.auth.verify_otp({
                "token": token,
                "type": "email"
            })
            return response
        except Exception as e:
            raise Exception(f"Email verification failed: {str(e)}")


# Singleton instance
supabase_auth = SupabaseAuth()

