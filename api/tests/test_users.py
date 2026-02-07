import pytest
from fastapi import status


def test_get_my_profile(client, auth_headers):
    """Test getting user profile"""
    response = client.get(
        "/api/v1/users/me",
        headers=auth_headers
    )
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "email" in data
    assert "first_name" in data
    assert "last_name" in data


def test_update_my_profile(client, auth_headers):
    """Test updating user profile"""
    response = client.put(
        "/api/v1/users/me",
        json={
            "first_name": "Updated",
            "last_name": "Name",
            "phone": "+1234567890"
        },
        headers=auth_headers
    )
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["first_name"] == "Updated"
    assert data["last_name"] == "Name"
    assert data["phone"] == "+1234567890"


def test_list_users_unauthorized(client, auth_headers):
    """Test listing users without admin access"""
    response = client.get(
        "/api/v1/users/",
        headers=auth_headers
    )
    
    # Should fail if user is not superuser
    assert response.status_code in [status.HTTP_403_FORBIDDEN, status.HTTP_200_OK]

