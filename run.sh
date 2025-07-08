#!/bin/bash

# Function to print colored output
print_colored() {
    GREEN='\033[0;32m'
    NC='\033[0m' # No Color
    echo -e "${GREEN}$1${NC}"
}

# Function to check if a command was successful
check_status() {
    if [ $? -eq 0 ]; then
        print_colored "✅ $1 successful"
    else
        echo "❌ Error: $1 failed"
        exit 1
    fi
}

# Help function
show_help() {
    echo "Usage: ./run.sh [command]"
    echo "Commands:"
    echo "  setup     - Install dependencies and prepare the project"
    echo "  dev      - Run development server"
    echo "  build    - Build for production"
    echo "  test     - Run tests"
    echo "  deploy   - Deploy to hosting platform"
    echo "  help     - Show this help message"
}

# Setup function
setup() {
    print_colored "🚀 Setting up the project..."
    cd frontend
    npm install
    check_status "Dependencies installation"
}

# Development function
dev() {
    print_colored "🔧 Starting development server..."
    cd frontend
    npm run dev
}

# Build function
build() {
    print_colored "📦 Building for production..."
    cd frontend
    npm run build
    check_status "Build"
}

# Test function
test() {
    print_colored "🧪 Running tests..."
    cd frontend
    npm run test
    check_status "Tests"
}

# Deploy function
deploy() {
    print_colored "🚀 Deploying..."
    cd frontend

    # First ensure all dependencies are installed
    npm install
    check_status "Dependencies installation"

    # Install netlify-cli if not present
    if ! command -v netlify &> /dev/null; then
        print_colored "Installing Netlify CLI..."
        npm install -g netlify-cli
        check_status "Netlify CLI installation"
    fi

    # Build the project
    npm run build
    check_status "Build for deployment"
    
    # Deploy to Netlify
    print_colored "Deploying to Netlify..."
    if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
        print_colored "⚠️ NETLIFY_AUTH_TOKEN not found. Running with --dir flag..."
        netlify deploy --dir=dist --prod
    else
        netlify deploy --dir=dist --prod --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
    fi
    check_status "Deployment"

    print_colored "✅ Deployment complete! Your site should be live now."
    print_colored "Visit your Netlify dashboard to see the deployment status and URL."
}

# Main script
case "$1" in
    "setup")
        setup
        ;;
    "dev")
        dev
        ;;
    "build")
        build
        ;;
    "test")
        test
        ;;
    "deploy")
        deploy
        ;;
    "help")
        show_help
        ;;
    *)
        echo "Invalid command. Use './run.sh help' to see available commands."
        exit 1
        ;;
esac
