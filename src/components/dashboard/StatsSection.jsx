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
import PiscineStatsChart from '../charts/PiscineStatsChart';
import { formatXP, formatPercentage } from '../../utils/dataFormatting';

const StatsSection = () => {
  const {
    userData,
    xpData,
    projectData,
    auditData,
    piscineStats,
    skills,
    loading
  } = useData();

  // Extract chart data from the new data structure
  const xpTimeline = xpData?.timeline || [];
  const xpByProject = xpData?.xpByProject || [];
  const totalXP = userData?.totalXP || 0;
  const userLevel = userData?.level || 0;

  // Project statistics
  const totalProjects = projectData?.totalProjects || 0;
  const passedProjects = projectData?.passedProjects || 0;
  const failedProjects = projectData?.failedProjects || 0;
  const passRate = projectData?.passRate || 0;

  // Audit statistics
  const auditsGiven = auditData?.given?.count || 0;
  const auditsReceived = auditData?.received?.count || 0;
  const auditRatio = auditData?.auditRatio || 0;

  if (loading) {
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
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            XP Statistics
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-surface-300">Total XP</span>
              <Badge variant="primary">{formatXP(totalXP)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-surface-300">Current Level</span>
              <Badge variant="accent">Level {userLevel}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-surface-300">Projects Completed</span>
              <Badge variant="success">{passedProjects}</Badge>
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Performance Metrics
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-surface-300">Success Rate</span>
              <Badge variant="primary">{formatPercentage(passRate)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-surface-300">Audit Ratio</span>
              <Badge variant="accent">{auditRatio.toFixed(2)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-surface-300">Audits Given</span>
              <Badge variant="success">{auditsGiven}</Badge>
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Achievement Summary
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-surface-300">Total Projects</span>
              <Badge variant="primary">{totalProjects}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-surface-300">Failed Projects</span>
              <Badge variant="error">{failedProjects}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-surface-300">Audits Received</span>
              <Badge variant="accent">{auditsReceived}</Badge>
            </div>
          </div>
        </Card.Content>
      </Card>

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
                data={xpTimeline}
                width={900}
                height={400}
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
                data={xpByProject}
                width={700}
                height={500}
                maxBars={15}
              />
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Piscine Statistics Chart */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Piscine Performance
          </Card.Title>
          <Card.Description>
            JavaScript and Go piscine statistics
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex justify-center">
            <PiscineStatsChart
              data={piscineStats || {}}
              width={400}
              height={350}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Skills Development Tracking */}
      {skills && skills.length > 0 && (
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
              {skills.slice(0, 6).map((skill, index) => (
                <div key={skill.name || index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                    <span className="text-surface-200 text-sm capitalize">
                      {skill.name?.replace(/_/g, ' ') || 'Unknown Skill'}
                    </span>
                  </div>
                  <Badge variant="primary" size="sm">
                    {formatXP(skill.totalXP)}
                  </Badge>
                </div>
              ))}
              {skills.length === 0 && (
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
              data={xpTimeline || []} // Use timeline data for progression
              width={400}
              height={300}
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
              passedProjects={passedProjects}
              failedProjects={failedProjects}
              size={250}
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
                auditsGiven={auditsGiven}
                auditsReceived={auditsReceived}
                width={900}
                height={400}
              />
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default StatsSection;
