import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  createDashboardCharts,
  generateChartAnimations
} from '../../utils/calculations/chartCalculations';

interface ChartData {
  title: string;
  data?: unknown[];
  config?: Record<string, unknown>;
  [key: string]: unknown;
}

interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  easing?: string;
  pathAnimation?: {
    strokeDasharray?: string;
    strokeDashoffset?: string;
    animation?: string;
  };
  pointsAnimation?: {
    opacity?: number;
    animation?: string;
  };
  slicesAnimation?: unknown[];
  radarAnimation?: unknown;
  barsAnimation?: unknown[];
  [key: string]: unknown;
}

interface AdvancedChartsGridProps {
  charts: {
    xpProgress?: ChartData;
    projectSuccess?: ChartData;
    skillsRadar?: ChartData;
    auditPerformance?: ChartData;
  };
  animations: {
    pathAnimation?: AnimationConfig;
    pointsAnimation?: AnimationConfig;
    slicesAnimation?: AnimationConfig[];
    radarAnimation?: AnimationConfig;
    barsAnimation?: AnimationConfig[];
  };
}

/**
 * Advanced Charts Grid Component
 * Displays all 4 required SVG charts as per GraphQL objectives:
 * 1. XP Progress Over Time (Line Chart)
 * 2. Project Success Rates (Pie Chart) 
 * 3. Skills Radar Chart
 * 4. Audit Performance (Bar Chart)
 */
const AdvancedChartsGrid = ({
  analyticsData,
  className = '',
  chartSize = { width: 400, height: 300 }
}: {
  analyticsData: {
    xpTimeline?: unknown[];
    projectAnalytics?: unknown[];
    skills?: unknown[];
    techSkills?: unknown[];
    auditData?: {
      auditRatio?: number;
      totalUp?: number;
      totalDown?: number;
    };
    xpProgress?: ChartData;
    projectSuccess?: ChartData;
    skillsRadar?: ChartData;
    auditPerformance?: ChartData;
  };
  className?: string;
  chartSize?: { width: number; height: number };
}) => {
  // Generate all chart configurations
  const chartsConfig = useMemo(() => {
    if (!analyticsData) return null;
    return createDashboardCharts(analyticsData, chartSize);
  }, [analyticsData, chartSize]);

  if (!chartsConfig || !chartsConfig.hasData) {
    return (
      <div className={`w-full p-8 text-center ${className}`}>
        <div className="text-surface-400">
          <p>No data available for charts</p>
        </div>
      </div>
    );
  }

  const { charts } = chartsConfig;

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* XP Progress Chart */}
        {charts.xpProgress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-surface-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {charts.xpProgress.title}
            </h3>
            <XPProgressSVG chartConfig={charts.xpProgress} />
          </motion.div>
        )}

        {/* Project Success Chart */}
        {charts.projectSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {charts.projectSuccess.title}
            </h3>
            <ProjectSuccessSVG chartConfig={charts.projectSuccess} />
          </motion.div>
        )}

        {/* Skills Radar Chart */}
        {charts.skillsRadar && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-surface-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {charts.skillsRadar.title}
            </h3>
            <SkillsRadarSVG chartConfig={charts.skillsRadar} />
          </motion.div>
        )}

        {/* Audit Performance Chart */}
        {charts.auditPerformance && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-surface-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {charts.auditPerformance.title}
            </h3>
            <AuditPerformanceSVG chartConfig={charts.auditPerformance} />
          </motion.div>
        )}

      </div>
    </div>
  );
};

/**
 * XP Progress Line Chart SVG Component
 */
const XPProgressSVG = ({ chartConfig }) => {
  const { dimensions, pathData, dataPoints } = chartConfig;
  const animations = generateChartAnimations('line-chart', chartConfig);

  return (
    <svg 
      width={dimensions.width} 
      height={dimensions.height}
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="xpLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
        </linearGradient>
        <style>
          {`
            @keyframes drawLine {
              to { stroke-dashoffset: 0; }
            }
            @keyframes fadeInPoints {
              to { opacity: 1; }
            }
          `}
        </style>
      </defs>

      {/* Chart area */}
      <g transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}>
        
        {/* XP Progress Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#xpLineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={animations.pathAnimation}
        />

        {/* Data Points */}
        {dataPoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#14b8a6"
            stroke="#fff"
            strokeWidth="2"
            style={animations.pointsAnimation}
            className="hover:r-6 transition-all cursor-pointer"
          >
            <title>{`${point.project}: ${point.amount} XP (Total: ${point.value})`}</title>
          </motion.circle>
        ))}

        {/* Axes */}
        <line 
          x1="0" 
          y1={dimensions.chartHeight} 
          x2={dimensions.chartWidth} 
          y2={dimensions.chartHeight}
          stroke="#374151"
          strokeWidth="1"
        />
        <line 
          x1="0" 
          y1="0" 
          x2="0" 
          y2={dimensions.chartHeight}
          stroke="#374151"
          strokeWidth="1"
        />

      </g>

      {/* Labels */}
      <text 
        x={dimensions.width / 2} 
        y={dimensions.height - 5}
        textAnchor="middle"
        className="fill-surface-400 text-xs"
      >
        {chartConfig.xAxisLabel}
      </text>
      <text 
        x="15" 
        y={dimensions.height / 2}
        textAnchor="middle"
        transform={`rotate(-90, 15, ${dimensions.height / 2})`}
        className="fill-surface-400 text-xs"
      >
        {chartConfig.yAxisLabel}
      </text>
    </svg>
  );
};

