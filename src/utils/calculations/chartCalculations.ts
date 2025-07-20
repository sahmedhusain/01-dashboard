/**
 * Chart Calculations Utility
 * Handles all chart-related calculations, scaling, and coordinate transformations
 */

/**
 * Calculate chart dimensions with margins
 * @param {number} width - Total chart width
 * @param {number} height - Total chart height
 * @param {Object} margins - Margin object {top, right, bottom, left}
 * @returns {Object} Chart dimensions
 */
export const calculateChartDimensions = (width, height, margins = {}) => {
  const defaultMargins = { top: 20, right: 30, bottom: 40, left: 60 };
  const margin = { ...defaultMargins, ...margins };
  
  return {
    width,
    height,
    margin,
    chartWidth: width - margin.left - margin.right,
    chartHeight: height - margin.top - margin.bottom
  };
};

/**
 * Create linear scale function
 * @param {Array} domain - Input domain [min, max]
 * @param {Array} range - Output range [min, max]
 * @returns {Function} Scale function
 */
export const createLinearScale = (domain, range) => {
  const [domainMin, domainMax] = domain;
  const [rangeMin, rangeMax] = range;
  const domainSpan = domainMax - domainMin;
  const rangeSpan = rangeMax - rangeMin;
  
  return (value) => {
    if (domainSpan === 0) return rangeMin;
    return rangeMin + ((value - domainMin) / domainSpan) * rangeSpan;
  };
};

/**
 * Calculate data domain (min/max values)
 * @param {Array} data - Array of data points
 * @param {string} key - Key to extract values from
 * @param {Object} options - Options {includeZero, padding}
 * @returns {Array} Domain [min, max]
 */
export const calculateDataDomain = (data, key, options = {}) => {
  if (!Array.isArray(data) || data.length === 0) return [0, 1];
  
  const { includeZero = true, padding = 0.1 } = options;
  const values = data.map(d => typeof d === 'object' ? d[key] : d).filter(v => typeof v === 'number');
  
  if (values.length === 0) return [0, 1];
  
  let min = Math.min(...values);
  let max = Math.max(...values);
  
  if (includeZero) {
    min = Math.min(0, min);
  }
  
  // Add padding
  const range = max - min;
  const paddingAmount = range * padding;
  
  return [min - paddingAmount, max + paddingAmount];
};

/**
 * Generate tick values for axis
 * @param {Array} domain - Domain [min, max]
 * @param {number} tickCount - Desired number of ticks
 * @returns {Array} Tick values
 */
export const generateTicks = (domain, tickCount = 5) => {
  const [min, max] = domain;
  const range = max - min;
  const step = range / (tickCount - 1);
  
  const ticks = [];
  for (let i = 0; i < tickCount; i++) {
    ticks.push(min + (step * i));
  }
  
  return ticks;
};

/**
 * Calculate bar chart layout
 * @param {Array} data - Array of data points
 * @param {number} chartWidth - Available chart width
 * @param {Object} options - Options {barPadding, groupPadding}
 * @returns {Object} Bar layout information
 */
export const calculateBarLayout = (data, chartWidth, options = {}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return { barWidth: 0, barSpacing: 0, totalWidth: 0 };
  }
  
  const { barPadding = 0.1, groupPadding = 0.2 } = options;
  const barCount = data.length;
  
  const availableWidth = chartWidth * (1 - groupPadding);
  const barWidth = availableWidth / barCount * (1 - barPadding);
  const barSpacing = availableWidth / barCount * barPadding;
  
  return {
    barWidth,
    barSpacing,
    totalWidth: availableWidth,
    barCount
  };
};

/**
 * Calculate line chart path
 * @param {Array} data - Array of data points
 * @param {Function} xScale - X scale function
 * @param {Function} yScale - Y scale function
 * @param {string} xKey - X value key
 * @param {string} yKey - Y value key
 * @returns {string} SVG path string
 */
