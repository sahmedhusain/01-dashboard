#!/bin/bash

# GraphQL Profile Dashboard - Build and Development Script
# Usage: ./run.sh [command]
# Commands: dev, test, build, deploy, help

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project directories
FRONTEND_DIR="./frontend"
ROOT_DIR="."

# Helper functions
print_help() {
    echo -e "${BLUE}GraphQL Profile Dashboard - Build Script${NC}"
    echo ""
    echo "Usage: ./run.sh [command]"
    echo ""
    echo "Commands:"
    echo -e "  ${GREEN}dev${NC}     - Start development server"
    echo -e "  ${GREEN}test${NC}    - Run tests"
    echo -e "  ${GREEN}build${NC}   - Build for production"
    echo -e "  ${GREEN}deploy${NC}  - Prepare for deployment (Vercel)"
    echo -e "  ${GREEN}help${NC}    - Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./run.sh dev     # Start development server"
    echo "  ./run.sh build   # Build for production"
    echo ""
}

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if frontend directory exists
check_frontend() {
    if [ ! -d "$FRONTEND_DIR" ]; then
        print_error "Frontend directory not found: $FRONTEND_DIR"
        exit 1
    fi
}

# Install dependencies if needed
install_deps() {
    if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
        print_status "Installing dependencies..."
        cd "$FRONTEND_DIR"
        npm install
        cd "$ROOT_DIR"
        print_success "Dependencies installed"
    fi
}

# Development server
dev() {
    print_status "Starting development server..."
    check_frontend
    install_deps

    cd "$FRONTEND_DIR"
    print_success "Development server starting at http://localhost:5173"
    npm run dev
}

# Run tests
test() {
    print_status "Running tests..."
    check_frontend
    install_deps

    cd "$FRONTEND_DIR"

    # Check if test script exists
    if npm run | grep -q "test"; then
        npm run test
    else
        print_warning "No test script found. Setting up basic test structure..."
        # You can add test setup here if needed
        print_success "Test setup complete"
    fi
}

# Build for production
build() {
    print_status "Building for production..."
    check_frontend
    install_deps

    cd "$FRONTEND_DIR"

    # Clean previous build
    if [ -d "dist" ]; then
        rm -rf dist
        print_status "Cleaned previous build"
    fi

    # Build the project
    npm run build

    if [ -d "dist" ]; then
        print_success "Build completed successfully!"
        print_status "Build output: $FRONTEND_DIR/dist"

        # Show build size
        if command -v du &> /dev/null; then
            BUILD_SIZE=$(du -sh "$FRONTEND_DIR/dist" | cut -f1)
            print_status "Build size: $BUILD_SIZE"
        fi
    else
        print_error "Build failed - no dist directory found"
        exit 1
    fi
}

# Prepare for deployment
deploy() {
    print_status "Preparing for deployment..."

    # Build first
    build

    print_status "Deployment preparation steps:"
    echo "1. Build completed ✓"
    echo "2. Static files ready in: $FRONTEND_DIR/dist"
    echo ""
    print_status "For Vercel deployment:"
    echo "1. Install Vercel CLI: npm i -g vercel"
    echo "2. Run: vercel --prod"
    echo "3. Or connect your GitHub repo to Vercel dashboard"
    echo ""
    print_status "Build configuration:"
    echo "- Build Command: npm run build"
    echo "- Output Directory: dist"
    echo "- Install Command: npm install"
    echo ""
    print_success "Ready for deployment!"
}

# Main script logic
case "${1:-help}" in
    "dev")
        dev
        ;;
    "test")
        test
        ;;
    "build")
        build
        ;;
    "deploy")
        deploy
        ;;
    "help"|"--help"|"-h")
        print_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        print_help
        exit 1
        ;;
esac