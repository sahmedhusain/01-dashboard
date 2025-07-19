/**
 * Chart Data Processors
 * Handles all data processing logic for chart components
 * Separates chart calculations from JSX presentation logic
 */

import { calculateXPTimeline, calculateXPByProject } from '../schemaAdapters/transactionSchemaAdapter.js';
import { getTopSkills } from '../schemaAdapters/skillsSchemaAdapter.js';
import { extractAuditStatistics } from '../schemaAdapters/auditSchemaAdapter.js';

/**
 * Process data for XP Progress Chart
 * @param {Array} transactions - Normalized transaction data
 * @param {Object} options - Chart options
 * @returns {Object} Processed chart data ready for SVG rendering
 */
export const processXPProgressChartData = (transactions, options = {}) => {
  const { width = 800, height = 400, margins = { top: 20, right: 30, bottom: 60, left: 80 } } = options;
  
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return {
      isValid: false,
      data: [],
      chartDimensions: calculateChartDimensions(width, height, margins),
      scales: null,
      error: 'No transaction data available'
    };
  }

  const timelineData = calculateXPTimeline(transactions);
  
  if (timelineData.length === 0) {
    return {
      isValid: false,
      data: [],
      chartDimensions: calculateChartDimensions(width, height, margins),
      scales: null,
      error: 'No XP timeline data available'
    };
  }

  const chartDimensions = calculateChartDimensions(width, height, margins);
  const maxXP = Math.max(...timelineData.map(d => d.cumulativeXP));
  const minXP = Math.min(...timelineData.map(d => d.cumulativeXP));
  
  // Create scales
  const xScale = (index) => (index / (timelineData.length - 1)) * chartDimensions.chartWidth;
  const yScale = (value) => chartDimensions.chartHeight - ((value - minXP) / (maxXP - minXP)) * chartDimensions.chartHeight;

  // Generate chart path for area chart
  const areaPath = generateAreaPath(timelineData, xScale, yScale, chartDimensions);
  const linePath = generateLinePath(timelineData, xScale, yScale);

  // Generate axis ticks
  const yTicks = generateYAxisTicks(minXP, maxXP, 5);
  const xTicks = generateXAxisTicks(timelineData, 6);

  return {
    isValid: true,
    data: timelineData,
    chartDimensions,
    scales: { xScale, yScale },
    paths: { areaPath, linePath },
    ticks: { yTicks, xTicks },
    domain: { minXP, maxXP },
    error: null
  };
};

/**
 * Process data for XP Timeline Chart
 * @param {Array} transactions - Normalized transaction data
 * @param {Object} options - Chart options
 * @returns {Object} Processed chart data ready for SVG rendering
 */
export const processXPTimelineChartData = (transactions, options = {}) => {
  const { width = 600, height = 300, margins = { top: 20, right: 20, bottom: 40, left: 60 } } = options;
  
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return {
      isValid: false,
      data: [],
      chartDimensions: calculateChartDimensions(width, height, margins),
      error: 'No transaction data available'
    };
  }

  // Filter and process XP transactions
  const xpTransactions = transactions.filter(t => t.isXP && t.amount > 0);
  
  if (xpTransactions.length === 0) {
    return {
      isValid: false,
      data: [],
      chartDimensions: calculateChartDimensions(width, height, margins),
      error: 'No XP transactions available'
    };
  }

  // Group by day and sum XP
  const dailyXP = groupTransactionsByDay(xpTransactions);
  const timelineData = Object.entries(dailyXP)
    .map(([date, amount]) => ({
      date: new Date(date),
      amount,
      formattedDate: formatChartDate(date)
    }))
    .sort((a, b) => a.date - b.date);

  const chartDimensions = calculateChartDimensions(width, height, margins);
  const maxAmount = Math.max(...timelineData.map(d => d.amount));
  
  // Create scales
  const xScale = (index) => (index / (timelineData.length - 1)) * chartDimensions.chartWidth;
  const yScale = (value) => chartDimensions.chartHeight - (value / maxAmount) * chartDimensions.chartHeight;

  // Generate chart elements
  const linePath = generateLinePath(timelineData.map((d, i) => ({ x: i, y: d.amount })), xScale, yScale);
  const points = timelineData.map((d, i) => ({
    ...d,
    x: chartDimensions.margin.left + xScale(i),
    y: chartDimensions.margin.top + yScale(d.amount)
  }));

  return {
    isValid: true,
    data: timelineData,
    chartDimensions,
    scales: { xScale, yScale },
    paths: { linePath },
    points,
    domain: { maxAmount },
    error: null
  };
};

/**
 * Process data for XP by Project Chart
 * @param {Array} transactions - Normalized transaction data
 * @param {Object} options - Chart options
 * @returns {Object} Processed chart data ready for SVG rendering
 */
