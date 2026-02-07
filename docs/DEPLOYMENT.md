# Deployment Guide

## Prerequisites

- Docker & Docker Compose
- AWS Account (for production)
- Domain name
- SSL certificates

## Local Development

1. **Start services**
```bash
docker-compose up -d
```

2. **Run migrations**
```bash
cd services/api
alembic upgrade head
```

3. **Start development servers**
```bash
# Frontend
cd apps/web
npm run dev

# Backend
cd services/api
uvicorn app.main:app --reload
```

## Staging Deployment

### Using Docker Compose

```bash
docker-compose -f docker-compose.staging.yml up -d
```

### Environment Variables

Set all required environment variables in `.env.staging`:

```bash
ENVIRONMENT=staging
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
# ... other variables
```

## Production Deployment

### AWS ECS Deployment

1. **Build and push Docker images**
```bash
docker build -t afrilaunch/web:latest -f infrastructure/docker/Dockerfile.web .
docker build -t afrilaunch/api:latest -f infrastructure/docker/Dockerfile.api .
docker push afrilaunch/web:latest
docker push afrilaunch/api:latest
```

2. **Deploy using Terraform**
```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

### Manual Deployment

1. **Setup RDS PostgreSQL**
2. **Setup ElastiCache Redis**
3. **Setup S3 bucket**
4. **Deploy API to ECS/Fargate**
5. **Deploy Web to Vercel/Netlify**
6. **Configure Cloudflare CDN**
7. **Setup monitoring (DataDog/New Relic)**

## Database Migrations

```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Monitoring

- Application logs: CloudWatch
- Error tracking: Sentry
- Performance: DataDog
- Uptime: Pingdom

## Backup Strategy

- Database: Daily automated backups (RDS)
- Files: S3 versioning enabled
- Retention: 30 days

## Security Checklist

- [ ] All secrets in environment variables
- [ ] HTTPS enabled everywhere
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Security headers set
- [ ] Regular dependency updates

