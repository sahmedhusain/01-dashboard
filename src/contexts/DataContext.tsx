// ============================================================================
// DATA CONTEXT - USING NEW GRAPHQL SYSTEM
// Simplified and improved data context implementation
// ============================================================================

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useDashboardData } from '../hooks/useGraphQLData';
import { useAuth } from './authUtils';
import {
  processUserProfile,
  processSkillsData,
  processAuditRatio,
  processXPByProject,
  processXPTimeline,
  processAuditTimeline,
  processProjectResults,
  getRankTitle,
  getCohortNumber
} from '../utils/dataProcessing';
import { formatNumber, formatXP, formatAuditRatio } from '../utils/dataFormatting';

// Types for the data context
interface ProcessedUser {
  id: string;
  login: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  campus?: Array<{
    id: string;
    name: string;
    country?: string;
    city?: string;
  }>;
}

interface ProcessedSkill {
  id: string;
  name: string;
  type: string;
  amount: number;
}

interface ProcessedProject {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
}

interface ProcessedTimeline {
  date: string;
  amount: number;
  cumulative: number;
}

interface ProcessedProjectResult {
  id: string;
  name: string;
  grade: number;
  status: string;
  createdAt: string;
}

interface DataContextType {
  // User information
  user: ProcessedUser | null;

  // XP and level data
  totalXP: number;
  level: number;
  rankTitle: string;
  cohortNumber: string;

  // Audit data
  auditRatio: number;
  totalUp: number;
  totalDown: number;

  // Skills data
  skills: ProcessedSkill[];
  skillsCount: number;
  topSkills: ProcessedSkill[];

  // Projects data
  xpProjects: ProcessedProject[];
  projectsCount: number;
  topProjects: ProcessedProject[];

  // Timeline data
  xpTimeline: ProcessedTimeline[];
  auditTimeline: ProcessedTimeline[];

  // Project results data
  projectResults: ProcessedProjectResult[];
  totalProjects: number;
  passedProjects: number;
  failedProjects: number;
  passRate: number;

  // Groups data
  groups: Array<{
    id: string;
    path: string;
    captainLogin: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    object: {
      id: string;
      name: string;
      type: string;
    };
  }>;
  groupsCount: number;

  // Computed statistics
  statistics: {
    totalXP: string;
    level: number;
    auditRatio: string;
    skillsCount: number;
    projectsCount: number;
    passRate: string;
  };

  // State
  loading: boolean;
  error: Error | null;
  refetch: () => void;

  // Additional properties for compatibility
  lastUpdated?: string;
  isStale?: boolean;
  refresh?: () => Promise<void>;
  refetchAll?: () => Promise<void>;
  userStatistics?: {
    totalXP: string | number;
    level: number;
    auditRatio: string;
    skillsCount: number;
    projectsCount: number;
    passRate: string;
    projectResults?: any[];
    skills?: any[];
    xpTimeline?: any[];
  };
  transactions?: any[];

  // Additional data properties (removed duplicates)
}

interface DataProviderProps {
  children: ReactNode;
}

