import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { processXPProgressChartData } from '../../utils/componentDataProcessors/chartProcessors';

const XPProgressChart = ({ 
  data = [], 
  width = 600, 
  height = 300, 
  className = '' 
}) => {
  // Process chart data using utility function
  const chartData = useMemo(() => {
    const margins = { top: 20, right: 30, bottom: 40, left: 60 };
    return processXPProgressChartData(data, { width, height, margins });
  }, [data, width, height]);

  // Extract processed data for easier access
  const {
    isValid,
    data: processedData,
    chartDimensions,
    scales,
    paths,
    ticks,
    domain: _domain,
    error
  } = chartData;

  // Handle error or no data states
  if (!isValid) {
    return (
      <div className={`w-full flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-center text-surface-400">
          <p className="text-sm">{error || 'No data available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${chartDimensions.margin.left}, ${chartDimensions.margin.top})`}>
          {/* Grid lines */}
          {ticks.yTicks.map((tick, i) => (
            <line
              key={i}
              x1={0}
              y1={tick.y}
              x2={chartDimensions.chartWidth}
              y2={tick.y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <motion.path
            d={paths.areaPath}
            fill="url(#xpGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Main line */}
          <motion.path
            d={paths.linePath}
            fill="none"
            stroke="#14b8a6"
            strokeWidth="3"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Data points */}
          {processedData.map((d, i) => (
            <motion.circle
              key={i}
              cx={scales.xScale(i)}
              cy={scales.yScale(d.cumulativeXP)}
              r="4"
              fill="#14b8a6"
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              className="cursor-pointer hover:r-6 transition-all"
            >
              <title>{`${new Date(d.date).toLocaleDateString()}: ${(d.cumulativeXP || 0).toLocaleString()} XP`}</title>
            </motion.circle>
          ))}

          {/* Y-axis */}
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={chartDimensions.chartHeight}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
          />

          {/* X-axis */}
          <line
            x1={0}
            y1={chartDimensions.chartHeight}
            x2={chartDimensions.chartWidth}
            y2={chartDimensions.chartHeight}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
          />

          {/* Y-axis labels */}
          {ticks.yTicks.map((tick, i) => (
            <text
              key={i}
              x={-10}
              y={tick.y + 4}
              textAnchor="end"
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="12"
              fontFamily="Inter, sans-serif"
            >
              {(tick.value || 0).toLocaleString()}
            </text>
          ))}

          {/* X-axis labels */}
          {ticks.xTicks.map((tick, i) => (
            <text
              key={i}
              x={tick.x}
              y={chartDimensions.chartHeight + 20}
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="12"
              fontFamily="Inter, sans-serif"
            >
              {tick.label}
            </text>
          ))}

          {/* Chart title */}
          <text
            x={chartDimensions.chartWidth / 2}
            y={-5}
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.9)"
            fontSize="14"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            XP Progress Over Time
          </text>

          {/* Y-axis title */}
          <text
            x={-40}
            y={chartDimensions.chartHeight / 2}
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.7)"
            fontSize="12"
            fontFamily="Inter, sans-serif"
            transform={`rotate(-90, -40, ${chartDimensions.chartHeight / 2})`}
          >
            Experience Points
          </text>
        </g>
      </svg>
    </div>
  );
};

export default XPProgressChart;
