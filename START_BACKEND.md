# 🚀 Quick Start Guide - Backend Server

## Problem
You're getting a "Network Error" when trying to create an account. This means the backend API server is not running.

## Solution: Start the Backend Server

### Option 1: Using Uvicorn (Recommended)

```bash
# Navigate to api directory
cd api

# Activate virtual environment
source venv/bin/activate

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Option 2: Using Python

```bash
cd api
source venv/bin/activate
python -m app.main
```

### Option 3: Using Docker Compose (if you have Docker)

```bash
cd api
docker-compose up backend
```

## Verify Backend is Running

Once started, you should see:
- Server running on `http://0.0.0.0:8000`
- API docs available at `http://localhost:8000/api/v1/docs`
- Health check at `http://localhost:8000/health`

## Check Frontend Configuration

Make sure your frontend `.env.local` has:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Common Issues

1. **Port 8000 already in use**: Change port in `api/app/config.py` or use `--port 8001`
2. **Database connection error**: Check `DATABASE_URL` in `api/.env`
3. **Missing dependencies**: Run `pip install -r requirements.txt` in the `api` directory