// Create context
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Custom hook to use the context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Data provider using new GraphQL hooks
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Get user ID from auth context (JWT contains user.id)
  const { user } = useAuth();
  const userId = user?.id;

  // Use the new dashboard hook for combined data
  const { data: dashboardData, loading, error, refetch } = useDashboardData(userId);
  
  // Process the data using new utility functions
  const processedData = useMemo(() => {
    if (!dashboardData) return null;
    
    const user = processUserProfile(dashboardData.user);
    const auditRatio = processAuditRatio(dashboardData.auditRatio);
    const skills = processSkillsData(dashboardData.skills || []);
    const xpProjects = processXPByProject(dashboardData.xpProjects || []);
    const xpTimeline = processXPTimeline(dashboardData.xpTimeline || []);
    const auditTimeline = processAuditTimeline(dashboardData.auditTimeline || []);
    const projectResults = processProjectResults(dashboardData.projectResults || []);
    
    return {
      // User information
      user,
      
      // XP and level data
      totalXP: dashboardData.totalXP || 0,
      level: dashboardData.level || 0,
      rankTitle: getRankTitle(dashboardData.level || 0),
      cohortNumber: getCohortNumber(dashboardData.user?.eventId || '').toString(),
      
      // Audit data
      auditRatio: auditRatio.ratio,
      totalUp: auditRatio.totalUp,
      totalDown: auditRatio.totalDown,
      
      // Skills data
      skills,
      skillsCount: skills.length,
      topSkills: skills.slice(0, 5),
      
      // Projects data
      xpProjects,
      projectsCount: xpProjects.length,
      topProjects: xpProjects.slice(0, 5),

      // Timeline data
      xpTimeline,
      auditTimeline,

      // Project results data
      projectResults: projectResults.results,
      totalProjects: projectResults.totalProjects,
      passedProjects: projectResults.passedProjects,
      failedProjects: projectResults.failedProjects,
      passRate: projectResults.passRate,

      // Groups data
      groups: dashboardData.groups || [],
      groupsCount: (dashboardData.groups || []).length,
      
      // Computed statistics
      statistics: {
        totalXP: formatNumber(dashboardData.totalXP || 0),
        level: dashboardData.level || 0,
        auditRatio: auditRatio.ratio?.toFixed(2) || '0.00',
        skillsCount: skills.length,
        projectsCount: xpProjects.length,
        groupsCount: (dashboardData.groups || []).length,
      },
      
      // Metadata
      lastUpdated: new Date().toISOString(),
      isStale: false,
    };
  }, [dashboardData]);
  
  // Context value with proper structure for dashboard components
  const contextValue = {
    // Data
    ...processedData,

    // Loading states
    loading,
    error,

    // Actions
    refetch,
    refresh: refetch,
    refetchAll: refetch,

    // Dashboard-specific data structure
    userStatistics: {
      totalXP: processedData?.totalXP || 0,
      level: processedData?.level || 0,
      auditRatio: processedData?.auditRatio || 0,
      skillsCount: processedData?.skills?.length || 0,
      projectsCount: processedData?.projectResults?.length || 0,
      passRate: processedData?.passRate || '0%',
      projectResults: processedData?.projectResults || [],
      skills: processedData?.skills || [],
      xpTimeline: processedData?.xpTimeline || [],
    },

    // Computed values
    isAuthenticated: !!userId,
    hasData: !!processedData,
    isEmpty: !loading && !error && !processedData,

    // Helper functions
    getFormattedXP: () => formatXP(processedData?.totalXP || 0),
    getFormattedAuditRatio: () => formatAuditRatio(processedData?.auditRatio || 0),
    getRankInfo: () => ({
      level: processedData?.level || 0,
      title: processedData?.rankTitle || 'Aspiring developer',
      cohort: processedData?.cohortNumber || 3,
    }),
  };
  
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// ============================================================================
// LEGACY COMPATIBILITY LAYER
// ============================================================================

// Hook that provides compatibility with the old DataContext interface
export const useLegacyDataCompatibility = () => {
  const data = useData();
  
  // Map new data structure to old interface for backward compatibility
  return {
    // Old interface mapping
    user: data.user,
    userStatistics: {
      totalXP: data.totalXP,
      userLevel: data.level,
      levelProgress: {
        currentLevel: data.level,
        progressPercentage: 0, // Simplified
        xpNeeded: 1000, // Simplified
      },
    },
    
    // XP data
    totalXP: data.totalXP,
    xpByProject: data.xpProjects,
    xpTimeline: data.xpTimeline || [],
    xpStatistics: {
      totalXP: data.totalXP,
      projectCount: data.projectsCount,
    },
    
    // Project data
    totalProjects: data.totalProjects,
    passedProjects: data.passedProjects,
    failedProjects: data.failedProjects,
    passRate: data.passRate,
    projectResults: data.projectResults,
    
    // Audit data
    auditRatio: data.auditRatio,
    auditsGiven: data.totalUp,
    auditsReceived: data.totalDown,
    auditStatistics: {
      ratio: data.auditRatio,
      totalUp: data.totalUp,
      totalDown: data.totalDown,
    },
    
    // Progress data (simplified)
    totalProgress: data.projectsCount,
    completedProgress: data.projectsCount,
    inProgressItems: 0,
    completionRate: 100,
    progressData: [],
    
    // Skill data
    skills: data.skills,
    skillStatistics: {
      totalSkills: data.skillsCount,
      topSkills: data.topSkills,
    },
    
    // Computed values
    userLevel: data.level,
    levelProgress: {
      currentLevel: data.level,
      progressPercentage: 0,
      xpNeeded: 1000,
    },
    
    // States
    loading: data.loading,
    error: data.error,
    lastUpdated: data.lastUpdated,
    isStale: data.isStale,
    
    // Actions
    refetch: data.refetch,
    refresh: data.refresh,
    refetchAll: data.refresh,

    // Additional data
    transactions: data.transactions || [],
  };
};

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Basic usage with new interface
function MyComponent() {
  const { user, totalXP, level, skills, loading, error } = useData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>{user?.fullName}</h1>
      <p>Level: {level}</p>
      <p>Total XP: {getFormattedXP()}</p>
      <p>Skills: {skills.length}</p>
    </div>
  );
}

// Legacy compatibility usage
function LegacyComponent() {
  const data = useLegacyDataCompatibility();
  
  // Use old interface
  const { user, userStatistics, totalXP, skills } = data;
  
  return (
    <div>
      <h1>{user?.firstName} {user?.lastName}</h1>
      <p>Level: {userStatistics?.userLevel}</p>
      <p>Total XP: {totalXP}</p>
    </div>
  );
}

// Provider usage
function App() {
  const userLogin = 'john.doe';

  return (
    <DataProvider userLogin={userLogin}>
      <MyComponent />
      <LegacyComponent />
    </DataProvider>
  );
}
*/

// Export default provider
export default DataProvider;
