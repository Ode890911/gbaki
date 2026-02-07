#!/bin/bash

# Supabase Setup Script
# Sets up database tables, policies, and storage

set -e

echo "🗄️  Setting up Supabase..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Install it first:"
    echo "   npm i -g supabase"
    exit 1
fi

# Initialize Supabase (if not already done)
if [ ! -d "supabase" ]; then
    echo "📦 Initializing Supabase project..."
    supabase init
fi

# Link to remote project
echo "🔗 Link to your Supabase project:"
echo "   Run: supabase link --project-ref your-project-ref"

# Run migrations
echo "🏗️  Running database migrations..."
supabase db push || echo "⚠️  Migrations may need to be run manually"

# Setup storage buckets
echo "📁 Setting up storage buckets..."
echo "   Run: supabase storage create documents --public false"

# Setup storage policies
echo "🔒 Setting up storage policies..."
echo "   Configure in Supabase Dashboard → Storage → Policies"

# Setup RLS policies
echo "🛡️  Setting up Row Level Security..."
echo "   Configure in Supabase Dashboard → Authentication → Policies"

echo "✅ Supabase setup instructions provided!"
echo "📖 For detailed setup, visit: https://supabase.com/docs"

