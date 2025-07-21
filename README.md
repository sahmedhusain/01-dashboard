# GraphQL Profile Dashboard

A modern, responsive student profile dashboard for the reboot01 platform built with React, GraphQL, and Tailwind CSS.

## 🚀 Features

### Core GraphQL System

- **Comprehensive Query System**: 30+ specialized GraphQL queries covering all data types
- **Advanced User Progression**: Detailed progress tracking with completion rates and time-based analysis
- **XP & Transaction System**: Complete XP tracking with breakdown by project types and transaction categorization
- **Audit System**: Full audit analysis including success rates, timing analysis, and relationship mapping
- **User Statistics**: Comprehensive ratio calculations and comparative performance analysis
- **Project Management**: Detailed project data with difficulty analysis and completion patterns
- **Event & Group Management**: Event participation tracking and team collaboration metrics
- **Advanced Search**: Powerful search with filtering, sorting, and pagination capabilities

### Performance & Optimization

- **Intelligent Caching**: Optimized Apollo Client cache with field-level policies
- **Query Batching**: Automatic query batching for improved performance
- **Performance Monitoring**: Real-time query performance tracking and optimization
- **Error Handling**: Comprehensive error processing with retry logic and fallback mechanisms

### Additional Features

- **User Comparison Tools**: Compare performance metrics between users
- **Leaderboards**: Multiple leaderboard types with ranking and percentile calculations
- **Achievement System**: Comprehensive achievement tracking with rarity and progress indicators
- **Skill Recommendations**: AI-powered skill development recommendations
- **Data Export**: Export user data in multiple formats (JSON, CSV, XML)
- **Real-time Analytics**: Live performance insights and trend analysis

### UI & UX

- **Authentication**: JWT-based login with secure token management
- **Interactive Charts**: SVG-based data visualizations for XP, projects, and audits
- **Responsive Design**: Mobile-first approach with Material Design 3 principles
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
- **GraphQL**: Apollo Client with intelligent caching and performance monitoring
- **Animations**: Framer Motion with physics-based interactions
- **Charts**: Custom SVG-based visualizations
- **Authentication**: JWT tokens with automatic refresh
- **Testing**: Jest, React Testing Library, Apollo MockedProvider
- **Performance**: Query batching, intelligent caching, error retry logic
- **Validation**: Comprehensive input validation and error handling
- **Icons**: Lucide React
- **Deployment**: Vercel-ready configuration

## 📊 GraphQL System Architecture

The system implements a comprehensive GraphQL architecture with:

### Query Organization

```
├── User Management (Profile, Authentication, Roles)
├── Progress Tracking (Progress, Results, Completion Analysis)
├── XP & Transactions (XP tracking, Transaction history, Rewards)
├── Audit System (Given/Received audits, Success rates, Relationships)
├── Project Management (Submissions, Difficulty analysis, Patterns)
├── Event & Groups (Participation, Team collaboration, Performance)
├── Analytics (Statistics, Comparisons, Leaderboards)
└── Advanced Features (Search, Recommendations, Achievements)
```

### Performance Features

- **Intelligent Caching**: Field-level cache policies with automatic invalidation
- **Query Batching**: Automatic batching of concurrent queries (50ms window)
- **Performance Monitoring**: Real-time query performance tracking
- **Error Recovery**: Exponential backoff retry with circuit breaker pattern
- **Data Optimization**: Pagination, filtering, and selective field fetching

### Hook System

30+ specialized React hooks providing:

- Type-safe data fetching
- Automatic loading and error states
- Performance optimization
- Real-time updates
- Comprehensive analytics

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

### Dynamic Configuration System

The application now uses a comprehensive dynamic configuration system that eliminates all hardcoded values. All settings can be customized via environment variables.

### Environment Variables

Copy `.env.example` to `.env` and customize for your deployment:

```bash
cp .env.example .env
```

### Key Configuration Categories

#### **API Configuration**
```env
VITE_API_BASE_URL=https://learn.reboot01.com/api
VITE_GRAPHQL_ENDPOINT=https://learn.reboot01.com/api/graphql-engine/v1/graphql
VITE_AUTH_ENDPOINT=https://learn.reboot01.com/api/auth/signin
VITE_API_TIMEOUT=30000
```

#### **Authentication Settings**
```env
VITE_AUTH_TOKEN_KEY=auth_token
VITE_AUTH_TOKEN_EXPIRY=86400000
VITE_AUTH_AUTO_REFRESH=true
```

#### **UI Theme Customization**
```env
VITE_THEME_PRIMARY=#14b8a6
VITE_THEME_SECONDARY=#64748b
VITE_THEME_ACCENT=#d946ef
```

#### **Feature Flags**
```env
VITE_FEATURE_ADVANCED_CHARTS=true
VITE_FEATURE_REALTIME_UPDATES=false
VITE_FEATURE_PWA=true
```

#### **Performance Settings**
```env
VITE_CACHE_ENABLED=true
VITE_LAZY_LOADING=true
VITE_DEFAULT_PAGE_SIZE=20
```

### Multi-Environment Support

The configuration system supports different environments:

- **Development**: Optimized for debugging
- **Staging**: Enhanced tracking and monitoring
- **Production**: Maximum performance and security

### No Hardcoded Values

✅ **All hardcoded values have been eliminated:**
- API endpoints are configurable
- UI colors and sizes are dynamic
- Cache settings are adjustable
- Feature flags control functionality
- Avatar providers are configurable
- Security settings are customizable

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
