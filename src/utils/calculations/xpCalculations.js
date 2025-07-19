/**
 * XP Calculations Utility
 * Handles all XP-related calculations and level computations
 */

/**
 * Calculate user level based on total XP
 * @param {number} totalXP - Total XP amount
 * @returns {number} User level
 */
export const calculateLevel = (totalXP) => {
  if (!totalXP || totalXP <= 0) return 0;
  
  // Level calculation: every 10,000 XP = 1 level
  return Math.floor(totalXP / 10000);
};

/**
 * Calculate XP required for next level
 * @param {number} totalXP - Current total XP
 * @returns {number} XP needed for next level
 */
export const calculateXPForNextLevel = (totalXP) => {
  const currentLevel = calculateLevel(totalXP);
  const nextLevelXP = (currentLevel + 1) * 10000;
  return Math.max(0, nextLevelXP - totalXP);
};

/**
 * Calculate level progress percentage
 * @param {number} totalXP - Current total XP
 * @returns {number} Progress percentage (0-100)
 */
export const calculateLevelProgress = (totalXP) => {
  if (!totalXP || totalXP <= 0) return 0;
  
  const currentLevel = calculateLevel(totalXP);
  const currentLevelXP = currentLevel * 10000;
  const nextLevelXP = (currentLevel + 1) * 10000;
  const progressXP = totalXP - currentLevelXP;
  const levelXPRange = nextLevelXP - currentLevelXP;
  
  return Math.round((progressXP / levelXPRange) * 100);
};

/**
 * Get level information object
 * @param {number} totalXP - Current total XP
 * @returns {Object} Level information
 */
export const getLevelInfo = (totalXP) => {
  const currentLevel = calculateLevel(totalXP);
  const currentLevelXP = currentLevel * 10000;
  const nextLevelXP = (currentLevel + 1) * 10000;
  const progressXP = Math.max(0, totalXP - currentLevelXP);
  const xpForNextLevel = calculateXPForNextLevel(totalXP);
  const progressPercentage = calculateLevelProgress(totalXP);

  return {
    currentLevel,
    nextLevel: currentLevel + 1,
    currentLevelXP,
    nextLevelXP,
    progressXP,
    xpForNextLevel,
    progressPercentage,
    totalXP: totalXP || 0
  };
};

/**
 * Calculate XP growth rate over time periods
 * @param {Array} xpData - Array of XP data points with dates
 * @param {string} period - Time period ('day', 'week', 'month')
 * @returns {Array} Growth rate data
 */
export const calculateXPGrowthRate = (xpData, period = 'week') => {
  if (!Array.isArray(xpData) || xpData.length < 2) return [];

  const sortedData = [...xpData].sort((a, b) => new Date(a.date) - new Date(b.date));
  const growthRates = [];

  for (let i = 1; i < sortedData.length; i++) {
    const current = sortedData[i];
    const previous = sortedData[i - 1];
    
    const timeDiff = new Date(current.date) - new Date(previous.date);
    const xpDiff = current.cumulativeXP - previous.cumulativeXP;
    
    let periodMultiplier = 1;
    switch (period) {
      case 'day':
        periodMultiplier = 1000 * 60 * 60 * 24; // milliseconds in a day
        break;
      case 'week':
        periodMultiplier = 1000 * 60 * 60 * 24 * 7; // milliseconds in a week
        break;
      case 'month':
        periodMultiplier = 1000 * 60 * 60 * 24 * 30; // milliseconds in a month
        break;
    }
    
    const rate = (xpDiff / timeDiff) * periodMultiplier;
    
    growthRates.push({
      date: current.date,
      rate: Math.round(rate),
      xpGained: xpDiff,
      period: period
    });
  }

  return growthRates;
};

/**
 * Calculate average XP per time period
 * @param {Array} xpData - Array of XP data points
 * @param {string} period - Time period ('day', 'week', 'month')
 * @returns {number} Average XP per period
 */
