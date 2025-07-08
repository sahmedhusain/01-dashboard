import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface DataPoint {
  x: number;
  y: number;
  label?: string;
  value?: number;
  color?: string;
}

export interface GraphData {
  points: DataPoint[];
  label: string;
  color: string;
}

interface AnimatedLineGraphProps {
  data: GraphData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  showGrid?: boolean;
  animate?: boolean;
}

export function AnimatedLineGraph({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 30, bottom: 40, left: 50 },
  showGrid = true,
  animate = true,
}: AnimatedLineGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const { xScale, yScale, gridLines } = useMemo(() => {
    if (!data.length) return { xScale: (x: number) => x, yScale: (y: number) => y, gridLines: [] };

    const allPoints = data.flatMap(d => d.points);
    const xMin = Math.min(...allPoints.map(p => p.x));
    const xMax = Math.max(...allPoints.map(p => p.x));
    const yMin = Math.min(...allPoints.map(p => p.y));
    const yMax = Math.max(...allPoints.map(p => p.y));

    const xScale = (x: number) => ((x - xMin) / (xMax - xMin)) * chartWidth;
    const yScale = (y: number) => chartHeight - ((y - yMin) / (yMax - yMin)) * chartHeight;

    // Generate grid lines
    const gridLines = [];
    const gridCount = 5;
    
    // Vertical grid lines
    for (let i = 0; i <= gridCount; i++) {
      const x = (i / gridCount) * chartWidth;
      gridLines.push({ type: 'vertical', position: x });
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= gridCount; i++) {
      const y = (i / gridCount) * chartHeight;
      gridLines.push({ type: 'horizontal', position: y });
    }

    return { xScale, yScale, gridLines };
  }, [data, chartWidth, chartHeight]);

  const generatePath = (points: DataPoint[]) => {
    if (points.length === 0) return '';
    
    const pathData = points.map((point, index) => {
      const x = xScale(point.x);
      const y = yScale(point.y);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    return pathData;
  };

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="overflow-visible"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid */}
          {showGrid && (
            <g className="grid opacity-20">
              {gridLines.map((line, index) => (
                <motion.line
                  key={index}
                  x1={line.type === 'vertical' ? line.position : 0}
                  y1={line.type === 'vertical' ? 0 : line.position}
                  x2={line.type === 'vertical' ? line.position : chartWidth}
                  y2={line.type === 'vertical' ? chartHeight : line.position}
                  stroke="currentColor"
                  strokeWidth={0.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ delay: index * 0.05 }}
                />
              ))}
            </g>
          )}

          {/* Data lines */}
          {data.map((series, seriesIndex) => (
            <g key={series.label}>
              <motion.path
                d={generatePath(series.points)}
                fill="none"
                stroke={series.color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
                animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{
                  pathLength: { duration: 2, delay: seriesIndex * 0.5 },
                  opacity: { duration: 0.5, delay: seriesIndex * 0.5 },
                }}
              />

              {/* Data points */}
              {series.points.map((point, pointIndex) => (
                <motion.circle
                  key={pointIndex}
                  cx={xScale(point.x)}
                  cy={yScale(point.y)}
                  r={4}
                  fill={series.color}
                  stroke="white"
                  strokeWidth={2}
                  className="cursor-pointer"
                  initial={animate ? { scale: 0, opacity: 0 } : undefined}
                  animate={animate ? { scale: 1, opacity: 1 } : undefined}
                  whileHover={{ scale: 1.5 }}
                  transition={{
                    delay: animate ? (seriesIndex * 0.5 + pointIndex * 0.1) : 0,
                  }}
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}
            </g>
          ))}

          {/* Axes */}
          <g className="axes">
            {/* X-axis */}
            <motion.line
              x1={0}
              y1={chartHeight}
              x2={chartWidth}
              y2={chartHeight}
              stroke="currentColor"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            
            {/* Y-axis */}
            <motion.line
              x1={0}
              y1={0}
              x2={0}
              y2={chartHeight}
              stroke="currentColor"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </g>
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredPoint && (
        <motion.div
          className="absolute bg-black text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none z-10"
          style={{
            left: xScale(hoveredPoint.x) + margin.left,
            top: yScale(hoveredPoint.y) + margin.top - 40,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="text-sm">
            {hoveredPoint.label && <div className="font-medium">{hoveredPoint.label}</div>}
            <div>Value: {hoveredPoint.value || hoveredPoint.y}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface AnimatedBarGraphProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  color?: string;
  animate?: boolean;
}

export function AnimatedBarGraph({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 30, bottom: 40, left: 50 },
  color = '#007bff',
  animate = true,
}: AnimatedBarGraphProps) {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const { xScale, yScale } = useMemo(() => {
    if (!data.length) return { xScale: (x: number) => x, yScale: (y: number) => y };

    const maxValue = Math.max(...data.map(d => d.y));
    const barWidth = chartWidth / data.length;

    const xScale = (index: number) => index * barWidth;
    const yScale = (value: number) => (value / maxValue) * chartHeight;

    return { xScale, yScale };
  }, [data, chartWidth, chartHeight]);

  const barWidth = chartWidth / data.length * 0.8;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Bars */}
        {data.map((point, index) => {
          const barHeight = yScale(point.y);
          return (
            <motion.rect
              key={index}
              x={xScale(index) + (chartWidth / data.length - barWidth) / 2}
              y={chartHeight - barHeight}
              width={barWidth}
              height={barHeight}
              fill={point.color || color}
              rx={4}
              initial={animate ? { height: 0, y: chartHeight } : undefined}
              animate={animate ? { height: barHeight, y: chartHeight - barHeight } : undefined}
              whileHover={{ opacity: 0.8, scale: 1.05 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            />
          );
        })}

        {/* X-axis */}
        <motion.line
          x1={0}
          y1={chartHeight}
          x2={chartWidth}
          y2={chartHeight}
          stroke="currentColor"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* Y-axis */}
        <motion.line
          x1={0}
          y1={0}
          x2={0}
          y2={chartHeight}
          stroke="currentColor"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* Labels */}
        {data.map((point, index) => (
          <motion.text
            key={index}
            x={xScale(index) + chartWidth / data.length / 2}
            y={chartHeight + 20}
            textAnchor="middle"
            className="text-sm fill-current"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {point.label}
          </motion.text>
        ))}
      </g>
    </svg>
  );
}

interface AnimatedDonutChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  innerRadius?: number;
  animate?: boolean;
}

