#!/bin/bash

# Function to print colored output
print_color() {
    local color=$1
    local message=$2
    case $color in
        "green") echo -e "\033[32m${message}\033[0m" ;;
        "red") echo -e "\033[31m${message}\033[0m" ;;
        "yellow") echo -e "\033[33m${message}\033[0m" ;;
        *) echo "$message" ;;
    esac
}

# Function to check if command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_color "red" "Error: $1 is not installed"
        exit 1
    fi
}

# Function to start development servers
dev() {
    print_color "yellow" "Starting development servers..."
    
    # Get the script directory
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    # Start backend server
    print_color "yellow" "Starting Go backend server..."
    (cd "$SCRIPT_DIR/backend" && go run cmd/server/main.go) &
    BACKEND_PID=$!
    
    # Start frontend development server
    print_color "yellow" "Starting React frontend server..."
    (cd "$SCRIPT_DIR/frontend" && npm run dev) &
    FRONTEND_PID=$!
    
    # Handle process termination
    trap 'kill $BACKEND_PID $FRONTEND_PID 2>/dev/null' INT TERM
    
    print_color "green" "🚀 Development servers started!"
    print_color "green" "Backend (GraphQL): http://localhost:8080"
    print_color "green" "Frontend (React): http://localhost:3000"
    print_color "yellow" "Press Ctrl+C to stop both servers"
    
    wait
}

# Function to run tests
test() {
    print_color "yellow" "Running tests..."
    
    # Get the script directory
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    # Run backend tests
    print_color "yellow" "Running backend tests..."
    (cd "$SCRIPT_DIR/backend" && go test ./...)
    
    # Run frontend tests
    print_color "yellow" "Running frontend tests..."
    (cd "$SCRIPT_DIR/frontend" && npm run test)
}

# Function to build for production
build() {
    print_color "yellow" "Building for production..."
    
    # Get the script directory
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    # Build backend
    print_color "yellow" "Building backend..."
    (cd "$SCRIPT_DIR/backend" && go build -o bin/server cmd/server/main.go)
    
    # Build frontend
    print_color "yellow" "Building frontend..."
    (cd "$SCRIPT_DIR/frontend" && npm run build)
    
    print_color "green" "✅ Build completed!"
}

# Function to deploy
deploy() {
    print_color "yellow" "Deploying to Vercel..."
    
    # Get the script directory
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    (cd "$SCRIPT_DIR/frontend" && vercel --prod)
    
    print_color "green" "✅ Deployment completed!"
}

# Main script
case "$1" in
    "dev")
        check_command "go"
        check_command "npm"
        dev
        ;;
    "test")
        check_command "go"
        check_command "npm"
        test
        ;;
    "build")
        check_command "go"
        check_command "npm"
        build
        ;;
    "deploy")
        check_command "vercel"
        deploy
        ;;
    *)
        print_color "yellow" "Usage: ./run.sh [dev|test|build|deploy]"
        exit 1
        ;;
esac
