#!/bin/bash

# AfriLaunch Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up GBAKI Digital Solutions development environment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Start Docker services
echo -e "${BLUE}📦 Starting Docker services (PostgreSQL, Redis, MinIO)...${NC}"
docker-compose up -d

# Wait for services to be ready
echo -e "${BLUE}⏳ Waiting for services to be ready...${NC}"
sleep 5

# Check if services are up
if ! docker ps | grep -q gbaki-postgres; then
    echo -e "${YELLOW}⚠️  PostgreSQL container is not running.${NC}"
    exit 1
fi

# Setup Python virtual environment
echo -e "${BLUE}🐍 Setting up Python virtual environment...${NC}"
cd services/api
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Setup Node.js dependencies
echo -e "${BLUE}📦 Installing Node.js dependencies...${NC}"
cd ../../apps/web
npm install

# Create .env files if they don't exist
echo -e "${BLUE}📝 Creating environment files...${NC}"
cd ../..
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✅ Created .env.local${NC}"
fi

if [ ! -f "services/api/.env" ]; then
    cp services/api/.env.example services/api/.env
    echo -e "${GREEN}✅ Created services/api/.env${NC}"
fi

# Run database migrations (if Alembic is set up)
echo -e "${BLUE}🗄️  Setting up database...${NC}"
cd services/api
source venv/bin/activate
# Uncomment when Alembic is configured:
# alembic upgrade head

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Update .env.local and services/api/.env with your API keys"
echo "2. Start the development servers:"
echo "   - Frontend: cd apps/web && npm run dev"
echo "   - Backend: cd services/api && source venv/bin/activate && uvicorn app.main:app --reload"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"

