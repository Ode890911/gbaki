import pytest
from fastapi import status


def test_register_user(client):
    """Test user registration"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "newuser@example.com",
            "password": "securepassword123",
            "first_name": "New",
            "last_name": "User"
        }
    )
    
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert "message" in data
    assert "user" in data
    assert data["user"]["email"] == "newuser@example.com"


def test_register_duplicate_email(client, test_user):
    """Test registration with duplicate email"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": test_user.email,
            "password": "password123",
            "first_name": "Test",
            "last_name": "User"
        }
    )
    
    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_login_success(client, test_user):
    """Test successful login"""
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": test_user.email,
            "password": "testpassword123"
        }
    )
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_credentials(client):
    """Test login with invalid credentials"""
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "nonexistent@example.com",
            "password": "wrongpassword"
        }
    )
    
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_current_user(client, auth_headers):
    """Test getting current user info"""
    response = client.get(
        "/api/v1/auth/me",
        headers=auth_headers
    )
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "email" in data
    assert "id" in data


def test_get_current_user_unauthorized(client):
    """Test getting current user without auth"""
    response = client.get("/api/v1/auth/me")
    
    assert response.status_code == status.HTTP_403_FORBIDDEN