export const processXPByProjectChartData = (transactions, options = {}) => {
  const { width = 500, height = 300, margins = { top: 20, right: 20, bottom: 60, left: 60 }, limit = 10 } = options;
  
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return {
      isValid: false,
      data: [],
      chartDimensions: calculateChartDimensions(width, height, margins),
      error: 'No transaction data available'
    };
  }

  const projectXPData = calculateXPByProject(transactions).slice(0, limit);
  
  if (projectXPData.length === 0) {
    return {
      isValid: false,
      data: [],
      chartDimensions: calculateChartDimensions(width, height, margins),
      error: 'No project XP data available'
    };
  }

  const chartDimensions = calculateChartDimensions(width, height, margins);
  const maxXP = Math.max(...projectXPData.map(d => d.totalXP));
  
  // Calculate bar layout
  const barWidth = chartDimensions.chartWidth / projectXPData.length * 0.8;
  const barSpacing = chartDimensions.chartWidth / projectXPData.length * 0.2;

  // Create bars data
  const bars = projectXPData.map((project, index) => {
    const barHeight = (project.totalXP / maxXP) * chartDimensions.chartHeight;
    const x = chartDimensions.margin.left + index * (chartDimensions.chartWidth / projectXPData.length) + barSpacing / 2;
    const y = chartDimensions.margin.top + chartDimensions.chartHeight - barHeight;
    
    return {
      ...project,
      x,
      y,
      width: barWidth,
      height: barHeight,
      percentage: (project.totalXP / maxXP) * 100
    };
  });

  return {
    isValid: true,
    data: projectXPData,
    chartDimensions,
    bars,
    domain: { maxXP },
    layout: { barWidth, barSpacing },
    error: null
  };
};

/**
 * Process data for Audit Stats Chart
 * @param {Array} audits - Normalized audit data
 * @param {Object} options - Chart options
 * @returns {Object} Processed chart data ready for SVG rendering
 */
export const processAuditStatsChartData = (audits, options = {}) => {
  const { width = 300, height = 300, radius = 100 } = options;
  
  if (!Array.isArray(audits) || audits.length === 0) {
    return {
      isValid: false,
      data: [],
      error: 'No audit data available'
    };
  }

  const auditStats = extractAuditStatistics(audits);
  
  const pieData = [
    { label: 'Passed', value: auditStats.passed, color: '#10b981' },
    { label: 'Failed', value: auditStats.failed, color: '#ef4444' },
    { label: 'Partial', value: auditStats.partial, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  if (pieData.length === 0) {
    return {
      isValid: false,
      data: [],
      error: 'No audit statistics available'
    };
  }

  const centerX = width / 2;
  const centerY = height / 2;
  const total = pieData.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate pie segments
  let currentAngle = -Math.PI / 2; // Start at top
  const segments = pieData.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 2 * Math.PI;
    const endAngle = currentAngle + angle;
    
    const x1 = centerX + radius * Math.cos(currentAngle);
    const y1 = centerY + radius * Math.sin(currentAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = angle > Math.PI ? 1 : 0;
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    const midAngle = currentAngle + angle / 2;
    const labelX = centerX + (radius * 0.7) * Math.cos(midAngle);
    const labelY = centerY + (radius * 0.7) * Math.sin(midAngle);
    
    const segment = {
      ...item,
      percentage,
      pathData,
      labelX,
      labelY,
      startAngle: currentAngle,
      endAngle,
      index
    };
    
    currentAngle = endAngle;
    return segment;
  });

  return {
    isValid: true,
    data: pieData,
    segments,
    dimensions: { width, height, radius, centerX, centerY },
    stats: auditStats,
    error: null
  };
};

/**
 * Process data for Skills Chart (Bar Chart)
 * @param {Array} skills - Normalized skills data
 * @param {Object} options - Chart options
 * @returns {Object} Processed chart data ready for SVG rendering
 */
export const processSkillsChartData = (skills, options = {}) => {
  const { width = 600, height = 400, margins = { top: 20, right: 20, bottom: 80, left: 60 }, limit = 10 } = options;
  
  if (!Array.isArray(skills) || skills.length === 0) {
    return {
      isValid: false,
      data: [],
      chartDimensions: calculateChartDimensions(width, height, margins),
      error: 'No skills data available'
    };
  }

  const topSkills = getTopSkills(skills, limit);
  
  if (topSkills.length === 0) {
    return {
      isValid: false,
      data: [],
      chartDimensions: calculateChartDimensions(width, height, margins),
      error: 'No skills data available'
    };
  }

  const chartDimensions = calculateChartDimensions(width, height, margins);
  const maxXP = Math.max(...topSkills.map(s => s.totalXP));
  
  // Calculate bar layout
  const barWidth = chartDimensions.chartWidth / topSkills.length * 0.8;
  const barSpacing = chartDimensions.chartWidth / topSkills.length * 0.2;

  // Create bars data
  const bars = topSkills.map((skill, index) => {
    const barHeight = (skill.totalXP / maxXP) * chartDimensions.chartHeight;
    const x = chartDimensions.margin.left + index * (chartDimensions.chartWidth / topSkills.length) + barSpacing / 2;
    const y = chartDimensions.margin.top + chartDimensions.chartHeight - barHeight;
    
    return {
      ...skill,
      x,
      y,
      width: barWidth,
      height: barHeight,
      percentage: (skill.totalXP / maxXP) * 100,
      displayName: truncateText(skill.name, 12)
    };
  });

  // Generate Y-axis ticks
  const yTicks = generateYAxisTicks(0, maxXP, 5);

  return {
    isValid: true,
    data: topSkills,
    chartDimensions,
    bars,
    ticks: { yTicks },
    domain: { maxXP },
    layout: { barWidth, barSpacing },
    error: null
  };
};

// Helper functions

/**
 * Calculate chart dimensions with margins
 */
const calculateChartDimensions = (width, height, margins) => {
  return {
    width,
    height,
    margin: margins,
    chartWidth: width - margins.left - margins.right,
    chartHeight: height - margins.top - margins.bottom
  };
};

/**
 * Generate area path for SVG
 */
const generateAreaPath = (data, xScale, yScale, dimensions) => {
  if (data.length === 0) return '';
  
  let path = `M ${dimensions.margin.left} ${dimensions.margin.top + dimensions.chartHeight}`;
  
  data.forEach((d, i) => {
    const x = dimensions.margin.left + xScale(i);
    const y = dimensions.margin.top + yScale(d.cumulativeXP);
    path += ` L ${x} ${y}`;
  });
  
  path += ` L ${dimensions.margin.left + dimensions.chartWidth} ${dimensions.margin.top + dimensions.chartHeight} Z`;
  return path;
};

/**
 * Generate line path for SVG
 */
const generateLinePath = (data, xScale, yScale) => {
  if (data.length === 0) return '';
  
  return data.map((d, i) => {
    const x = xScale(i);
    const y = yScale(typeof d === 'object' ? d.y : d.cumulativeXP);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');
};

/**
 * Generate Y-axis ticks
 */
const generateYAxisTicks = (min, max, count) => {
  const ticks = [];
  const step = (max - min) / (count - 1);
  
  for (let i = 0; i < count; i++) {
    const value = min + (step * i);
    ticks.push({
      value,
      label: formatTickValue(value),
      position: i / (count - 1)
    });
  }
  
  return ticks;
};

/**
 * Generate X-axis ticks
 */
const generateXAxisTicks = (data, maxTicks) => {
  if (data.length === 0) return [];
  
  const interval = Math.max(1, Math.floor(data.length / maxTicks));
  const ticks = [];
  
  for (let i = 0; i < data.length; i += interval) {
    ticks.push({
      index: i,
      value: data[i].date,
      label: formatChartDate(data[i].date),
      position: i / (data.length - 1)
    });
  }
  
  return ticks;
};

/**
 * Group transactions by day
 */
const groupTransactionsByDay = (transactions) => {
  return transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.createdAt).toDateString();
    groups[date] = (groups[date] || 0) + transaction.amount;
    return groups;
  }, {});
};

