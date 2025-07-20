/**
 * Stats Section Data Processors
 * Handles all data processing logic for StatsSection component
 * Separates data processing from JSX presentation logic
 */

import { formatXP, formatPercentage } from '../dataFormatting';
import { processUserSkills } from './profileProcessors';

/**
 * Process XP statistics for overview card
 * @param {number} totalXP - Total XP amount
 * @param {number} level - User level
 * @param {number} passedProjects - Number of passed projects
 * @returns {Object} Processed XP statistics
 */
export const processXPStatistics = (totalXP, level, passedProjects) => {
  return {
    totalXP: totalXP || 0,
    formattedXP: formatXP(totalXP || 0),
    level: level || 0,
    passedProjects: passedProjects || 0,
    hasData: Boolean(totalXP || level || passedProjects)
  };
};

/**
 * Process performance metrics
 * @param {number} passRate - Project pass rate
 * @param {number} auditRatio - Audit ratio
 * @param {number} totalUp - Total up audits
 * @returns {Object} Processed performance metrics
 */
export const processPerformanceMetrics = (passRate, auditRatio, totalUp) => {
  const auditsGiven = totalUp || 0;
  
  return {
    passRate: passRate || 0,
    formattedPassRate: formatPercentage(passRate || 0),
    auditRatio: auditRatio || 0,
    formattedAuditRatio: (auditRatio || 0).toFixed(2),
    auditsGiven,
    hasData: Boolean(passRate || auditRatio || auditsGiven)
  };
};

/**
 * Process achievement summary data
 * @param {number} totalProjects - Total number of projects
 * @param {number} failedProjects - Number of failed projects
 * @param {number} totalDown - Total down audits (audits received)
 * @returns {Object} Processed achievement summary
 */
export const processAchievementSummary = (totalProjects, failedProjects, totalDown) => {
  const auditsReceived = totalDown || 0;
  
  return {
    totalProjects: totalProjects || 0,
    failedProjects: failedProjects || 0,
    auditsReceived,
    hasData: Boolean(totalProjects || failedProjects || auditsReceived)
  };
};

/**
 * Process skills data for display (uses shared function from profileProcessors)
 * @param {Array} skills - User skills array
 * @param {number} maxSkills - Maximum number of skills to show
 * @returns {Object} Processed skills data
 */
export const processSkillsData = (skills, maxSkills = 6) => {
  return processUserSkills(skills, maxSkills);
};

/**
 * Process chart data for timeline and project charts
 * @param {Array} xpTimeline - XP timeline data
 * @param {Array} xpProjects - XP by project data
 * @returns {Object} Processed chart data
 */
export const processChartData = (xpTimeline, xpProjects) => {
  return {
    timelineData: Array.isArray(xpTimeline) ? xpTimeline : [],
    xpByProject: Array.isArray(xpProjects) ? xpProjects : [],
    hasTimelineData: Array.isArray(xpTimeline) && xpTimeline.length > 0,
    hasProjectData: Array.isArray(xpProjects) && xpProjects.length > 0
  };
};

/**
 * Process audit statistics for charts
 * @param {number} totalUp - Total up audits (audits given)
 * @param {number} totalDown - Total down audits (audits received)
 * @returns {Object} Processed audit statistics
 */
export const processAuditStatistics = (totalUp, totalDown) => {
  const auditsGiven = totalUp || 0;
  const auditsReceived = totalDown || 0;
  
  return {
    auditsGiven,
    auditsReceived,
    totalAudits: auditsGiven + auditsReceived,
    hasAuditData: Boolean(auditsGiven || auditsReceived)
  };
};

/**
 * Process project success data for charts
 * @param {number} passedProjects - Number of passed projects
 * @param {number} failedProjects - Number of failed projects
 * @returns {Object} Processed project success data
 */
