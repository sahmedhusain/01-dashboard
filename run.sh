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
    
    # Start backend server
    print_color "yellow" "Starting Go backend server..."
    cd backend && go run cmd/server/main.go &
    BACKEND_PID=$!
    cd ..
    
    # Start frontend development server
    print_color "yellow" "Starting React frontend server..."
    cd frontend && npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    # Handle process termination
    trap 'kill $BACKEND_PID $FRONTEND_PID' INT TERM
    wait
}

# Function to run tests
test() {
    print_color "yellow" "Running tests..."
    
    # Run backend tests
    print_color "yellow" "Running backend tests..."
    cd backend && go test ./... && cd ..
    
    # Run frontend tests
    print_color "yellow" "Running frontend tests..."
    cd frontend && npm run test && cd ..
}

# Function to build for production
build() {
    print_color "yellow" "Building for production..."
    
    # Build backend
    print_color "yellow" "Building backend..."
    cd backend && go build -o bin/server cmd/server/main.go && cd ..
    
    # Build frontend
    print_color "yellow" "Building frontend..."
    cd frontend && npm run build && cd ..
}

# Function to deploy
deploy() {
    print_color "yellow" "Deploying to Vercel..."
    cd frontend && vercel --prod && cd ..
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