export const calculateLinePath = (data, xScale, yScale, xKey, yKey) => {
  if (!Array.isArray(data) || data.length === 0) return '';
  
  const pathCommands = data.map((d, i) => {
    const x = xScale(d[xKey]);
    const y = yScale(d[yKey]);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  });
  
  return pathCommands.join(' ');
};

/**
 * Calculate area chart path
 * @param {Array} data - Array of data points
 * @param {Function} xScale - X scale function
 * @param {Function} yScale - Y scale function
 * @param {string} xKey - X value key
 * @param {string} yKey - Y value key
 * @param {number} baselineY - Baseline Y coordinate
 * @returns {string} SVG path string
 */
export const calculateAreaPath = (data, xScale, yScale, xKey, yKey, baselineY) => {
  if (!Array.isArray(data) || data.length === 0) return '';
  
  const linePath = calculateLinePath(data, xScale, yScale, xKey, yKey);
  const firstX = xScale(data[0][xKey]);
  const lastX = xScale(data[data.length - 1][xKey]);
  
  return `${linePath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
};

/**
 * Calculate pie chart segments
 * @param {Array} data - Array of data points
 * @param {string} valueKey - Key for values
 * @param {number} radius - Pie chart radius
 * @param {number} centerX - Center X coordinate
 * @param {number} centerY - Center Y coordinate
 * @returns {Array} Pie segments with path data
 */
export const calculatePieSegments = (data, valueKey, radius, centerX = 0, centerY = 0) => {
  if (!Array.isArray(data) || data.length === 0) return [];
  
  const total = data.reduce((sum, d) => sum + (d[valueKey] || 0), 0);
  if (total === 0) return [];
  
  let currentAngle = -Math.PI / 2; // Start at top
  
  return data.map((d, i) => {
    const value = d[valueKey] || 0;
    const percentage = (value / total) * 100;
    const angle = (value / total) * 2 * Math.PI;
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
      ...d,
      value,
      percentage,
      startAngle: currentAngle,
      endAngle,
      pathData,
      labelX,
      labelY,
      index: i
    };
    
    currentAngle = endAngle;
    return segment;
  });
};

/**
 * Calculate chart grid lines
 * @param {Array} domain - Domain [min, max]
 * @param {Function} scale - Scale function
 * @param {number} tickCount - Number of grid lines
 * @param {string} orientation - 'horizontal' or 'vertical'
 * @param {number} chartWidth - Chart width
 * @param {number} chartHeight - Chart height
 * @returns {Array} Grid line data
 */
export const calculateGridLines = (domain, scale, tickCount, orientation, chartWidth, chartHeight) => {
  const ticks = generateTicks(domain, tickCount);
  
  return ticks.map(tick => {
    const position = scale(tick);
    
    if (orientation === 'horizontal') {
      return {
        x1: 0,
        y1: position,
        x2: chartWidth,
        y2: position,
        value: tick
      };
    } else {
      return {
        x1: position,
        y1: 0,
        x2: position,
        y2: chartHeight,
        value: tick
      };
    }
  });
};

/**
 * Calculate chart tooltip position
 * @param {number} mouseX - Mouse X coordinate
 * @param {number} mouseY - Mouse Y coordinate
 * @param {number} tooltipWidth - Tooltip width
 * @param {number} tooltipHeight - Tooltip height
 * @param {number} containerWidth - Container width
 * @param {number} containerHeight - Container height
 * @returns {Object} Tooltip position {x, y}
 */
export const calculateTooltipPosition = (mouseX, mouseY, tooltipWidth, tooltipHeight, containerWidth, containerHeight) => {
  let x = mouseX + 10; // Default offset
  let y = mouseY - 10;
  
  // Adjust if tooltip would go off right edge
  if (x + tooltipWidth > containerWidth) {
    x = mouseX - tooltipWidth - 10;
  }
  
  // Adjust if tooltip would go off bottom edge
  if (y + tooltipHeight > containerHeight) {
    y = mouseY - tooltipHeight - 10;
  }
  
  // Ensure tooltip doesn't go off left or top edges
  x = Math.max(0, x);
  y = Math.max(0, y);
  
  return { x, y };
};

/**
 * Calculate data point coordinates for scatter plot
 * @param {Array} data - Array of data points
 * @param {Function} xScale - X scale function
 * @param {Function} yScale - Y scale function
 * @param {string} xKey - X value key
 * @param {string} yKey - Y value key
 * @returns {Array} Point coordinates
 */
export const calculateScatterPoints = (data, xScale, yScale, xKey, yKey) => {
  if (!Array.isArray(data)) return [];
  
  return data.map((d, i) => ({
    ...d,
    x: xScale(d[xKey]),
    y: yScale(d[yKey]),
    index: i
  }));
};

/**
 * Calculate chart animation keyframes
 * @param {number} duration - Animation duration in ms
 * @param {string} easing - Easing function ('linear', 'ease-in', 'ease-out', 'ease-in-out')
 * @returns {Object} Animation configuration
 */
export const calculateAnimationKeyframes = (duration = 1000, easing = 'ease-out') => {
  const keyframes = [];
  const steps = 60; // 60fps
  const stepDuration = duration / steps;
  
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    let easedProgress;
    
    switch (easing) {
      case 'ease-in':
        easedProgress = progress * progress;
        break;
      case 'ease-out':
        easedProgress = 1 - Math.pow(1 - progress, 2);
        break;
      case 'ease-in-out':
        easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        break;
      default:
        easedProgress = progress;
    }
    
    keyframes.push({
      time: i * stepDuration,
      progress: easedProgress
    });
  }
  
  return {
    keyframes,
    duration,
    easing
  };
};

/**
 * Validate chart data
 * @param {Array} data - Chart data
 * @param {Array} requiredKeys - Required keys in data objects
 * @returns {Object} Validation result
 */
export const validateChartData = (data, requiredKeys = []) => {
  const errors = [];
  const warnings = [];
  
  if (!Array.isArray(data)) {
    errors.push('Data must be an array');
    return { isValid: false, errors, warnings };
  }
  
  if (data.length === 0) {
    warnings.push('Data array is empty');
  }
  
  data.forEach((item, index) => {
    if (typeof item !== 'object' || item === null) {
      errors.push(`Item at index ${index} must be an object`);
      return;
    }
    
    requiredKeys.forEach(key => {
      if (!(key in item)) {
        errors.push(`Item at index ${index} missing required key: ${key}`);
      } else if (typeof item[key] !== 'number' && item[key] !== null) {
        warnings.push(`Item at index ${index} has non-numeric value for key: ${key}`);
      }
    });
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Calculate responsive chart dimensions
 * @param {number} containerWidth - Container width
 * @param {number} containerHeight - Container height
 * @param {number} aspectRatio - Desired aspect ratio (width/height)
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {Object} Responsive dimensions
 */
export const calculateResponsiveDimensions = (containerWidth, containerHeight, aspectRatio = 16/9, maxWidth = Infinity, maxHeight = Infinity) => {
  let width = Math.min(containerWidth, maxWidth);
  let height = width / aspectRatio;
  
  if (height > Math.min(containerHeight, maxHeight)) {
    height = Math.min(containerHeight, maxHeight);
    width = height * aspectRatio;
  }
  
  return {
    width: Math.floor(width),
    height: Math.floor(height),
    aspectRatio
  };
};

/**
 * Calculate optimal chart layout for multiple charts
 * @param {number} chartCount - Number of charts to layout
 * @param {Object} containerDimensions - Container dimensions
 * @param {Object} options - Layout options
 * @returns {Object} Layout configuration
 */
export const calculateChartLayout = (chartCount, containerDimensions, options = {}) => {
  const {
    minChartWidth = 300,
    minChartHeight = 200,
    gap = 20,
    aspectRatio = 1.5
  } = options;

  const { width: containerWidth, height: containerHeight } = containerDimensions;

  // Calculate optimal grid layout
  const cols = Math.ceil(Math.sqrt(chartCount));
  const rows = Math.ceil(chartCount / cols);

  // Calculate available space per chart
  const availableWidth = (containerWidth - (gap * (cols - 1))) / cols;
  const availableHeight = (containerHeight - (gap * (rows - 1))) / rows;

  // Determine chart size based on constraints
  let chartWidth = Math.max(minChartWidth, availableWidth);
  let chartHeight = Math.max(minChartHeight, availableHeight);

  // Maintain aspect ratio if possible
  if (chartWidth / chartHeight > aspectRatio) {
    chartWidth = chartHeight * aspectRatio;
  } else {
    chartHeight = chartWidth / aspectRatio;
  }

  return {
    cols,
    rows,
    chartWidth: Math.floor(chartWidth),
    chartHeight: Math.floor(chartHeight),
    gap,
    totalWidth: cols * chartWidth + (cols - 1) * gap,
    totalHeight: rows * chartHeight + (rows - 1) * gap
  };
};

/**
 * Calculate data smoothing using moving average
 * @param {Array} data - Array of data points
 * @param {number} windowSize - Size of moving average window
 * @param {string} valueKey - Key to extract values from data points
 * @returns {Array} Smoothed data
 */
export const calculateMovingAverage = (data, windowSize = 5, valueKey = 'value') => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const smoothedData = [];

  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(data.length, start + windowSize);

    const window = data.slice(start, end);
    const average = window.reduce((sum, point) => {
      const value = typeof point === 'object' ? point[valueKey] : point;
      return sum + (typeof value === 'number' ? value : 0);
    }, 0) / window.length;

    smoothedData.push({
      ...data[i],
      [valueKey]: average,
      originalValue: typeof data[i] === 'object' ? data[i][valueKey] : data[i]
    });
  }

  return smoothedData;
};

/**
 * Calculate trend line using linear regression
 * @param {Array} data - Array of data points
 * @param {string} xKey - Key for x values
 * @param {string} yKey - Key for y values
 * @returns {Object} Trend line data
 */
export const calculateTrendLine = (data, xKey = 'x', yKey = 'y') => {
  if (!Array.isArray(data) || data.length < 2) {
    return {
      slope: 0,
      intercept: 0,
      correlation: 0,
      points: []
    };
  }

  // Convert data to numeric arrays
  const points = data.map(point => ({
    x: typeof point[xKey] === 'number' ? point[xKey] : new Date(point[xKey]).getTime(),
    y: typeof point[yKey] === 'number' ? point[yKey] : 0
  })).filter(point => !isNaN(point.x) && !isNaN(point.y));

  if (points.length < 2) {
    return { slope: 0, intercept: 0, correlation: 0, points: [] };
  }

  const n = points.length;
  const sumX = points.reduce((sum, p) => sum + p.x, 0);
  const sumY = points.reduce((sum, p) => sum + p.y, 0);
  const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);
  const sumYY = points.reduce((sum, p) => sum + p.y * p.y, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Calculate correlation coefficient
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
  const correlation = denominator !== 0 ? numerator / denominator : 0;

  // Generate trend line points
  const minX = Math.min(...points.map(p => p.x));
  const maxX = Math.max(...points.map(p => p.x));
  const trendPoints = [
    { x: minX, y: slope * minX + intercept },
    { x: maxX, y: slope * maxX + intercept }
  ];

  return {
    slope,
    intercept,
    correlation,
    points: trendPoints,
    equation: `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`
  };
};

/**
 * Calculate chart animation timing
 * @param {number} dataLength - Number of data points
 * @param {Object} options - Animation options
 * @returns {Object} Animation configuration
 */
export const calculateAnimationTiming = (dataLength, options = {}) => {
  const {
    baseDuration = 1000,
    maxDuration = 3000,
    delayPerItem = 50,
    easing = 'ease-out'
  } = options;

  const totalDelay = Math.min(dataLength * delayPerItem, maxDuration - baseDuration);
  const duration = Math.min(baseDuration + totalDelay, maxDuration);

  return {
    duration,
    delayPerItem,
    totalDelay,
    easing,
    staggered: dataLength > 1
  };
};

// ============================================================================
// ADVANCED SVG CHART CREATION FUNCTIONS
// Professional dashboard charts as required by GraphQL objectives
// ============================================================================

/**
 * Create XP Progress Over Time Line Chart (SVG)
 * @param {Array} xpTimeline - XP timeline data
 * @param {Object} dimensions - Chart dimensions
 * @returns {Object} SVG chart configuration
 */
export const createXPProgressChart = (xpTimeline, dimensions) => {
  if (!xpTimeline || xpTimeline.length === 0) {
    return { error: 'No XP timeline data available' };
  }

  const { chartWidth, chartHeight, margin } = dimensions;

  // Calculate cumulative XP over time
  let cumulativeXP = 0;
  const processedData = xpTimeline.map((entry, index) => {
    cumulativeXP += entry.amount;
    return {
      ...entry,
      cumulativeXP,
      index,
      date: new Date(entry.createdAt)
    };
  });

  // Create scales
  const xScale = createLinearScale(
    [0, processedData.length - 1],
    [0, chartWidth]
  );

  const yScale = createLinearScale(
    [0, Math.max(...processedData.map(d => d.cumulativeXP))],
    [chartHeight, 0]
  );

  // Generate SVG path for line chart
  const pathData = processedData.map((d, i) => {
    const x = xScale(i);
    const y = yScale(d.cumulativeXP);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  // Generate data points for interactive circles
  const dataPoints = processedData.map((d, i) => ({
    x: xScale(i),
    y: yScale(d.cumulativeXP),
    value: d.cumulativeXP,
    date: d.date,
    amount: d.amount,
    project: d.object?.name || 'Unknown'
  }));

  return {
    type: 'line-chart',
    pathData,
    dataPoints,
    scales: { xScale, yScale },
    processedData,
    dimensions,
    title: 'XP Progress Over Time',
    xAxisLabel: 'Timeline',
    yAxisLabel: 'Cumulative XP'
  };
};

/**
 * Create Project Success Rate Pie Chart (SVG)
 * @param {Array} projectResults - Project results data
 * @param {Object} dimensions - Chart dimensions
 * @returns {Object} SVG pie chart configuration
 */
export const createProjectSuccessChart = (projectResults, dimensions) => {
  if (!projectResults || projectResults.length === 0) {
    return { error: 'No project results data available' };
  }

  const { chartWidth, chartHeight } = dimensions;
  const radius = Math.min(chartWidth, chartHeight) / 2 * 0.8;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  // Calculate success/failure statistics
  const passed = projectResults.filter(p => p.grade >= 1).length;
  const failed = projectResults.filter(p => p.grade < 1).length;
  const total = projectResults.length;

  const data = [
    { label: 'Passed', value: passed, percentage: (passed / total) * 100, color: '#4CAF50' },
    { label: 'Failed', value: failed, percentage: (failed / total) * 100, color: '#F44336' }
  ];

  // Calculate pie slices
  let currentAngle = -Math.PI / 2; // Start at top
  const slices = data.map(item => {
    const sliceAngle = (item.percentage / 100) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    // Calculate arc path
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    currentAngle = endAngle;

    return {
      ...item,
      pathData,
      startAngle,
      endAngle,
      sliceAngle
    };
  });

  return {
    type: 'pie-chart',
    slices,
    centerX,
    centerY,
    radius,
    dimensions,
    title: 'Project Success Rate',
    totalProjects: total,
    successRate: Math.round((passed / total) * 100)
  };
};

/**
 * Create Skills Radar Chart (SVG)
 * @param {Array} skills - Skills data
 * @param {Object} dimensions - Chart dimensions
 * @returns {Object} SVG radar chart configuration
 */
export const createSkillsRadarChart = (skills, dimensions) => {
  if (!skills || skills.length === 0) {
    return { error: 'No skills data available' };
  }

  const { chartWidth, chartHeight } = dimensions;
  const radius = Math.min(chartWidth, chartHeight) / 2 * 0.8;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  // Take top 8 skills for better visualization
  const topSkills = skills
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8);

  const maxValue = Math.max(...topSkills.map(s => s.amount));
  const angleStep = (2 * Math.PI) / topSkills.length;

  // Generate radar chart points
  const radarPoints = topSkills.map((skill, index) => {
    const angle = index * angleStep - Math.PI / 2; // Start at top
    const value = skill.amount;
    const normalizedValue = value / maxValue;
    const x = centerX + (radius * normalizedValue) * Math.cos(angle);
    const y = centerY + (radius * normalizedValue) * Math.sin(angle);

    return {
      x,
      y,
      angle,
      value,
      normalizedValue,
      skill: skill.type.replace('skill_', ''),
      originalSkill: skill
    };
  });

  // Generate radar area path
  const radarPath = radarPoints.map((point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  // Generate grid circles
  const gridLevels = 5;
  const gridCircles = Array.from({ length: gridLevels }, (_, i) => {
    const levelRadius = radius * ((i + 1) / gridLevels);
    return {
      radius: levelRadius,
      level: i + 1,
      percentage: ((i + 1) / gridLevels) * 100
    };
  });

  // Generate axis lines
  const axisLines = topSkills.map((skill, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return {
      x1: centerX,
      y1: centerY,
      x2: x,
      y2: y,
      skill: skill.type.replace('skill_', ''),
      labelX: centerX + (radius * 1.15) * Math.cos(angle),
      labelY: centerY + (radius * 1.15) * Math.sin(angle)
    };
  });

  return {
    type: 'radar-chart',
    radarPath,
    radarPoints,
    gridCircles,
    axisLines,
    centerX,
    centerY,
    radius,
    dimensions,
    title: 'Skills Proficiency',
    maxValue,
    skillsCount: topSkills.length
  };
};

/**
 * Create Audit Performance Bar Chart (SVG)
 * @param {Object} auditData - Audit performance data
 * @param {Object} dimensions - Chart dimensions
 * @returns {Object} SVG bar chart configuration
 */
export const createAuditPerformanceChart = (auditData, dimensions) => {
  if (!auditData) {
    return { error: 'No audit data available' };
  }

  const { chartWidth, chartHeight } = dimensions;
  const { auditRatio = 0, totalUp = 0, totalDown = 0 } = auditData;

  // Prepare data for visualization
  const data = [
    {
      label: 'Audits Given',
      value: totalUp,
      color: '#4CAF50',
      type: 'positive'
    },
    {
      label: 'Audits Received',
      value: totalDown,
      color: '#2196F3',
      type: 'neutral'
    },
    {
      label: 'Audit Ratio',
      value: auditRatio * 100, // Convert to percentage for visualization
      color: auditRatio >= 1 ? '#4CAF50' : '#FF9800',
      type: auditRatio >= 1 ? 'positive' : 'warning'
    }
  ];

  const maxValue = Math.max(...data.map(d => d.value), 100); // Ensure minimum scale
  const barHeight = chartHeight / data.length * 0.6;
  const barSpacing = chartHeight / data.length * 0.4;

  // Generate bars
  const bars = data.map((item, index) => {
    const barWidth = (item.value / maxValue) * chartWidth;
    const y = index * (barHeight + barSpacing) + barSpacing / 2;

    return {
      ...item,
      x: 0,
      y,
      width: barWidth,
      height: barHeight,
      percentage: (item.value / maxValue) * 100
    };
  });

  // Calculate performance metrics
  const auditBalance = totalUp - totalDown;
  const auditActivity = totalUp + totalDown;
  const performanceStatus = auditRatio >= 1.2 ? 'excellent' :
                           auditRatio >= 1.0 ? 'good' :
                           auditRatio >= 0.8 ? 'needs-improvement' : 'critical';

  return {
    type: 'bar-chart',
    bars,
    dimensions,
    title: 'Audit Performance',
    maxValue,
    auditRatio,
    auditBalance,
    auditActivity,
    performanceStatus,
    metrics: {
      ratio: auditRatio.toFixed(2),
      balance: auditBalance,
      activity: auditActivity,
      efficiency: auditActivity > 0 ? ((totalUp / auditActivity) * 100).toFixed(1) : 0
    }
  };
};

/**
 * Create comprehensive chart configuration for dashboard
 * @param {Object} analyticsData - Complete analytics data
 * @param {Object} containerDimensions - Container dimensions
 * @returns {Object} All chart configurations
 */
export const createDashboardCharts = (analyticsData, containerDimensions = {}) => {
  const defaultDimensions = calculateChartDimensions(
    containerDimensions.width || 400,
    containerDimensions.height || 300,
    { top: 20, right: 30, bottom: 40, left: 60 }
  );

  const charts = {};

  // XP Progress Chart
  if (analyticsData.xpTimeline) {
    charts.xpProgress = createXPProgressChart(analyticsData.xpTimeline, defaultDimensions);
  }

  // Project Success Chart
  if (analyticsData.projectAnalytics) {
    charts.projectSuccess = createProjectSuccessChart(analyticsData.projectAnalytics, defaultDimensions);
  }

  // Skills Radar Chart
  if (analyticsData.skills || analyticsData.techSkills) {
    const skillsData = analyticsData.techSkills || analyticsData.skills;
    charts.skillsRadar = createSkillsRadarChart(skillsData, defaultDimensions);
  }

  // Audit Performance Chart
  if (analyticsData.auditData) {
    charts.auditPerformance = createAuditPerformanceChart(analyticsData.auditData, defaultDimensions);
  }

  return {
    charts,
    dimensions: defaultDimensions,
    hasData: Object.keys(charts).length > 0,
    chartTypes: Object.keys(charts)
  };
};

/**
 * Generate SVG chart animations
 * @param {string} chartType - Type of chart
 * @param {Object} chartConfig - Chart configuration
 * @returns {Object} Animation configuration
 */
export const generateChartAnimations = (chartType, chartConfig) => {
  const baseAnimation = {
    duration: 1000,
    easing: 'ease-in-out',
    delay: 0
  };

  switch (chartType) {
    case 'line-chart':
      return {
        ...baseAnimation,
        pathAnimation: {
          strokeDasharray: '1000',
          strokeDashoffset: '1000',
          animation: 'drawLine 2s ease-in-out forwards'
        },
        pointsAnimation: {
          opacity: 0,
          animation: 'fadeInPoints 1s ease-in-out 1s forwards'
        }
      };

    case 'pie-chart':
      return {
        ...baseAnimation,
        slicesAnimation: chartConfig.slices?.map((_, index) => ({
          transform: 'scale(0)',
          transformOrigin: `${chartConfig.centerX}px ${chartConfig.centerY}px`,
          animation: `scaleIn 0.5s ease-out ${index * 0.1}s forwards`
        })) || []
      };

    case 'radar-chart':
      return {
        ...baseAnimation,
        radarAnimation: {
          opacity: 0,
          transform: 'scale(0)',
          transformOrigin: `${chartConfig.centerX}px ${chartConfig.centerY}px`,
          animation: 'radarGrow 1.5s ease-out forwards'
        },
        pointsAnimation: {
          opacity: 0,
          animation: 'fadeInPoints 1s ease-in-out 1s forwards'
        }
      };

    case 'bar-chart':
      return {
        ...baseAnimation,
        barsAnimation: chartConfig.bars?.map((_, index) => ({
          width: 0,
          animation: `growBar 1s ease-out ${index * 0.2}s forwards`
        })) || []
      };

    default:
      return baseAnimation;
  }
};
