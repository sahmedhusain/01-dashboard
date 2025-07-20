// ============================================================================
// USER PROFILE TEMPLATE COMPONENT
// Template showing best practices for user profile implementation
// ============================================================================

import { useMemo } from 'react';
import { useUserInfo, useTotalXP, useUserLevel } from '../hooks/useGraphQLData.js';
import {
  processUserProfile,
  processXPData,
  processLevelData,
  getRankTitle,
  formatDate
} from '../utils/dataProcessing.js';

// ============================================================================
// LOADING COMPONENT
// ============================================================================

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading user profile...</p>
  </div>
);

// ============================================================================
// ERROR COMPONENT
// ============================================================================

const ErrorMessage = ({ error, onRetry }) => (
  <div className="error-message">
    <h3>⚠️ Error Loading Profile</h3>
    <p>{error.message}</p>
    {onRetry && (
      <button onClick={onRetry} className="retry-button">
        🔄 Try Again
      </button>
    )}
  </div>
);

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

const EmptyState = () => (
  <div className="empty-state">
    <h3>👤 No Profile Data</h3>
    <p>Unable to load user profile information.</p>
  </div>
);

// ============================================================================
// USER STATS COMPONENT
// ============================================================================

const UserStats = ({ totalXP, level, rankTitle, auditRatio }) => (
  <div className="user-stats">
    <div className="stat-item">
      <div className="stat-value">{Math.round(totalXP / 1000)} KB XP</div>
      <div className="stat-label">Total XP</div>
    </div>

    <div className="stat-item">
      <div className="stat-value">{level}</div>
      <div className="stat-label">Level ({rankTitle})</div>
    </div>

    <div className="stat-item">
      <div className="stat-value">{auditRatio?.toFixed(1) || '0.0'} MB</div>
      <div className="stat-label">Audit Ratio</div>
    </div>
  </div>
);

// ============================================================================
// USER INFO COMPONENT
// ============================================================================

const UserInfo = ({ user }) => (
  <div className="user-info">
    <div className="user-avatar">
      {user.firstName?.[0]}{user.lastName?.[0]}
    </div>
    
    <div className="user-details">
      <h1 className="user-name">{user.fullName}</h1>
      <p className="user-login">@{user.login}</p>
      <p className="user-campus">📍 {user.campus}</p>
      {user.email && <p className="user-email">✉️ {user.email}</p>}
    </div>
  </div>
);

// ============================================================================
// RANK BADGE COMPONENT
// ============================================================================

const RankBadge = ({ level, rankTitle }) => {
  const badgeColor = useMemo(() => {
    if (level < 10) return '#6c757d'; // Gray
    if (level < 30) return '#007bff'; // Blue
    if (level < 50) return '#28a745'; // Green
    if (level < 60) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  }, [level]);

  return (
    <div className="rank-badge" style={{ backgroundColor: badgeColor }}>
      <div className="rank-level">Level {level}</div>
      <div className="rank-title">{rankTitle}</div>
    </div>
  );
};

// ============================================================================
// MAIN USER PROFILE TEMPLATE COMPONENT
// ============================================================================

const UserProfileTemplate = ({ userLogin, showStats = true, showRank = true }) => {
  // Fetch user data
  const { 
    data: userInfo, 
    loading: userLoading, 
    error: userError, 
    refetch: refetchUser 
  } = useUserInfo();
  
  const { 
    data: xpData, 
    loading: xpLoading, 
    error: xpError 
  } = useTotalXP();
  
  const { 
    data: levelData, 
    loading: levelLoading, 
    error: levelError 
  } = useUserLevel(userLogin);

  // Process data with memoization
  const processedData = useMemo(() => {
    const user = processUserProfile(userInfo);
    const totalXP = processXPData(xpData);
    const levelInfo = processLevelData(levelData);
    const rankTitle = getRankTitle(levelInfo.level);

    return {
      user,
      totalXP,
      level: levelInfo.level,
      rankTitle,
      eventId: levelInfo.eventId,
      campus: levelInfo.campus,
    };
  }, [userInfo, xpData, levelData]);

  // Handle loading states
  const isLoading = userLoading || (showStats && xpLoading) || (showRank && levelLoading);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Handle errors (prioritize user error as it's most critical)
  const error = userError || xpError || levelError;
  if (error) {
    return <ErrorMessage error={error} onRetry={refetchUser} />;
  }

  // Handle empty data
  if (!processedData.user) {
    return <EmptyState />;
  }

  return (
    <div className="user-profile-template">
      {/* User Basic Information */}
      <div className="profile-header">
        <UserInfo user={processedData.user} />
        
        {showRank && (
          <RankBadge 
            level={processedData.level} 
            rankTitle={processedData.rankTitle} 
          />
        )}
      </div>

      {/* User Statistics */}
      {showStats && (
        <div className="profile-stats">
          <h3>📊 Statistics</h3>
          <UserStats
            totalXP={processedData.totalXP}
            level={processedData.level}
            rankTitle={processedData.rankTitle}
            auditRatio={processedData.user.auditRatio}
          />
        </div>
      )}

      {/* Additional Information */}
      <div className="profile-details">
        <h3>ℹ️ Details</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">
              {formatDate(processedData.user.createdAt)}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Last Updated:</span>
            <span className="detail-value">
              {formatDate(processedData.user.updatedAt)}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Total Up:</span>
            <span className="detail-value">
              {processedData.user.totalUp || 0}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Total Down:</span>
            <span className="detail-value">
              {processedData.user.totalDown || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="profile-actions">
        <button onClick={refetchUser} className="refresh-button">
          🔄 Refresh Profile
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// STYLES (CSS-in-JS or external CSS)
// ============================================================================

const styles = `
.user-profile-template {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.retry-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.user-info {
  display: flex;
  gap: 20px;
  align-items: center;
}

.user-avatar {
  width: 80px;
  height: 80px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.user-details h1 {
  margin: 0 0 5px 0;
  color: #333;
}

.user-details p {
  margin: 2px 0;
  color: #666;
}

.rank-badge {
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
}

.rank-level {
  font-size: 18px;
  font-weight: bold;
}

.rank-title {
  font-size: 12px;
  opacity: 0.9;
}

.user-stats {
  display: flex;
  gap: 20px;
  justify-content: space-around;
  margin: 20px 0;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.profile-details {
  margin: 30px 0;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.detail-label {
  font-weight: 600;
  color: #495057;
}

.detail-value {
  color: #6c757d;
}

.profile-actions {
  text-align: center;
  margin-top: 30px;
}

.refresh-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.refresh-button:hover {
  background: #0056b3;
}
`;

// Inject styles if in browser
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Basic usage
<UserProfileTemplate userLogin="john.doe" />

// With custom options
<UserProfileTemplate
  userLogin="john.doe"
  showStats={true}
  showRank={true}
/>

// Without statistics
<UserProfileTemplate
  userLogin="john.doe"
  showStats={false}
/>
*/

export default UserProfileTemplate;
