import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Clock, Target } from 'lucide-react';
import {
  useXPStatistics,
  useProjectStatistics,
  useAuditRatio,
  useXPByProject,
  useXPTimeline,
  usePiscineStats
} from '../../hooks/useGraphQL';
import Card from '../ui/Card';
import Loading, { CardSkeleton } from '../ui/Loading';
import XPProgressChart from '../charts/XPProgressChart';
import ProjectSuccessChart from '../charts/ProjectSuccessChart';
import AuditStatsChart from '../charts/AuditStatsChart';
import XPByProjectChart from '../charts/XPByProjectChart';
import XPTimelineChart from '../charts/XPTimelineChart';
import PiscineStatsChart from '../charts/PiscineStatsChart';

const StatsSection = () => {
  const { xpProgression, loading: xpLoading } = useXPStatistics();
  const { passedProjects, failedProjects, loading: projectsLoading } = useProjectStatistics();
  const { auditsGiven, auditsReceived, loading: auditLoading } = useAuditRatio();

  // New enhanced hooks
  const { xpByProject, loading: xpByProjectLoading } = useXPByProject();
  const { xpTimeline, loading: xpTimelineLoading } = useXPTimeline();
  const { piscineStats, loading: piscineLoading } = usePiscineStats();

  if (xpLoading || projectsLoading || auditLoading || xpByProjectLoading || xpTimelineLoading || piscineLoading) {
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
              data={piscineStats}
              width={400}
              height={350}
            />
          </div>
        </Card.Content>
      </Card>

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
              data={xpProgression}
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
