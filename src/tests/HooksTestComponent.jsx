// ============================================================================
// REACT HOOKS TEST COMPONENT
// Simple test component to validate GraphQL hooks work correctly
// ============================================================================

import React, { useState } from 'react';
import {
  useUserInfo,
  useTotalXP,
  useUserLevel,
  useUserSkills,
  useDashboardData,
  useConditionalGraphQLData,
  useManualGraphQLData,
} from '../hooks/useGraphQLData.js';
import { graphqlService } from '../graphql/dataService.js';

// ============================================================================
// INDIVIDUAL HOOK TEST COMPONENTS
// ============================================================================

const UserInfoTest = () => {
  const { data, loading, error, refetch } = useUserInfo();
  
  return (
    <div className="test-section">
      <h3>👤 User Info Hook Test</h3>
      <div className="test-status">
        Status: {loading ? '🔄 Loading' : error ? '❌ Error' : '✅ Success'}
      </div>
      {error && <div className="error">Error: {error.message}</div>}
      {data && (
        <div className="data-preview">
          <p>Login: {data.login}</p>
          <p>Name: {data.firstName} {data.lastName}</p>
          <p>Campus: {data.campus}</p>
        </div>
      )}
      <button onClick={refetch}>🔄 Refetch</button>
    </div>
  );
};

const TotalXPTest = () => {
  const { data, loading, error } = useTotalXP();
  
  return (
    <div className="test-section">
      <h3>⚡ Total XP Hook Test</h3>
      <div className="test-status">
        Status: {loading ? '🔄 Loading' : error ? '❌ Error' : '✅ Success'}
      </div>
      {error && <div className="error">Error: {error.message}</div>}
      {data && (
        <div className="data-preview">
          <p>Total XP: {data.aggregate?.sum?.amount || 0}</p>
        </div>
      )}
    </div>
  );
};

const UserLevelTest = ({ userLogin }) => {
  const { data, loading, error } = useUserLevel(userLogin);
  
  return (
    <div className="test-section">
      <h3>📊 User Level Hook Test</h3>
      <div className="test-status">
        Status: {loading ? '🔄 Loading' : error ? '❌ Error' : '✅ Success'}
      </div>
      {error && <div className="error">Error: {error.message}</div>}
      {data && (
        <div className="data-preview">
          <p>Level: {data.level}</p>
          <p>Event ID: {data.event?.id}</p>
          <p>Campus: {data.event?.campus}</p>
        </div>
      )}
    </div>
  );
};