export const calculateAverageXPPerPeriod = (xpData, period = 'day') => {
  if (!Array.isArray(xpData) || xpData.length === 0) return 0;

  const totalXP = xpData.reduce((sum, data) => sum + (data.amount || 0), 0);
  const timeSpan = getTimeSpanInPeriods(xpData, period);
  
  return timeSpan > 0 ? Math.round(totalXP / timeSpan) : 0;
};

/**
 * Get time span in specified periods
 * @param {Array} xpData - Array of XP data points with dates
 * @param {string} period - Time period ('day', 'week', 'month')
 * @returns {number} Time span in periods
 */
export const getTimeSpanInPeriods = (xpData, period) => {
  if (!Array.isArray(xpData) || xpData.length < 2) return 0;

  const sortedData = [...xpData].sort((a, b) => new Date(a.date) - new Date(b.date));
  const startDate = new Date(sortedData[0].date);
  const endDate = new Date(sortedData[sortedData.length - 1].date);
  const timeDiff = endDate - startDate;

  switch (period) {
    case 'day':
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    case 'week':
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 7));
    case 'month':
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 30));
    default:
      return 1;
  }
};

/**
 * Calculate XP milestones reached
 * @param {number} totalXP - Current total XP
 * @returns {Array} Array of reached milestones
 */
export const calculateXPMilestones = (totalXP) => {
  const milestones = [
    { xp: 1000, name: 'First Steps', description: 'Earned your first 1K XP' },
    { xp: 5000, name: 'Getting Started', description: 'Reached 5K XP milestone' },
    { xp: 10000, name: 'Level Up', description: 'Achieved Level 1' },
    { xp: 25000, name: 'Dedicated Learner', description: 'Earned 25K XP' },
    { xp: 50000, name: 'Experienced', description: 'Reached 50K XP' },
    { xp: 100000, name: 'Expert', description: 'Achieved 100K XP' },
    { xp: 250000, name: 'Master', description: 'Earned 250K XP' },
    { xp: 500000, name: 'Grandmaster', description: 'Reached 500K XP' },
    { xp: 1000000, name: 'Legend', description: 'Achieved 1M XP' }
  ];

  return milestones.filter(milestone => totalXP >= milestone.xp);
};

/**
 * Get next milestone information
 * @param {number} totalXP - Current total XP
 * @returns {Object|null} Next milestone info or null if all reached
 */
export const getNextMilestone = (totalXP) => {
  const milestones = [
    { xp: 1000, name: 'First Steps', description: 'Earn your first 1K XP' },
    { xp: 5000, name: 'Getting Started', description: 'Reach 5K XP milestone' },
    { xp: 10000, name: 'Level Up', description: 'Achieve Level 1' },
    { xp: 25000, name: 'Dedicated Learner', description: 'Earn 25K XP' },
    { xp: 50000, name: 'Experienced', description: 'Reach 50K XP' },
    { xp: 100000, name: 'Expert', description: 'Achieve 100K XP' },
    { xp: 250000, name: 'Master', description: 'Earn 250K XP' },
    { xp: 500000, name: 'Grandmaster', description: 'Reach 500K XP' },
    { xp: 1000000, name: 'Legend', description: 'Achieve 1M XP' }
  ];

  const nextMilestone = milestones.find(milestone => totalXP < milestone.xp);
  
  if (nextMilestone) {
    return {
      ...nextMilestone,
      xpNeeded: nextMilestone.xp - totalXP,
      progressPercentage: (totalXP / nextMilestone.xp) * 100
    };
  }

  return null;
};

/**
 * Calculate XP efficiency (XP per day since registration)
 * @param {number} totalXP - Current total XP
 * @param {Date} registrationDate - User registration date
 * @returns {number} XP per day
 */
export const calculateXPEfficiency = (totalXP, registrationDate) => {
  if (!totalXP || !registrationDate) return 0;

  const now = new Date();
  const regDate = new Date(registrationDate);
  const daysSinceRegistration = Math.max(1, Math.ceil((now - regDate) / (1000 * 60 * 60 * 24)));
  
  return Math.round(totalXP / daysSinceRegistration);
};

