# GraphQL Profile Dashboard

A modern, responsive student profile dashboard for the reboot01 platform built with React, GraphQL, and Tailwind CSS.

## 🚀 Features

- **Authentication**: JWT-based login with secure token management
- **GraphQL Integration**: Real-time data fetching from reboot01 API
- **Interactive Charts**: SVG-based data visualizations for XP, projects, and audits
- **Responsive Design**: Mobile-first approach with Material Design 3 principles
- **Advanced Search**: Filter and search functionality across all sections
- **Real-time Updates**: Live data synchronization with the platform
- **Modern UI**: Glass morphism effects, smooth animations, and micro-interactions

## 📱 Screenshots

The dashboard includes:
- User profile with level progression and statistics
- XP progression charts and project success rates
- Audit history with filtering and sorting
- Technology skills visualization
- Advanced search capabilities

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **State Management**: React Context API, Apollo Client
- **Animations**: Framer Motion
- **Charts**: Custom SVG-based visualizations
- **Authentication**: JWT tokens with automatic refresh
- **API**: GraphQL with Apollo Client
- **Icons**: Lucide React
- **Deployment**: Vercel-ready configuration

## 🏗️ Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── charts/        # SVG chart components
│   │   │   ├── dashboard/     # Dashboard sections
│   │   │   └── ui/           # Reusable UI components
│   │   ├── contexts/         # React contexts
│   │   ├── graphql/          # GraphQL queries and client
│   │   ├── hooks/            # Custom React hooks
│   │   └── utils/            # Utility functions
│   ├── public/               # Static assets
│   └── dist/                 # Build output
├── resources/                # Project documentation
├── run.sh                   # Build and deployment script
└── vercel.json             # Deployment configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Access to reboot01 platform credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd graphql
   ```

2. **Install dependencies**
   ```bash
   ./run.sh dev
   ```
   This will automatically install dependencies and start the development server.

3. **Open your browser**
   Navigate to `http://localhost:5173`

4. **Login**
   Use your reboot01 platform credentials to access the dashboard.

### Available Commands

```bash
# Development
./run.sh dev          # Start development server
./run.sh test         # Run tests
./run.sh build        # Build for production
./run.sh deploy       # Prepare for deployment

# Help
./run.sh help         # Show all available commands
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_GRAPHQL_ENDPOINT=https://learn.reboot01.com/api/graphql-engine/v1/graphql
VITE_AUTH_ENDPOINT=https://learn.reboot01.com/api/auth/signin
```

### GraphQL Endpoint

The application connects to:
- **GraphQL API**: `https://learn.reboot01.com/api/graphql-engine/v1/graphql`
- **Authentication**: `https://learn.reboot01.com/api/auth/signin`

## 📊 Data Visualization

The dashboard includes several interactive charts:

1. **XP Progress Chart**: Line chart showing experience points over time
2. **Project Success Rate**: Pie chart displaying pass/fail ratios
3. **Audit Statistics**: Bar chart comparing audits given vs received
4. **Technology Skills**: Interactive skill cards with progress bars

All charts are built with custom SVG components and include:
- Smooth animations and transitions
- Interactive hover effects
- Responsive design
- Accessibility features

## 🎨 Design System

The application follows Material Design 3 principles with:

- **Color Palette**: Teal/cyan primary with accent colors
- **Typography**: Inter font family
- **Spacing**: 8px grid system
- **Animations**: Physics-based motion with Framer Motion
- **Components**: Reusable UI components with consistent styling

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind CSS responsive utilities
- **Navigation**: Bottom navigation for mobile, top tabs for desktop
- **Touch Friendly**: Appropriate touch targets and gestures

## 🔐 Authentication

- **JWT Tokens**: Secure authentication with automatic refresh
- **Session Management**: Persistent login state
- **Error Handling**: Comprehensive error messages and recovery
- **Security**: Token expiration and validation

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project to Vercel
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `frontend/dist`
     - Install Command: `npm install`

2. **Environment Variables**
   Set up environment variables in Vercel dashboard

3. **Deploy**
   ```bash
   ./run.sh deploy
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   ./run.sh build
   ```

2. **Deploy the `frontend/dist` folder** to your hosting provider

## 🧪 Testing

Testing setup includes:
- Unit tests for components
- Integration tests for GraphQL queries
- E2E tests for user flows

```bash
./run.sh test         # Run all tests
./run.sh test:watch   # Run tests in watch mode
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sayed Ahmed Husain** (sayedahmed97.sad@gmail.com)

## 🙏 Acknowledgments

- reboot01 platform for the API and data structure
- Material Design 3 for design principles
- React and Vite communities for excellent tooling

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
