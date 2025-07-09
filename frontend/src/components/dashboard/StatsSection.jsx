import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import { useXPStatistics, useProjectStatistics, useAuditRatio } from '../../hooks/useGraphQL';
import Card from '../ui/Card';
import Loading, { CardSkeleton } from '../ui/Loading';
import XPProgressChart from '../charts/XPProgressChart';
import ProjectSuccessChart from '../charts/ProjectSuccessChart';
import AuditStatsChart from '../charts/AuditStatsChart';

const StatsSection = () => {
  const { xpProgression, loading: xpLoading } = useXPStatistics();
  const { passedProjects, failedProjects, loading: projectsLoading } = useProjectStatistics();
  const { auditsGiven, auditsReceived, loading: auditLoading } = useAuditRatio();

  if (xpLoading || projectsLoading || auditLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <div className="lg:col-span-2">
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            XP Progress Over Time
          </Card.Title>
          <Card.Description>
            Your experience points progression
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex justify-center">
            <XPProgressChart
              data={xpProgression}
              width={500}
              height={300}
            />
          </div>
        </Card.Content>
      </Card>

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

      <Card className="lg:col-span-2">
        <Card.Header>
          <Card.Title className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Audit Statistics
          </Card.Title>
          <Card.Description>
            Comparison of audits given vs received
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex justify-center">
            <AuditStatsChart
              auditsGiven={auditsGiven}
              auditsReceived={auditsReceived}
              width={600}
              height={300}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default StatsSection;
