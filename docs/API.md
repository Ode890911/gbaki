# Gbaki Digital Solutions - Complete API Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Rate Limiting](#rate-limiting)
5. [Error Handling](#error-handling)
6. [Endpoints](#endpoints)
   - [Authentication](#authentication-endpoints)
   - [Users](#users-endpoints)
   - [Orders](#orders-endpoints)
   - [Documents](#documents-endpoints)
   - [Support](#support-endpoints)
   - [Admin](#admin-endpoints)
7. [Webhooks](#webhooks)
8. [Data Models](#data-models)

---

## Overview

The Gbaki Digital Solutions API is a RESTful API built with FastAPI that provides endpoints for managing business incubator services for African immigrants. The API uses JWT tokens for authentication and follows RESTful conventions.

**API Version:** `v1`  
**Content-Type:** `application/json`  
**Response Format:** JSON

---

## Base URL

- **Development:** `http://localhost:8000`
- **Production:** `https://api.gbakidigital.com`
- **API Base Path:** `/api/v1`

**Interactive Documentation:**
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Most endpoints require a valid access token in the Authorization header.

### Getting an Access Token

1. **Register** a new user account
2. **Login** with your credentials to receive access and refresh tokens
3. **Include** the token in subsequent requests

### Token Format

```
Authorization: Bearer <access_token>
```

### Token Expiration

- **Access Token:** 30 minutes (default)
- **Refresh Token:** 7 days (default)

---

## Rate Limiting

- **Per Minute:** 60 requests
- **Per Hour:** 1000 requests

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Time when limit resets

---

## Error Handling

All errors follow a consistent format:

```json
{
  "detail": "Error message description",
  "status_code": 400
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `422` | Validation Error |
| `500` | Internal Server Error |

### Validation Errors

When validation fails (422), the response includes field-level errors:

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## Endpoints

### Authentication Endpoints

#### Register User

Create a new user account.

**Endpoint:** `POST /api/v1/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St, City, State 12345"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1234567890",
    "address": "123 Main St, City, State 12345",
    "email_verified": false,
    "is_active": true,
    "created_at": "2025-12-29T15:00:00Z"
  }
}
```

**Errors:**
- `400` - Email already registered
- `422` - Validation error

---

#### Login

Authenticate and receive access tokens.

**Endpoint:** `POST /api/v1/auth/login`

**Request Body (Form Data):**
```
username: user@example.com
password: securepassword123
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "email_verified": true,
    "is_active": true,
    "created_at": "2025-12-29T15:00:00Z"
  }
}
```

**Errors:**
- `401` - Invalid email or password

---

#### Refresh Token

Get a new access token using a refresh token.

**Endpoint:** `POST /api/v1/auth/refresh`

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Errors:**
- `401` - Invalid refresh token

---

#### Get Current User

Get the authenticated user's information.

**Endpoint:** `GET /api/v1/auth/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St, City, State 12345",
  "email_verified": true,
  "is_active": true,
  "created_at": "2025-12-29T15:00:00Z"
}
```

**Errors:**
- `401` - Unauthorized
- `403` - User account is inactive

---

#### Logout

Logout the current user.

**Endpoint:** `POST /api/v1/auth/logout`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "message": "Logged out successfully"
}
```

---

### Users Endpoints

#### Get My Profile

Get the current user's complete profile.

**Endpoint:** `GET /api/v1/users/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St, City, State 12345",
  "email_verified": true,
  "is_active": true,
  "created_at": "2025-12-29T15:00:00Z",
  "last_login": "2025-12-29T16:00:00Z",
  "marketing_consent": true
}
```

---

#### Update My Profile

Update the current user's profile information.

**Endpoint:** `PUT /api/v1/users/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "+1987654321",
  "address": "456 Oak Ave, City, State 54321",
  "marketing_consent": false
}
```

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "+1987654321",
  "address": "456 Oak Ave, City, State 54321",
  "email_verified": true,
  "is_active": true,
  "created_at": "2025-12-29T15:00:00Z",
  "last_login": "2025-12-29T16:00:00Z",
  "marketing_consent": false
}
```

---

#### List Users (Admin Only)

Get a list of all users. Requires superuser privileges.

**Endpoint:** `GET /api/v1/users/`

**Query Parameters:**
- `skip` (int, default: 0) - Number of records to skip
- `limit` (int, default: 100) - Maximum number of records to return

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "email_verified": true,
    "is_active": true,
    "created_at": "2025-12-29T15:00:00Z"
  }
]
```

**Errors:**
- `403` - Not enough permissions (not a superuser)

---

#### Get User by ID (Admin Only)

Get a specific user by ID. Requires superuser privileges.

**Endpoint:** `GET /api/v1/users/{user_id}`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "email_verified": true,
  "is_active": true,
  "created_at": "2025-12-29T15:00:00Z"
}
```

**Errors:**
- `403` - Not enough permissions
- `404` - User not found

---

### Orders Endpoints

#### Create Order

Create a new order for a business package.

**Endpoint:** `POST /api/v1/orders/`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "package_type": "starter"
}
```

**Package Types:**
- `starter` - $999.00
- `growth` - $2,499.00
- `premium` - $4,999.00

**Response:** `201 Created`
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "order_number": "GBK-20251229-A1B2C3D4",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "package_type": "starter",
  "status": "pending",
  "progress": 0,
  "amount": "999.00",
  "currency": "USD",
  "payment_status": "pending",
  "created_at": "2025-12-29T15:00:00Z",
  "updated_at": "2025-12-29T15:00:00Z",
  "estimated_completion": "2026-01-28T15:00:00Z",
  "services": []
}
```

**Errors:**
- `422` - Invalid package type

---

#### List Orders

Get all orders for the authenticated user.

**Endpoint:** `GET /api/v1/orders/`

**Query Parameters:**
- `skip` (int, default: 0) - Number of records to skip
- `limit` (int, default: 100) - Maximum number of records to return

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "order_number": "GBK-20251229-A1B2C3D4",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "package_type": "starter",
    "status": "processing",
    "progress": 45,
    "amount": "999.00",
    "currency": "USD",
    "payment_status": "paid",
    "created_at": "2025-12-29T15:00:00Z",
    "updated_at": "2025-12-29T16:00:00Z",
    "estimated_completion": "2026-01-28T15:00:00Z",
    "services": [
      {
        "service_name": "LLC Formation",
        "service_type": "llc_filing",
        "status": "completed"
      }
    ]
  }
]
```

---

#### Get Order

Get a specific order by ID.

**Endpoint:** `GET /api/v1/orders/{order_id}`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "order_number": "GBK-20251229-A1B2C3D4",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "package_type": "starter",
  "status": "processing",
  "progress": 45,
  "amount": "999.00",
  "currency": "USD",
  "payment_status": "paid",
  "created_at": "2025-12-29T15:00:00Z",
  "updated_at": "2025-12-29T16:00:00Z",
  "estimated_completion": "2026-01-28T15:00:00Z",
  "services": []
}
```

**Errors:**
- `404` - Order not found

---

#### Update Order

Update an order's status or progress.

**Endpoint:** `PUT /api/v1/orders/{order_id}`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "status": "processing",
  "progress": 50,
  "estimated_completion": "2026-01-25T15:00:00Z"
}
```

**Order Statuses:**
- `pending` - Order placed, awaiting payment
- `processing` - Order in progress
- `llc_filed` - LLC formation filed
- `ein_approved` - EIN approved
- `website_building` - Website being built
- `website_review` - Website ready for review
- `completed` - Order completed

**Response:** `200 OK`
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "order_number": "GBK-20251229-A1B2C3D4",
  "status": "processing",
  "progress": 50,
  "estimated_completion": "2026-01-25T15:00:00Z",
  ...
}
```

**Errors:**
- `404` - Order not found
- `422` - Invalid status or progress value

---

### Documents Endpoints

#### Upload Document

Upload a document for an order.

**Endpoint:** `POST /api/v1/documents/`

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Form Data:**
- `order_id` (string, required) - Order ID
- `document_type` (string, required) - Type of document
- `file` (file, required) - Document file

**Allowed File Types:**
- `pdf`, `jpg`, `jpeg`, `png`, `doc`, `docx`

**Max File Size:** 10MB

**Response:** `201 Created`
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440000",
  "order_id": "660e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "business_license.pdf",
  "document_type": "business_license",
  "file_url": "https://storage.supabase.co/documents/...",
  "file_size": 245760,
  "mime_type": "application/pdf",
  "is_verified": false,
  "uploaded_at": "2025-12-29T15:00:00Z"
}
```

