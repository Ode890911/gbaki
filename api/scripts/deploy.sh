#!/bin/bash

# Gbaki Digital Backend Deployment Script
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}

echo "🚀 Deploying Gbaki Backend to $ENVIRONMENT..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Install it first:"
    echo "   npm i -g @railway/cli"
    exit 1
fi

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway first:"
    railway login
fi

# Build Docker image
echo "📦 Building Docker image..."
docker build -t gbaki-backend:latest .

# Tag image
IMAGE_TAG="gbaki-backend:$(date +%Y%m%d-%H%M%S)"
docker tag gbaki-backend:latest $IMAGE_TAG

echo "✅ Image built: $IMAGE_TAG"

# Deploy to Railway
echo "🚢 Deploying to Railway..."
railway up --environment $ENVIRONMENT

echo "✅ Deployment complete!"
echo "🌐 Check status: railway status"
echo "📊 View logs: railway logs"

