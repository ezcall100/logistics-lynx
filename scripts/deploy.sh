#!/bin/bash

echo "🚀 Deploying TransBot AI TMS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if environment file exists
if [ ! -f ".env.local" ]; then
    print_warning ".env.local not found. Creating from example..."
    cp .env.example .env.local
    print_status "Please edit .env.local with your credentials before deploying."
fi

# Check if Vercel CLI is installed
print_status "Checking Vercel CLI installation..."
if ! command -v vercel &> /dev/null; then
    print_status "Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        print_error "Failed to install Vercel CLI. Please install it manually: npm install -g vercel"
        exit 1
    fi
fi

print_success "Vercel CLI is available"

# Check if Supabase CLI is installed
print_status "Checking Supabase CLI installation..."
if ! command -v supabase &> /dev/null; then
    print_status "Installing Supabase CLI..."
    npm install -g supabase
    if [ $? -ne 0 ]; then
        print_warning "Failed to install Supabase CLI. Database deployment may fail."
    fi
fi

# Run tests
print_status "Running tests..."
npm run test
if [ $? -ne 0 ]; then
    print_error "Tests failed. Please fix the issues before deploying."
    exit 1
fi

print_success "All tests passed"

# Run linting
print_status "Running linting..."
npm run lint
if [ $? -ne 0 ]; then
    print_warning "Linting issues found. Consider fixing them before deploying."
fi

# Build the project
print_status "Building project..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Build failed. Please fix the issues before deploying."
    exit 1
fi

print_success "Build completed successfully"

# Deploy database (if Supabase CLI is available)
if command -v supabase &> /dev/null; then
    print_status "Deploying database schema..."
    cd database
    supabase db push
    if [ $? -eq 0 ]; then
        print_success "Database schema deployed successfully"
    else
        print_warning "Database deployment failed. You may need to configure Supabase manually."
    fi
    cd ..
else
    print_warning "Supabase CLI not available. Skipping database deployment."
fi

# Deploy to Vercel
print_status "Deploying to Vercel..."
vercel --prod --yes
if [ $? -eq 0 ]; then
    print_success "Deployment to Vercel completed successfully!"
else
    print_error "Deployment to Vercel failed."
    exit 1
fi

# Get deployment URL
print_status "Getting deployment URL..."
DEPLOYMENT_URL=$(vercel ls --json | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ ! -z "$DEPLOYMENT_URL" ]; then
    print_success "Application deployed to: https://$DEPLOYMENT_URL"
else
    print_warning "Could not retrieve deployment URL. Check Vercel dashboard."
fi

# Run health checks
print_status "Running health checks..."
sleep 10  # Wait for deployment to be ready

if [ ! -z "$DEPLOYMENT_URL" ]; then
    HEALTH_CHECK=$(curl -s "https://$DEPLOYMENT_URL/api/health" 2>/dev/null)
    if [[ $HEALTH_CHECK == *"OK"* ]]; then
        print_success "Health check passed!"
    else
        print_warning "Health check failed. The application may still be starting up."
    fi
fi

# Final deployment summary
echo ""
print_success "🎉 TransBot AI TMS deployment completed!"
echo ""
print_status "Deployment Summary:"
echo "✅ Tests passed"
echo "✅ Build successful"
echo "✅ Deployed to Vercel"
if [ ! -z "$DEPLOYMENT_URL" ]; then
    echo "🌐 Live URL: https://$DEPLOYMENT_URL"
fi
echo ""
print_status "Next steps:"
echo "1. Configure your domain (if needed)"
echo "2. Set up monitoring and analytics"
echo "3. Configure environment variables in Vercel dashboard"
echo "4. Set up CI/CD for automatic deployments"
echo ""
print_success "Your TransBot AI TMS is now live! 🚀"
