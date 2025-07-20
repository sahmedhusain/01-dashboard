// ============================================================================
// DASHBOARD TEMPLATE COMPONENT
// Template showing best practices for dashboard implementation with combined data
// ============================================================================

import React, { useMemo, useState } from 'react';
import { useDashboardData } from '../hooks/useGraphQLData';
import {
  processUserProfile,
  processSkillsData,
  processXPByProject,
  getRankTitle,
  getCohortNumber
} from '../utils/dataProcessing';
import { formatNumber } from '../utils/dataFormatting';

// ============================================================================
// LOADING COMPONENT
// ============================================================================

const DashboardLoading = () => (
  <div className="dashboard-loading">
    <div className="loading-grid">
      <div className="loading-card">
        <div className="loading-skeleton"></div>
      </div>
      <div className="loading-card">
        <div className="loading-skeleton"></div>
      </div>
      <div className="loading-card">
        <div className="loading-skeleton"></div>
      </div>
    </div>
    <p>Loading your dashboard...</p>
  </div>
);

// ============================================================================
// ERROR COMPONENT
// ============================================================================

const DashboardError = ({ error, onRetry }) => (
  <div className="dashboard-error">
    <h2>⚠️ Dashboard Error</h2>
    <p>{error.message}</p>
    <button onClick={onRetry} className="retry-button">
      🔄 Retry Loading
    </button>
  </div>
);

// ============================================================================
// WELCOME HEADER COMPONENT
// ============================================================================

const WelcomeHeader = ({ user, level, rankTitle, cohortNumber }) => (
  <div className="welcome-header">
    <div className="welcome-text">
      <h1>Welcome back, {user?.firstName || 'Student'}! 👋</h1>
      <p className="welcome-subtitle">
        Level {level} • {rankTitle} • Cohort {cohortNumber}
      </p>
    </div>
    
    <div className="user-avatar-large">
      {user?.firstName?.[0]}{user?.lastName?.[0]}
    </div>
  </div>
);

// ============================================================================
// STATS CARDS COMPONENT
// ============================================================================

