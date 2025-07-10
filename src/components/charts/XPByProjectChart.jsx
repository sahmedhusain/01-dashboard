import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatXP } from '../../utils/dataFormatting';

const XPByProjectChart = ({ 
  data = [], 
  width = 600, 
  height = 400,
  maxBars = 15,
  className = ""
}) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    try {
      // Filter out invalid projects with enhanced validation
      const validProjects = data.filter(d => {
        if (!d) return false;
        if (d.totalXP == null || isNaN(d.totalXP) || d.totalXP <= 0) return false;
        // Ensure project has a name
        if (!d.name && !d.projectName && !d.object?.name) return false;
        return true;
      });

      if (validProjects.length === 0) return [];

      const topProjects = validProjects.slice(0, maxBars);
      const maxXP = Math.max(...topProjects.map(d => d.totalXP));

      if (maxXP === 0 || isNaN(maxXP)) return [];

      return topProjects.map((project, index) => ({
        ...project,
        // Ensure project name is available
        name: project.name || project.projectName || project.object?.name || 'Unknown Project',
        percentage: (project.totalXP / maxXP) * 100,
        index,
      }));
    } catch (error) {
      console.error('Error processing XP by project data:', error);
      return [];
    }
  }, [data, maxBars]);

  const margin = { top: 20, right: 80, bottom: 40, left: 200 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const barHeight = Math.max(20, chartHeight / Math.max(chartData.length, 1) - 4);


  const truncateProjectName = (name, maxLength = 25) => {
    if (!name) return 'Unknown Project';
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };

  if (!chartData.length) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-center text-surface-400">
          <div className="text-lg mb-2">📊</div>
          <div>No project data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="xpBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.9" />
          </linearGradient>
          
          <filter id="barShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Chart Title */}
        <text
          x={width / 2}
          y={15}
          textAnchor="middle"
          className="fill-surface-100 text-sm font-semibold"
        >
          XP Earned by Project (Top {chartData.length})
        </text>

        {/* Chart Container */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map(percentage => (
            <g key={percentage}>
              <line
                x1={(percentage / 100) * chartWidth}
                y1={0}
                x2={(percentage / 100) * chartWidth}
                y2={chartHeight}
                stroke="rgb(71, 85, 105)"
                strokeOpacity="0.2"
                strokeDasharray="2,2"
              />
              <text
                x={(percentage / 100) * chartWidth}
                y={chartHeight + 15}
                textAnchor="middle"
                className="fill-surface-400 text-xs"
              >
                {percentage}%
              </text>
            </g>
          ))}

          {/* Bars */}
          {chartData.map((project, index) => {
            const y = index * (barHeight + 4);
            const barWidth = (project.percentage / 100) * chartWidth;

            return (
              <g key={project.path || index}>
                {/* Project Name Label */}
                <text
                  x={-10}
                  y={y + barHeight / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-surface-200 text-xs font-medium"
                >
                  {truncateProjectName(project.name)}
                </text>

                {/* Bar Background */}
                <rect
                  x={0}
                  y={y}
                  width={chartWidth}
                  height={barHeight}
                  fill="rgb(30, 41, 59)"
                  rx="4"
                />

                {/* Animated Bar */}
                <motion.rect
                  x={0}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="url(#xpBarGradient)"
                  filter="url(#barShadow)"
                  rx="4"
                  initial={{ width: 0 }}
                  animate={{ width: barWidth }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                />

                {/* XP Value Label */}
                <motion.text
                  x={barWidth + 8}
                  y={y + barHeight / 2}
                  dominantBaseline="middle"
                  className="fill-surface-100 text-xs font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.3 
                  }}
                >
                  {formatXP(project.totalXP)} XP
                </motion.text>

                {/* Hover Effect */}
                <motion.rect
                  x={0}
                  y={y}
                  width={chartWidth}
                  height={barHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  whileHover={{ 
                    fill: "rgba(59, 130, 246, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </g>
            );
          })}

          {/* Y-axis Label */}
          <text
            x={-margin.left + 20}
            y={chartHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(-90, ${-margin.left + 20}, ${chartHeight / 2})`}
            className="fill-surface-300 text-sm font-medium"
          >
            Projects
          </text>

          {/* X-axis Label */}
          <text
            x={chartWidth / 2}
            y={chartHeight + 35}
            textAnchor="middle"
            className="fill-surface-300 text-sm font-medium"
          >
            Relative XP Distribution (%)
          </text>
        </g>

        {/* Legend */}
        <g transform={`translate(${width - 70}, 30)`}>
          <rect
            x={0}
            y={0}
            width={12}
            height={8}
            fill="url(#xpBarGradient)"
            rx="2"
          />
          <text
            x={18}
            y={6}
            dominantBaseline="middle"
            className="fill-surface-300 text-xs"
          >
            XP Earned
          </text>
        </g>
      </svg>
    </div>
  );
};

export default XPByProjectChart;
