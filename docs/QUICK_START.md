# 🚀 Quick Start Guide

## Prerequisites

Before you begin, ensure you have:

- **Node.js 20+** - [Download](https://nodejs.org/)
- **Python 3.11+** - [Download](https://www.python.org/)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop)
- **Git** - [Download](https://git-scm.com/)

## Step 1: Initial Setup

Run the setup script to initialize everything:

```bash
./scripts/setup.sh
```

This will:
- ✅ Start Docker services (PostgreSQL, Redis, MinIO)
- ✅ Create Python virtual environment
- ✅ Install Python dependencies
- ✅ Install Node.js dependencies
- ✅ Create environment files

## Step 2: Configure Environment Variables

### Frontend (.env.local)

```bash
cp .env.example .env.local
```

Update with your API keys:
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

### Backend (services/api/.env)

```bash
cp services/api/.env.example services/api/.env
```

Update with your API keys:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `STRIPE_SECRET_KEY` - Stripe secret key
- `SENDGRID_API_KEY` - SendGrid API key
- Other service API keys as needed

## Step 3: Start Development Servers

### Terminal 1: Frontend (Next.js)

```bash
cd apps/web
npm run dev
```

Frontend will be available at: http://localhost:3000

### Terminal 2: Backend (FastAPI)

```bash
cd services/api
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload
```

Backend API will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

### Terminal 3: Workers (Celery - Optional)

```bash
cd services/workers
source ../api/venv/bin/activate
celery -A celery_app worker --loglevel=info
```

## Step 4: Setup Database

### Option 1: Using SQL Schema (Quick)

```bash
# Connect to PostgreSQL
docker exec -it afrilaunch-postgres psql -U postgres -d afrilaunch

# Run schema
\i packages/database/schema.sql
```

### Option 2: Using Alembic (Recommended)

```bash
cd services/api
source venv/bin/activate

# Initialize Alembic (first time only)
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial schema"

# Apply migrations
alembic upgrade head
```

### Seed Initial Data

```bash
cd services/api
source venv/bin/activate
python ../../scripts/seed_data.py
```

## Step 5: Verify Installation

1. **Check Frontend**: Visit http://localhost:3000
2. **Check Backend**: Visit http://localhost:8000/docs
3. **Check Database**: 
   ```bash
   docker exec -it afrilaunch-postgres psql -U postgres -d afrilaunch -c "SELECT COUNT(*) FROM packages;"
   ```

## Common Commands

### Docker Services

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart postgres
```

### Database

```bash
# Connect to PostgreSQL
docker exec -it afrilaunch-postgres psql -U postgres -d afrilaunch

# Backup database
docker exec afrilaunch-postgres pg_dump -U postgres afrilaunch > backup.sql

# Restore database
docker exec -i afrilaunch-postgres psql -U postgres afrilaunch < backup.sql
```

### Development

```bash
# Install new npm package
cd apps/web
npm install <package-name>

# Install new Python package
cd services/api
source venv/bin/activate
pip install <package-name>
pip freeze > requirements.txt
```

## Troubleshooting

### Port Already in Use

If port 3000, 5432, or 6379 is already in use:

```bash
# Find process using port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process or change port in docker-compose.yml
```

### Database Connection Error

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Python Virtual Environment Issues

```bash
# Recreate virtual environment
cd services/api
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Next Steps

1. ✅ Review [MASTER_PLAN.md](./MASTER_PLAN.md) for complete project overview
2. ✅ Read [API.md](./docs/API.md) for API documentation
3. ✅ Check [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for development guidelines
4. 🚀 Start building features!

## Getting Help

- Check the [documentation](./docs/)
- Review [MASTER_PLAN.md](./MASTER_PLAN.md)
- Open an issue on GitHub

---

**Happy Coding! 🎉**

