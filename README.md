# GraphQL Profile Dashboard

A modern, Material Design 3 profile dashboard that displays your Reboot01 progress using GraphQL data. Built with React, Tailwind CSS, and Material-UI components.

## Features

- 🎨 Material Design 3 (MD3) UI/UX
- 📊 Interactive SVG Charts
  - XP Progress Line Chart
  - Project Success Ratio Donut Chart
- 🔐 Secure Authentication
  - Basic Auth for signin
  - JWT token handling
  - Support for both username and email login
- 📱 Responsive Design
- 🌙 Dark Mode Support
- 📈 Real-time Data Display
  - User Profile Info
  - XP and Level Progress
  - Skills Analysis
  - Project History
  - Audit Statistics

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS + Material-UI
- **State Management**: React Context + Apollo Client
- **Data Fetching**: GraphQL with Apollo Client
- **Animations**: Framer Motion
- **Charts**: Custom SVG with D3.js
- **Development**: Vite
- **Testing**: Vitest + Cypress
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://learn.reboot01.com/git/[your-username]/graphql.git
   cd graphql
   ```

2. Make the run script executable:
   ```bash
   chmod +x run.sh
   ```

3. Set up the project:
   ```bash
   ./run.sh setup
   ```

### Development

Start the development server:
```bash
./run.sh dev
```

The application will be available at `http://localhost:3001`

### Testing

Run the test suite:
```bash
./run.sh test
```

### Building for Production

Create a production build:
```bash
./run.sh build
```

### Deployment

Deploy to Netlify:
```bash
./run.sh deploy
```

#### Environment Variables

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
VITE_GRAPHQL_ENDPOINT=https://learn.reboot01.com/api/graphql-engine/v1/graphql
VITE_AUTH_ENDPOINT=https://learn.reboot01.com/api/auth/signin

# Optional: For automated deployment
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_netlify_site_id
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── charts/    # SVG chart components
│   │   ├── common/    # Common MD3 components
│   │   ├── layout/    # Layout components
│   │   └── motion/    # Animation components
│   ├── config/        # Configuration files
│   ├── contexts/      # React contexts
│   ├── graphql/       # GraphQL queries and mutations
│   ├── hooks/         # Custom React hooks
│   ├── lib/          # Library configurations
│   ├── pages/        # Page components
│   ├── services/     # Authentication and API services
│   ├── styles/       # Global styles
│   ├── theme/        # MD3 theme configuration
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
└── public/           # Static assets
```

## Available Commands

- `./run.sh setup` - Install dependencies and prepare the project
- `./run.sh dev` - Start development server
- `./run.sh build` - Create production build
- `./run.sh test` - Run tests
- `./run.sh deploy` - Deploy to Netlify
- `./run.sh help` - Show help message

## Contributing

1. Create a branch for your feature
2. Make your changes
3. Run tests to ensure everything works
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