export const processProjectSuccessData = (passedProjects, failedProjects) => {
  const passed = passedProjects || 0;
  const failed = failedProjects || 0;
  const total = passed + failed;
  
  return {
    passedProjects: passed,
    failedProjects: failed,
    totalProjects: total,
    successRate: total > 0 ? (passed / total) * 100 : 0,
    hasProjectData: total > 0
  };
};

/**
 * Process complete stats section data
 * @param {Object} data - Raw data from useData hook
 * @returns {Object} Processed stats section data
 */
export const processStatsSectionData = (data) => {
  if (!data) {
    return {
      xpStats: processXPStatistics(0, 0, 0),
      performanceMetrics: processPerformanceMetrics(0, 0, 0),
      achievementSummary: processAchievementSummary(0, 0, 0),
      skillsData: processSkillsData([]),
      chartData: processChartData([], []),
      auditStats: processAuditStatistics(0, 0),
      projectSuccessData: processProjectSuccessData(0, 0),
      loading: true,
      hasData: false
    };
  }

  const {
    totalXP,
    level,
    xpTimeline,
    xpProjects,
    totalProjects,
    passedProjects,
    failedProjects,
    passRate,
    auditRatio,
    totalUp,
    totalDown,
    skills,
    loading
  } = data;

  return {
    xpStats: processXPStatistics(totalXP, level, passedProjects),
    performanceMetrics: processPerformanceMetrics(passRate, auditRatio, totalUp),
    achievementSummary: processAchievementSummary(totalProjects, failedProjects, totalDown),
    skillsData: processSkillsData(skills),
    chartData: processChartData(xpTimeline, xpProjects),
    auditStats: processAuditStatistics(totalUp, totalDown),
    projectSuccessData: processProjectSuccessData(passedProjects, failedProjects),
    loading: loading || false,
    hasData: Boolean(totalXP || level || totalProjects)
  };
};

/**
 * Calculate performance score based on multiple metrics
 * @param {Object} statsData - Processed stats data
 * @returns {Object} Performance score and breakdown
 */
export const calculatePerformanceScore = (statsData) => {
  if (!statsData || !statsData.hasData) {
    return {
      overallScore: 0,
      breakdown: {
        xp: 0,
        projects: 0,
        audits: 0,
        skills: 0
      },
      grade: 'F',
      recommendations: ['Complete more projects to improve your score']
    };
  }

  const { xpStats, performanceMetrics, skillsData, auditStats } = statsData;

  // Calculate individual scores (0-100)
  const xpScore = Math.min(100, (xpStats.totalXP / 10000) * 100); // 10k XP = 100%
  const projectScore = Math.min(100, performanceMetrics.passRate || 0);
  const auditScore = Math.min(100, (auditStats.auditsGiven / 10) * 100); // 10 audits = 100%
  const skillScore = Math.min(100, (skillsData.totalSkills / 20) * 100); // 20 skills = 100%

  // Weighted average
  const overallScore = Math.round(
    (xpScore * 0.3) +
    (projectScore * 0.4) +
    (auditScore * 0.2) +
    (skillScore * 0.1)
  );

  // Determine grade
  let grade = 'F';
  if (overallScore >= 90) grade = 'A';
  else if (overallScore >= 80) grade = 'B';
  else if (overallScore >= 70) grade = 'C';
  else if (overallScore >= 60) grade = 'D';

  // Generate recommendations
  const recommendations = [];
  if (xpScore < 50) recommendations.push('Focus on completing more projects to gain XP');
  if (projectScore < 70) recommendations.push('Improve project success rate by reviewing failed projects');
  if (auditScore < 50) recommendations.push('Participate more in peer audits');
  if (skillScore < 50) recommendations.push('Diversify your skill set by learning new technologies');

  return {
    overallScore,
    breakdown: {
      xp: Math.round(xpScore),
      projects: Math.round(projectScore),
      audits: Math.round(auditScore),
      skills: Math.round(skillScore)
    },
    grade,
    recommendations: recommendations.length > 0 ? recommendations : ['Great job! Keep up the excellent work!']
  };
};

