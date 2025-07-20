/**
 * Skills Schema Adapter
 * Normalizes skills/technology data from GraphQL to consistent internal format
 * Handles different skill data structures and provides categorization
 * Enhanced with validation, analytics, and reference pattern alignment
 */

import { validateDataWithErrors } from '../dataProcessing.js';

/**
 * Normalize single skill data from GraphQL response
 * @param {Object} rawSkill - Raw skill data from GraphQL
 * @returns {Object} Normalized skill data
 */
export const normalizeSkillData = (rawSkill) => {
  if (!rawSkill) {
    return {
      id: null,
      name: null,
      type: 'unknown',
      amount: 0,
      totalXP: 0,
      level: 0,
      category: 'other',
      createdAt: null,
      object: null
    };
  }

  const amount = parseFloat(rawSkill.amount) || parseFloat(rawSkill.totalXP) || 0;
  
  return {
    id: rawSkill.id || null,
    name: extractSkillName(rawSkill),
    type: rawSkill.type || 'unknown',
    amount: amount,
    totalXP: amount, // Alias for consistency
    level: calculateSkillLevel(amount),
    category: categorizeSkill(rawSkill),
    createdAt: rawSkill.createdAt || null,
    object: rawSkill.object || null
  };
};

/**
 * Extract skill name from various possible locations
 * @param {Object} skill - Raw skill data
 * @returns {string} Skill name
 */
export const extractSkillName = (skill) => {
  if (!skill) return 'Unknown Skill';

  // Check object name first
  if (skill.object && skill.object.name) {
    return skill.object.name;
  }

  // Check direct name property
  if (skill.name) return skill.name;

  // Extract from type (remove 'skill_' prefix if present)
  if (skill.type) {
    return skill.type.replace(/^skill_/, '').replace(/_/g, ' ');
  }

  return 'Unknown Skill';
};

/**
 * Calculate skill level based on XP amount
 * @param {number} amount - Skill XP amount
 * @returns {number} Skill level
 */
export const calculateSkillLevel = (amount) => {
  if (!amount || amount <= 0) return 0;
  
  // Simple level calculation: every 1000 XP = 1 level
  return Math.floor(amount / 1000);
};

/**
 * Categorize skill based on name and type
 * @param {Object} skill - Raw skill data
 * @returns {string} Skill category
 */
export const categorizeSkill = (skill) => {
  const name = extractSkillName(skill).toLowerCase();

  // Programming languages
  if (name.match(/(javascript|js|typescript|python|go|rust|c\+\+|java|php|ruby|swift|kotlin)/)) {
    return 'programming';
  }

  // Web technologies
  if (name.match(/(html|css|react|vue|angular|node|express|django|flask|laravel)/)) {
    return 'web';
  }

  // Databases
  if (name.match(/(sql|mysql|postgresql|mongodb|redis|database)/)) {
    return 'database';
  }

  // DevOps and tools
  if (name.match(/(docker|kubernetes|git|linux|bash|shell|devops|ci\/cd)/)) {
    return 'devops';
  }

  // Algorithms and data structures
  if (name.match(/(algorithm|data.structure|sorting|graph|tree|dynamic.programming)/)) {
    return 'algorithms';
  }

  // System design and architecture
  if (name.match(/(system.design|architecture|microservices|api|rest|graphql)/)) {
    return 'architecture';
  }

  // Security
  if (name.match(/(security|encryption|authentication|authorization|cybersecurity)/)) {
    return 'security';
  }

  // Mobile development
  if (name.match(/(mobile|ios|android|react.native|flutter)/)) {
    return 'mobile';
  }

  // Data science and AI
  if (name.match(/(machine.learning|ai|data.science|analytics|statistics)/)) {
    return 'data-science';
  }

  // Default category
  return 'other';
};

/**
 * Normalize multiple skills data
 * @param {Array} rawSkills - Array of raw skill data from GraphQL
 * @returns {Array} Array of normalized skill data
 */
export const normalizeSkillsData = (rawSkills) => {
  if (!Array.isArray(rawSkills)) return [];
  return rawSkills.map(normalizeSkillData);
};

/**
 * Group skills by category
 * @param {Array} skills - Array of normalized skill data
 * @returns {Object} Skills grouped by category
 */
export const groupSkillsByCategory = (skills) => {
  if (!Array.isArray(skills)) return {};

  return skills.reduce((groups, skill) => {
    const category = skill.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
    return groups;
  }, {});
};

/**
 * Get top skills by XP amount
 * @param {Array} skills - Array of normalized skill data
 * @param {number} limit - Number of top skills to return
 * @returns {Array} Top skills
 */