const StatsCards = ({ totalXP, level, auditRatio, skillsCount, projectsCount }) => {
  const stats = [
    {
      title: 'Total XP',
      value: `${Math.round(totalXP / 1000)} KB XP`,
      icon: '⚡',
      color: '#007bff',
      subtitle: 'Experience Points'
    },
    {
      title: 'Current Level',
      value: level,
      icon: '📊',
      color: '#28a745',
      subtitle: 'Progress Level'
    },
    {
      title: 'Audit Ratio',
      value: `${auditRatio?.toFixed(1) || '0.0'} MB`,
      icon: '🎯',
      color: auditRatio >= 1 ? '#28a745' : '#dc3545',
      subtitle: 'Audit Performance'
    },
    {
      title: 'Skills',
      value: skillsCount,
      icon: '🛠️',
      color: '#ffc107',
      subtitle: 'Skills Acquired'
    },
    {
      title: 'Projects',
      value: projectsCount,
      icon: '📁',
      color: '#6f42c1',
      subtitle: 'Projects Completed'
    }
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-subtitle">{stat.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// SKILLS OVERVIEW COMPONENT
// ============================================================================

const SkillsOverview = ({ skills }) => {
  const topSkills = skills.slice(0, 5);
  const maxAmount = Math.max(...topSkills.map(skill => skill.amount));

  return (
    <div className="skills-overview">
      <h3>🛠️ Top Skills</h3>
      <div className="skills-list">
        {topSkills.map((skill, _index) => {
          const percentage = (skill.amount / maxAmount) * 100;
          
          return (
            <div key={skill.skill} className="skill-item">
              <div className="skill-info">
                <span className="skill-name">{skill.skill}</span>
                <span className="skill-amount">{skill.amount}</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {skills.length > 5 && (
        <p className="skills-more">
          +{skills.length - 5} more skills
        </p>
      )}
    </div>
  );
};

// ============================================================================
// PROJECTS OVERVIEW COMPONENT
// ============================================================================

const ProjectsOverview = ({ projects }) => {
  const topProjects = projects.slice(0, 3);

  return (
    <div className="projects-overview">
      <h3>📁 Recent Projects</h3>
      <div className="projects-list">
        {topProjects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-info">
              <div className="project-name">{project.name}</div>
              <div className="project-path">{project.path}</div>
            </div>
            <div className="project-xp">
              {formatNumber(project.amount)} XP
            </div>
          </div>
        ))}
      </div>
      
      {projects.length > 3 && (
        <p className="projects-more">
          +{projects.length - 3} more projects
        </p>
      )}
    </div>
  );
};

// ============================================================================
// PROGRESS INDICATOR COMPONENT
// ============================================================================

const ProgressIndicator = ({ level, totalXP }) => {
  // Calculate progress to next level (simplified calculation)
  const currentLevelXP = level * 1000; // Simplified: each level needs 1000 XP
  const nextLevelXP = (level + 1) * 1000;
  const progressXP = totalXP - currentLevelXP;
  const neededXP = nextLevelXP - currentLevelXP;
  const progressPercentage = Math.min((progressXP / neededXP) * 100, 100);

  return (
    <div className="progress-indicator">
      <h3>📈 Level Progress</h3>
      <div className="progress-info">
        <span>Level {level}</span>
        <span>{Math.round(progressPercentage)}%</span>
        <span>Level {level + 1}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="progress-text">
        {formatNumber(progressXP)} / {formatNumber(neededXP)} XP to next level
      </p>
    </div>
  );
};

// ============================================================================
// MAIN DASHBOARD TEMPLATE COMPONENT
// ============================================================================

const DashboardTemplate = ({ userLogin, refreshInterval = null }) => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  // Fetch dashboard data
  const { data, loading, error, refetch } = useDashboardData(userLogin);

  // Auto-refresh functionality
  React.useEffect(() => {
    if (!refreshInterval) return;
    
    const interval = setInterval(() => {
      refetch();
      setLastRefresh(new Date());
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval, refetch]);

  // Process data with memoization
  const processedData = useMemo(() => {
    if (!data) return null;

    const user = processUserProfile(data.user);
    const skills = processSkillsData(data.skills);
    const projects = processXPByProject(data.xpProjects);
    const rankTitle = getRankTitle(data.level);
    const cohortNumber = getCohortNumber(data.eventId || '');

    return {
      user,
      level: data.level,
      totalXP: data.totalXP,
      auditRatio: data.auditRatio?.auditRatio,
      skills,
      projects,
      rankTitle,
      cohortNumber,
    };
  }, [data]);

  // Handle loading state
  if (loading) {
    return <DashboardLoading />;
  }

  // Handle error state
  if (error) {
    return <DashboardError error={error} onRetry={refetch} />;
  }

  // Handle empty data
  if (!processedData) {
    return (
      <div className="dashboard-empty">
        <h2>📊 Dashboard</h2>
        <p>No data available for user: {userLogin}</p>
        <button onClick={refetch}>🔄 Try Again</button>
      </div>
    );
  }

  const handleRefresh = () => {
    refetch();
    setLastRefresh(new Date());
  };

  return (
    <div className="dashboard-template">
      {/* Header */}
      <div className="dashboard-header">
        <WelcomeHeader
          user={processedData.user}
          level={processedData.level}
          rankTitle={processedData.rankTitle}
          cohortNumber={processedData.cohortNumber}
        />
        
        <div className="dashboard-actions">
          <button onClick={handleRefresh} className="refresh-button">
            🔄 Refresh
          </button>
          <span className="last-refresh">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards
        totalXP={processedData.totalXP}
        level={processedData.level}
        auditRatio={processedData.auditRatio}
        skillsCount={processedData.skills.length}
        projectsCount={processedData.projects.length}
      />

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Progress Indicator */}
        <div className="dashboard-card">
          <ProgressIndicator
            level={processedData.level}
            totalXP={processedData.totalXP}
          />
        </div>

        {/* Skills Overview */}
        <div className="dashboard-card">
          <SkillsOverview skills={processedData.skills} />
        </div>

        {/* Projects Overview */}
        <div className="dashboard-card">
          <ProjectsOverview projects={processedData.projects} />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const dashboardStyles = `
.dashboard-template {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.dashboard-loading {
  text-align: center;
  padding: 40px;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.loading-card {
  height: 120px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.loading-skeleton {
  height: 100%;
  background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.dashboard-error {
  text-align: center;
  padding: 40px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 8px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border-radius: 12px;
}

.welcome-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome-text h1 {
  margin: 0;
  font-size: 28px;
}

.welcome-subtitle {
  margin: 5px 0 0 0;
  opacity: 0.9;
  font-size: 16px;
}

.user-avatar-large {
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}

.dashboard-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.refresh-button {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.refresh-button:hover {
  background: rgba(255,255,255,0.3);
}

.last-refresh {
  font-size: 12px;
  opacity: 0.8;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 4px solid #007bff;
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  font-size: 24px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.stat-title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.stat-subtitle {
  font-size: 12px;
  color: #999;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.dashboard-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.dashboard-card h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-weight: 600;
  color: #333;
}

.skill-amount {
  color: #666;
  font-size: 14px;
}

.skill-bar {
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #0056b3);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
}

.project-name {
  font-weight: 600;
  color: #333;
}

.project-path {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.project-xp {
  font-weight: bold;
  color: #007bff;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.progress-bar {
  height: 12px;
  background: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745, #20c997);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin: 0;
}

.skills-more,
.projects-more {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 15px;
  font-style: italic;
}

.dashboard-empty {
  text-align: center;
  padding: 40px;
  color: #666;
}

.retry-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
}

.retry-button:hover {
  background: #c82333;
}
`;

// Inject styles if in browser
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = dashboardStyles;
  document.head.appendChild(styleSheet);
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Basic usage
<DashboardTemplate userLogin="john.doe" />

// With auto-refresh every 5 minutes
<DashboardTemplate
  userLogin="john.doe"
  refreshInterval={5 * 60 * 1000}
/>

// Without auto-refresh
<DashboardTemplate
  userLogin="john.doe"
  refreshInterval={null}
/>
*/

export default DashboardTemplate;
