# Gbaki Digital Solutions - FastAPI Backend

Production-ready FastAPI backend with Supabase integration for the Business Incubator platform.

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# Supabase credentials are already configured
```

### 2. Install Dependencies

```bash
# Activate virtual environment (if using venv)
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Migrations

```bash
# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### 4. Run Development Server

```bash
# Using uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or using Python
python -m app.main
```

## 📁 Project Structure

```
api/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Configuration settings
│   ├── database.py             # Database connection
│   ├── dependencies.py         # Shared dependencies
│   │
│   ├── models/                 # SQLAlchemy models
│   │   ├── user.py
│   │   ├── order.py
│   │   ├── business.py
│   │   ├── document.py
│   │   ├── support.py
│   │   └── notification.py
│   │
│   ├── schemas/                # Pydantic schemas
│   │   ├── user.py
│   │   ├── order.py
│   │   ├── document.py
│   │   └── support.py
│   │
│   ├── api/                    # API routes
│   │   ├── deps.py            # Route dependencies
│   │   └── v1/
│   │       ├── auth.py
│   │       ├── users.py
│   │       ├── orders.py
│   │       ├── documents.py
│   │       ├── support.py
│   │       └── admin.py
│   │
│   ├── core/                   # Core functionality
│   │   ├── security.py        # Password hashing, JWT
│   │   ├── auth.py            # Supabase auth integration
│   │   └── email.py           # Email sending
│   │
│   └── utils/                  # Utilities
│       ├── logger.py
│       └── validators.py
│
├── alembic/                    # Database migrations
│   ├── versions/
│   └── env.py
│
├── .env.example
├── alembic.ini
├── requirements.txt
└── README.md
```

## 🔐 Environment Variables

Key environment variables (see `.env.example` for full list):

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Supabase anon/public key
- `SUPABASE_SERVICE_KEY` - Supabase service role key
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET_KEY` - Secret key for JWT tokens
- `RESEND_API_KEY` - Resend API key for emails
- `STRIPE_SECRET_KEY` - Stripe secret key

## 📚 API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔑 Authentication

The API uses JWT tokens for authentication:

1. **Register**: `POST /api/v1/auth/register`
2. **Login**: `POST /api/v1/auth/login` (returns access & refresh tokens)
3. **Use Token**: Include `Authorization: Bearer <token>` header in requests
4. **Refresh**: `POST /api/v1/auth/refresh`

## 🗄️ Database Models

- **User** - User accounts and authentication
- **Order** - Business package orders
- **Business** - Business information
- **Document** - User documents
- **SupportTicket** - Support tickets
- **Notification** - User notifications
- **ActivityLog** - Activity tracking

## 🧪 Testing

```bash
# Run tests
pytest

# With coverage
pytest --cov=app --cov-report=html
```

## 🚢 Production Deployment

```bash
# Using Gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 📝 License

MIT

