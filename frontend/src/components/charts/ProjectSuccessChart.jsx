import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ProjectSuccessChart = ({ 
  passedProjects = 15, 
  failedProjects = 3, 
  size = 200, 
  className = '' 
}) => {
  const total = passedProjects + failedProjects;
  const radius = size / 2 - 20;
  const center = size / 2;

  const { passedPath, failedPath } = useMemo(() => {
    if (total === 0) return { passedAngle: 0, failedAngle: 0, passedPath: '', failedPath: '' };

    const passedAngle = (passedProjects / total) * 360;
    const failedAngle = (failedProjects / total) * 360;

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

    const passedPath = createPath(0, passedAngle, radius, center);
    const failedPath = createPath(passedAngle, passedAngle + failedAngle, radius, center);

    return { passedAngle, failedAngle, passedPath, failedPath };
  }, [passedProjects, failedProjects, total, radius, center]);

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  const passedPercentage = total > 0 ? Math.round((passedProjects / total) * 100) : 0;
  const failedPercentage = total > 0 ? Math.round((failedProjects / total) * 100) : 0;

  if (total === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <div className="text-center text-surface-400">
          <div className="w-16 h-16 border-4 border-surface-600 rounded-full mx-auto mb-2"></div>
          <p className="text-sm">No project data</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <filter id="pieGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Passed projects slice */}
        <motion.path
          d={passedPath}
          fill="#10b981"
          stroke="#ffffff"
          strokeWidth="2"
          filter="url(#pieGlow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hover:brightness-110 cursor-pointer"
        >
          <title>{`Passed: ${passedProjects} projects (${passedPercentage}%)`}</title>
        </motion.path>

        {/* Failed projects slice */}
        <motion.path
          d={failedPath}
          fill="#ef4444"
          stroke="#ffffff"
          strokeWidth="2"
          filter="url(#pieGlow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hover:brightness-110 cursor-pointer"
        >
          <title>{`Failed: ${failedProjects} projects (${failedPercentage}%)`}</title>
        </motion.path>

        {/* Center circle for donut effect */}
        <circle
          cx={center}
          cy={center}
          r={radius * 0.6}
          fill="rgba(15, 23, 42, 0.9)"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-2xl font-bold text-white">
          {passedPercentage}%
        </div>
        <div className="text-xs text-surface-300 mt-1">
          Success Rate
        </div>
      </div>

      {/* Legend */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-surface-300">Passed ({passedProjects})</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-surface-300">Failed ({failedProjects})</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectSuccessChart;