const UserSkillsTest = () => {
  const { data, loading, error } = useUserSkills();
  
  return (
    <div className="test-section">
      <h3>🛠️ User Skills Hook Test</h3>
      <div className="test-status">
        Status: {loading ? '🔄 Loading' : error ? '❌ Error' : '✅ Success'}
      </div>
      {error && <div className="error">Error: {error.message}</div>}
      {data && (
        <div className="data-preview">
          <p>Skills Count: {data.length}</p>
          {data.slice(0, 3).map((skill, index) => (
            <p key={index}>{skill.type}: {skill.amount}</p>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardDataTest = ({ userLogin }) => {
  const { data, loading, error, refetch } = useDashboardData(userLogin);
  
  return (
    <div className="test-section">
      <h3>📈 Dashboard Data Hook Test</h3>
      <div className="test-status">
        Status: {loading ? '🔄 Loading' : error ? '❌ Error' : '✅ Success'}
      </div>
      {error && <div className="error">Error: {error.message}</div>}
      {data && (
        <div className="data-preview">
          <p>User: {data.user?.firstName} {data.user?.lastName}</p>
          <p>Level: {data.level}</p>
          <p>Total XP: {data.totalXP}</p>
          <p>Audit Ratio: {data.auditRatio?.auditRatio}</p>
          <p>Skills: {data.skills?.length || 0}</p>
          <p>XP Projects: {data.xpProjects?.length || 0}</p>
          <p>Groups: {data.groups?.length || 0}</p>
        </div>
      )}
      <button onClick={refetch}>🔄 Refetch Dashboard</button>
    </div>
  );
};

// ============================================================================
// CONDITIONAL AND MANUAL HOOK TESTS
// ============================================================================

const ConditionalHookTest = () => {
  const [enabled, setEnabled] = useState(false);
  const { data, loading, error } = useConditionalGraphQLData(
    () => graphqlService.getUserInfo(),
    enabled
  );
  
  return (
    <div className="test-section">
      <h3>🔀 Conditional Hook Test</h3>
      <div className="test-controls">
        <label>
          <input 
            type="checkbox" 
            checked={enabled} 
            onChange={(e) => setEnabled(e.target.checked)} 
          />
          Enable Data Fetching
        </label>
      </div>
      <div className="test-status">
        Status: {loading ? '🔄 Loading' : error ? '❌ Error' : data ? '✅ Success' : '⏸️ Disabled'}
      </div>
      {error && <div className="error">Error: {error.message}</div>}
      {data && (
        <div className="data-preview">
          <p>User: {data.login}</p>
        </div>
      )}
    </div>
  );
};

const ManualHookTest = () => {
  const { data, loading, error, execute } = useManualGraphQLData(
    () => graphqlService.getUserInfo()
  );
  
  return (
    <div className="test-section">
      <h3>🎯 Manual Hook Test</h3>
      <div className="test-controls">
        <button onClick={execute} disabled={loading}>
          {loading ? '🔄 Loading...' : '🚀 Fetch Data'}
        </button>
      </div>
      <div className="test-status">
        Status: {loading ? '🔄 Loading' : error ? '❌ Error' : data ? '✅ Success' : '⏳ Ready'}
      </div>
      {error && <div className="error">Error: {error.message}</div>}
      {data && (
        <div className="data-preview">
          <p>User: {data.login}</p>
          <p>Campus: {data.campus}</p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN TEST COMPONENT
// ============================================================================

const HooksTestComponent = () => {
  const [userLogin, setUserLogin] = useState('');
  const [testMode, setTestMode] = useState('basic');
  
  return (
    <div className="hooks-test-container">
      <div className="test-header">
        <h1>🧪 GraphQL Hooks Test Suite</h1>
        <p>Test all GraphQL hooks to ensure they work correctly</p>
      </div>
      
      <div className="test-controls">
        <div className="control-group">
          <label>
            User Login (for parameterized hooks):
            <input 
              type="text" 
              value={userLogin} 
              onChange={(e) => setUserLogin(e.target.value)}
              placeholder="Enter user login"
            />
          </label>
        </div>
        
        <div className="control-group">
          <label>
            Test Mode:
            <select value={testMode} onChange={(e) => setTestMode(e.target.value)}>
              <option value="basic">Basic Hooks</option>
              <option value="advanced">Advanced Hooks</option>
              <option value="dashboard">Dashboard Hook</option>
              <option value="utility">Utility Hooks</option>
            </select>
          </label>
        </div>
      </div>
      
      <div className="test-sections">
        {testMode === 'basic' && (
          <>
            <UserInfoTest />
            <TotalXPTest />
            <UserSkillsTest />
          </>
        )}
        
        {testMode === 'advanced' && userLogin && (
          <>
            <UserLevelTest userLogin={userLogin} />
          </>
        )}
        
        {testMode === 'dashboard' && userLogin && (
          <>
            <DashboardDataTest userLogin={userLogin} />
          </>
        )}
        
        {testMode === 'utility' && (
          <>
            <ConditionalHookTest />
            <ManualHookTest />
          </>
        )}
        
        {(testMode === 'advanced' || testMode === 'dashboard') && !userLogin && (
          <div className="warning">
            ⚠️ Please enter a user login to test parameterized hooks
          </div>
        )}
      </div>
      
      <div className="test-info">
        <h3>ℹ️ Test Information</h3>
        <ul>
          <li><strong>Basic Hooks:</strong> Test hooks that don't require parameters</li>
          <li><strong>Advanced Hooks:</strong> Test hooks that require user login parameter</li>
          <li><strong>Dashboard Hook:</strong> Test the combined dashboard data hook</li>
          <li><strong>Utility Hooks:</strong> Test conditional and manual hooks</li>
        </ul>
        <p><strong>Note:</strong> These tests require a valid JWT token in localStorage to work properly.</p>
      </div>
    </div>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = `
.hooks-test-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.test-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.test-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #e9ecef;
  border-radius: 8px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-group label {
  font-weight: 600;
}

.control-group input,
.control-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.test-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.test-section {
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: white;
}

.test-section h3 {
  margin: 0 0 15px 0;
  color: #495057;
}

.test-status {
  font-weight: 600;
  margin-bottom: 10px;
}

.error {
  color: #dc3545;
  background: #f8d7da;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

.data-preview {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  margin: 10px 0;
}

.data-preview p {
  margin: 5px 0;
  font-family: monospace;
}

.test-controls button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.test-controls button:hover {
  background: #0056b3;
}

.test-controls button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.warning {
  background: #fff3cd;
  color: #856404;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
}

.test-info {
  background: #d1ecf1;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
}

.test-info h3 {
  margin-top: 0;
  color: #0c5460;
}

.test-info ul {
  margin: 15px 0;
}

.test-info li {
  margin: 5px 0;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default HooksTestComponent;
