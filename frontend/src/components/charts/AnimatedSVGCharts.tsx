import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as d3 from 'd3';
import { Box, Typography, Paper, useTheme, alpha } from '@mui/material';

interface DataPoint {
  x: number | Date;
  y: number;
  label?: string;
  category?: string;
  color?: string;
}

interface AnimatedChartProps {
  data: DataPoint[];
  type: 'line' | 'bar' | 'area' | 'donut' | 'radar' | 'bubble';
  width?: number;
  height?: number;
  title?: string;
  subtitle?: string;
  animate?: boolean;
  interactive?: boolean;
  gradient?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  duration?: number;
  delay?: number;
  physics?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}


export const AnimatedSVGChart: React.FC<AnimatedChartProps> = ({
  data,
  type,
  width = 400,
  height = 300,
  title,
  subtitle,
  animate = true,
  interactive = true,
  gradient = true,
  showGrid = true,
  showTooltip = true,
  duration = 1000,
  delay = 0,
  physics = { damping: 20, stiffness: 100, mass: 1 }
}) => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  
  // Color palette from Material Design 3
  const colors = useMemo(() => [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    '#4CAF50', // success green
    theme.palette.warning.main,
    '#9C27B0', // purple
  ], [theme]);

  // Scales
  const xScale = useMemo(() => {
    const domain = d3.extent(data, (d: DataPoint) => d.x) as [any, any];
    return d3.scaleLinear()
      .domain(domain)
      .range([50, width - 50]);
  }, [data, width]);

  const yScale = useMemo(() => {
    const domain = d3.extent(data, (d: DataPoint) => d.y) as [number, number];
    return d3.scaleLinear()
      .domain([0, domain[1] * 1.1])
      .range([height - 50, 50]);
  }, [data, height]);

  // Line generator for line and area charts
  const lineGenerator = useMemo(() => 
    d3.line<DataPoint>()
      .x((d: DataPoint) => xScale(d.x))
      .y((d: DataPoint) => yScale(d.y))
      .curve(d3.curveCatmullRom.alpha(0.5))
  , [xScale, yScale]);

  // Area generator
  const areaGenerator = useMemo(() => 
    d3.area<DataPoint>()
      .x((d: DataPoint) => xScale(d.x))
      .y0(height - 50)
      .y1((d: DataPoint) => yScale(d.y))
      .curve(d3.curveCatmullRom.alpha(0.5))
  , [xScale, yScale, height]);

  // Animation trigger
  useEffect(() => {
    if (inView && animate) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: {
          duration: duration / 1000,
          delay: delay / 1000,
          ease: [0.2, 0, 0, 1]
        }
      });
    }
  }, [inView, animate, controls, duration, delay]);

  // Mouse event handlers
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
    
    // Find closest data point
    const closestPoint = data.reduce((closest, point) => {
      const pointX = xScale(point.x);
      const pointY = yScale(point.y);
      const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);
      const closestDistance = Math.sqrt((x - xScale(closest.x)) ** 2 + (y - yScale(closest.y)) ** 2);
      return distance < closestDistance ? point : closest;
    });
    
    setHoveredPoint(closestPoint);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Render different chart types
  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'area':
        return renderAreaChart();
      case 'donut':
        return renderDonutChart();
      case 'radar':
        return renderRadarChart();
      case 'bubble':
        return renderBubbleChart();
      default:
        return renderLineChart();
    }
  };

  const renderLineChart = () => {
    const pathData = lineGenerator(data) || '';
    
    return (
      <>
        {/* Grid */}
        {showGrid && (
          <g className="grid" opacity={0.3}>
            {yScale.ticks(5).map((tick: any, i: number) => (
              <motion.line
                key={`y-grid-${i}`}
                x1={50}
                y1={yScale(tick)}
                x2={width - 50}
                y2={yScale(tick)}
                stroke={theme.palette.divider}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={controls}
              />
            ))}
            {xScale.ticks(5).map((tick: any, i: number) => (
              <motion.line
                key={`x-grid-${i}`}
                x1={xScale(tick)}
                y1={50}
                x2={xScale(tick)}
                y2={height - 50}
                stroke={theme.palette.divider}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={controls}
              />
            ))}
          </g>
        )}
        
        {/* Gradient definition */}
        {gradient && (
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors[0]} stopOpacity={1} />
              <stop offset="100%" stopColor={colors[1]} stopOpacity={1} />
            </linearGradient>
          </defs>
        )}
        
        {/* Main line path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={gradient ? "url(#lineGradient)" : colors[0]}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{
            duration: duration / 1000,
            delay: delay / 1000,
            ease: [0.2, 0, 0, 1]
          }}
          style={{
            filter: `drop-shadow(0 4px 8px ${alpha(colors[0], 0.3)})`
          }}
        />
        
        {/* Data points */}
        {data.map((point, i) => (
          <motion.circle
            key={i}
            cx={xScale(point.x)}
            cy={yScale(point.y)}
            r={hoveredPoint === point ? 8 : 5}
            fill={point.color || colors[i % colors.length]}
            stroke="white"
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            transition={{
              duration: 0.3,
              delay: delay / 1000 + (i * 0.1),
              type: "spring",
              ...physics
            }}
            whileHover={{ scale: 1.2 }}
            style={{
              cursor: interactive ? 'pointer' : 'default',
              filter: `drop-shadow(0 2px 4px ${alpha(point.color || colors[i % colors.length], 0.3)})`
            }}
          />
        ))}
      </>
    );
  };

  const renderBarChart = () => {
    const barWidth = (width - 100) / data.length * 0.8;
    
    return (
      <>
        {/* Grid */}
        {showGrid && (
          <g className="grid" opacity={0.3}>
            {yScale.ticks(5).map((tick: any, i: number) => (
              <motion.line
                key={`y-grid-${i}`}
                x1={50}
                y1={yScale(tick)}
                x2={width - 50}
                y2={yScale(tick)}
                stroke={theme.palette.divider}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={controls}
              />
            ))}
          </g>
        )}
        
        {/* Bars */}
        {data.map((point, i) => (
          <motion.rect
            key={i}
            x={xScale(point.x) - barWidth / 2}
            y={yScale(point.y)}
            width={barWidth}
            height={height - 50 - yScale(point.y)}
            fill={point.color || colors[i % colors.length]}
            rx={4}
            ry={4}
            initial={{ scaleY: 0, y: height - 50 }}
            animate={{
              scaleY: 1,
              y: yScale(point.y)
            }}
            transition={{
              duration: 0.6,
              delay: delay / 1000 + (i * 0.1),
              type: "spring",
              ...physics
            }}
            whileHover={{ 
              scaleY: 1.05,
              transition: { duration: 0.2 }
            }}
            style={{
              cursor: interactive ? 'pointer' : 'default',
              filter: `drop-shadow(0 4px 8px ${alpha(point.color || colors[i % colors.length], 0.3)})`
            }}
          />
        ))}
      </>
    );
  };

  const renderAreaChart = () => {
    const pathData = areaGenerator(data) || '';
    
    return (
      <>
        {/* Grid */}
        {showGrid && (
          <g className="grid" opacity={0.3}>
            {yScale.ticks(5).map((tick: any, i: number) => (
              <motion.line
                key={`y-grid-${i}`}
                x1={50}
                y1={yScale(tick)}
                x2={width - 50}
                y2={yScale(tick)}
                stroke={theme.palette.divider}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={controls}
              />
            ))}
          </g>
        )}
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity={0.8} />
            <stop offset="100%" stopColor={colors[0]} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        
        {/* Area path */}
        <motion.path
          d={pathData}
          fill="url(#areaGradient)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: duration / 1000,
            delay: delay / 1000,
            ease: [0.2, 0, 0, 1]
          }}
        />
        
        {/* Top line */}
        <motion.path
          d={lineGenerator(data) || ''}
          fill="none"
          stroke={colors[0]}
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: duration / 1000,
            delay: delay / 1000 + 0.2,
            ease: [0.2, 0, 0, 1]
          }}
        />
      </>
    );
  };

  const renderDonutChart = () => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    const innerRadius = radius * 0.6;
    
    const total = data.reduce((sum, d) => sum + d.y, 0);
    let cumulativeAngle = 0;
    
    return (
      <>
        {data.map((point, i) => {
          const angle = (point.y / total) * 2 * Math.PI;
          const startAngle = cumulativeAngle;
          const endAngle = cumulativeAngle + angle;
          
          const largeArcFlag = angle > Math.PI ? 1 : 0;
          
          const x1 = centerX + radius * Math.cos(startAngle - Math.PI / 2);
          const y1 = centerY + radius * Math.sin(startAngle - Math.PI / 2);
          const x2 = centerX + radius * Math.cos(endAngle - Math.PI / 2);
          const y2 = centerY + radius * Math.sin(endAngle - Math.PI / 2);
          
          const ix1 = centerX + innerRadius * Math.cos(startAngle - Math.PI / 2);
          const iy1 = centerY + innerRadius * Math.sin(startAngle - Math.PI / 2);
          const ix2 = centerX + innerRadius * Math.cos(endAngle - Math.PI / 2);
          const iy2 = centerY + innerRadius * Math.sin(endAngle - Math.PI / 2);
          
          const pathData = [
            `M ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `L ${ix2} ${iy2}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix1} ${iy1}`,
            'Z'
          ].join(' ');
          
          cumulativeAngle += angle;
          
          return (
            <motion.path
              key={i}
              d={pathData}
              fill={point.color || colors[i % colors.length]}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: delay / 1000 + (i * 0.1),
                type: "spring",
                ...physics
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              style={{
                cursor: interactive ? 'pointer' : 'default',
                filter: `drop-shadow(0 4px 8px ${alpha(point.color || colors[i % colors.length], 0.3)})`
              }}
            />
          );
        })}
      </>
    );
  };

  const renderRadarChart = () => {
    // Implementation for radar chart
    return <g></g>;
  };

  const renderBubbleChart = () => {
    // Implementation for bubble chart
    return <g></g>;
  };

  return (
    <Paper
      ref={inViewRef}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        background: gradient 
          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`
          : 'transparent',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      {/* Title and subtitle */}
      {(title || subtitle) && (
        <Box mb={2}>
          {title && (
            <Typography variant="h6" component="h3" fontWeight={600}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      
      {/* SVG Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {renderChart()}
          
          {/* Tooltip */}
          {showTooltip && hoveredPoint && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <rect
                x={mousePosition.x + 10}
                y={mousePosition.y - 30}
                width={80}
                height={24}
                fill={theme.palette.background.paper}
                stroke={theme.palette.divider}
                rx={4}
              />
              <text
                x={mousePosition.x + 15}
                y={mousePosition.y - 12}
                fontSize="12"
                fill={theme.palette.text.primary}
              >
                {hoveredPoint.label || `${hoveredPoint.y}`}
              </text>
            </motion.g>
          )}
        </svg>
      </motion.div>
    </Paper>
  );
};
