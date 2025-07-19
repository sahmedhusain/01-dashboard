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
