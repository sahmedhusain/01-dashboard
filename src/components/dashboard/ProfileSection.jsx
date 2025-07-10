import { Mail, Calendar, Award, TrendingUp, Target, MapPin, Clock } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import Card from '../ui/Card';
import { CircularProgress } from '../ui/Progress';
import Badge, { XPBadge, LevelBadge } from '../ui/Badge';
import { CardSkeleton } from '../ui/Loading';
import Avatar from '../ui/Avatar';
import {
  formatDate,
  formatXP,
  getXPProgress,
  getXPForNextLevel
} from '../../utils/dataFormatting';

const ProfileSection = () => {
  const {
    userData,
    xpData,
    projectData,
    auditData,
    loading
  } = useData();

  // Extract user info from the processed data structure
  const userProfile = userData?.profile || {};
  const userAttrs = userData?.attrs || {};

  // User identification (prioritize full name from attrs, fallback to login)
  const firstName = userAttrs.firstName || userProfile.firstName || '';
  const lastName = userAttrs.lastName || userProfile.lastName || '';
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : '';
  const displayName = fullName || userData?.login || 'Unknown User';
  const username = userData?.login || 'unknown';

  // Contact and location info
  const email = userAttrs.email || userProfile.email || 'No email provided';
  const campus = userData?.campus || 'Unknown Campus';
  const registrationDate = userData?.createdAt;

  // XP and level data (calculated in DataContext)
  const totalXP = userData?.totalXP || 0;
  const userLevel = userData?.level || 0;
  const levelProgress = getXPProgress(totalXP, userLevel);
  const nextLevelXP = getXPForNextLevel(userLevel);
  const xpToNextLevel = nextLevelXP - totalXP;

  // Project statistics
  const totalProjects = projectData?.totalProjects || 0;
  const passedProjects = projectData?.passedProjects || 0;
  const failedProjects = projectData?.failedProjects || 0;
  const passRate = projectData?.passRate || 0;

  // Audit statistics
  const auditRatio = auditData?.auditRatio || 0;
  const auditsGiven = auditData?.given?.count || 0;
  const auditsReceived = auditData?.received?.count || 0;
  const avgAuditGrade = auditData?.given?.avgGrade || 0;

  if (loading) {
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
                <Avatar
                  user={userData}
                  size="xl"
                  showBorder
                  animate
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {displayName}
                  </h2>
                  <p className="text-surface-300">
                    @{userData?.login || 'unknown'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-surface-300">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{email}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-surface-300">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {campus}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-surface-300">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Joined {formatDate(userData?.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-surface-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      Started {formatDate(registrationDate)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <XPBadge xp={totalXP} />
                  <Badge variant="primary">
                    {passedProjects} / {(projectData?.totalProjects || 0)} Projects
                  </Badge>
                  <Badge variant="accent">
                    Audit Ratio: {auditRatio.toFixed(2)}
                  </Badge>
                  {passRate > 0 && (
                    <Badge variant="success">
                      {passRate.toFixed(1)}% Success Rate
                    </Badge>
                  )}
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
              value={levelProgress.percentage || 0}
              max={100}
              size={120}
              color="primary"
              label={`Level ${userLevel}`}
            />
            <p className="text-sm text-surface-300 mt-4 text-center">
              {formatXP(levelProgress.required - levelProgress.current)} XP to next level
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
                  {auditsGiven}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-surface-300">Received</span>
                <span className="text-primary-300 font-semibold">
                  {auditsReceived}
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
                  {formatXP(totalXP)}
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