**Errors:**
- `400` - File size exceeds limit or invalid file type
- `404` - Order not found

---

#### List Documents

Get all documents for the authenticated user.

**Endpoint:** `GET /api/v1/documents/`

**Query Parameters:**
- `order_id` (string, optional) - Filter by order ID

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "order_id": "660e8400-e29b-41d4-a716-446655440000",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "business_license.pdf",
    "document_type": "business_license",
    "file_url": "https://storage.supabase.co/documents/...",
    "file_size": 245760,
    "mime_type": "application/pdf",
    "is_verified": true,
    "uploaded_at": "2025-12-29T15:00:00Z"
  }
]
```

---

#### Get Document

Get a specific document by ID.

**Endpoint:** `GET /api/v1/documents/{document_id}`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440000",
  "order_id": "660e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "business_license.pdf",
  "document_type": "business_license",
  "file_url": "https://storage.supabase.co/documents/...",
  "file_size": 245760,
  "mime_type": "application/pdf",
  "is_verified": true,
  "uploaded_at": "2025-12-29T15:00:00Z"
}
```

**Errors:**
- `404` - Document not found

---

### Support Endpoints

#### Create Support Ticket

Create a new support ticket.

**Endpoint:** `POST /api/v1/support/`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "subject": "Website not loading",
  "category": "technical",
  "message": "My website is showing a 404 error. Can you help?",
  "order_id": "660e8400-e29b-41d4-a716-446655440000"
}
```

**Categories:**
- `technical` - Technical issues
- `billing` - Billing questions
- `general` - General inquiries
- `urgent` - Urgent matters

**Response:** `201 Created`
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440000",
  "ticket_number": "TKT-20251229-E5F6G7H8",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "order_id": "660e8400-e29b-41d4-a716-446655440000",
  "subject": "Website not loading",
  "category": "technical",
  "status": "open",
  "priority": "normal",
  "created_at": "2025-12-29T15:00:00Z",
  "updated_at": "2025-12-29T15:00:00Z",
  "messages": [
    {
      "message": "My website is showing a 404 error. Can you help?",
      "is_staff": false,
      "created_at": "2025-12-29T15:00:00Z"
    }
  ]
}
```

