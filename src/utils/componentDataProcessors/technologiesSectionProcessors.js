/**
 * Technologies Section Data Processors
 * Handles all data processing logic for the TechnologiesSection component
 * Separates skills and technology calculations from JSX presentation logic
 */

import { getTopSkills, groupSkillsByCategory, getSkillProgress } from '../schemaAdapters/skillsSchemaAdapter.js';
import { normalizeUserData } from '../schemaAdapters/userSchemaAdapter.js';

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

/**
 * Categorize skill by name patterns
 * @param {string} skillName - Name of the skill
 * @returns {string} Skill category
 */
const categorizeSkill = (skillName) => {
  const name = skillName.toLowerCase();
  
  if (name.includes('go') || name.includes('golang')) return 'Backend';
  if (name.includes('js') || name.includes('javascript') || name.includes('react') || name.includes('html') || name.includes('css')) return 'Frontend';
  if (name.includes('sql') || name.includes('database') || name.includes('db')) return 'Database';
  if (name.includes('docker') || name.includes('kubernetes') || name.includes('aws') || name.includes('cloud')) return 'DevOps';
  if (name.includes('git') || name.includes('linux') || name.includes('bash')) return 'Tools';
  if (name.includes('algorithm') || name.includes('data-structure')) return 'Computer Science';
  
  return 'General';
};

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