export const getTopSkills = (skills, limit = 10) => {
  if (!Array.isArray(skills)) return [];

  return [...skills]
    .sort((a, b) => b.totalXP - a.totalXP)
    .slice(0, limit);
};

/**
 * Filter skills by category
 * @param {Array} skills - Array of normalized skill data
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered skills
 */
export const filterSkillsByCategory = (skills, category) => {
  if (!Array.isArray(skills) || !category) return skills;

  return skills.filter(skill => skill.category === category);
};

/**
 * Filter skills by minimum XP
 * @param {Array} skills - Array of normalized skill data
 * @param {number} minXP - Minimum XP threshold
 * @returns {Array} Filtered skills
 */
export const filterSkillsByMinXP = (skills, minXP = 0) => {
  if (!Array.isArray(skills)) return [];

  return skills.filter(skill => skill.totalXP >= minXP);
};

/**
 * Search skills by name
 * @param {Array} skills - Array of normalized skill data
 * @param {string} searchTerm - Search term
 * @returns {Array} Matching skills
 */
export const searchSkills = (skills, searchTerm) => {
  if (!Array.isArray(skills) || !searchTerm) return skills;

  const term = searchTerm.toLowerCase();
  
  return skills.filter(skill => 
    skill.name.toLowerCase().includes(term) ||
    skill.category.toLowerCase().includes(term) ||
    skill.type.toLowerCase().includes(term)
  );
};

/**
 * Calculate skill statistics
 * @param {Array} skills - Array of normalized skill data
 * @returns {Object} Skill statistics
 */
export const calculateSkillStatistics = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return {
      total: 0,
      totalXP: 0,
      averageXP: 0,
      maxXP: 0,
      minXP: 0,
      categoriesCount: 0,
      topCategory: null
    };
  }

  const totalXP = skills.reduce((sum, skill) => sum + skill.totalXP, 0);
  const averageXP = totalXP / skills.length;
  const maxXP = Math.max(...skills.map(skill => skill.totalXP));
  const minXP = Math.min(...skills.map(skill => skill.totalXP));

  const categories = groupSkillsByCategory(skills);
  const categoriesCount = Object.keys(categories).length;
  
  const topCategory = Object.entries(categories)
    .sort(([,a], [,b]) => b.length - a.length)[0]?.[0] || null;

  return {
    total: skills.length,
    totalXP,
    averageXP,
    maxXP,
    minXP,
    categoriesCount,
    topCategory
  };
};

/**
 * Sort skills by various criteria
 * @param {Array} skills - Array of normalized skill data
 * @param {string} sortBy - Sort criteria ('name', 'xp', 'level', 'category')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted skills array
 */
export const sortSkills = (skills, sortBy = 'xp', order = 'desc') => {
  if (!Array.isArray(skills)) return [];

  const sortedSkills = [...skills].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'xp':
        aValue = a.totalXP;
        bValue = b.totalXP;
        break;
      case 'level':
        aValue = a.level;
        bValue = b.level;
        break;
      case 'category':
        aValue = a.category.toLowerCase();
        bValue = b.category.toLowerCase();
        break;
      default:
        aValue = a.totalXP;
        bValue = b.totalXP;
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sortedSkills;
};

/**
 * Get skill proficiency level description
 * @param {Object} skill - Normalized skill data
 * @returns {string} Proficiency level description
 */
export const getSkillProficiencyLevel = (skill) => {
  if (!skill || skill.totalXP <= 0) return 'Beginner';

  if (skill.totalXP >= 10000) return 'Expert';
  if (skill.totalXP >= 5000) return 'Advanced';
  if (skill.totalXP >= 2000) return 'Intermediate';
  if (skill.totalXP >= 500) return 'Novice';
  
  return 'Beginner';
};

/**
 * Get skill progress to next level
 * @param {Object} skill - Normalized skill data
 * @returns {Object} Progress information
 */
export const getSkillProgress = (skill) => {
  if (!skill) {
    return {
      currentLevel: 0,
      nextLevel: 1,
      currentLevelXP: 0,
      nextLevelXP: 1000,
      progressXP: 0,
      progressPercentage: 0
    };
  }

  const currentLevel = skill.level;
  const nextLevel = currentLevel + 1;
  const currentLevelXP = currentLevel * 1000;
  const nextLevelXP = nextLevel * 1000;
  const progressXP = skill.totalXP - currentLevelXP;
  const progressPercentage = (progressXP / 1000) * 100;

  return {
    currentLevel,
    nextLevel,
    currentLevelXP,
    nextLevelXP,
    progressXP,
    progressPercentage: Math.min(100, Math.max(0, progressPercentage))
  };
};