/**
 * Format date for chart display
 */
const formatChartDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format tick value for display
 */
const formatTickValue = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return Math.round(value).toString();
};

/**
 * Process project success chart data for pie chart visualization
 * @param {Object} data - Raw project success data
 * @param {Object} options - Chart options
 * @returns {Object} Processed chart data ready for SVG rendering
 */
export const processProjectSuccessChartData = (data, options = {}) => {
  const { size = 200 } = options;

  if (!data || (data.passed === 0 && data.failed === 0)) {
    return {
      isValid: false,
      error: 'No project data available',
      chartDimensions: null,
      paths: null,
      segments: null,
      percentages: null
    };
  }

  const total = data.passed + data.failed;
  const radius = size / 2 - 20;
  const center = size / 2;
  const innerRadius = radius * 0.6;

  // Calculate angles
  const passedAngle = (data.passed / total) * 360;
  const failedAngle = (data.failed / total) * 360;

  // Calculate percentages
  const passedPercentage = Math.round((data.passed / total) * 100);
  const failedPercentage = Math.round((data.failed / total) * 100);

  // Helper function to convert polar to cartesian coordinates
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Helper function to create SVG path
  const createPath = (startAngle, endAngle, radius, center) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", center, center,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  // Generate paths
  const passedPath = createPath(0, passedAngle, radius, center);
  const failedPath = createPath(passedAngle, passedAngle + failedAngle, radius, center);

  return {
    isValid: true,
    error: null,
    chartDimensions: {
      size,
      radius,
      center,
      innerRadius
    },
    paths: {
      passedPath,
      failedPath
    },
    segments: {
      passed: {
        count: data.passed,
        angle: passedAngle
      },
      failed: {
        count: data.failed,
        angle: failedAngle
      }
    },
    percentages: {
      passed: passedPercentage,
      failed: failedPercentage
    }
  };
};

/**
 * Truncate text to specified length
 */
const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
