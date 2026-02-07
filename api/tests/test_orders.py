import pytest
from fastapi import status
from uuid import uuid4


def test_create_order(client, auth_headers):
    """Test creating an order"""
    response = client.post(
        "/api/v1/orders/",
        json={
            "package_type": "starter"
        },
        headers=auth_headers
    )
    
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert "order_number" in data
    assert data["package_type"] == "starter"
    assert data["status"] == "pending"
    assert data["progress"] == 0


def test_create_order_invalid_package(client, auth_headers):
    """Test creating order with invalid package type"""
    response = client.post(
        "/api/v1/orders/",
        json={
            "package_type": "invalid"
        },
        headers=auth_headers
    )
    
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_list_orders(client, auth_headers):
    """Test listing user orders"""
    # Create an order first
    client.post(
        "/api/v1/orders/",
        json={"package_type": "starter"},
        headers=auth_headers
    )
    
    response = client.get(
        "/api/v1/orders/",
        headers=auth_headers
    )
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0


def test_get_order(client, auth_headers):
    """Test getting a specific order"""
    # Create an order
    create_response = client.post(
        "/api/v1/orders/",
        json={"package_type": "starter"},
        headers=auth_headers
    )
    order_id = create_response.json()["id"]
    
    # Get the order
    response = client.get(
        f"/api/v1/orders/{order_id}",
        headers=auth_headers
    )
    
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == order_id


def test_get_order_not_found(client, auth_headers):
    """Test getting non-existent order"""
    fake_id = str(uuid4())
    response = client.get(
        f"/api/v1/orders/{fake_id}",
        headers=auth_headers
    )
    
    assert response.status_code == status.HTTP_404_NOT_FOUND

