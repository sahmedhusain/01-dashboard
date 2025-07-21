import { BarChart3, TrendingUp, PieChart, Activity, Clock, Target, Award, Zap } from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import { CardSkeleton } from '../ui/Loading';
import Badge from '../ui/Badge';
import XPProgressChart from '../charts/XPProgressChart';
import ProjectSuccessChart from '../charts/ProjectSuccessChart';
import AuditStatsChart from '../charts/AuditStatsChart';
import XPByProjectChart from '../charts/XPByProjectChart';
import XPTimelineChart from '../charts/XPTimelineChart';
import AdvancedChartsGrid from '../charts/AdvancedChartsGrid';
import {
  processStatsSectionData,
  processStatsOverviewCards,
  processChartConfigurations
} from '../../utils/componentDataProcessors/statsProcessors';

const StatsSection = () => {
  const rawData = useData();

  // Process all stats data using utility functions
  const statsData = processStatsSectionData(rawData);
  const overviewCards = processStatsOverviewCards(statsData);
  const chartConfigs = processChartConfigurations(statsData);

  // Transform statsData to match AdvancedChartsGrid expected structure
  const analyticsData = {
    xpTimeline: rawData.userStatistics?.xpTimeline || [],
    projectAnalytics: rawData.userStatistics?.projectResults || [],
    skills: rawData.userStatistics?.skills || [],
    techSkills: rawData.userStatistics?.techSkills || rawData.userStatistics?.skills || [],
    auditData: {
      auditRatio: typeof rawData.userStatistics?.auditRatio === 'string'
        ? parseFloat(rawData.userStatistics.auditRatio) || 0
        : rawData.userStatistics?.auditRatio || 0,
      totalUp: rawData.auditStatistics?.auditsGiven || 0,
      totalDown: rawData.auditStatistics?.auditsReceived || 0,
    }
  };

  // Icon mapping for dynamic icon rendering
  const iconMap = {
    TrendingUp,
    Target,
    Award,
    BarChart3,
    PieChart,
    Activity,
    Clock,
    Zap
  };

  if (statsData.loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <div className="lg:col-span-2 xl:col-span-3">
          <CardSkeleton />
        </div>
        <div className="lg:col-span-2">
          <CardSkeleton />
        </div>
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Statistics Overview Cards */}
      {overviewCards.map((card, index) => {
        const Icon = iconMap[card.icon] || TrendingUp;

        return (
          <Card key={index}>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Icon className="w-5 h-5 mr-2" />
                {card.title}
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {card.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center">
                    <span className="text-surface-300">{item.label}</span>
                    <Badge variant={item.variant}>{item.value}</Badge>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        );
      })}

      {/* XP Timeline Chart - Full width */}
      <div className="lg:col-span-2 xl:col-span-3">
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              XP Progression Timeline
            </Card.Title>
            <Card.Description>
              Your cumulative experience points growth over time
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="flex justify-center">
              <XPTimelineChart
                data={chartConfigs.xpTimeline.data}
                width={chartConfigs.xpTimeline.width}
                height={chartConfigs.xpTimeline.height}
              />
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* XP by Project Chart */}
      <div className="lg:col-span-2">
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              XP by Project
            </Card.Title>
            <Card.Description>
              Top projects ranked by experience points earned
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="flex justify-center">
              <XPByProjectChart
                data={chartConfigs.xpByProject.data}
                width={chartConfigs.xpByProject.width}
                height={chartConfigs.xpByProject.height}
                maxBars={chartConfigs.xpByProject.maxBars}
              />
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* TODO: Implement Piscine Performance section with piscine-specific queries */}

      {/* Skills Development Tracking */}
      {statsData.skillsData.hasSkills && (
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Skill Development
            </Card.Title>
            <Card.Description>
              Top technologies and programming languages
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              {statsData.skillsData.topSkills.map((skill, index) => (
                <div key={skill.name || index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                    <span className="text-surface-200 text-sm capitalize">
                      {skill.displayName}
                    </span>
                  </div>
                  <Badge variant="primary" size="sm">
                    {skill.formattedPercentage}
                  </Badge>
                </div>
              ))}
              {!statsData.skillsData.hasSkills && (
                <div className="text-center text-surface-400 py-4">
                  <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No skill data available yet</p>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Original XP Progress Chart */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            XP Progress Overview
          </Card.Title>
          <Card.Description>
            Your experience points progression summary
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex justify-center">
            <XPProgressChart
              data={chartConfigs.xpProgress.data}
              width={chartConfigs.xpProgress.width}
              height={chartConfigs.xpProgress.height}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Project Success Chart */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Project Success Rate
          </Card.Title>
          <Card.Description>
            Pass/Fail ratio for your projects
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex justify-center py-8">
            <ProjectSuccessChart
              passedProjects={chartConfigs.projectSuccess.passedProjects}
              failedProjects={chartConfigs.projectSuccess.failedProjects}
              size={chartConfigs.projectSuccess.size}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Audit Statistics Chart */}
      <div className="lg:col-span-2 xl:col-span-3">
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Audit Performance Analytics
            </Card.Title>
            <Card.Description>
              Comprehensive audit statistics and performance metrics
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="flex justify-center">
              <AuditStatsChart
                auditsGiven={chartConfigs.auditStats.auditsGiven}
                auditsReceived={chartConfigs.auditStats.auditsReceived}
                width={chartConfigs.auditStats.width}
                height={chartConfigs.auditStats.height}
              />
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Advanced SVG Charts Grid - Professional Dashboard */}
      <div className="lg:col-span-2 xl:col-span-3">
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Advanced Analytics Dashboard
            </Card.Title>
            <Card.Description>
              Comprehensive SVG-based statistical visualizations including XP progress, project success rates, skills radar, and audit performance
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <AdvancedChartsGrid
              analyticsData={analyticsData}
              className="mt-4"
              chartSize={{ width: 350, height: 250 }}
            />
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default StatsSection;
