/**
 * Technologies Section Data Processors
 * Handles all data processing logic for the TechnologiesSection component
 * Separates skills and technology calculations from JSX presentation logic
 */

import { getTopSkills, groupSkillsByCategory, getSkillProgress } from '../schemaAdapters/skillsSchemaAdapter.js';
import { normalizeUserData } from '../schemaAdapters/userSchemaAdapter.js';
import { sortData, filterData } from '../dataProcessing.js';

/**
 * Process all data for the TechnologiesSection component
 * @param {Object} rawData - Raw data from GraphQL queries
 * @returns {Object} Processed data ready for JSX consumption
 */
export const processTechnologiesSectionData = (rawData) => {
  const {
    user,
    skills = [],
    transactions = [],
    loading = false,
    error = null
  } = rawData;

  if (loading) {
    return {
      isLoading: true,
      error: null,
      skillCategories: [],
      topSkills: [],
      skillProgress: [],
      technologyStats: null,
      skillTrends: []
    };
  }

  if (error) {
    return {
      isLoading: false,
      error: error.message || 'Failed to load technologies data',
      skillCategories: [],
      topSkills: [],
      skillProgress: [],
      technologyStats: null,
      skillTrends: []
    };
  }

  // Process user profile
  const userProfile = normalizeUserData(user);

  // Process skills by category
  const skillCategories = processSkillCategories(skills);

  // Get top skills
  const topSkills = getTopSkills(skills, 10);

  // Calculate skill progress
  const skillProgress = calculateSkillProgressData(skills, transactions);

  // Calculate technology statistics
  const technologyStats = calculateTechnologyStats(skills);

  // Calculate skill trends
  const skillTrends = calculateSkillTrends(skills, transactions);

  return {
    isLoading: false,
    error: null,
    user: userProfile,
    skillCategories,
    topSkills,
    skillProgress,
    technologyStats,
    skillTrends
  };
};

/**
 * Process skills by category for organized display
 * @param {Array} skills - Raw skills data
 * @returns {Array} Processed skill categories
 */
const processSkillCategories = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return [];
  }

  const categories = groupSkillsByCategory(skills);
  
  return Object.entries(categories).map(([categoryName, categorySkills]) => {
    const totalXP = categorySkills.reduce((sum, skill) => sum + (skill.totalXP || 0), 0);
    const averageLevel = categorySkills.length > 0 
      ? categorySkills.reduce((sum, skill) => sum + (skill.level || 0), 0) / categorySkills.length 
      : 0;

    return {
      name: categoryName,
      skills: categorySkills.map(skill => ({
        name: skill.name,
        totalXP: skill.totalXP || 0,
        level: skill.level || 0,
        formattedXP: formatXP(skill.totalXP || 0),
        progressPercentage: calculateSkillProgressPercentage(skill.level || 0)
      })),
      totalXP,
      averageLevel,
      skillCount: categorySkills.length,
      formattedTotalXP: formatXP(totalXP),
      formattedAverageLevel: averageLevel.toFixed(1)
    };
  }).sort((a, b) => b.totalXP - a.totalXP);
};

/**
 * Calculate skill progress data for visualization
 * @param {Array} skills - Raw skills data
 * @param {Array} transactions - Raw transaction data
 * @returns {Array} Processed skill progress data
 */
const calculateSkillProgressData = (skills, transactions) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return [];
  }

  return skills
    .filter(skill => (skill.totalXP || 0) > 0)
    .map(skill => {
      const progress = getSkillProgress(skill);
      const recentXP = calculateRecentSkillXP(skill.name, transactions);
      
      return {
        name: skill.name,
        currentXP: skill.totalXP || 0,
        level: skill.level || 0,
        progressToNext: progress.progressToNext,
        progressPercentage: progress.progressPercentage,
        xpForNextLevel: progress.xpForNextLevel,
        recentXP,
        formattedCurrentXP: formatXP(skill.totalXP || 0),
        formattedRecentXP: formatXP(recentXP),
        category: categorizeSkill(skill.name)
      };
    })
    .sort((a, b) => b.currentXP - a.currentXP);
};

