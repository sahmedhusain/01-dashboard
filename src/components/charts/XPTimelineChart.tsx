import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatXP } from '../../utils/dataFormatting';
import { processXPTimelineChartData } from '../../utils/componentDataProcessors/chartProcessors';

const XPTimelineChart = ({ 
  data = [], 
  width = 700, 
  height = 400,
  className = ""
}) => {
  // Process chart data using utility function
  const chartData = useMemo(() => {
    const margins = { top: 30, right: 60, bottom: 60, left: 80 };
    return processXPTimelineChartData(data, { width, height, margins });
  }, [data, width, height]);

  const margin = { top: 30, right: 60, bottom: 60, left: 80 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Using centralized formatXP and formatDate functions from utils
  const formatDateForChart = (date: string | Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit'
    }).format(new Date(date));
  };

  // Generate path for the line
  const generatePath = (points) => {
    if (!points || points.length === 0 || !chartData?.dateRange || !chartData?.maxXP) return '';

    const pathCommands = points.map((point, index) => {
      const dateRange = chartData.dateRange.max - chartData.dateRange.min;
      if (dateRange === 0) return index === 0 ? `M 0 ${chartHeight}` : `L 0 ${chartHeight}`;

      const x = ((new Date(point.date).getTime() - new Date(chartData.dateRange.min).getTime()) / dateRange) * chartWidth;
      const y = chartHeight - (point.cumulativeXP / chartData.maxXP) * chartHeight;

      // Ensure coordinates are valid numbers
      const safeX = isNaN(x) ? 0 : Math.max(0, Math.min(chartWidth, x));
      const safeY = isNaN(y) ? chartHeight : Math.max(0, Math.min(chartHeight, y));

      return index === 0 ? `M ${safeX} ${safeY}` : `L ${safeX} ${safeY}`;
    });

    return pathCommands.join(' ');
  };

  // Generate area path for gradient fill
  const generateAreaPath = (points) => {
    if (!points || points.length === 0 || !chartData?.dateRange) return '';

    const linePath = generatePath(points);
    if (!linePath) return '';

    const lastPoint = points[points.length - 1];
    const dateRange = chartData.dateRange.max - chartData.dateRange.min;
    if (dateRange === 0) return `${linePath} L 0 ${chartHeight} L 0 ${chartHeight} Z`;

    const lastX = ((new Date(lastPoint.date).getTime() - new Date(chartData.dateRange.min).getTime()) / dateRange) * chartWidth;
    const safeLastX = isNaN(lastX) ? 0 : Math.max(0, Math.min(chartWidth, lastX));

    return `${linePath} L ${safeLastX} ${chartHeight} L 0 ${chartHeight} Z`;
  };

  if (!chartData?.points || !chartData.points.length) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-center text-surface-400">
          <div className="text-lg mb-2">📈</div>
          <div>No timeline data available</div>
        </div>
      </div>
    );
  }

  const linePath = generatePath(chartData.points);
  const areaPath = generateAreaPath(chartData.points);

  return (
    <div className={className}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="xpTimelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
          </linearGradient>
          
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" />
            <stop offset="50%" stopColor="rgb(147, 51, 234)" />
            <stop offset="100%" stopColor="rgb(236, 72, 153)" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Chart Title */}
        <text
          x={width / 2}
          y={20}
          textAnchor="middle"
          className="fill-surface-100 text-sm font-semibold"
        >
          XP Progression Over Time
        </text>

        {/* Chart Container */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid Lines - Y axis */}
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const y = chartHeight - (ratio * chartHeight);
            const xpValue = ratio * (chartData?.maxXP || 0);
            
            return (
              <g key={ratio}>
                <line
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="rgb(71, 85, 105)"
                  strokeOpacity="0.2"
                  strokeDasharray="2,2"
                />
                <text
                  x={-10}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-surface-400 text-xs"
                >
                  {formatXP(xpValue)}
                </text>
              </g>
            );
          })}

          {/* Grid Lines - X axis (dates) */}
          {chartData?.dateRange && [0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const x = ratio * chartWidth;
            const date = new Date(
              chartData.dateRange.min.getTime() +
              ratio * (chartData.dateRange.max.getTime() - chartData.dateRange.min.getTime())
            );
            
            return (
              <g key={ratio}>
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={chartHeight}
                  stroke="rgb(71, 85, 105)"
                  strokeOpacity="0.2"
                  strokeDasharray="2,2"
                />
                <text
                  x={x}
                  y={chartHeight + 15}
                  textAnchor="middle"
                  className="fill-surface-400 text-xs"
                >
                  {formatDateForChart(date)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <motion.path
            d={areaPath}
            fill="url(#xpTimelineGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Main Line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Data Points */}
          {chartData?.points?.map((point, index) => {
            const x = ((new Date(point.date).getTime() - new Date(chartData.dateRange.min).getTime()) /
                       (new Date(chartData.dateRange.max).getTime() - new Date(chartData.dateRange.min).getTime())) * chartWidth;
            const y = chartHeight - (point.cumulativeXP / chartData.maxXP) * chartHeight;

            return (
              <motion.g key={index}>
                {/* Point Circle */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="rgb(59, 130, 246)"
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: (index / (chartData?.points?.length || 1)) * 2 + 0.5
                  }}
                  whileHover={{ scale: 1.5 }}
                />

                {/* Tooltip on hover */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={x - 60}
                    y={y - 40}
                    width="120"
                    height="30"
                    fill="rgb(30, 41, 59)"
                    stroke="rgb(71, 85, 105)"
                    rx="4"
                    className="pointer-events-none"
                  />
                  <text
                    x={x}
                    y={y - 30}
                    textAnchor="middle"
                    className="fill-surface-100 text-xs font-medium pointer-events-none"
                  >
                    {formatXP(point.cumulativeXP)} XP
                  </text>
                  <text
                    x={x}
                    y={y - 18}
                    textAnchor="middle"
                    className="fill-surface-400 text-xs pointer-events-none"
                  >
                    {formatDateForChart(point.date)}
                  </text>
                </motion.g>
              </motion.g>
            );
          })}

          {/* Y-axis Label */}
          <text
            x={-50}
            y={chartHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(-90, -50, ${chartHeight / 2})`}
            className="fill-surface-300 text-sm font-medium"
          >
            Cumulative XP
          </text>

          {/* X-axis Label */}
          <text
            x={chartWidth / 2}
            y={chartHeight + 45}
            textAnchor="middle"
            className="fill-surface-300 text-sm font-medium"
          >
            Timeline
          </text>
        </g>

        {/* Stats Box */}
        <g transform={`translate(${width - 150}, 40)`}>
          <rect
            x={0}
            y={0}
            width="140"
            height="60"
            fill="rgba(30, 41, 59, 0.8)"
            stroke="rgb(71, 85, 105)"
            rx="6"
          />
          <text x={10} y={18} className="fill-surface-200 text-xs font-medium">
            Total XP: {formatXP(chartData?.maxXP || 0)}
          </text>
          <text x={10} y={32} className="fill-surface-400 text-xs">
            Projects: {chartData?.points?.length || 0}
          </text>
          <text x={10} y={46} className="fill-surface-400 text-xs">
            Duration: {chartData?.dateRange ? Math.ceil((chartData.dateRange.max - chartData.dateRange.min) / (1000 * 60 * 60 * 24)) : 0} days
          </text>
        </g>
      </svg>
    </div>
  );
};

export default XPTimelineChart;
