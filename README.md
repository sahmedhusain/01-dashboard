# GraphQL Profile Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/react-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind_css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)

A modern, responsive student profile dashboard for the reboot01 platform, built with React, GraphQL, and Tailwind CSS. This project provides a comprehensive interface for students to track their progress, view statistics, and analyze their performance.

## ✨ Features

### Core Functionality
- **Comprehensive Data Coverage**: 30+ specialized GraphQL queries for user profiles, progress, XP, audits, projects, events, and more.
- **Advanced Progression Tracking**: Detailed analysis of progress with completion rates and time-based metrics.
- **XP & Transaction System**: Full XP tracking with breakdowns by project type and transaction categorization.
- **Audit System**: In-depth audit analysis, including success rates, timing, and relationship mapping.
- **User Statistics**: Extensive ratio calculations and comparative performance analysis.
- **Project Management**: Detailed project data with difficulty analysis and completion patterns.
- **Advanced Search**: Powerful search with filtering, sorting, and pagination.
- **Data Export**: Export user data in multiple formats (JSON, CSV, XML).

### Performance & Optimization
- **Intelligent Caching**: Optimized Apollo Client cache with field-level policies for rapid data retrieval.
- **Query Batching**: Reduces network overhead by automatically batching concurrent queries.
- **Performance Monitoring**: Real-time tracking of query performance to identify and resolve bottlenecks.
- **Robust Error Handling**: Comprehensive error processing with retry logic and fallback mechanisms.

### UI & UX
- **Secure Authentication**: JWT-based login with secure token management and auto-refresh.
- **Interactive Charts**: Custom SVG-based data visualizations for XP, projects, and audits.
- **Responsive Design**: Mobile-first approach adhering to Material Design 3 principles for a seamless experience on any device.
- **Real-time Updates**: Live data synchronization with the platform.
- **Modern UI**: Glass morphism effects, smooth animations with Framer Motion, and intuitive micro-interactions.

## 📸 Screenshots & GIFs

### Main Dashboard
*A central hub showing an overview of user stats, recent projects, and activity.*

![Main Dashboard GIF](https://via.placeholder.com/800x450.gif?text=Main+Dashboard+View)

### Profile & Statistics
*Detailed user profile with level progression, skills, and comprehensive statistics.*

![Profile & Statistics GIF](https://via.placeholder.com/800x450.gif?text=Profile+and+Stats+View)

### Audits & Projects
*Visualizations for audit performance and project success rates.*

![Audits & Projects GIF](https://via.placeholder.com/800x450.gif?text=Audits+and+Projects+View)

### Advanced Search
*Powerful search and filtering capabilities to easily find users or projects.*

![Advanced Search GIF](https://via.placeholder.com/800x450.gif?text=Advanced+Search+View)


## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **State Management**: React Context API, Apollo Client
- **GraphQL**: Apollo Client with intelligent caching and performance monitoring
- **Animations**: Framer Motion
- **Charts**: Custom SVG-based visualizations
- **Authentication**: JWT tokens with automatic refresh
- **Icons**: Lucide React
- **Deployment**: Vercel-ready configuration

## 🏗️ Project Structure

The project follows a feature-based structure to keep the codebase organized and maintainable.

```
src/
├── assets/               # Static assets like images and SVGs
├── components/           # Reusable UI components (atomic design)
│   ├── charts/           # Data visualization charts
│   ├── dashboard/        # Components specific to the dashboard layout
│   └── ui/               # General-purpose UI elements (Button, Card, etc.)
├── config/               # Application configuration (e.g., motion variants)
├── contexts/             # React contexts for global state management
├── graphql/              # GraphQL client, queries, and type definitions
├── hooks/                # Custom React hooks for reusable logic
├── pages/                # Top-level page components
├── store/                # State management stores (e.g., Zustand, Redux)
├── styles/               # Global styles and CSS
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and helpers
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Access to reboot01 platform credentials

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd graphql
    ```

2.  **Install dependencies and run:**
    The `run.sh` script simplifies common tasks. To install dependencies and start the development server, run:
    ```bash
    ./run.sh dev
    ```

3.  **Open your browser:**
    Navigate to `http://localhost:5173`.

4.  **Login:**
    Use your reboot01 platform credentials to access the dashboard.

### Available Commands

The `run.sh` script provides several commands:

```bash
./run.sh dev          # Start the development server
./run.sh test         # Run all tests
./run.sh build        # Create a production build
./run.sh deploy       # Prepare the project for deployment
./run.sh help         # Display all available commands
```

## 🔧 Configuration

The application uses a dynamic configuration system based on environment variables, eliminating hardcoded values.

1.  **Create a `.env` file:**
    Copy the example file to create your local configuration.
    ```bash
    cp .env.example .env
    ```

2.  **Customize variables:**
    Update the `.env` file with your specific settings.

### Key Configuration Categories

-   **API Configuration**: `VITE_API_BASE_URL`, `VITE_GRAPHQL_ENDPOINT`, etc.
-   **Authentication Settings**: `VITE_AUTH_TOKEN_KEY`, `VITE_AUTH_TOKEN_EXPIRY`, etc.
-   **UI Theme Customization**: `VITE_THEME_PRIMARY`, `VITE_THEME_SECONDARY`, etc.
-   **Feature Flags**: `VITE_FEATURE_ADVANCED_CHARTS`, `VITE_FEATURE_REALTIME_UPDATES`, etc.
-   **Performance Settings**: `VITE_CACHE_ENABLED`, `VITE_DEFAULT_PAGE_SIZE`, etc.

The system supports different environments (`development`, `staging`, `production`) for tailored configurations.

## 🚀 Deployment

### Vercel (Recommended)

1.  **Connect Repository**: Import the project to Vercel.
2.  **Configure Build Settings**:
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`
    -   **Install Command**: `npm install`
3.  **Environment Variables**: Set up the required environment variables in the Vercel dashboard.
4.  **Deploy**: Trigger a deployment. For automated deployments, use the `run.sh` script:
    ```bash
    ./run.sh deploy
    ```

### Manual Deployment

1.  **Build the project**:
    ```bash
    ./run.sh build
    ```
2.  **Deploy**: Deploy the contents of the `dist` folder to your hosting provider.

## 🧪 Testing

The project includes a comprehensive testing setup:
-   **Unit Tests**: For individual components and functions.
-   **Integration Tests**: For GraphQL queries and component interactions.
-   **E2E Tests**: For end-to-end user flows.

```bash
./run.sh test         # Run all tests
./run.sh test:watch   # Run tests in watch mode
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Add tests if applicable.
5.  Commit your changes (`git commit -m 'Add some feature'`).
6.  Push to the branch (`git push origin feature/your-feature-name`).
7.  Submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**Sayed Ahmed Husain**
- Email: [sayedahmed97.sad@gmail.com](mailto:sayedahmed97.sad@gmail.com)

## 🙏 Acknowledgments

-   reboot01 platform for the API and data structure.
-   Material Design 3 for design principles.
-   The React and Vite communities for their excellent tools.