---

#### List Support Tickets

Get all support tickets for the authenticated user.

**Endpoint:** `GET /api/v1/support/`

**Query Parameters:**
- `skip` (int, default: 0) - Number of records to skip
- `limit` (int, default: 100) - Maximum number of records to return

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "880e8400-e29b-41d4-a716-446655440000",
    "ticket_number": "TKT-20251229-E5F6G7H8",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "subject": "Website not loading",
    "category": "technical",
    "status": "open",
    "priority": "normal",
    "created_at": "2025-12-29T15:00:00Z",
    "updated_at": "2025-12-29T15:00:00Z",
    "messages": []
  }
]
```

---

#### Get Support Ticket

Get a specific support ticket by ID.

**Endpoint:** `GET /api/v1/support/{ticket_id}`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440000",
  "ticket_number": "TKT-20251229-E5F6G7H8",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "subject": "Website not loading",
  "category": "technical",
  "status": "open",
  "priority": "normal",
  "created_at": "2025-12-29T15:00:00Z",
  "updated_at": "2025-12-29T15:00:00Z",
  "messages": [
    {
      "message": "My website is showing a 404 error. Can you help?",
      "is_staff": false,
      "created_at": "2025-12-29T15:00:00Z"
    },
    {
      "message": "We're looking into this issue. Please check your domain settings.",
      "is_staff": true,
      "created_at": "2025-12-29T16:00:00Z"
    }
  ]
}
```

**Errors:**
- `404` - Ticket not found

---

#### Add Message to Ticket

Add a message to an existing support ticket.

**Endpoint:** `POST /api/v1/support/{ticket_id}/messages`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "message": "I've checked the domain settings and they look correct."
}
```

**Response:** `200 OK`
```json
{
  "message": "Message added successfully"
}
```

**Errors:**
- `404` - Ticket not found

---

### Admin Endpoints

All admin endpoints require superuser privileges.

#### List All Orders (Admin)

Get all orders in the system.

**Endpoint:** `GET /api/v1/admin/orders`

**Query Parameters:**
- `skip` (int, default: 0) - Number of records to skip
- `limit` (int, default: 100) - Maximum number of records to return

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "order_number": "GBK-20251229-A1B2C3D4",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "package_type": "starter",
    "status": "processing",
    "progress": 45,
    ...
  }
]
```

**Errors:**
- `403` - Not enough permissions

---

#### Update Order (Admin)

Update any order in the system.