export function AnimatedDonutChart({
  data,
  width = 300,
  height = 300,
  innerRadius = 60,
  animate = true,
}: AnimatedDonutChartProps) {
  const radius = Math.min(width, height) / 2 - 10;
  const centerX = width / 2;
  const centerY = height / 2;

  const total = data.reduce((sum, d) => sum + d.y, 0);
  
  let cumulativeAngle = 0;
  const segments = data.map((point) => {
    const percentage = point.y / total;
    const angle = percentage * 2 * Math.PI;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    
    cumulativeAngle += angle;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    const x3 = centerX + innerRadius * Math.cos(endAngle);
    const y3 = centerY + innerRadius * Math.sin(endAngle);
    const x4 = centerX + innerRadius * Math.cos(startAngle);
    const y4 = centerY + innerRadius * Math.sin(startAngle);

    const largeArc = angle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    return {
      ...point,
      pathData,
      percentage,
      startAngle,
      endAngle,
    };
  });

  return (
    <svg width={width} height={height} className="overflow-visible">
      {segments.map((segment, index) => (
        <motion.path
          key={index}
          d={segment.pathData}
          fill={segment.color || `hsl(${index * 360 / data.length}, 70%, 50%)`}
          stroke="white"
          strokeWidth={2}
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          whileHover={{ scale: 1.05 }}
          transition={{ delay: index * 0.2, duration: 0.8 }}
        />
      ))}
      
      {/* Center text */}
      <motion.text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        className="text-2xl font-bold fill-current"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        {total}
      </motion.text>
    </svg>
  );
}
