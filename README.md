# 01 Profile Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/react-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind_css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)

Hey there! 👋 Welcome to the **01 Profile Dashboard** - your personal command center for tracking progress at reboot01. This isn't just another dashboard; it's a comprehensive tool that helps students like you understand their learning journey, celebrate achievements, and identify areas for growth.

Built with modern web technologies, this dashboard connects to the reboot01 platform to give you real-time insights into your coding education. Whether you're grinding through projects, participating in peer reviews, or climbing the XP leaderboard, this dashboard makes it easy to see exactly where you stand and where you're heading.

Think of it as your personal learning analytics platform - showing you not just what you've done, but helping you understand patterns in your progress, compare your performance with peers, and make data-driven decisions about your learning path.

## 🌐 Live

**Try it out now:** [01-dashboard-kappa.vercel.app/](https://01-dashboard-kappa.vercel.app/)

Experience the dashboard live with your reboot01 credentials!

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Database Schema (ERD)](#-database-schema-erd)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)

## ✨ What Makes This Dashboard Special

### 🎯 Core Learning Analytics

**Deep Progress Insights**
Ever wondered how you're really doing in your coding journey? This dashboard doesn't just show numbers - it tells a story. With over 30 specialized GraphQL queries, we pull in every piece of data about your learning: from the projects you've tackled, to the peer reviews you've given and received, to your XP gains over time. It's like having a personal learning coach that knows your every move.

**XP Tracking That Actually Helps**
XP isn't just points - it's your effort made visible. We break down your XP by project type, difficulty level, and time periods. Want to know if you're getting better at algorithms? Or if you're spending too much time on easy projects? The dashboard shows you exactly where your XP comes from and helps you optimize your learning strategy.

**Audit Analytics You Can Learn From**
Peer code reviews are crucial at reboot01, and this dashboard makes them actionable. See your audit ratio (how you perform as both reviewer and reviewee), track your improvement over time, and identify patterns in your feedback. Are you consistently catching bugs in others' code? Are you receiving constructive feedback? The data helps you become a better developer and reviewer.

**Smart Project Analysis**
Projects are the heart of reboot01 learning. We analyze your completion patterns, success rates across different difficulty levels, and even time spent on various project types. Are you stronger in front-end or back-end? Do you struggle with certain technologies? The dashboard helps you identify your strengths and areas for growth.

### ⚡ Performance That Feels Instant

**Intelligent Data Management**
Nobody likes waiting for dashboards to load. That's why we built smart caching that remembers what you've viewed and serves it up instantly. Apollo Client's field-level caching means your frequently accessed data loads in milliseconds, not seconds.

**Optimized Network Usage**
We batch multiple data requests together, so instead of making 20 separate calls to the API, we make 2-3 smart ones. This reduces load times and makes the whole experience feel snappy, even on slower connections.

**Built-in Performance Monitoring**
The dashboard watches its own performance. If queries are running slow, we log it and help you understand what's happening. This transparency means you always know the system is working optimally.

**Error Handling That Doesn't Break Your Flow**
Things go wrong sometimes - network issues, API timeouts, you name it. Our robust error handling catches these gracefully, retries failed requests automatically, and shows helpful messages instead of cryptic errors. Your learning flow stays uninterrupted.

### 🎨 User Experience That Delights

**Security You Can Trust**
Your reboot01 credentials are sacred. We use industry-standard JWT authentication with automatic token refresh, so you stay logged in securely without constant re-authentication. Your data is protected with the same security reboot01 uses.

**Charts That Tell Stories**
Forget boring bar graphs. Our custom SVG visualizations bring your data to life with interactive charts that respond to your clicks and hovers. Watch your XP climb over time, see your project completion patterns, and understand your audit performance trends - all in beautiful, responsive visuals.

**Works Everywhere, Looks Great Everywhere**
Whether you're on your laptop during a study session, checking progress on your phone during commute, or reviewing stats on a tablet, the dashboard adapts perfectly. Built mobile-first with Material Design 3 principles, it feels native on every device.

**Real-Time Sync**
As you complete projects, receive audits, or gain XP on the reboot01 platform, this dashboard updates automatically. No need to refresh - your progress appears as it happens.

**Modern Design That Inspires**
We didn't just make it functional - we made it beautiful. Glass morphism effects create depth, Framer Motion animations add delightful micro-interactions, and the overall design motivates you to keep learning. Plus, full dark mode support means you can learn comfortably anytime, day or night.

## 🛠️ The Technology Behind the Magic

We chose our tech stack carefully to create something that feels fast, reliable, and delightful to use. Here's what powers your dashboard:

### 🎨 Frontend Foundation
- **React 19**: The latest and greatest React, giving us cutting-edge features like the new compiler and improved concurrent rendering for buttery-smooth interactions
- **Vite**: Lightning-fast development server and build tool that makes development feel instant - no more waiting for builds!
- **Tailwind CSS**: Utility-first CSS framework that lets us build beautiful, responsive designs without writing custom CSS. Everything is styled consistently and looks great out of the box.

### 🔄 Smart Data Management
- **React Context API**: Simple, effective state management for user preferences and app-wide settings
- **Apollo Client**: Industry-leading GraphQL client that handles all our data fetching, caching, and synchronization. It's incredibly smart about when to fetch fresh data and when to use cached results.

### 📊 GraphQL & Performance
- **Apollo Client Advanced Features**: We leverage Apollo's intelligent caching with field-level policies, so your dashboard remembers what you've viewed and serves it up instantly. Query batching reduces network requests, and built-in performance monitoring ensures everything runs smoothly.

### ✨ Polish & User Experience
- **Framer Motion**: Powers all the smooth animations and micro-interactions that make the dashboard feel alive and responsive
- **Custom SVG Charts**: We built our own chart components using SVG for crisp, scalable visualizations that work perfectly on any screen size
- **JWT Authentication**: Secure token-based auth with automatic refresh, so you stay logged in without annoying re-authentication prompts
- **Lucide React Icons**: Beautiful, consistent iconography that scales perfectly and matches our design system

### 🚀 Deployment Ready
- **Vercel-Optimized**: Configured for instant deployment on Vercel with proper build settings, environment variable handling, and performance optimizations

## 🗄 reboot01 Database Schema & GraphQL API

The reboot01 platform uses a PostgreSQL database with a comprehensive GraphQL API. This section explains the actual database structure, relationships, and how to query the data using GraphQL.

### 📊 Core Database Tables

Based on the actual GraphQL queries and database structure, here are the main entities:

```mermaid
erDiagram
    user ||--o{ transaction : "earns"
    user ||--o{ progress : "achieves"
    user ||--o{ result : "obtains"
    user ||--o{ audit : "performs/receives"
    user ||--o{ group_user : "participates_in"
    user ||--o{ event_user : "attends"
    user ||--o{ group : "leads_as_captain"

    object ||--o{ transaction : "associated_with"
    object ||--o{ progress : "tracked_for"
    object ||--o{ result : "evaluated_for"
    object ||--o{ group : "organized_into"
    object ||--o{ event : "scheduled_for"

    event ||--o{ transaction : "generates"
    event ||--o{ progress : "enables"
    event ||--o{ result : "produces"
    event ||--o{ group : "hosts"
    event ||--o{ event_user : "attended_by"

    group ||--o{ progress : "achieves"
    group ||--o{ result : "obtains"
    group ||--o{ audit : "undergoes"
    group ||--o{ group_user : "composed_of"

    user {
        INTEGER id PK
        VARCHAR login UK
        VARCHAR firstName
        VARCHAR lastName
        DECIMAL auditRatio
        INTEGER totalUp
        INTEGER totalDown
        VARCHAR campus
        TEXT profile
        JSONB attrs
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
    }

    transaction {
        INTEGER id PK
        VARCHAR type
        INTEGER amount
        VARCHAR path
        VARCHAR campus
        JSONB attrs
        TIMESTAMP createdAt
        INTEGER userId FK
        INTEGER objectId FK
        INTEGER eventId FK
    }

    progress {
        INTEGER id PK
        DECIMAL grade
        BOOLEAN isDone
        VARCHAR path
        VARCHAR version
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
        INTEGER userId FK
        INTEGER objectId FK
        INTEGER groupId FK
        INTEGER eventId FK
    }

    result {
        INTEGER id PK
        DECIMAL grade
        VARCHAR type
        BOOLEAN isLast
        VARCHAR path
        VARCHAR version
        TIMESTAMP createdAt
        INTEGER userId FK
        INTEGER objectId FK
        INTEGER groupId FK
        INTEGER eventId FK
    }

    audit {
        INTEGER id PK
        DECIMAL grade
        VARCHAR version
        JSONB attrs
        TIMESTAMP endAt
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
        INTEGER auditorId FK
        INTEGER groupId FK
        INTEGER resultId FK
    }

    group {
        INTEGER id PK
        VARCHAR status
        VARCHAR path
        VARCHAR campus
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
        INTEGER captainId FK
        INTEGER objectId FK
        INTEGER eventId FK
    }

    event {
        INTEGER id PK
        VARCHAR path
        VARCHAR campus
        TIMESTAMP createdAt
        TIMESTAMP endAt
        INTEGER objectId FK
    }

    object {
        INTEGER id PK
        VARCHAR name
        VARCHAR type
        JSONB attrs
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
        VARCHAR campus
        INTEGER authorId FK
    }

    group_user {
        INTEGER id PK
        INTEGER userId FK
        INTEGER groupId FK
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
    }

    event_user {
        INTEGER id PK
        INTEGER userId FK
        INTEGER eventId FK
        INTEGER level
        TIMESTAMP createdAt
    }
```

### 🔑 Key Database Relationships

- **user** → **transaction**: Users earn XP and other rewards through transactions
- **user** → **progress**: Users achieve progress on projects and exercises
- **user** → **result**: Users obtain evaluation results from assessments
- **user** → **audit**: Users perform audits (as auditors) and receive audits (as auditees)
- **user** → **group_user**: Users participate in groups
- **user** → **event_user**: Users attend events and achieve levels
- **user** → **group**: Users can be captains of groups

- **object** → **transaction**: Objects (projects) are associated with XP transactions
- **object** → **progress**: Objects have progress tracking
- **object** → **result**: Objects have evaluation results
- **object** → **group**: Objects are organized into groups
- **object** → **event**: Objects are scheduled as events

- **event** → **transaction**: Events generate XP transactions
- **event** → **progress**: Events enable progress tracking
- **event** → **result**: Events produce evaluation results
- **event** → **group**: Events host groups
- **event** → **event_user**: Events have participants with levels

- **group** → **progress**: Groups achieve collective progress
- **group** → **result**: Groups obtain evaluation results
- **group** → **audit**: Groups undergo peer audits
- **group** → **group_user**: Groups consist of members

### 📝 GraphQL Query Examples

#### 🔐 Authentication Required
All queries require JWT authentication via Bearer token header.

#### 👤 Basic User Queries

**Get your own user data:**
```graphql
{
  user {
    id
    login
    firstName
    lastName
    auditRatio
    totalUp
    totalDown
    campus
  }
}
```

**Get specific user by ID:**
```graphql
query GetUser($id: Int!) {
  user_by_pk(id: $id) {
    id
    login
    firstName
    lastName
    auditRatio
  }
}
```

#### 💰 XP & Transaction Queries

**Get your XP transactions:**
```graphql
{
  transaction(where: {type: {_eq: "xp"}}, order_by: {createdAt: desc}) {
    id
    amount
    path
    createdAt
    objectId
    eventId
  }
}
```

**Get XP aggregates:**
```graphql
{
  transaction_aggregate(where: {type: {_eq: "xp"}}) {
    aggregate {
      sum {
        amount
      }
      avg {
        amount
      }
      count
    }
  }
}
```

#### 📊 Progress & Results Queries

**Get your project progress:**
```graphql
{
  progress(order_by: {createdAt: desc}) {
    id
    grade
    isDone
    path
    createdAt
    objectId
    groupId
  }
}
```

**Get your evaluation results:**
```graphql
{
  result(order_by: {createdAt: desc}) {
    id
    grade
    type
    path
    createdAt
    objectId
  }
}
```

#### 🔍 Audit Queries

**Get audits you've performed:**
```graphql
{
  audit(where: {auditorId: {_eq: YOUR_USER_ID}}) {
    id
    grade
    createdAt
    groupId
    resultId
  }
}
```

**Get audits performed on your work:**
```graphql
{
  audit(where: {result: {userId: {_eq: YOUR_USER_ID}}}) {
    id
    grade
    createdAt
    auditorId
  }
}
```

#### 👥 Group & Event Queries

**Get your groups:**
```graphql
{
  group_user {
    id
    groupId
    createdAt
    group {
      id
      status
      path
      captainId
    }
  }
}
```

**Get your event participation:**
```graphql
{
  event_user {
    id
    eventId
    level
    createdAt
    event {
      id
      path
      campus
    }
  }
}
```

#### 🏗️ Object/Project Queries

**Get available projects:**
```graphql
{
  object {
    id
    name
    type
    attrs
    campus
  }
}
```

### 🛠️ Using GraphiQL Explorer

To explore the API interactively:

1. **Access GraphiQL**: Visit `https://learn.reboot01.com/api/graphql-engine/v1/graphql` (requires login)
2. **Authentication**: Include your JWT token in the request headers
3. **Explore Schema**: Use the documentation explorer to see all available queries and types
4. **Test Queries**: Write and test queries in real-time
5. **View Results**: See exactly what data is returned

### 📋 Query Types Demonstrated

This project uses all required GraphQL query patterns:

- ✅ **Simple queries**: `user { id login }`
- ✅ **Nested queries**: `result { user { login } }`
- ✅ **Queries with arguments**: `user_by_pk(id: 123)`
- ✅ **Where clauses**: `transaction(where: {type: {_eq: "xp"}})`
- ✅ **Order by**: `progress(order_by: {createdAt: desc})`
- ✅ **Aggregations**: `transaction_aggregate { aggregate { sum { amount } } }`

### 🔗 Database Relations Documentation

For complete database structure and relations, see:
- [Database Structure](https://public.01-edu.org/docs/db/database-structure)
- [Database Relations](https://public.01-edu.org/docs/db/db-relations)

This ERD and query examples accurately reflect the reboot01 platform's actual database structure and GraphQL API capabilities.

## 📸 Screenshots

### Profile Dashboard
*A central hub showing an overview of user stats, recent projects, and activity.*

![Main Dashboard](/screenshots/localhost_5173_dashboard%20(3).png)
![Main Dashboard](/screenshots/localhost_5173_dashboard%20(4).png)

### Analytics & Statistics
*Detailed user profile with level progression, skills, and comprehensive statistics.*

![Analytics & Statistics](/screenshots/localhost_5173_dashboard%20(1).png)
![Analytics & Statistics](/screenshots/localhost_5173_dashboard%20(2).png)
![Analytics & Statistics](/screenshots/localhost_5173_dashboard.png)

## 🏗️ Project Structure

The project follows a feature-based architecture to ensure maintainability and scalability.

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

## 🚀 Let's Get You Set Up!

Getting started with your personal dashboard is straightforward. We'll have you up and running in just a few minutes!

### 📋 What You'll Need First

Before we begin, make sure you have these ready:
- **Node.js 18 or higher** - The runtime that powers modern JavaScript applications
- **npm** - Comes bundled with Node.js, handles package management
- **reboot01 account** - You'll need your login credentials to access the platform data

### 🛠️ Step-by-Step Installation

**1. Get the Code**
```bash
git clone <repository-url>
cd 01-dashboard
```
This downloads all the project files to your computer and navigates into the project directory.

**2. Fire Up the Development Server**
```bash
./run.sh dev
```
Our handy script takes care of everything - installing dependencies, setting up the environment, and starting the development server. You'll see your dashboard come to life!

**3. Open Your Dashboard**
Point your browser to `http://localhost:5173` - that's where your dashboard lives during development.

**4. Sign In**
Use your reboot01 username and password to log in. The dashboard connects directly to the reboot01 platform to fetch your data securely.

### 🎛️ Available Commands

The `run.sh` script is your command center for common tasks:

```bash
./run.sh dev          # 🚀 Start development server - your go-to for coding
./run.sh test         # ✅ Run all tests to ensure everything works
./run.sh build        # 📦 Create production build for deployment
./run.sh deploy       # 🌐 Deploy to hosting platform (when ready)
./run.sh help         # ❓ Show all available commands and options
```

**Pro tip**: During development, keep `./run.sh dev` running in one terminal. It automatically reloads when you make changes - no need to restart manually!

## 🔧 Configuration & Customization

The dashboard is designed to be highly configurable without touching the code. Everything is controlled through environment variables, making it easy to customize for different environments or personal preferences.

### 🛠️ Setting Up Your Environment

**1. Create Your Configuration File**
```bash
cp .env.example .env
```
This creates your personal configuration file based on our example template.

**2. Customize to Your Needs**
Open the `.env` file and adjust the settings. Don't worry - we've included helpful comments explaining what each variable does!

### 🎛️ Configuration Categories

Here's what you can customize:

**🔗 API & Data Connections**
- `VITE_API_BASE_URL` - Where your reboot01 API lives
- `VITE_GRAPHQL_ENDPOINT` - The GraphQL endpoint for data queries
- Control timeouts, retry logic, and connection settings

**🔐 Authentication & Security**
- `VITE_AUTH_TOKEN_KEY` - How we store your login tokens
- `VITE_AUTH_TOKEN_EXPIRY` - When tokens should refresh automatically
- Security settings to keep your data safe

**🎨 Look & Feel**
- `VITE_THEME_PRIMARY` - Your main brand color
- `VITE_THEME_SECONDARY` - Accent colors for highlights
- Dark/light mode preferences and custom styling

**⚡ Performance & Features**
- `VITE_FEATURE_ADVANCED_CHARTS` - Enable/disable advanced visualizations
- `VITE_FEATURE_REALTIME_UPDATES` - Control live data synchronization
- `VITE_CACHE_ENABLED` - Smart caching for faster loading
- `VITE_DEFAULT_PAGE_SIZE` - How many items to show per page

### 🌍 Environment Support

The dashboard works seamlessly across different environments:

- **Development** - Your local setup with hot reloading and detailed logging
- **Staging** - Test environment that mirrors production
- **Production** - Optimized for speed and reliability

Each environment can have its own configuration, so you can safely test changes before going live.

### 💡 Pro Tips

- **Start Simple**: Most users only need to set the API endpoints and authentication settings
- **Environment Variables**: Never commit your `.env` file - it contains sensitive information
- **Documentation**: Check the comments in `.env.example` for detailed explanations
- **Testing Changes**: Restart your dev server after configuration changes to see them take effect

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

This dashboard wouldn't have been possible without the incredible support and resources from these amazing communities and platforms. A special thank you to everyone who contributed to making this learning journey possible!

### 🚀 **reboot01 Platform**
- **The Heart of Our Data**: Huge gratitude to the reboot01 platform for providing the comprehensive GraphQL API that powers all our analytics. Your well-structured database and thoughtful API design made building this dashboard an absolute pleasure.
- **Learning Environment**: Thank you for creating such an innovative coding education platform that challenges and inspires students worldwide.
- **Community**: The reboot01 community of learners, mentors, and staff who make the platform what it is today.

### 🎨 **Material Design 3 - Design Excellence**
Material Design 3 has been our guiding light for creating beautiful, accessible, and intuitive user interfaces. Here's how we've incorporated their principles:

#### **Core Design Principles Applied:**
- **Responsive Design**: Mobile-first approach ensuring the dashboard works flawlessly across all device sizes
- **Accessibility First**: High contrast ratios, proper focus states, and screen reader support
- **Consistent Spacing**: Using the Material Design token system for harmonious layouts
- **Meaningful Motion**: Subtle animations that enhance user experience without being distracting

#### **Material Design 3 Resources We Used:**
- **[Material Design Guidelines](https://material.io/design)** - The foundation of our design system
- **[Material Design Components](https://material.io/components)** - Inspiration for our UI component library
- **[Material Design Icons](https://fonts.google.com/icons)** - Consistent iconography throughout the app
- **[Material Color System](https://material.io/design/color)** - Our color palette and theming approach
- **[Material Typography](https://material.io/design/typography)** - Font scales and text styling
- **[Material Elevation](https://material.io/design/environment/surfaces)** - Surface and shadow system

#### **Design System Highlights:**
```
🎯 Design Tokens Used:
├── Color: Dynamic color system with light/dark themes
├── Typography: Display, headline, title, body scales
├── Spacing: 4px baseline grid system
├── Elevation: 5 levels of surface shadows
└── Shape: Rounded corners and border radius system
```

### ⚛️ **React Ecosystem**
- **React 19**: Thank you for pushing the boundaries of what's possible with modern React features
- **Vite**: Lightning-fast development experience that makes coding enjoyable
- **Framer Motion**: Beautiful animations that bring our interfaces to life
- **React Router**: Seamless navigation and routing capabilities

### 🎭 **UI/UX Libraries & Tools**
- **Tailwind CSS**: Utility-first CSS that enabled rapid, consistent styling
- **Lucide Icons**: Beautiful, customizable icon set that matches our design language
- **Radix UI**: Accessible, unstyled components that form the foundation of our UI

### 📊 **Data & GraphQL**
- **Apollo Client**: Intelligent GraphQL client with caching and performance optimizations
- **GraphQL**: The query language that makes our data fetching elegant and efficient
- **Hasura GraphQL Engine**: The powerful GraphQL API that serves the reboot01 platform

### 🛠️ **Development Tools**
- **TypeScript**: Type safety that catches errors before they reach production
- **ESLint & Prettier**: Code quality and consistency tools

### 🌟 **Open Source Community**
A massive thank you to all the maintainers, contributors, and communities behind these open-source projects. Your dedication to creating high-quality, free tools empowers developers worldwide to build amazing things.

### 📚 **Learning Resources**
- **Reboot01 Documentation**: Comprehensive guides that helped us understand the platform
- **React Documentation**: Always reliable and well-written

### 💝 **Special Thanks**
To the reboot01 Bahrain campus community for the inspiration and feedback during development. Your enthusiasm for learning and coding excellence drives us to create better tools.

---

**Built with ❤️ for the reboot01 community.**

**⭐ If you find this project useful, please give it a star!**