/**
 * Calculate technology statistics overview
 * @param {Array} skills - Raw skills data
 * @returns {Object} Technology statistics
 */
const calculateTechnologyStats = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return {
      totalSkills: 0,
      totalXP: 0,
      averageLevel: 0,
      topCategory: null,
      masteredSkills: 0,
      formattedTotalXP: '0 XP',
      formattedAverageLevel: '0.0'
    };
  }

  const totalSkills = skills.length;
  const totalXP = skills.reduce((sum, skill) => sum + (skill.totalXP || 0), 0);
  const averageLevel = skills.reduce((sum, skill) => sum + (skill.level || 0), 0) / totalSkills;
  const masteredSkills = skills.filter(skill => (skill.level || 0) >= 5).length;

  // Find top category
  const categories = groupSkillsByCategory(skills);
  const topCategory = Object.entries(categories)
    .map(([name, categorySkills]) => ({
      name,
      totalXP: categorySkills.reduce((sum, skill) => sum + (skill.totalXP || 0), 0),
      count: categorySkills.length
    }))
    .sort((a, b) => b.totalXP - a.totalXP)[0];

  return {
    totalSkills,
    totalXP,
    averageLevel,
    topCategory: topCategory?.name || 'None',
    masteredSkills,
    formattedTotalXP: formatXP(totalXP),
    formattedAverageLevel: averageLevel.toFixed(1)
  };
};

/**
 * Calculate skill trends over time
 * @param {Array} skills - Raw skills data
 * @param {Array} transactions - Raw transaction data
 * @returns {Array} Skill trends data
 */
const calculateSkillTrends = (skills, transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return [];
  }

  // Group transactions by month and skill
  const monthlySkillData = transactions
    .filter(transaction => transaction.type === 'xp' && transaction.object?.name)
    .reduce((months, transaction) => {
      const date = new Date(transaction.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const skillName = transaction.object.name;
      
      if (!months[monthKey]) {
        months[monthKey] = {};
      }
      
      if (!months[monthKey][skillName]) {
        months[monthKey][skillName] = 0;
      }
      
      months[monthKey][skillName] += transaction.amount || 0;
      
      return months;
    }, {});

  // Convert to trend data
  return Object.entries(monthlySkillData)
    .map(([month, skillData]) => ({
      month,
      formattedMonth: new Date(month + '-01').toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      }),
      skills: Object.entries(skillData)
        .map(([skillName, xp]) => ({
          name: skillName,
          xp,
          formattedXP: formatXP(xp)
        }))
        .sort((a, b) => b.xp - a.xp)
        .slice(0, 5), // Top 5 skills per month
      totalXP: Object.values(skillData).reduce((sum, xp) => sum + xp, 0)
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6); // Last 6 months
};

/**
 * Calculate recent XP gained for a specific skill
 * @param {string} skillName - Name of the skill
 * @param {Array} transactions - Raw transaction data
 * @returns {number} Recent XP gained (last 30 days)
 */
const calculateRecentSkillXP = (skillName, transactions) => {
  if (!Array.isArray(transactions)) return 0;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return transactions
    .filter(transaction => 
      transaction.type === 'xp' &&
      transaction.object?.name === skillName &&
      new Date(transaction.createdAt) >= thirtyDaysAgo
    )
    .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
};

/**
 * Calculate skill progress percentage for display
 * @param {number} level - Current skill level
 * @returns {number} Progress percentage (0-100)
 */
const calculateSkillProgressPercentage = (level) => {
  if (level >= 10) return 100;
  return (level / 10) * 100;
};

// Note: categorizeSkill function moved to exported version below to avoid duplication

/**
 * Format XP value for display
 * @param {number} xp - XP value
 * @returns {string} Formatted XP string
 */
