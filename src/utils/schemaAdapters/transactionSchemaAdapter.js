/**
 * Transaction Schema Adapter
 * Normalizes transaction/XP data from GraphQL to consistent internal format
 * Handles different transaction data structures and provides calculations
 */

/**
 * Normalize single transaction data from GraphQL response
 * @param {Object} rawTransaction - Raw transaction data from GraphQL
 * @returns {Object} Normalized transaction data
 */
export const normalizeTransactionData = (rawTransaction) => {
  if (!rawTransaction) {
    return {
      id: null,
      type: 'unknown',
      amount: 0,
      createdAt: null,
      updatedAt: null,
      path: null,
      object: null,
      user: null,
      isXP: false,
      isSkill: false,
      isUp: false,
      isDown: false
    };
  }

  const amount = parseFloat(rawTransaction.amount) || 0;
  const type = rawTransaction.type || 'unknown';

  return {
    id: rawTransaction.id || null,
    type: type,
    amount: amount,
    createdAt: rawTransaction.createdAt || null,
    updatedAt: rawTransaction.updatedAt || null,
    path: rawTransaction.path || null,
    object: rawTransaction.object || null,
    user: rawTransaction.user || null,
    isXP: type === 'xp',
    isSkill: type.startsWith('skill_'),
    isUp: type === 'up',
    isDown: type === 'down'
  };
};

/**
 * Normalize multiple transactions data
 * @param {Array} rawTransactions - Array of raw transaction data from GraphQL
 * @returns {Array} Array of normalized transaction data
 */
export const normalizeTransactionsData = (rawTransactions) => {
  if (!Array.isArray(rawTransactions)) return [];
  return rawTransactions.map(normalizeTransactionData);
};

/**
 * Filter transactions by type
 * @param {Array} transactions - Array of normalized transaction data
 * @param {string} type - Transaction type to filter by
 * @returns {Array} Filtered transactions
 */
export const filterTransactionsByType = (transactions, type) => {
  if (!Array.isArray(transactions) || !type) return transactions;

  return transactions.filter(transaction => transaction.type === type);
};

/**
 * Get XP transactions only
 * @param {Array} transactions - Array of normalized transaction data
 * @returns {Array} XP transactions only
 */
export const getXPTransactions = (transactions) => {
  if (!Array.isArray(transactions)) return [];
  return transactions.filter(transaction => transaction.isXP);
};

/**
 * Get skill transactions only
 * @param {Array} transactions - Array of normalized transaction data
 * @returns {Array} Skill transactions only
 */
export const getSkillTransactions = (transactions) => {
  if (!Array.isArray(transactions)) return [];
  return transactions.filter(transaction => transaction.isSkill);
};

/**
 * Calculate total XP from transactions
 * @param {Array} transactions - Array of normalized transaction data
 * @returns {number} Total XP amount
 */
export const calculateTotalXP = (transactions) => {
  if (!Array.isArray(transactions)) return 0;

  return transactions
    .filter(transaction => transaction.isXP)
    .reduce((total, transaction) => total + transaction.amount, 0);
};

/**
 * Group transactions by date period
 * @param {Array} transactions - Array of normalized transaction data
 * @param {string} period - Grouping period ('day', 'week', 'month')
 * @returns {Object} Transactions grouped by date
 */
export const groupTransactionsByDate = (transactions, period = 'day') => {
  if (!Array.isArray(transactions)) return {};

  return transactions.reduce((groups, transaction) => {
    if (!transaction.createdAt) return groups;

    const date = new Date(transaction.createdAt);
    let key;

    switch (period) {
      case 'day':
        key = date.toDateString();
        break;
      case 'week': {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toDateString();
        break;
      }
      case 'month':
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        break;
      default:
        key = date.toDateString();
    }

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(transaction);
    return groups;
  }, {});
};

/**
 * Calculate XP timeline data for charts
 * @param {Array} transactions - Array of normalized transaction data
 * @returns {Array} Timeline data with cumulative XP
 */
export const calculateXPTimeline = (transactions) => {
  if (!Array.isArray(transactions)) return [];

  const xpTransactions = getXPTransactions(transactions)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  let cumulativeXP = 0;
  const timeline = [];

  xpTransactions.forEach(transaction => {
    cumulativeXP += transaction.amount;
    timeline.push({
      date: transaction.createdAt,
      amount: transaction.amount,
      cumulativeXP: cumulativeXP,
      object: transaction.object,
      path: transaction.path
    });
  });

  return timeline;
};

/**
 * Get recent transactions
 * @param {Array} transactions - Array of normalized transaction data
 * @param {number} limit - Number of recent transactions to return
 * @returns {Array} Recent transactions
 */