/**
 * Get category display information
 * @param {string} category - Category name
 * @returns {Object} Category display information
 */
export const getCategoryDisplayInfo = (category) => {
  const categoryInfo = {
    programming: { name: 'Programming Languages', icon: '💻', color: '#3b82f6' },
    web: { name: 'Web Technologies', icon: '🌐', color: '#10b981' },
    database: { name: 'Databases', icon: '🗄️', color: '#f59e0b' },
    devops: { name: 'DevOps & Tools', icon: '⚙️', color: '#8b5cf6' },
    algorithms: { name: 'Algorithms & DS', icon: '🧮', color: '#ef4444' },
    architecture: { name: 'System Design', icon: '🏗️', color: '#06b6d4' },
    security: { name: 'Security', icon: '🔒', color: '#84cc16' },
    mobile: { name: 'Mobile Development', icon: '📱', color: '#f97316' },
    'data-science': { name: 'Data Science & AI', icon: '🤖', color: '#ec4899' },
    other: { name: 'Other Skills', icon: '🔧', color: '#6b7280' }
  };

  return categoryInfo[category] || categoryInfo.other;
};

/**
 * Validate skills data structure
 * @param {Array} skillsData - Skills data to validate
 * @returns {Object} Validation result with errors and warnings
 */
export const validateSkillsData = (skillsData) => {
  const schema = {
    type: 'array',
    minLength: 0,
    maxLength: 1000
  };

  const validation = validateDataWithErrors(skillsData, schema);

  if (Array.isArray(skillsData)) {
    skillsData.forEach((skill, index) => {
      if (!skill.name) {
        validation.warnings.push(`Skill at index ${index} has no name`);
      }
      if (typeof skill.amount !== 'number' || skill.amount < 0) {
        validation.warnings.push(`Skill "${skill.name || 'unknown'}" has invalid amount`);
      }
    });
  }

  return validation;
};

/**
 * Calculate skill mastery analytics
 * @param {Array} skills - Array of normalized skills
 * @returns {Object} Skill mastery analytics
 */
export const calculateSkillMastery = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return {
      masteryScore: 0,
      expertSkills: 0,
      advancedSkills: 0,
      intermediateSkills: 0,
      beginnerSkills: 0,
      diversityScore: 0,
      recommendations: ['Start learning new technologies to build your skill set']
    };
  }

  // Count skills by level
  const expertSkills = skills.filter(s => s.level >= 8).length;
  const advancedSkills = skills.filter(s => s.level >= 5 && s.level < 8).length;
  const intermediateSkills = skills.filter(s => s.level >= 3 && s.level < 5).length;
  const beginnerSkills = skills.filter(s => s.level < 3).length;

  // Calculate mastery score (weighted by skill level)
  const totalWeightedXP = skills.reduce((sum, skill) => {
    const weight = skill.level >= 5 ? 2 : 1; // Give more weight to advanced skills
    return sum + (skill.totalXP * weight);
  }, 0);
  const masteryScore = Math.min(100, totalWeightedXP / 1000); // Scale to 0-100

  // Calculate diversity score (number of different categories)
  const categories = new Set(skills.map(s => s.category));
  const diversityScore = Math.min(100, (categories.size / 8) * 100); // 8 main categories

  // Generate recommendations
  const recommendations = [];
  if (expertSkills === 0) {
    recommendations.push('Focus on mastering at least one technology to expert level');
  }
  if (diversityScore < 50) {
    recommendations.push('Explore different technology categories to broaden your skill set');
  }
  if (skills.length < 10) {
    recommendations.push('Learn more technologies to expand your expertise');
  }
  if (recommendations.length === 0) {
    recommendations.push('Excellent skill diversity! Consider mentoring others or contributing to open source');
  }

  return {
    masteryScore: Math.round(masteryScore),
    expertSkills,
    advancedSkills,
    intermediateSkills,
    beginnerSkills,
    diversityScore: Math.round(diversityScore),
    totalSkills: skills.length,
    recommendations
  };
};

/**
 * Calculate skill learning efficiency
 * @param {Array} skills - Array of skills with timestamps
 * @returns {Object} Learning efficiency metrics
 */
