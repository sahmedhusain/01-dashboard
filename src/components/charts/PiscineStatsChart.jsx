import { useMemo } from 'react';
import { motion } from 'framer-motion';

const PiscineStatsChart = ({ 
  data = {}, 
  width = 500, 
  height = 400,
  className = ""
}) => {
  const chartData = useMemo(() => {
    try {
      if (!data || typeof data !== 'object') {
        return { segments: [], jsStats: {}, goStats: {}, overall: {} };
      }

      const { jsStats = {}, goStats = {}, overall = {} } = data;

      // Validate overall stats
      if (!overall.total || overall.total <= 0) {
        return { segments: [], jsStats, goStats, overall };
      }

      // Create pie chart data for overall piscine performance
      const segments = [];

      if (overall.passed > 0) {
        segments.push({
          label: 'Passed',
          value: overall.passed,
          percentage: (overall.passed / overall.total) * 100,
          color: 'rgb(34, 197, 94)', // green
          hoverColor: 'rgb(22, 163, 74)',
        });
      }

      if (overall.failed > 0) {
        segments.push({
          label: 'Failed',
          value: overall.failed,
          percentage: (overall.failed / overall.total) * 100,
          color: 'rgb(239, 68, 68)', // red
          hoverColor: 'rgb(220, 38, 38)',
        });
      }

      // Calculate angles for pie segments
      let currentAngle = -90; // Start from top
      const segmentsWithAngles = segments.map(segment => {
        const angle = (segment.percentage / 100) * 360;
        const result = {
          ...segment,
          startAngle: currentAngle,
          endAngle: currentAngle + angle,
          angle,
        };
        currentAngle += angle;
        return result;
      });

      return {
        segments: segmentsWithAngles,
        jsStats,
        goStats,
        overall,
      };
    } catch (error) {
      console.error('Error processing piscine stats data:', error);
      return { segments: [], jsStats: {}, goStats: {}, overall: {} };
    }
  }, [data]);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;
  const innerRadius = radius * 0.4; // For donut chart effect

  // Helper function to convert polar to cartesian coordinates
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Helper function to create SVG arc path
  const createArcPath = (centerX, centerY, radius, startAngle, endAngle, innerRadius = 0) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    if (innerRadius > 0) {
      const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
      const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
      
      return [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", innerEnd.x, innerEnd.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "Z"
      ].join(" ");
    } else {
      return [
        "M", centerX, centerY,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
      ].join(" ");
    }
  };

  if (!chartData.segments.length || chartData.overall.total === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-center text-surface-400">
          <div className="text-lg mb-2">🥧</div>
          <div>No piscine data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Chart Title */}
        <text
          x={width / 2}
          y={20}
          textAnchor="middle"
          className="fill-surface-100 text-sm font-semibold"
        >
          Piscine Performance Overview
        </text>

        {/* Pie Chart Segments */}
        {chartData.segments.map((segment, index) => {
          const path = createArcPath(centerX, centerY, radius, segment.startAngle, segment.endAngle, innerRadius);
          const labelAngle = (segment.startAngle + segment.endAngle) / 2;
          const labelRadius = radius + 30;
          const labelPos = polarToCartesian(centerX, centerY, labelRadius, labelAngle);

          return (
            <g key={segment.label}>
              {/* Pie Segment */}
              <motion.path
                d={path}
                fill={segment.color}
                filter="url(#pieShadow)"
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  fill: segment.hoverColor,
                  scale: 1.05,
                }}
              />

              {/* Percentage Label */}
              <motion.text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-surface-100 text-sm font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              >
                {segment.percentage.toFixed(1)}%
              </motion.text>

              {/* Value Label */}
              <motion.text
                x={labelPos.x}
                y={labelPos.y + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-surface-400 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
              >
                ({segment.value} {segment.label.toLowerCase()})
              </motion.text>
            </g>
          );
        })}

        {/* Center Statistics */}
        <g>
          <text
            x={centerX}
            y={centerY - 10}
            textAnchor="middle"
            className="fill-surface-100 text-lg font-bold"
          >
            {chartData.overall.total}
          </text>
          <text
            x={centerX}
            y={centerY + 8}
            textAnchor="middle"
            className="fill-surface-400 text-sm"
          >
            Total Attempts
          </text>
        </g>

        {/* Legend */}
        <g transform={`translate(20, ${height - 100})`}>
          {chartData.segments.map((segment, index) => (
            <g key={segment.label} transform={`translate(0, ${index * 20})`}>
              <rect
                x={0}
                y={0}
                width={12}
                height={12}
                fill={segment.color}
                rx="2"
              />
              <text
                x={18}
                y={9}
                dominantBaseline="middle"
                className="fill-surface-200 text-sm"
              >
                {segment.label}: {segment.value}
              </text>
            </g>
          ))}
        </g>

        {/* Detailed Stats Box */}
        <g transform={`translate(${width - 180}, 50)`}>
          <rect
            x={0}
            y={0}
            width="170"
            height="120"
            fill="rgba(30, 41, 59, 0.8)"
            stroke="rgb(71, 85, 105)"
            rx="6"
          />
          
          <text x={10} y={18} className="fill-surface-200 text-sm font-semibold">
            Breakdown by Track
          </text>
          
          {/* JavaScript Stats */}
          <text x={10} y={38} className="fill-surface-300 text-xs font-medium">
            JavaScript Piscine:
          </text>
          <text x={15} y={52} className="fill-surface-400 text-xs">
            Passed: {chartData.jsStats.passed || 0}
          </text>
          <text x={15} y={64} className="fill-surface-400 text-xs">
            Failed: {chartData.jsStats.failed || 0}
          </text>
          
          {/* Go Stats */}
          <text x={10} y={84} className="fill-surface-300 text-xs font-medium">
            Go Piscine:
          </text>
          <text x={15} y={98} className="fill-surface-400 text-xs">
            Passed: {chartData.goStats.passed || 0}
          </text>
          <text x={15} y={110} className="fill-surface-400 text-xs">
            Failed: {chartData.goStats.failed || 0}
          </text>
        </g>

        {/* Success Rate Indicator */}
        <g transform={`translate(${width - 180}, 180)`}>
          <rect
            x={0}
            y={0}
            width="170"
            height="40"
            fill="rgba(30, 41, 59, 0.8)"
            stroke="rgb(71, 85, 105)"
            rx="6"
          />
          
          <text x={10} y={18} className="fill-surface-200 text-sm font-semibold">
            Success Rate
          </text>
          <text x={10} y={32} className="fill-primary-400 text-lg font-bold">
            {chartData.overall.passRate?.toFixed(1) || 0}%
          </text>
        </g>
      </svg>
    </div>
  );
};

export default PiscineStatsChart;