/**
 * Predict time to reach target XP
 * @param {number} currentXP - Current XP
 * @param {number} targetXP - Target XP
 * @param {number} averageXPPerDay - Average XP gained per day
 * @returns {Object} Prediction information
 */
export const predictTimeToTarget = (currentXP, targetXP, averageXPPerDay) => {
  if (!averageXPPerDay || averageXPPerDay <= 0 || currentXP >= targetXP) {
    return {
      days: 0,
      weeks: 0,
      months: 0,
      achievable: false
    };
  }

  const xpNeeded = targetXP - currentXP;
  const daysNeeded = Math.ceil(xpNeeded / averageXPPerDay);
  
  return {
    days: daysNeeded,
    weeks: Math.ceil(daysNeeded / 7),
    months: Math.ceil(daysNeeded / 30),
    achievable: true,
    xpNeeded
  };
};

/**
 * Calculate XP distribution by source/project
 * @param {Array} xpTransactions - Array of XP transactions
 * @returns {Array} XP distribution data
 */
export const calculateXPDistribution = (xpTransactions) => {
  if (!Array.isArray(xpTransactions)) return [];

  const distribution = {};
  
  xpTransactions.forEach(transaction => {
    const source = transaction.object?.name || 
                  transaction.path?.split('/').pop() || 
                  'Unknown Source';
    
    if (!distribution[source]) {
      distribution[source] = {
        name: source,
        totalXP: 0,
        transactionCount: 0,
        percentage: 0
      };
    }
    
    distribution[source].totalXP += transaction.amount;
    distribution[source].transactionCount += 1;
  });

  const totalXP = Object.values(distribution).reduce((sum, item) => sum + item.totalXP, 0);
  
  return Object.values(distribution)
    .map(item => ({
      ...item,
      percentage: totalXP > 0 ? (item.totalXP / totalXP) * 100 : 0
    }))
    .sort((a, b) => b.totalXP - a.totalXP);
};

/**
 * Calculate XP streaks (consecutive days with XP gain)
 * @param {Array} xpData - Array of XP data points with dates
 * @returns {Object} Streak information
 */
export const calculateXPStreaks = (xpData) => {
  if (!Array.isArray(xpData) || xpData.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      streakDates: []
    };
  }

  const sortedData = [...xpData]
    .filter(data => data.amount > 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (sortedData.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      streakDates: []
    };
  }

  let currentStreak = 1;
  let longestStreak = 1;
  let currentStreakDates = [sortedData[0].date];
  let longestStreakDates = [sortedData[0].date];

  for (let i = 1; i < sortedData.length; i++) {
    const currentDate = new Date(sortedData[i].date);
    const previousDate = new Date(sortedData[i - 1].date);
    const dayDiff = Math.floor((currentDate - previousDate) / (1000 * 60 * 60 * 24));

    if (dayDiff === 1) {
      // Consecutive day
      currentStreak++;
      currentStreakDates.push(sortedData[i].date);
    } else {
      // Streak broken
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
        longestStreakDates = [...currentStreakDates];
      }
      currentStreak = 1;
      currentStreakDates = [sortedData[i].date];
    }
  }

  // Check if current streak is the longest
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
    longestStreakDates = [...currentStreakDates];
  }

  // Check if current streak is still active (last activity was yesterday or today)
  const lastActivityDate = new Date(sortedData[sortedData.length - 1].date);
  const today = new Date();
  const daysSinceLastActivity = Math.floor((today - lastActivityDate) / (1000 * 60 * 60 * 24));
  
  const isCurrentStreakActive = daysSinceLastActivity <= 1;

  return {
    currentStreak: isCurrentStreakActive ? currentStreak : 0,
    longestStreak,
    streakDates: longestStreakDates,
    isActive: isCurrentStreakActive,
    lastActivityDate: lastActivityDate.toDateString()
  };
};
