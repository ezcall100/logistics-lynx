#!/bin/bash

# Trans Bot AI Super Admin Portal - Production Deployment Script
# This script handles the complete deployment process for the Super Admin portal

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="transbot-super-admin-portal"
VERSION=$(node -p "require('./package.json').version")
ENVIRONMENT=${1:-production}
DOCKER_REGISTRY=${DOCKER_REGISTRY:-"your-registry.com"}
DOCKER_IMAGE="${DOCKER_REGISTRY}/${APP_NAME}:${VERSION}"

echo -e "${BLUE}🚀 Trans Bot AI Super Admin Portal Deployment${NC}"
echo -e "${BLUE}==============================================${NC}"
echo -e "Environment: ${YELLOW}${ENVIRONMENT}${NC}"
echo -e "Version: ${YELLOW}${VERSION}${NC}"
echo -e "Docker Image: ${YELLOW}${DOCKER_IMAGE}${NC}"
echo ""

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    echo -e "${BLUE}🔍 Checking prerequisites...${NC}"
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    
    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi
    
    # Check if environment file exists
    if [ ! -f ".env.${ENVIRONMENT}" ]; then
        print_warning "Environment file .env.${ENVIRONMENT} not found, using .env.example"
        if [ ! -f ".env.example" ]; then
            print_error "No environment file found"
            exit 1
        fi
        cp .env.example ".env.${ENVIRONMENT}"
    fi
    
    print_status "Prerequisites check completed"
}

# Function to run tests
run_tests() {
    echo -e "${BLUE}🧪 Running tests...${NC}"
    
    # Install dependencies
    npm ci
    
    # Run linting
    echo "Running ESLint..."
    npm run lint
    
    # Run type checking
    echo "Running TypeScript type checking..."
    npm run type-check
    
    # Run unit tests
    echo "Running unit tests..."
    npm run test
    
    # Run E2E tests (if not in CI)
    if [ "$CI" != "true" ]; then
        echo "Running E2E tests..."
        npm run test:e2e
    fi
    
    print_status "All tests passed"
}

# Function to build the application
build_application() {
    echo -e "${BLUE}🏗️  Building application...${NC}"
    
    # Set environment variables
    export NODE_ENV=production
    export VITE_APP_ENVIRONMENT=${ENVIRONMENT}
    
    # Build the application
    npm run build
    
    # Verify build
    if [ ! -d "dist" ]; then
        print_error "Build failed - dist directory not found"
        exit 1
    fi
    
    print_status "Application built successfully"
}

# Function to build Docker image
build_docker_image() {
    echo -e "${BLUE}🐳 Building Docker image...${NC}"
    
    # Build the Docker image
    docker build -t ${DOCKER_IMAGE} .
    
    # Tag as latest for the environment
    docker tag ${DOCKER_IMAGE} ${DOCKER_REGISTRY}/${APP_NAME}:${ENVIRONMENT}-latest
    
    print_status "Docker image built successfully"
}

# Function to push Docker image
push_docker_image() {
    echo -e "${BLUE}📤 Pushing Docker image...${NC}"
    
    # Login to Docker registry (if credentials are provided)
    if [ ! -z "$DOCKER_USERNAME" ] && [ ! -z "$DOCKER_PASSWORD" ]; then
        echo "$DOCKER_PASSWORD" | docker login ${DOCKER_REGISTRY} -u "$DOCKER_USERNAME" --password-stdin
    fi
    
    # Push the image
    docker push ${DOCKER_IMAGE}
    docker push ${DOCKER_REGISTRY}/${APP_NAME}:${ENVIRONMENT}-latest
    
    print_status "Docker image pushed successfully"
}