export const getRecentTransactions = (transactions, limit = 10) => {
  if (!Array.isArray(transactions)) return [];

  return [...transactions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

/**
 * Filter transactions by date range
 * @param {Array} transactions - Array of normalized transaction data
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Filtered transactions
 */
export const filterTransactionsByDateRange = (transactions, startDate, endDate) => {
  if (!Array.isArray(transactions)) return [];
  if (!startDate && !endDate) return transactions;

  return transactions.filter(transaction => {
    if (!transaction.createdAt) return false;
    
    const transactionDate = new Date(transaction.createdAt);
    
    if (startDate && transactionDate < startDate) return false;
    if (endDate && transactionDate > endDate) return false;
    
    return true;
  });
};

/**
 * Calculate transaction statistics
 * @param {Array} transactions - Array of normalized transaction data
 * @returns {Object} Transaction statistics
 */
export const calculateTransactionStatistics = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return {
      total: 0,
      totalXP: 0,
      totalSkills: 0,
      averageXP: 0,
      maxXP: 0,
      minXP: 0,
      positiveTransactions: 0,
      negativeTransactions: 0
    };
  }

  const xpTransactions = getXPTransactions(transactions);
  const skillTransactions = getSkillTransactions(transactions);
  
  const totalXP = calculateTotalXP(transactions);
  const xpAmounts = xpTransactions.map(t => t.amount).filter(amount => amount > 0);
  
  const averageXP = xpAmounts.length > 0 ? totalXP / xpAmounts.length : 0;
  const maxXP = xpAmounts.length > 0 ? Math.max(...xpAmounts) : 0;
  const minXP = xpAmounts.length > 0 ? Math.min(...xpAmounts) : 0;

  const positiveTransactions = transactions.filter(t => t.amount > 0).length;
  const negativeTransactions = transactions.filter(t => t.amount < 0).length;

  return {
    total: transactions.length,
    totalXP,
    totalSkills: skillTransactions.length,
    averageXP,
    maxXP,
    minXP,
    positiveTransactions,
    negativeTransactions
  };
};

/**
 * Group transactions by project/object
 * @param {Array} transactions - Array of normalized transaction data
 * @returns {Object} Transactions grouped by project
 */
export const groupTransactionsByProject = (transactions) => {
  if (!Array.isArray(transactions)) return {};

  return transactions.reduce((groups, transaction) => {
    const projectName = transaction.object?.name || 
                       transaction.path?.split('/').pop() || 
                       'Unknown Project';

    if (!groups[projectName]) {
      groups[projectName] = [];
    }
    groups[projectName].push(transaction);
    return groups;
  }, {});
};

/**
 * Calculate XP by project
 * @param {Array} transactions - Array of normalized transaction data
 * @returns {Array} XP amounts grouped by project
 */
export const calculateXPByProject = (transactions) => {
  const projectGroups = groupTransactionsByProject(getXPTransactions(transactions));
  
  return Object.entries(projectGroups).map(([projectName, projectTransactions]) => ({
    name: projectName,
    totalXP: projectTransactions.reduce((sum, t) => sum + t.amount, 0),
    transactionCount: projectTransactions.length,
    averageXP: projectTransactions.reduce((sum, t) => sum + t.amount, 0) / projectTransactions.length,
    lastActivity: Math.max(...projectTransactions.map(t => new Date(t.createdAt).getTime()))
  })).sort((a, b) => b.totalXP - a.totalXP);
};

/**
 * Sort transactions by various criteria
 * @param {Array} transactions - Array of normalized transaction data
 * @param {string} sortBy - Sort criteria ('date', 'amount', 'type')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted transactions array
 */
export const sortTransactions = (transactions, sortBy = 'date', order = 'desc') => {
  if (!Array.isArray(transactions)) return [];

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'date':
        aValue = new Date(a.createdAt || 0);
        bValue = new Date(b.createdAt || 0);
        break;
      case 'amount':
        aValue = a.amount || 0;
        bValue = b.amount || 0;
        break;
      case 'type':
        aValue = a.type || '';
        bValue = b.type || '';
        break;
      default:
        aValue = new Date(a.createdAt || 0);
        bValue = new Date(b.createdAt || 0);
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sortedTransactions;
};

/**
 * Extract object information from transaction
 * @param {Object} transaction - Normalized transaction data
 * @returns {Object} Object information
 */
export const extractTransactionObjectInfo = (transaction) => {
  if (!transaction || !transaction.object) {
    return {
      name: transaction?.path?.split('/').pop() || 'Unknown',
      type: 'unknown',
      id: null
    };
  }

  return {
    name: transaction.object.name || 'Unknown',
    type: transaction.object.type || 'unknown',
    id: transaction.object.id || null
  };
};

/**
 * Check if transaction is recent (within specified days)
 * @param {Object} transaction - Normalized transaction data
 * @param {number} days - Number of days to consider as recent
 * @returns {boolean} True if transaction is recent
 */
export const isRecentTransaction = (transaction, days = 7) => {
  if (!transaction || !transaction.createdAt) return false;
  
  const transactionDate = new Date(transaction.createdAt);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return transactionDate >= cutoffDate;
};
