import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const XPProgressChart = ({ 
  data = [], 
  width = 600, 
  height = 300, 
  className = '' 
}) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const processedData = useMemo(() => {
    // Use only real data - no sample data generation
    return data || [];
  }, [data]);

  const { xScale, yScale, maxY } = useMemo(() => {
    if (processedData.length === 0) return { xScale: () => 0, yScale: () => 0, maxY: 0 };

    const maxY = Math.max(...processedData.map(d => d.cumulative));
    const minDate = new Date(Math.min(...processedData.map(d => new Date(d.date))));
    const maxDate = new Date(Math.max(...processedData.map(d => new Date(d.date))));

    const xScale = (date) => {
      const dateObj = new Date(date);
      const ratio = (dateObj - minDate) / (maxDate - minDate);
      return ratio * chartWidth;
    };

    const yScale = (value) => {
      return chartHeight - (value / maxY) * chartHeight;
    };

    return { xScale, yScale, maxY };
  }, [processedData, chartWidth, chartHeight]);

  const pathData = useMemo(() => {
    if (processedData.length === 0) return '';
    
    return processedData
      .map((d, i) => {
        const x = xScale(d.date);
        const y = yScale(d.cumulative);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [processedData, xScale, yScale]);

  const areaData = useMemo(() => {
    if (processedData.length === 0) return '';
    
    const linePath = pathData;
    const firstPoint = processedData[0];
    const lastPoint = processedData[processedData.length - 1];
    
    return `${linePath} L ${xScale(lastPoint.date)} ${chartHeight} L ${xScale(firstPoint.date)} ${chartHeight} Z`;
  }, [pathData, processedData, xScale, chartHeight]);

  // Generate Y-axis ticks
  const yTicks = useMemo(() => {
    const tickCount = 5;
    const ticks = [];
    for (let i = 0; i <= tickCount; i++) {
      const value = (maxY / tickCount) * i;
      ticks.push({
        value: Math.round(value),
        y: yScale(value),
      });
    }
    return ticks;
  }, [maxY, yScale]);

  // Generate X-axis ticks
  const xTicks = useMemo(() => {
    if (processedData.length === 0) return [];
    
    const tickCount = Math.min(6, processedData.length);
    const step = Math.floor(processedData.length / tickCount);
    const ticks = [];
    
    for (let i = 0; i < processedData.length; i += step) {
      const d = processedData[i];
      ticks.push({
        label: new Date(d.date).toLocaleDateString('en-US', { month: 'short' }),
        x: xScale(d.date),
      });
    }
    
    return ticks;
  }, [processedData, xScale]);

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

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <line
              key={i}
              x1={0}
              y1={tick.y}
              x2={chartWidth}
              y2={tick.y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <motion.path
            d={areaData}
            fill="url(#xpGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Main line */}
          <motion.path
            d={pathData}
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
              cx={xScale(d.date)}
              cy={yScale(d.cumulative)}
              r="4"
              fill="#14b8a6"
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              className="cursor-pointer hover:r-6 transition-all"
            >
              <title>{`${new Date(d.date).toLocaleDateString()}: ${d.cumulative.toLocaleString()} XP`}</title>
            </motion.circle>
          ))}

          {/* Y-axis */}
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={chartHeight}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
          />

          {/* X-axis */}
          <line
            x1={0}
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
          />

          {/* Y-axis labels */}
          {yTicks.map((tick, i) => (
            <text
              key={i}
              x={-10}
              y={tick.y + 4}
              textAnchor="end"
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="12"
              fontFamily="Inter, sans-serif"
            >
              {tick.value.toLocaleString()}
            </text>
          ))}

          {/* X-axis labels */}
          {xTicks.map((tick, i) => (
            <text
              key={i}
              x={tick.x}
              y={chartHeight + 20}
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
            x={chartWidth / 2}
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
            y={chartHeight / 2}
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.7)"
            fontSize="12"
            fontFamily="Inter, sans-serif"
            transform={`rotate(-90, -40, ${chartHeight / 2})`}
          >
            Experience Points
          </text>
        </g>
      </svg>
    </div>
  );
};

export default XPProgressChart;
