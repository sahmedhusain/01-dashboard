import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

const AuditStatsChart = ({ 
  auditsGiven = 24, 
  auditsReceived = 12, 
  width = 400, 
  height = 250, 
  className = '' 
}) => {
  const margin = { top: 20, right: 30, bottom: 60, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const data = [
    { label: 'Audits Given', value: auditsGiven, color: '#14b8a6' },
    { label: 'Audits Received', value: auditsReceived, color: '#d946ef' },
  ];

  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = chartWidth / data.length * 0.6;
  const barSpacing = chartWidth / data.length;

  const yScale = useCallback((value) => {
    return chartHeight - (value / maxValue) * chartHeight;
  }, [chartHeight, maxValue]);

  const yTicks = useMemo(() => {
    const tickCount = 5;
    const ticks = [];
    for (let i = 0; i <= tickCount; i++) {
      const value = Math.round((maxValue / tickCount) * i);
      ticks.push({
        value,
        y: yScale(value),
      });
    }
    return ticks;
  }, [maxValue, yScale]);

  const auditRatio = auditsReceived > 0 ? (auditsGiven / auditsReceived).toFixed(1) : '∞';

  return (
    <div className={`w-full ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="givenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="receivedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.4" />
          </linearGradient>
          <filter id="barGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
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

          {/* Bars */}
          {data.map((d, i) => {
            const x = i * barSpacing + (barSpacing - barWidth) / 2;
            const barHeight = chartHeight - yScale(d.value);
            const gradientId = i === 0 ? 'givenGradient' : 'receivedGradient';

            return (
              <g key={i}>
                {/* Bar */}
                <motion.rect
                  x={x}
                  y={yScale(d.value)}
                  width={barWidth}
                  height={barHeight}
                  fill={`url(#${gradientId})`}
                  stroke={d.color}
                  strokeWidth="2"
                  rx="4"
                  filter="url(#barGlow)"
                  initial={{ height: 0, y: chartHeight }}
                  animate={{ height: barHeight, y: yScale(d.value) }}
                  transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                  className="hover:brightness-110 cursor-pointer"
                >
                  <title>{`${d.label}: ${d.value}`}</title>
                </motion.rect>

                {/* Value label on top of bar */}
                <motion.text
                  x={x + barWidth / 2}
                  y={yScale(d.value) - 8}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.5 }}
                >
                  {d.value}
                </motion.text>

                {/* X-axis label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.7)"
                  fontSize="12"
                  fontFamily="Inter, sans-serif"
                >
                  {d.label.split(' ')[0]}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 35}
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.7)"
                  fontSize="12"
                  fontFamily="Inter, sans-serif"
                >
                  {d.label.split(' ')[1]}
                </text>
              </g>
            );
          })}

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
              {tick.value}
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
            Audit Statistics
          </text>

          {/* Ratio display */}
          <g transform={`translate(${chartWidth - 80}, 20)`}>
            <rect
              x={0}
              y={0}
              width={80}
              height={40}
              fill="rgba(255, 255, 255, 0.1)"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
              rx="4"
            />
            <text
              x={40}
              y={15}
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="10"
              fontFamily="Inter, sans-serif"
            >
              Ratio
            </text>
            <text
              x={40}
              y={32}
              textAnchor="middle"
              fill="#14b8a6"
              fontSize="16"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              {auditRatio}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default AuditStatsChart;