export const calculateSkillLearningEfficiency = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return {
      efficiencyScore: 0,
      averageTimeToMaster: 0,
      fastestSkill: null,
      slowestSkill: null,
      learningVelocity: 0
    };
  }

  // Calculate time to reach different skill levels
  const skillsWithTime = skills.filter(skill => skill.createdAt).map(skill => {
    const startDate = new Date(skill.createdAt);
    const now = new Date();
    const daysLearning = Math.max(1, (now - startDate) / (1000 * 60 * 60 * 24));
    const xpPerDay = skill.totalXP / daysLearning;

    return {
      ...skill,
      daysLearning,
      xpPerDay,
      efficiency: skill.level / daysLearning // Level achieved per day
    };
  });

  if (skillsWithTime.length === 0) {
    return {
      efficiencyScore: 0,
      averageTimeToMaster: 0,
      fastestSkill: null,
      slowestSkill: null,
      learningVelocity: 0
    };
  }

  const averageEfficiency = skillsWithTime.reduce((sum, s) => sum + s.efficiency, 0) / skillsWithTime.length;
  const efficiencyScore = Math.min(100, averageEfficiency * 100);

  const fastestSkill = skillsWithTime.reduce((fastest, current) =>
    current.efficiency > fastest.efficiency ? current : fastest
  );

  const slowestSkill = skillsWithTime.reduce((slowest, current) =>
    current.efficiency < slowest.efficiency ? current : slowest
  );

  const averageTimeToMaster = skillsWithTime
    .filter(s => s.level >= 5)
    .reduce((sum, s) => sum + s.daysLearning, 0) / Math.max(1, skillsWithTime.filter(s => s.level >= 5).length);

  const learningVelocity = skillsWithTime.reduce((sum, s) => sum + s.xpPerDay, 0) / skillsWithTime.length;

  return {
    efficiencyScore: Math.round(efficiencyScore),
    averageTimeToMaster: Math.round(averageTimeToMaster),
    fastestSkill: {
      name: fastestSkill.name,
      efficiency: fastestSkill.efficiency.toFixed(2),
      daysLearning: Math.round(fastestSkill.daysLearning)
    },
    slowestSkill: {
      name: slowestSkill.name,
      efficiency: slowestSkill.efficiency.toFixed(2),
      daysLearning: Math.round(slowestSkill.daysLearning)
    },
    learningVelocity: Math.round(learningVelocity),
    totalSkillsTracked: skillsWithTime.length
  };
};

/**
 * Generate skill learning path recommendations
 * @param {Array} currentSkills - Current skills array
 * @param {string} targetRole - Target role (e.g., 'fullstack', 'backend', 'frontend')
 * @returns {Object} Learning path recommendations
 */
export const generateSkillLearningPath = (currentSkills, targetRole = 'fullstack') => {
  const skillsByCategory = groupSkillsByCategory(currentSkills);

  const rolePaths = {
    fullstack: {
      required: ['javascript', 'react', 'node.js', 'database', 'git'],
      recommended: ['typescript', 'docker', 'testing', 'api-design'],
      advanced: ['microservices', 'cloud', 'devops', 'security']
    },
    backend: {
      required: ['programming-language', 'database', 'api-design', 'git'],
      recommended: ['docker', 'testing', 'security', 'performance'],
      advanced: ['microservices', 'cloud', 'distributed-systems', 'monitoring']
    },
    frontend: {
      required: ['javascript', 'html', 'css', 'react', 'git'],
      recommended: ['typescript', 'testing', 'responsive-design', 'accessibility'],
      advanced: ['performance', 'pwa', 'animation', 'state-management']
    }
  };

  const path = rolePaths[targetRole] || rolePaths.fullstack;
  const currentSkillNames = currentSkills.map(s => s.name.toLowerCase());

  const missing = {
    required: path.required.filter(skill => !currentSkillNames.some(cs => cs.includes(skill))),
    recommended: path.recommended.filter(skill => !currentSkillNames.some(cs => cs.includes(skill))),
    advanced: path.advanced.filter(skill => !currentSkillNames.some(cs => cs.includes(skill)))
  };

  const completionPercentage = Math.round(
    ((path.required.length - missing.required.length) / path.required.length) * 100
  );

  return {
    targetRole,
    completionPercentage,
    nextSteps: missing.required.slice(0, 3), // Top 3 next steps
    missing,
    strengths: Object.keys(skillsByCategory).filter(cat => skillsByCategory[cat].length > 0),
    recommendations: missing.required.length > 0
      ? [`Focus on learning ${missing.required[0]} to advance toward ${targetRole} role`]
      : [`Great progress! Consider exploring ${missing.recommended[0] || missing.advanced[0]} for advanced skills`]
  };
};
