# GraphQL Profile Page

A comprehensive profile page application using GraphQL API, Go backend, and React frontend. The application displays user information, progress, and statistics from the school's GraphQL endpoint.

## Features

- JWT-based authentication
- User profile information display
- XP progress tracking
- Project statistics
- Audit history
- Interactive SVG data visualization
- Dark mode support
- Responsive design

## Tech Stack

### Backend
- Go
- GraphQL (gqlgen)
- Chi router
- JWT authentication

### Frontend
- React
- TypeScript
- Apollo Client
- Tailwind CSS
- SVG for data visualization

## Project Structure

```
graphql/
├── backend/                # Go server
│   ├── cmd/               # Entry point
│   ├── config/           # Configuration
│   ├── internal/         # Internal packages
│   │   ├── auth/        # Authentication
│   │   ├── graphql/     # GraphQL resolvers
│   │   └── models/      # Data models
│   └── tests/           # Backend tests
├── frontend/             # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   ├── graphql/     # GraphQL queries
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Page components
│   │   └── types/       # TypeScript types
│   └── tests/           # Frontend tests
└── run.sh               # Script for running & deployment
```

## Prerequisites

- Go 1.20 or later
- Node.js 16 or later
- npm or yarn
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://learn.reboot01.com/git/sayehusain/graphql.git
   cd graphql
   ```

2. Install dependencies:
   ```bash
   # Backend dependencies
   cd backend
   go mod download
   cd ..

   # Frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables as needed

4. Start the development servers:
   ```bash
   ./run.sh dev
   ```

## Available Scripts

- `./run.sh dev` - Start development servers (backend and frontend)
- `./run.sh test` - Run all tests
- `./run.sh build` - Build for production
- `./run.sh deploy` - Deploy to Vercel

## API Documentation

### GraphQL Endpoint

The application uses the school's GraphQL API endpoint:
\`\`\`
https://learn.reboot01.com/api/graphql-engine/v1/graphql
\`\`\`

### Authentication

Authentication is handled through:
\`\`\`
https://learn.reboot01.com/api/auth/signin
\`\`\`

Uses Basic Authentication with base64 encoded credentials.

## Testing

### Backend Tests
```bash
cd backend
go test ./...
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

The application is configured for deployment on Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   ./run.sh deploy
   ```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