**Endpoint:** `PUT /api/v1/admin/orders/{order_id}`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "status": "completed",
  "progress": 100,
  "estimated_completion": "2026-01-20T15:00:00Z"
}
```

**Response:** `200 OK`
```json
{
  "message": "Order updated successfully",
  "order": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "status": "completed",
    "progress": 100,
    ...
  }
}
```

**Errors:**
- `403` - Not enough permissions
- `404` - Order not found

---

## Webhooks

### Stripe Webhooks

Receive payment events from Stripe.

**Endpoint:** `POST /api/v1/webhooks/stripe`

**Headers:**
```
Stripe-Signature: <signature>
```

**Request Body:**
Stripe webhook event payload

**Supported Events:**
- `payment_intent.succeeded` - Payment completed
- `payment_intent.payment_failed` - Payment failed
- `charge.refunded` - Refund processed

**Response:** `200 OK`
```json
{
  "success": true,
  "event_type": "payment_intent.succeeded",
  "payment_intent_id": "pi_..."
}
```

---

## Data Models

### User Model

```json
{
  "id": "UUID",
  "email": "string (email format)",
  "first_name": "string (optional)",
  "last_name": "string (optional)",
  "phone": "string (optional)",
  "address": "string (optional)",
  "email_verified": "boolean",
  "is_active": "boolean",
  "is_superuser": "boolean",
  "created_at": "datetime (ISO 8601)",
  "updated_at": "datetime (ISO 8601)",
  "last_login": "datetime (ISO 8601, optional)",
  "gdpr_consent_date": "datetime (ISO 8601, optional)",
  "marketing_consent": "boolean",
  "data_processing_consent": "boolean"
}
```

### Order Model

```json
{
  "id": "UUID",
  "order_number": "string (unique)",
  "user_id": "UUID",
  "package_type": "string (starter|growth|premium)",
  "status": "string",
  "progress": "integer (0-100)",
  "amount": "decimal (10,2)",
  "currency": "string (3 chars, default: USD)",
  "payment_status": "string",
  "created_at": "datetime (ISO 8601)",
  "updated_at": "datetime (ISO 8601)",
  "estimated_completion": "datetime (ISO 8601, optional)",
  "completed_at": "datetime (ISO 8601, optional)",
  "assigned_manager_id": "UUID (optional)",
  "services": "array of OrderService"
}
```

### Document Model

```json
{
  "id": "UUID",
  "order_id": "UUID",
  "user_id": "UUID",
  "name": "string",
  "document_type": "string",
  "file_url": "string (URL)",
  "file_path": "string (optional)",
  "file_size": "integer (bytes, optional)",
  "mime_type": "string (optional)",
  "is_verified": "boolean",
  "is_public": "boolean",
  "description": "string (optional)",
  "uploaded_at": "datetime (ISO 8601)",
  "uploaded_by": "UUID (optional)",
  "verified_at": "datetime (ISO 8601, optional)",
  "verified_by": "UUID (optional)"
}
```

### Support Ticket Model

```json
{
  "id": "UUID",
  "ticket_number": "string (unique)",
  "user_id": "UUID",
  "order_id": "UUID (optional)",
  "subject": "string",
  "category": "string",
  "status": "string (open|in_progress|resolved|closed)",
  "priority": "string (low|normal|high|urgent)",
  "assigned_to": "UUID (optional)",
  "created_at": "datetime (ISO 8601)",
  "updated_at": "datetime (ISO 8601)",
  "resolved_at": "datetime (ISO 8601, optional)",
  "messages": "array of TicketMessage"
}
```

---

## Examples

### Complete Authentication Flow

```bash
# 1. Register
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "first_name": "John",
    "last_name": "Doe"
  }'

# 2. Login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user@example.com&password=securepassword123"

# 3. Use token in subsequent requests
curl -X GET "http://localhost:8000/api/v1/orders/" \
  -H "Authorization: Bearer <access_token>"
```

### Create Order Flow

```bash
# 1. Create order
curl -X POST "http://localhost:8000/api/v1/orders/" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "package_type": "starter"
  }'

# 2. Upload document
curl -X POST "http://localhost:8000/api/v1/documents/?order_id=<order_id>&document_type=business_license" \
  -H "Authorization: Bearer <access_token>" \
  -F "file=@business_license.pdf"

# 3. Check order status
curl -X GET "http://localhost:8000/api/v1/orders/<order_id>" \
  -H "Authorization: Bearer <access_token>"
```

---

## Support

For API support, please contact:
- **Email:** support@gbakidigital.com
- **Documentation:** https://docs.gbakidigital.com
- **Status Page:** https://status.gbakidigital.com

---

**Last Updated:** December 29, 2025  
**API Version:** v1
