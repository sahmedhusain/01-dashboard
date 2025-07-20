import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  Zap,
  Crown,
  Medal,
  Flame,
  CheckCircle,
  Lock,
  Calendar,
  TrendingUp,
  Users,
  Code,
  BookOpen,
  Rocket
} from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Progress from '../ui/Progress';
import { CardSkeleton } from '../ui/Loading';

/**
 * Achievements Section Component
 * Implements achievement tracking, milestone celebrations, and progress gamification
 */
const AchievementsSection = () => {
  const { userStatistics, loading, error } = useData();

  // Process achievements and milestones data
  const achievementsData = useMemo(() => {
    if (!userStatistics) return null;

    const {
      totalXP = 0,
      level = 0,
      projectResults = [],
      skills = [],
      auditRatio = {},
      xpTimeline = []
    } = userStatistics;

    const completedProjects = projectResults.filter(p => p.grade >= 1).length;
    const successRate = projectResults.length > 0 ? (completedProjects / projectResults.length) * 100 : 0;
    const auditRatioValue = auditRatio.auditRatio || 0;

    // Define achievement categories
    const achievements = {
      xp: [
        { id: 'first_xp', name: 'First Steps', description: 'Earn your first XP', threshold: 1, icon: Star, unlocked: totalXP >= 1, rarity: 'common' },
        { id: 'xp_10k', name: 'Rising Star', description: 'Accumulate 10K XP', threshold: 10000, icon: TrendingUp, unlocked: totalXP >= 10000, rarity: 'common' },
        { id: 'xp_25k', name: 'Dedicated Learner', description: 'Reach 25K XP milestone', threshold: 25000, icon: BookOpen, unlocked: totalXP >= 25000, rarity: 'uncommon' },
        { id: 'xp_50k', name: 'Knowledge Seeker', description: 'Achieve 50K XP', threshold: 50000, icon: Target, unlocked: totalXP >= 50000, rarity: 'uncommon' },
        { id: 'xp_100k', name: 'XP Master', description: 'Reach the 100K XP milestone', threshold: 100000, icon: Crown, unlocked: totalXP >= 100000, rarity: 'rare' },
        { id: 'xp_250k', name: 'Legend', description: 'Accumulate 250K XP', threshold: 250000, icon: Trophy, unlocked: totalXP >= 250000, rarity: 'epic' }
      ],
      projects: [
        { id: 'first_project', name: 'Hello World', description: 'Complete your first project', threshold: 1, icon: Code, unlocked: completedProjects >= 1, rarity: 'common' },
        { id: 'project_5', name: 'Getting Started', description: 'Complete 5 projects', threshold: 5, icon: Rocket, unlocked: completedProjects >= 5, rarity: 'common' },
        { id: 'project_10', name: 'Momentum Builder', description: 'Complete 10 projects', threshold: 10, icon: Flame, unlocked: completedProjects >= 10, rarity: 'uncommon' },
        { id: 'project_25', name: 'Project Veteran', description: 'Complete 25 projects', threshold: 25, icon: Medal, unlocked: completedProjects >= 25, rarity: 'rare' },
        { id: 'project_50', name: 'Master Builder', description: 'Complete 50 projects', threshold: 50, icon: Crown, unlocked: completedProjects >= 50, rarity: 'epic' }
      ],
      skills: [
        { id: 'first_skill', name: 'Skill Unlocked', description: 'Develop your first skill', threshold: 1, icon: Zap, unlocked: skills.length >= 1, rarity: 'common' },
        { id: 'skill_5', name: 'Multi-talented', description: 'Develop 5 different skills', threshold: 5, icon: Star, unlocked: skills.length >= 5, rarity: 'uncommon' },
        { id: 'skill_10', name: 'Versatile Developer', description: 'Master 10 skills', threshold: 10, icon: Award, unlocked: skills.length >= 10, rarity: 'rare' },
        { id: 'skill_15', name: 'Renaissance Coder', description: 'Excel in 15+ skills', threshold: 15, icon: Crown, unlocked: skills.length >= 15, rarity: 'epic' }
      ],
      special: [
        { id: 'perfect_score', name: 'Perfectionist', description: 'Achieve 100% success rate with 10+ projects', threshold: 100, icon: Trophy, unlocked: successRate === 100 && completedProjects >= 10, rarity: 'legendary' },
        { id: 'audit_master', name: 'Audit Master', description: 'Maintain audit ratio above 2.0', threshold: 2.0, icon: Users, unlocked: auditRatioValue >= 2.0, rarity: 'rare' },
        { id: 'consistent_learner', name: 'Consistent Learner', description: 'Active for 30+ days', threshold: 30, icon: Calendar, unlocked: xpTimeline.length >= 30, rarity: 'uncommon' }
      ]
    };

    // Calculate achievement statistics
    const totalAchievements = Object.values(achievements).flat().length;
    const unlockedAchievements = Object.values(achievements).flat().filter(a => a.unlocked).length;
    const achievementProgress = (unlockedAchievements / totalAchievements) * 100;

    // Recent achievements (last 5 unlocked)
    const recentAchievements = Object.values(achievements)
      .flat()
      .filter(a => a.unlocked)
      .slice(-5);

    // Next achievements to unlock
    const nextAchievements = Object.values(achievements)
      .flat()
      .filter(a => !a.unlocked)
      .slice(0, 3);

    // Milestone progress
    const milestones = [
      {
        name: 'XP Milestones',
        current: totalXP,
        next: getNextMilestone(totalXP, [10000, 25000, 50000, 100000, 250000, 500000]),
        progress: getMilestoneProgress(totalXP, [10000, 25000, 50000, 100000, 250000, 500000])
      },
      {
        name: 'Project Milestones',
        current: completedProjects,
        next: getNextMilestone(completedProjects, [5, 10, 15, 25, 50, 100]),
        progress: getMilestoneProgress(completedProjects, [5, 10, 15, 25, 50, 100])
      },
      {
        name: 'Level Milestones',
        current: level,
        next: getNextMilestone(level, [5, 10, 15, 20, 25, 30]),
        progress: getMilestoneProgress(level, [5, 10, 15, 20, 25, 30])
      }
    ];

    return {
      achievements,
      stats: {
        total: totalAchievements,
        unlocked: unlockedAchievements,
        progress: achievementProgress
      },
      recentAchievements,
      nextAchievements,
      milestones
    };
  }, [userStatistics]);

  if (loading) {
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

  if (error || !achievementsData) {
    return (
      <div className="text-center py-12">
        <p className="text-surface-400">Unable to load achievements data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Achievement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Achievement Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Achievement Progress
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {achievementsData.stats.unlocked}/{achievementsData.stats.total}
                  </div>
                  <Progress value={achievementsData.stats.progress} className="h-2 mb-2" />
                  <p className="text-sm text-surface-400">
                    {achievementsData.stats.progress.toFixed(1)}% Complete
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary-400" />
                Recent Achievements
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-2">
                {achievementsData.recentAchievements.slice(0, 3).map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-surface-200 truncate">
                        {achievement.name}
                      </span>
                    </div>
                  );
                })}
                {achievementsData.recentAchievements.length === 0 && (
                  <p className="text-sm text-surface-400">No achievements yet</p>
                )}
              </div>
            </Card.Content>
          </Card>
        </motion.div>

        {/* Next Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                Next Goals
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-2">
                {achievementsData.nextAchievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-surface-400" />
                      <span className="text-sm text-surface-300 truncate">
                        {achievement.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card.Content>
          </Card>
        </motion.div>

      </div>

      {/* Milestone Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Flame className="w-5 h-5 mr-2 text-orange-400" />
              Milestone Progress
            </Card.Title>
            <Card.Description>
              Track your progress towards major milestones
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievementsData.milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <h4 className="font-semibold text-surface-200">{milestone.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-400">Current: {milestone.current}</span>
                      <span className="text-surface-400">Next: {milestone.next}</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                    <p className="text-xs text-surface-500">
                      {milestone.progress.toFixed(1)}% to next milestone
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </motion.div>

      {/* Achievement Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {Object.entries(achievementsData.achievements).map(([category, categoryAchievements], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + categoryIndex * 0.1 }}
          >
            <Card>
              <Card.Header>
                <Card.Title className="capitalize">
                  {category} Achievements
                </Card.Title>
                <Card.Description>
                  {categoryAchievements.filter(a => a.unlocked).length} of {categoryAchievements.length} unlocked
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 gap-3">
                  {categoryAchievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          achievement.unlocked
                            ? 'border-green-500/30 bg-green-500/10'
                            : 'border-surface-600 bg-surface-800/30'
                        }`}
                      >
                        <div className={`p-2 rounded-full ${
                          achievement.unlocked ? 'bg-green-500/20' : 'bg-surface-700'
                        }`}>
                          {achievement.unlocked ? (
                            <Icon className="w-5 h-5 text-green-400" />
                          ) : (
                            <Lock className="w-5 h-5 text-surface-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-medium ${
                              achievement.unlocked ? 'text-green-300' : 'text-surface-400'
                            }`}>
                              {achievement.name}
                            </h4>
                            <Badge 
                              variant={
                                achievement.rarity === 'legendary' ? 'warning' :
                                achievement.rarity === 'epic' ? 'accent' :
                                achievement.rarity === 'rare' ? 'primary' :
                                achievement.rarity === 'uncommon' ? 'secondary' : 'default'
                              }
                              className="text-xs"
                            >
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <p className="text-sm text-surface-400 mt-1">
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.unlocked && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        ))}

      </div>

    </div>
  );
};

// Helper functions
const getNextMilestone = (current, milestones) => {
  const next = milestones.find(m => m > current);
  return next || milestones[milestones.length - 1];
};

const getMilestoneProgress = (current, milestones) => {
  const next = getNextMilestone(current, milestones);
  const previous = milestones.filter(m => m <= current).pop() || 0;
  
  if (current >= next) return 100;
  
  const progress = ((current - previous) / (next - previous)) * 100;
  return Math.max(0, Math.min(100, progress));
};

export default AchievementsSection;