# Function to deploy to environment
deploy_to_environment() {
    echo -e "${BLUE}🚀 Deploying to ${ENVIRONMENT}...${NC}"
    
    # Set environment variables for deployment
    export DOCKER_IMAGE=${DOCKER_IMAGE}
    export ENVIRONMENT=${ENVIRONMENT}
    
    # Stop existing containers
    docker-compose -f docker-compose.yml -f "docker-compose.${ENVIRONMENT}.yml" down || true
    
    # Start new containers
    docker-compose -f docker-compose.yml -f "docker-compose.${ENVIRONMENT}.yml" up -d
    
    # Wait for services to be healthy
    echo "Waiting for services to be healthy..."
    sleep 30
    
    # Check if services are running
    if ! docker-compose -f docker-compose.yml -f "docker-compose.${ENVIRONMENT}.yml" ps | grep -q "Up"; then
        print_error "Deployment failed - services are not running"
        docker-compose -f docker-compose.yml -f "docker-compose.${ENVIRONMENT}.yml" logs
        exit 1
    fi
    
    print_status "Deployment completed successfully"
}

# Function to run health checks
run_health_checks() {
    echo -e "${BLUE}🏥 Running health checks...${NC}"
    
    # Get the port from docker-compose
    PORT=$(docker-compose -f docker-compose.yml -f "docker-compose.${ENVIRONMENT}.yml" port super-admin-portal 80 | cut -d: -f2)
    
    # Check if the application is responding
    for i in {1..30}; do
        if curl -f http://localhost:${PORT}/health > /dev/null 2>&1; then
            print_status "Health check passed"
            return 0
        fi
        echo "Waiting for application to be ready... (${i}/30)"
        sleep 10
    done
    
    print_error "Health check failed - application is not responding"
    return 1
}

# Function to cleanup
cleanup() {
    echo -e "${BLUE}🧹 Cleaning up...${NC}"
    
    # Remove old Docker images
    docker image prune -f
    
    # Remove unused containers
    docker container prune -f
    
    print_status "Cleanup completed"
}

# Function to send notifications
send_notification() {
    local status=$1
    local message=$2
    
    # Send Slack notification (if webhook is configured)
    if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚀 Super Admin Portal Deployment ${status}\n${message}\"}" \
            $SLACK_WEBHOOK_URL
    fi
    
    # Send email notification (if configured)
    if [ ! -z "$NOTIFICATION_EMAIL" ]; then
        echo "Super Admin Portal Deployment ${status}\n${message}" | mail -s "Deployment ${status}" $NOTIFICATION_EMAIL
    fi
}

# Main deployment function
main() {
    local start_time=$(date +%s)
    
    # Trap to handle errors
    trap 'print_error "Deployment failed at line $LINENO"; send_notification "FAILED" "Deployment failed at line $LINENO"; exit 1' ERR
    
    # Run deployment steps
    check_prerequisites
    run_tests
    build_application
    build_docker_image
    
    # Only push and deploy if not in dry-run mode
    if [ "$DRY_RUN" != "true" ]; then
        push_docker_image
        deploy_to_environment
        run_health_checks
        cleanup
    else
        print_warning "Dry run mode - skipping deployment"
    fi
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    print_status "Deployment completed successfully in ${duration} seconds"
    send_notification "SUCCESS" "Deployment completed successfully in ${duration} seconds"
}

# Handle command line arguments
case "${1:-}" in
    "staging")
        ENVIRONMENT="staging"
        main
        ;;
    "production")
        ENVIRONMENT="production"
        main
        ;;
    "dry-run")
        DRY_RUN="true"
        main
        ;;
    "test")
        check_prerequisites
        run_tests
        ;;
    "build")
        check_prerequisites
        build_application
        build_docker_image
        ;;
    "deploy")
        deploy_to_environment
        run_health_checks
        ;;
    "health")
        run_health_checks
        ;;
    "cleanup")
        cleanup
        ;;
    *)
        echo "Usage: $0 {staging|production|dry-run|test|build|deploy|health|cleanup}"
        echo ""
        echo "Commands:"
        echo "  staging     Deploy to staging environment"
        echo "  production  Deploy to production environment"
        echo "  dry-run     Run deployment without actually deploying"
        echo "  test        Run tests only"
        echo "  build       Build application and Docker image"
        echo "  deploy      Deploy existing build"
        echo "  health      Run health checks"
        echo "  cleanup     Clean up Docker resources"
        exit 1
        ;;
esac
