import React from 'react';
import { User, Mail, Calendar, Award, TrendingUp, Target } from 'lucide-react';
import { useUserProfile, useXPStatistics, useProjectStatistics, useAuditRatio } from '../../hooks/useGraphQL';
import Card from '../ui/Card';
import { CircularProgress } from '../ui/Progress';
import Badge, { StatusBadge, XPBadge, LevelBadge } from '../ui/Badge';
import Loading, { CardSkeleton } from '../ui/Loading';

const ProfileSection = () => {
  const { profile, loading: profileLoading } = useUserProfile();
  const { totalXP, loading: xpLoading } = useXPStatistics();
  const { passedProjects, passRate, loading: projectsLoading } = useProjectStatistics();
  const { auditRatio, auditsGiven, auditsReceived, loading: auditLoading } = useAuditRatio();

  // Calculate user level based on XP (example calculation)
  const calculateLevel = (xp) => {
    return Math.floor(xp / 1000) + 1;
  };

  const userLevel = calculateLevel(totalXP);
  const nextLevelXP = userLevel * 1000;
  const currentLevelProgress = ((totalXP % 1000) / 1000) * 100;

  if (profileLoading || xpLoading || projectsLoading || auditLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="space-y-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Profile Card */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title>User Profile</Card.Title>
              <LevelBadge level={userLevel} />
            </div>
          </Card.Header>
          
          <Card.Content>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {profile?.firstName && profile?.lastName 
                      ? `${profile.firstName} ${profile.lastName}`
                      : profile?.login || 'User'
                    }
                  </h2>
                  <p className="text-surface-300">
                    @{profile?.login || 'username'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-surface-300">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{profile?.email || 'No email'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-surface-300">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Joined {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Unknown'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <XPBadge xp={totalXP} />
                  <Badge variant="primary">
                    {passedProjects} Projects Completed
                  </Badge>
                  <Badge variant="accent">
                    Audit Ratio: {auditRatio.toFixed(2)}
                  </Badge>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Stats Sidebar */}
      <div className="space-y-6">
        {/* Level Progress */}
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              User Level
            </Card.Title>
            <Card.Description>
              Apprentice developer
            </Card.Description>
          </Card.Header>
          
          <Card.Content className="flex flex-col items-center">
            <CircularProgress
              value={currentLevelProgress}
              max={100}
              size={120}
              color="primary"
              label={`Level ${userLevel}`}
            />
            <p className="text-sm text-surface-300 mt-4 text-center">
              Next rank in {Math.ceil((nextLevelXP - totalXP) / 100)} levels
            </p>
          </Card.Content>
        </Card>

        {/* Audit Ratio */}
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Audits Ratio
            </Card.Title>
          </Card.Header>
          
          <Card.Content>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-surface-300">Done</span>
                <span className="text-primary-300 font-semibold">
                  {(auditsGiven / 1024 * 1000).toFixed(0)} MB
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-surface-300">Received</span>
                <span className="text-primary-300 font-semibold">
                  {(auditsReceived / 1024 * 1000).toFixed(0)} MB
                </span>
              </div>
              
              <div className="text-center pt-4 border-t border-white/10">
                <div className="text-3xl font-bold text-primary-300">
                  {auditRatio.toFixed(1)}
                </div>
                <p className="text-sm text-surface-400">Best ratio ever!</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Quick Stats
            </Card.Title>
          </Card.Header>
          
          <Card.Content>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-surface-300">Total XP</span>
                <span className="text-white font-semibold">
                  {totalXP.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-surface-300">Projects Passed</span>
                <span className="text-green-400 font-semibold">
                  {passedProjects}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-surface-300">Success Rate</span>
                <span className="text-primary-300 font-semibold">
                  {passRate.toFixed(1)}%
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-surface-300">Audits Given</span>
                <span className="text-accent-300 font-semibold">
                  {auditsGiven}
                </span>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSection;