const formatXP = (xp) => {
  if (xp >= 1000000) return `${(xp / 1000000).toFixed(1)}M XP`;
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k XP`;
  return `${xp} XP`;
};

/**
 * Categorize skill by type for filtering and display
 * @param {string} skillName - Name of the skill
 * @returns {string} Skill category type
 */
export const categorizeSkill = (skillName) => {
  if (!skillName || typeof skillName !== 'string') {
    return 'other';
  }
  const name = skillName.toLowerCase();

  if (name.includes('javascript') || name.includes('go') || name.includes('python') ||
      name.includes('java') || name.includes('c++') || name.includes('rust')) {
    return 'language';
  } else if (name.includes('react') || name.includes('vue') || name.includes('angular') ||
             name.includes('express') || name.includes('django')) {
    return 'framework';
  } else if (name.includes('sql') || name.includes('database') || name.includes('mongodb') ||
             name.includes('postgres')) {
    return 'database';
  } else if (name.includes('docker') || name.includes('git') || name.includes('linux') ||
             name.includes('bash')) {
    return 'tool';
  } else if (name.includes('graphql') || name.includes('rest') || name.includes('api')) {
    return 'api';
  }
  return 'general';
};

/**
 * Get appropriate icon name for skill type
 * @param {string} type - Skill type
 * @returns {string} Icon name
 */
export const getSkillIconName = (type) => {
  switch (type) {
    case 'language':
      return 'Code';
    case 'database':
      return 'Database';
    case 'framework':
    case 'api':
      return 'Globe';
    default:
      return 'Server';
  }
};

/**
 * Get badge color variant for skill level
 * @param {string} level - Skill level
 * @returns {string} Badge variant
 */
export const getSkillColorVariant = (level) => {
  switch (level) {
    case 'Advanced':
      return 'success';
    case 'Intermediate':
      return 'primary';
    case 'Beginner':
      return 'warning';
    default:
      return 'secondary';
  }
};

/**
 * Process filtered and sorted skills
 * @param {Object} processedData - Processed technologies data
 * @param {string} searchTerm - Search term for filtering
 * @param {string} filterType - Type filter
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Filtered and sorted skills
 */
export const processFilteredSkills = (processedData, searchTerm, filterType, sortBy) => {
  if (processedData.isLoading || processedData.error) {
    return [];
  }

  let filtered = processedData.skillCategories.flatMap(category =>
    category.skills.map(skill => ({
      ...skill,
      category: category.name,
      type: categorizeSkill(skill.name)
    }))
  );

  // Apply search filter
  if (searchTerm) {
    filtered = filterData(filtered, { name: searchTerm });
  }

  // Apply type filter
  if (filterType !== 'all') {
    filtered = filterData(filtered, { type: filterType });
  }

  // Apply sorting
  return sortData(filtered, sortBy, 'desc');
};

/**
 * Calculate technology summary statistics for display
 * @param {Object} processedData - Processed technologies data
 * @param {Array} filteredSkills - Filtered skills array
 * @returns {Object} Technology statistics
 */
export const calculateTechnologySummaryStats = (processedData, filteredSkills) => {
  if (processedData.isLoading || !processedData.technologyStats) {
    return {
      totalTechnologies: 0,
      advancedSkills: 0,
      totalXP: 0,
      averageProficiency: 0
    };
  }

  const stats = processedData.technologyStats;
  const advancedSkills = filteredSkills.filter(skill =>
    (skill.level || 0) >= 5
  ).length;

  return {
    totalTechnologies: stats.totalSkills,
    advancedSkills,
    totalXP: stats.totalXP,
    averageProficiency: stats.averageLevel
  };
};

/**
 * Calculate maximum XP for progress bars
 * @param {Array} skills - Skills array
 * @returns {number} Maximum XP value
 */
export const calculateMaxXP = (skills) => {
  return skills.length > 0
    ? Math.max(...skills.map(s => s.totalXP || 0))
    : 1;
};

/**
 * Get filter options for technologies filtering
 * @returns {Object} Filter options
 */
export const getTechnologyFilterOptions = () => {
  return {
    typeOptions: [
      { value: 'all', label: 'All Types' },
      { value: 'language', label: 'Programming Languages' },
      { value: 'framework', label: 'Frameworks' },
      { value: 'database', label: 'Databases' },
      { value: 'tool', label: 'Tools' },
      { value: 'api', label: 'APIs' }
    ],
    sortOptions: [
      { value: 'totalXP', label: 'Sort by XP' },
      { value: 'completedProjects', label: 'Sort by Projects' },
      { value: 'name', label: 'Sort by Name' }
    ]
  };
};
