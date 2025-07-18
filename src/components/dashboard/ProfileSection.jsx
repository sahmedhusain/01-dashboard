import { Mail, Calendar, Award, TrendingUp, Target, MapPin, Clock } from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import { CircularProgress } from '../ui/Progress';
import Badge, { XPBadge, LevelBadge } from '../ui/Badge';
import { CardSkeleton } from '../ui/Loading';
import Avatar from '../ui/Avatar';
import {
  formatDate,
  formatXP,
  getXPProgress,
  getUserDisplayName,
  getUserEmail,
  getAvatarUrl,
  formatPercentage
} from '../../utils/dataFormatting';

const ProfileSection = () => {
  const {
    user,
    totalXP,
    level,
    auditRatio,
    totalUp,
    totalDown,
    skills,
    passedProjects,
    failedProjects,
    passRate,
    loading
  } = useData();

  // Extract user info using enhanced utility functions
  const displayName = getUserDisplayName(user) || 'Unknown User';
  const email = getUserEmail(user) || 'No email provided';
  const campus = user?.campus || 'Unknown Campus';
  const registrationDate = user?.createdAt;
  const avatarUrl = getAvatarUrl(user);

  // XP and level data (now provided directly by DataContext)
  const userLevel = level || 0;
  const levelProgress = getXPProgress(totalXP, userLevel);

  // Project statistics (now provided directly by DataContext)
  const projectPassRate = passRate || 0;

  // Audit statistics (now provided directly by DataContext)
  const auditsGiven = totalUp/1000000 || 0;
  const auditsReceived = totalDown || 0;

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
                  user={{
                    ...user,
                    avatarUrl: avatarUrl,
                    displayName: displayName
                  }}
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
                    @{user?.login || 'unknown'}
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
                      Joined {formatDate(user?.createdAt)}
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
                    {passedProjects} / {(passedProjects + failedProjects)} Projects
                  </Badge>
                  <Badge variant="accent">
                    Audit Ratio: {auditRatio?.toFixed(2) || '0.00'}
                  </Badge>
                  {projectPassRate > 0 && (
                    <Badge variant="success">
                      {formatPercentage(projectPassRate)} Success Rate
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
            <div className="text-center mt-4 space-y-1">
              <p className="text-sm text-surface-300">
                {formatXP(levelProgress.required - levelProgress.current)} XP to next level
              </p>
              <p className="text-xs text-surface-400">
                {formatXP(levelProgress.current)} / {formatXP(levelProgress.required)} XP
              </p>
            </div>
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
                  {formatPercentage(passRate)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-surface-300">Audits Given</span>
                <span className="text-accent-300 font-semibold">
                  {auditsGiven} MB
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-surface-300">Current Level</span>
                <span className="text-primary-300 font-semibold">
                  Level {userLevel}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-surface-300">Campus</span>
                <span className="text-surface-200 font-medium">
                  {campus}
                </span>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Skills Overview */}
        {skills && skills.length > 0 && (
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Top Skills
              </Card.Title>
            </Card.Header>

            <Card.Content>
              <div className="space-y-2">
                {skills.slice(0, 5).map((skill, index) => (
                  <div key={skill.name || index} className="flex justify-between items-center">
                    <span className="text-surface-300 text-sm">{skill.name}</span>
                    <span className="text-primary-300 font-medium text-sm">
                      {formatXP(skill.totalXP)}
                    </span>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        )}

        {/* TODO: Implement Piscine Performance section with piscine-specific queries */}
      </div>
    </div>
  );
};

export default ProfileSection;