/**
 * Project Success Pie Chart SVG Component
 */
const ProjectSuccessSVG = ({ chartConfig }) => {
  const { dimensions, slices, centerX, centerY } = chartConfig;
  const animations = generateChartAnimations('pie-chart', chartConfig);

  return (
    <svg 
      width={dimensions.width} 
      height={dimensions.height}
      className="w-full h-auto"
    >
      <defs>
        <style>
          {`
            @keyframes scaleIn {
              to { transform: scale(1); }
            }
          `}
        </style>
      </defs>

      {/* Pie Slices */}
      {slices.map((slice, index) => (
        <motion.path
          key={slice.label}
          d={slice.pathData}
          fill={slice.color}
          stroke="#1f2937"
          strokeWidth="2"
          style={animations.slicesAnimation[index]}
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <title>{`${slice.label}: ${slice.value} (${slice.percentage.toFixed(1)}%)`}</title>
        </motion.path>
      ))}

      {/* Center Text */}
      <text 
        x={centerX} 
        y={centerY - 10}
        textAnchor="middle"
        className="fill-white text-lg font-bold"
      >
        {chartConfig.successRate}%
      </text>
      <text 
        x={centerX} 
        y={centerY + 10}
        textAnchor="middle"
        className="fill-surface-400 text-sm"
      >
        Success Rate
      </text>

      {/* Legend */}
      {slices.map((slice, index) => (
        <g key={`legend-${slice.label}`} transform={`translate(20, ${20 + index * 25})`}>
          <rect width="15" height="15" fill={slice.color} />
          <text x="20" y="12" className="fill-surface-300 text-sm">
            {slice.label}: {slice.value}
          </text>
        </g>
      ))}
    </svg>
  );
};

/**
 * Skills Radar Chart SVG Component
 */
const SkillsRadarSVG = ({ chartConfig }) => {
  const { dimensions, radarPath, radarPoints, gridCircles, axisLines } = chartConfig;
  const animations = generateChartAnimations('radar-chart', chartConfig);

  return (
    <svg 
      width={dimensions.width} 
      height={dimensions.height}
      className="w-full h-auto"
    >
      <defs>
        <style>
          {`
            @keyframes radarGrow {
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes fadeInPoints {
              to { opacity: 1; }
            }
          `}
        </style>
      </defs>

      {/* Grid Circles */}
      {gridCircles.map((circle, index) => (
        <circle
          key={index}
          cx={chartConfig.centerX}
          cy={chartConfig.centerY}
          r={circle.radius}
          fill="none"
          stroke="#374151"
          strokeWidth="1"
          opacity="0.3"
        />
      ))}

      {/* Axis Lines */}
      {axisLines.map((axis, index) => (
        <g key={index}>
          <line
            x1={axis.x1}
            y1={axis.y1}
            x2={axis.x2}
            y2={axis.y2}
            stroke="#374151"
            strokeWidth="1"
            opacity="0.5"
          />
          <text
            x={axis.labelX}
            y={axis.labelY}
            textAnchor="middle"
            className="fill-surface-300 text-xs"
          >
            {axis.skill}
          </text>
        </g>
      ))}

      {/* Radar Area */}
      <motion.path
        d={radarPath}
        fill="#14b8a6"
        fillOpacity="0.3"
        stroke="#14b8a6"
        strokeWidth="2"
        style={animations.radarAnimation}
      />

      {/* Radar Points */}
      {radarPoints.map((point, index) => (
        <motion.circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="#14b8a6"
          stroke="#fff"
          strokeWidth="2"
          style={animations.pointsAnimation}
          className="hover:r-6 transition-all cursor-pointer"
        >
          <title>{`${point.skill}: ${point.value}`}</title>
        </motion.circle>
      ))}
    </svg>
  );
};

/**
 * Audit Performance Bar Chart SVG Component
 */
const AuditPerformanceSVG = ({ chartConfig }) => {
  const { dimensions, bars, metrics } = chartConfig;
  const animations = generateChartAnimations('bar-chart', chartConfig);

  return (
    <svg 
      width={dimensions.width} 
      height={dimensions.height}
      className="w-full h-auto"
    >
      <defs>
        <style>
          {`
            @keyframes growBar {
              from { width: 0; }
              to { width: var(--target-width); }
            }
          `}
        </style>
      </defs>

      <g transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}>
        
        {/* Bars */}
        {bars.map((bar, index) => (
          <g key={bar.label}>
            <motion.rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={bar.color}
              rx="4"
              style={{
                ...animations.barsAnimation[index],
                '--target-width': `${bar.width}px`
              }}
              className="hover:opacity-80 transition-opacity"
            >
              <title>{`${bar.label}: ${bar.value}`}</title>
            </motion.rect>
            
            {/* Bar Labels */}
            <text
              x={bar.width + 10}
              y={bar.y + bar.height / 2 + 4}
              className="fill-surface-300 text-sm"
            >
              {bar.label}: {bar.value}
            </text>
          </g>
        ))}

      </g>

      {/* Performance Summary */}
      <g transform={`translate(20, ${dimensions.height - 60})`}>
        <text className="fill-surface-300 text-sm">
          <tspan x="0" dy="0">Ratio: {metrics.ratio}</tspan>
          <tspan x="0" dy="15">Balance: {metrics.balance}</tspan>
          <tspan x="0" dy="15">Efficiency: {metrics.efficiency}%</tspan>
        </text>
      </g>
    </svg>
  );
};

export default AdvancedChartsGrid;