/**
 * Get stats overview cards configuration
 * @param {Object} statsData - Processed stats data
 * @returns {Array} Overview cards configuration
 */
export const getStatsOverviewCards = (statsData) => {
  if (!statsData) return [];

  return [
    {
      title: 'Total XP',
      value: statsData.xpStats?.formattedXP || '0 XP',
      icon: 'Trophy',
      color: 'primary',
      trend: statsData.xpStats?.totalXP > 0 ? 'up' : 'neutral'
    },
    {
      title: 'Projects Completed',
      value: statsData.xpStats?.passedProjects || 0,
      icon: 'CheckCircle',
      color: 'success',
      trend: 'up'
    },
    {
      title: 'Success Rate',
      value: statsData.performanceMetrics?.formattedPassRate || '0%',
      icon: 'Target',
      color: 'accent',
      trend: (statsData.performanceMetrics?.passRate || 0) >= 70 ? 'up' : 'down'
    },
    {
      title: 'Skills Learned',
      value: statsData.skillsData?.totalSkills || 0,
      icon: 'Code',
      color: 'secondary',
      trend: 'up'
    }
  ];
};

/**
 * Process stats overview cards data
 * @param {Object} statsData - Processed stats data
 * @returns {Array} Array of overview card configurations
 */
export const processStatsOverviewCards = (statsData) => {
  return [
    {
      title: 'XP Statistics',
      icon: 'TrendingUp',
      items: [
        {
          label: 'Total XP',
          value: statsData.xpStats.formattedXP,
          variant: 'primary'
        },
        {
          label: 'Current Level',
          value: `Level ${statsData.xpStats.level}`,
          variant: 'accent'
        },
        {
          label: 'Projects Completed',
          value: statsData.xpStats.passedProjects,
          variant: 'success'
        }
      ]
    },
    {
      title: 'Performance Metrics',
      icon: 'Target',
      items: [
        {
          label: 'Success Rate',
          value: statsData.performanceMetrics.formattedPassRate,
          variant: 'primary'
        },
        {
          label: 'Audit Ratio',
          value: statsData.performanceMetrics.formattedAuditRatio,
          variant: 'accent'
        },
        {
          label: 'Audits Given',
          value: statsData.performanceMetrics.auditsGiven,
          variant: 'success'
        }
      ]
    },
    {
      title: 'Achievement Summary',
      icon: 'Award',
      items: [
        {
          label: 'Total Projects',
          value: statsData.achievementSummary.totalProjects,
          variant: 'primary'
        },
        {
          label: 'Failed Projects',
          value: statsData.achievementSummary.failedProjects,
          variant: 'error'
        },
        {
          label: 'Audits Received',
          value: statsData.achievementSummary.auditsReceived,
          variant: 'accent'
        }
      ]
    }
  ];
};

/**
 * Process chart configurations
 * @param {Object} statsData - Processed stats data
 * @returns {Object} Chart configurations
 */
export const processChartConfigurations = (statsData) => {
  return {
    xpTimeline: {
      data: statsData.chartData.timelineData,
      width: 900,
      height: 400,
      hasData: statsData.chartData.hasTimelineData
    },
    xpByProject: {
      data: statsData.chartData.xpByProject,
      width: 700,
      height: 500,
      maxBars: 15,
      hasData: statsData.chartData.hasProjectData
    },
    xpProgress: {
      data: statsData.chartData.timelineData,
      width: 400,
      height: 300,
      hasData: statsData.chartData.hasTimelineData
    },
    projectSuccess: {
      passedProjects: statsData.projectSuccessData.passedProjects,
      failedProjects: statsData.projectSuccessData.failedProjects,
      size: 250,
      hasData: statsData.projectSuccessData.hasProjectData
    },
    auditStats: {
      auditsGiven: statsData.auditStats.auditsGiven,
      auditsReceived: statsData.auditStats.auditsReceived,
      width: 900,
      height: 400,
      hasData: statsData.auditStats.hasAuditData
    }
  };
};
