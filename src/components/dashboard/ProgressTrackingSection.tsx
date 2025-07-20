import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Clock, 
  CheckCircle, 
  Circle, 
  Star,
  Calendar,
  Zap,
  Trophy
} from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Progress from '../ui/Progress';
import { CardSkeleton } from '../ui/Loading';

/**
 * Progress Tracking Section Component
 * Provides detailed progress tracking for projects, skills development, and learning milestones
 */
const ProgressTrackingSection = () => {
  const { userStatistics, loading, error } = useData();

  // Process progress data
  const progressData = useMemo(() => {
    if (!userStatistics) return null;

    const {
      projectResults = [],
      skills = [],
      xpTimeline = [],
      totalXP = 0,
      level = 0
    } = userStatistics;

    // Convert totalXP to number for calculations
    const totalXPNumber = typeof totalXP === 'string' ? parseFloat(totalXP) || 0 : totalXP;

    // Calculate project progress
    const totalProjects = projectResults.length;
    const completedProjects = projectResults.filter(p => p.grade >= 1).length;
    const projectProgress = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

    // Calculate skill development progress
    const skillLevels = skills.map(skill => ({
      name: skill.type.replace('skill_', ''),
      level: skill.amount,
      progress: Math.min((skill.amount / 100) * 100, 100)
    })).sort((a, b) => b.level - a.level);

    // Calculate learning milestones
    const milestones = [
      { name: 'First Project', threshold: 1, completed: completedProjects >= 1 },
      { name: '5 Projects', threshold: 5, completed: completedProjects >= 5 },
      { name: '10 Projects', threshold: 10, completed: completedProjects >= 10 },
      { name: '25K XP', threshold: 25000, completed: totalXPNumber >= 25000 },
      { name: '50K XP', threshold: 50000, completed: totalXPNumber >= 50000 },
      { name: '100K XP', threshold: 100000, completed: totalXPNumber >= 100000 },
      { name: 'Level 5', threshold: 5, completed: level >= 5 },
      { name: 'Level 10', threshold: 10, completed: level >= 10 },
      { name: 'Level 15', threshold: 15, completed: level >= 15 }
    ];

    // Calculate recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentActivity = xpTimeline.filter(entry => 
      new Date(entry.createdAt) >= thirtyDaysAgo
    );

    const recentXP = recentActivity.reduce((sum, entry) => sum + entry.amount, 0);

    return {
      projectProgress: {
        completed: completedProjects,
        total: totalProjects,
        percentage: projectProgress
      },
      skillDevelopment: skillLevels.slice(0, 8), // Top 8 skills
      milestones,
      recentActivity: {
        xp: recentXP,
        projects: recentActivity.length,
        days: Math.min(30, new Set(recentActivity.map(a => 
          new Date(a.createdAt).toDateString()
        )).size)
      },
      overallProgress: {
        level,
        totalXP,
        completionRate: projectProgress
      }
    };
  }, [userStatistics]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <div className="lg:col-span-2 xl:col-span-3">
          <CardSkeleton />
        </div>
      </div>
    );
  }

  if (error || !progressData) {
    return (
      <div className="text-center py-12">
        <p className="text-surface-400">Unable to load progress data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Project Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary-400" />
                Project Progress
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    {progressData.projectProgress.completed}
                  </span>
                  <span className="text-surface-400">
                    / {progressData.projectProgress.total}
                  </span>
                </div>
                <Progress 
                  value={progressData.projectProgress.percentage} 
                  className="h-2"
                />
                <p className="text-sm text-surface-400">
                  {progressData.projectProgress.percentage.toFixed(1)}% Complete
                </p>
              </div>
            </Card.Content>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-accent-400" />
                Recent Activity
              </Card.Title>
              <Card.Description>Last 30 days</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">XP Gained</span>
                  <span className="font-semibold text-primary-400">
                    {(progressData.recentActivity.xp / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Active Days</span>
                  <span className="font-semibold text-accent-400">
                    {progressData.recentActivity.days}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Activities</span>
                  <span className="font-semibold text-white">
                    {progressData.recentActivity.projects}
                  </span>
                </div>
              </div>
            </Card.Content>
          </Card>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Overall Progress
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Current Level</span>
                  <Badge variant="primary">
                    Level {progressData.overallProgress.level}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Total XP</span>
                  <span className="font-semibold text-primary-400">
                    {((progressData.overallProgress.totalXP as number) / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Success Rate</span>
                  <span className="font-semibold text-green-400">
                    {progressData.overallProgress.completionRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card.Content>
          </Card>
        </motion.div>

      </div>

      {/* Skills Development Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Skills Development Progress
            </Card.Title>
            <Card.Description>
              Your top skills and their development levels
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progressData.skillDevelopment.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-surface-200 capitalize">
                      {skill.name}
                    </span>
                    <span className="text-sm text-surface-400">
                      {skill.level}
                    </span>
                  </div>
                  <Progress 
                    value={skill.progress} 
                    className="h-2"
                  />
                </motion.div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </motion.div>

      {/* Learning Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Learning Milestones
            </Card.Title>
            <Card.Description>
              Track your achievements and upcoming goals
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {progressData.milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    milestone.completed
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-surface-600 bg-surface-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {milestone.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-surface-400" />
                    )}
                    <div>
                      <h4 className={`font-medium ${
                        milestone.completed ? 'text-green-300' : 'text-surface-300'
                      }`}>
                        {milestone.name}
                      </h4>
                      {milestone.completed && (
                        <Badge variant="success" className="mt-1">
                          <Award className="w-3 h-3 mr-1" />
                          Achieved
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </motion.div>

    </div>
  );
};

export default ProgressTrackingSection;
