// ============================================================================
// CHART TEMPLATE COMPONENT
// Template showing best practices for SVG chart implementation
// ============================================================================

import { useMemo } from 'react';
import { useUserSkills, useXPByProject } from '../hooks/useGraphQLData';
import { processSkillsData, processXPByProject } from '../utils/dataProcessing';
import { formatNumber } from '../utils/dataFormatting';

// ============================================================================
// CHART UTILITIES
// ============================================================================

const getChartColors = (index, _total) => {
  const colors = [
    '#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1',
    '#fd7e14', '#20c997', '#6c757d', '#e83e8c', '#17a2b8'
  ];
  return colors[index % colors.length];
};

const calculateChartDimensions = (config) => {
  const { width, height, padding } = config;
  const chartWidth = width - (padding.left + padding.right);
  const chartHeight = height - (padding.top + padding.bottom);
  
  return {
    chartWidth,
    chartHeight,
    innerWidth: chartWidth,
    innerHeight: chartHeight,
  };
};

// ============================================================================
// BAR CHART COMPONENT
// ============================================================================

const BarChart = ({ data, config, title }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const maxValue = Math.max(...data.map(item => item.amount || item.value));
    const dimensions = calculateChartDimensions(data);
    const barWidth = dimensions.chartWidth / data.length * 0.8;
    const barSpacing = dimensions.chartWidth / data.length * 0.2;
    
    return data.map((item, index) => {
      const value = item.amount || item.value;
      const height = (value / maxValue) * dimensions.chartHeight;
      const x = index * (barWidth + barSpacing) + barSpacing / 2;
      const y = dimensions.chartHeight - height;
      
      return {
        ...item,
        x,
        y,
        width: barWidth,
        height,
        color: getChartColors(index, data.length),
        percentage: (value / maxValue) * 100,
      };
    });
  }, [data, config]);

  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <p>No data available for {title}</p>
      </div>
    );
  }

  return (
    <div className="bar-chart">
      <h3 className="chart-title">{title}</h3>
      <svg width={config.width} height={config.height} className="chart-svg">
        {/* Chart bars */}
        <g transform={`translate(${config.padding.left}, ${config.padding.top})`}>
          {chartData.map((bar, index) => (
            <g key={index} className="bar-group">
              {/* Bar */}
              <rect
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={bar.color}
                className="chart-bar"
                data-value={bar.amount || bar.value}
                data-label={bar.skill || bar.name}
              />
              
              {/* Value label on top of bar */}
              <text
                x={bar.x + bar.width / 2}
                y={bar.y - 5}
                textAnchor="middle"
                fontSize="10"
                fill="#333"
                className="bar-value"
              >
                {formatNumber(bar.amount || bar.value)}
              </text>
              
              {/* Label at bottom */}
              <text
                x={bar.x + bar.width / 2}
                y={config.height - config.padding.bottom + 15}
                textAnchor="middle"
                fontSize="11"
                fill="#666"
                className="bar-label"
              >
                {(bar.skill || bar.name || '').substring(0, 8)}
                {(bar.skill || bar.name || '').length > 8 ? '...' : ''}
              </text>
            </g>
          ))}
        </g>
        
        {/* Y-axis */}
        <line
          x1={config.padding.left}
          y1={config.padding.top}
          x2={config.padding.left}
          y2={config.height - config.padding.bottom}
          stroke="#ddd"
          strokeWidth="1"
        />
        
        {/* X-axis */}
        <line
          x1={config.padding.left}
          y1={config.height - config.padding.bottom}
          x2={config.width - config.padding.right}
          y2={config.height - config.padding.bottom}
          stroke="#ddd"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

// ============================================================================
// PIE CHART COMPONENT
// ============================================================================

const PieChart = ({ data, config, title }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const total = data.reduce((sum, item) => sum + (item.amount || item.value), 0);
    let currentAngle = 0;
    const centerX = config.width / 2;
    const centerY = config.height / 2;
    const radius = Math.min(config.width, config.height) / 2 - 40;
    
    return data.map((item, index) => {
      const value = item.amount || item.value;
      const percentage = (value / total) * 100;
      const angle = (value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      // Calculate arc path
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      currentAngle += angle;
      
      return {
        ...item,
        pathData,
        percentage,
        color: getChartColors(index, data.length),
        centerX,
        centerY,
        radius,
      };
    });
  }, [data, config]);

  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <p>No data available for {title}</p>
      </div>
    );
  }

  return (
    <div className="pie-chart">
      <h3 className="chart-title">{title}</h3>
      <div className="pie-chart-container">
        <svg width={config.width} height={config.height} className="chart-svg">
          {chartData.map((slice, index) => (
            <g key={index} className="pie-slice">
              <path
                d={slice.pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                className="pie-path"
                data-value={slice.amount || slice.value}
                data-label={slice.skill || slice.name}
                data-percentage={slice.percentage.toFixed(1)}
              />
            </g>
          ))}
        </svg>
        
        {/* Legend */}
        <div className="pie-legend">
          {chartData.map((slice, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: slice.color }}
              ></div>
              <span className="legend-label">
                {slice.skill || slice.name} ({slice.percentage.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SKILLS CHART COMPONENT
// ============================================================================

const SkillsChart = ({ chartType = 'bar', maxItems = 10 }) => {
  const { data: skillsData, loading, error } = useUserSkills();
  
  const processedData = useMemo(() => {
    if (!skillsData) return [];
    return processSkillsData(skillsData).slice(0, maxItems);
  }, [skillsData, maxItems]);

  const chartConfig = {
    width: 600,
    height: 400,
    padding: { top: 20, right: 20, bottom: 60, left: 40 },
  };

  if (loading) {
    return <div className="chart-loading">Loading skills chart...</div>;
  }

  if (error) {
    return <div className="chart-error">Error loading skills: {error.message}</div>;
  }

  const ChartComponent = chartType === 'pie' ? PieChart : BarChart;
  
  return (
    <ChartComponent
      data={processedData}
      config={chartConfig}
      title="Skills Overview"
    />
  );
};

// ============================================================================
// XP PROJECTS CHART COMPONENT
// ============================================================================

const XPProjectsChart = ({ userLogin, chartType = 'bar', maxItems = 8 }) => {
  const { data: projectsData, loading, error } = useXPByProject(userLogin);
  
  const processedData = useMemo(() => {
    if (!projectsData) return [];
    return processXPByProject(projectsData).slice(0, maxItems);
  }, [projectsData, maxItems]);

  const chartConfig = {
    width: 700,
    height: 350,
    padding: { top: 20, right: 20, bottom: 80, left: 50 },
  };

  if (loading) {
    return <div className="chart-loading">Loading projects chart...</div>;
  }

  if (error) {
    return <div className="chart-error">Error loading projects: {error.message}</div>;
  }

  const ChartComponent = chartType === 'pie' ? PieChart : BarChart;
  
  return (
    <ChartComponent
      data={processedData}
      config={chartConfig}
      title="XP by Project"
    />
  );
};

// ============================================================================
// CHART CONTAINER COMPONENT
// ============================================================================

const ChartTemplate = ({ userLogin, showSkills = true, showProjects = true }) => {
  return (
    <div className="chart-template">
      <div className="charts-grid">
        {showSkills && (
          <div className="chart-container">
            <SkillsChart chartType="bar" maxItems={10} />
          </div>
        )}
        
        {showProjects && userLogin && (
          <div className="chart-container">
            <XPProjectsChart 
              userLogin={userLogin} 
              chartType="bar" 
              maxItems={8} 
            />
          </div>
        )}
      </div>
      
      {/* Alternative pie chart view */}
      <div className="charts-grid">
        {showSkills && (
          <div className="chart-container">
            <SkillsChart chartType="pie" maxItems={6} />
          </div>
        )}
        
        {showProjects && userLogin && (
          <div className="chart-container">
            <XPProjectsChart 
              userLogin={userLogin} 
              chartType="pie" 
              maxItems={5} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const chartStyles = `
.chart-template {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.chart-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-title {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
  text-align: center;
}

.chart-svg {
  display: block;
  margin: 0 auto;
}

.chart-bar {
  transition: opacity 0.2s ease;
  cursor: pointer;
}

.chart-bar:hover {
  opacity: 0.8;
}

.bar-value {
  font-weight: 600;
}

.bar-label {
  font-weight: 500;
}

.pie-chart-container {
  display: flex;
  align-items: center;
  gap: 30px;
}

.pie-path {
  transition: opacity 0.2s ease;
  cursor: pointer;
}

.pie-path:hover {
  opacity: 0.8;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

.legend-label {
  color: #333;
}

.chart-loading,
.chart-error,
.chart-empty {
  text-align: center;
  padding: 40px;
  color: #666;
}

.chart-error {
  background: #f8d7da;
  color: #721c24;
  border-radius: 4px;
}

.chart-empty {
  background: #f8f9fa;
  border-radius: 4px;
}
`;

// Inject styles if in browser
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = chartStyles;
  document.head.appendChild(styleSheet);
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Basic usage
<ChartTemplate userLogin="john.doe" />

// Skills only
<ChartTemplate
  userLogin="john.doe"
  showSkills={true}
  showProjects={false}
/>

// Projects only
<ChartTemplate
  userLogin="john.doe"
  showSkills={false}
  showProjects={true}
/>

// Individual chart components
<SkillsChart chartType="bar" maxItems={10} />
<SkillsChart chartType="pie" maxItems={6} />
<XPProjectsChart userLogin="john.doe" chartType="bar" maxItems={8} />
*/

export default ChartTemplate;
