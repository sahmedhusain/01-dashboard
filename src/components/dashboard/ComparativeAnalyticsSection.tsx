import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Target, 
  Crown,
  Medal,
  Star,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Progress from '../ui/Progress';
import { CardSkeleton } from '../ui/Loading';

/**
 * Comparative Analytics Section Component
 * Provides peer comparison, cohort rankings, and performance benchmarking
 */
const ComparativeAnalyticsSection = () => {
  const { userStatistics, loading, error } = useData();

  // Process comparative analytics data
  const comparativeData = useMemo(() => {
    if (!userStatistics) return null;

    const {
      totalXP = 0,
      level = 0,
      projectResults = [],
      skills = [],
      auditRatio = {}
    } = userStatistics;

    // Convert totalXP to number for calculations
    const totalXPNumber = typeof totalXP === 'string' ? parseFloat(totalXP) || 0 : totalXP;

    // Calculate user performance metrics
    const completedProjects = projectResults.filter(p => p.grade >= 1).length;
    const successRate = projectResults.length > 0 ? (completedProjects / projectResults.length) * 100 : 0;
    const auditRatioValue = typeof auditRatio === 'object' && auditRatio && 'auditRatio' in auditRatio ? (auditRatio as { auditRatio: number }).auditRatio || 0 : 0;

    // Simulate peer comparison data (in real app, this would come from GraphQL)
    const peerComparison = {
      xp: {
        userValue: totalXPNumber,
        average: 85000,
        percentile: calculatePercentile(totalXP, 85000),
        rank: calculateRank(totalXP, 85000)
      },
      level: {
        userValue: level,
        average: 8.5,
        percentile: calculatePercentile(level, 8.5),
        rank: calculateRank(level, 8.5)
      },
      projects: {
        userValue: completedProjects,
        average: 12,
        percentile: calculatePercentile(completedProjects, 12),
        rank: calculateRank(completedProjects, 12)
      },
      successRate: {
        userValue: successRate,
        average: 78,
        percentile: calculatePercentile(successRate, 78),
        rank: calculateRank(successRate, 78)
      },
      auditRatio: {
        userValue: auditRatioValue,
        average: 1.2,
        percentile: calculatePercentile(auditRatioValue, 1.2),
        rank: calculateRank(auditRatioValue, 1.2)
      }
    };

    // Generate cohort rankings
    const cohortRankings = [
      { rank: 1, name: 'Ahmed Al-Rashid', xp: 156000, level: 15, badge: 'gold' },
      { rank: 2, name: 'Sarah Johnson', xp: 142000, level: 14, badge: 'silver' },
      { rank: 3, name: 'Mohammed Hassan', xp: 138000, level: 13, badge: 'bronze' },
      { rank: 4, name: 'You', xp: totalXPNumber, level: level, badge: 'user', isUser: true },
      { rank: 5, name: 'Fatima Al-Zahra', xp: 125000, level: 12, badge: 'normal' },
      { rank: 6, name: 'Omar Khalil', xp: 118000, level: 11, badge: 'normal' },
      { rank: 7, name: 'Layla Mansour', xp: 112000, level: 11, badge: 'normal' },
      { rank: 8, name: 'Yusuf Ibrahim', xp: 108000, level: 10, badge: 'normal' }
    ].sort((a, b) => (b.xp as number) - (a.xp as number)).map((item, index) => ({ ...item, rank: index + 1 }));

    // Performance benchmarks
    const benchmarks = [
      {
        category: 'XP Accumulation',
        userScore: totalXPNumber,
        benchmarks: [
          { level: 'Beginner', threshold: 25000, achieved: totalXPNumber >= 25000 },
          { level: 'Intermediate', threshold: 75000, achieved: totalXPNumber >= 75000 },
          { level: 'Advanced', threshold: 150000, achieved: totalXPNumber >= 150000 },
          { level: 'Expert', threshold: 300000, achieved: totalXPNumber >= 300000 }
        ]
      },
      {
        category: 'Project Completion',
        userScore: completedProjects,
        benchmarks: [
          { level: 'Starter', threshold: 5, achieved: completedProjects >= 5 },
          { level: 'Active', threshold: 15, achieved: completedProjects >= 15 },
          { level: 'Dedicated', threshold: 30, achieved: completedProjects >= 30 },
          { level: 'Master', threshold: 50, achieved: completedProjects >= 50 }
        ]
      },
      {
        category: 'Skill Development',
        userScore: skills.length,
        benchmarks: [
          { level: 'Learning', threshold: 5, achieved: skills.length >= 5 },
          { level: 'Developing', threshold: 10, achieved: skills.length >= 10 },
          { level: 'Proficient', threshold: 15, achieved: skills.length >= 15 },
          { level: 'Versatile', threshold: 20, achieved: skills.length >= 20 }
        ]
      }
    ];

    return {
      peerComparison,
      cohortRankings,
      benchmarks,
      overallRank: Math.ceil((peerComparison.xp.percentile + peerComparison.level.percentile + peerComparison.projects.percentile) / 3)
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

  if (error || !comparativeData) {
    return (
      <div className="text-center py-12">
        <p className="text-surface-400">Unable to load comparative analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Peer Comparison Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Overall Ranking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                Overall Rank
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  #{comparativeData.overallRank}
                </div>
                <p className="text-surface-400 text-sm">
                  Top {comparativeData.overallRank}% in cohort
                </p>
                <Badge variant="warning" className="mt-2">
                  <Medal className="w-3 h-3 mr-1" />
                  Rising Star
                </Badge>
              </div>
            </Card.Content>
          </Card>
        </motion.div>

        {/* XP Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
                XP Comparison
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Your XP</span>
                  <span className="font-semibold text-primary-400">
                    {((comparativeData.peerComparison.xp.userValue as number) / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Cohort Avg</span>
                  <span className="text-surface-400">
                    {(comparativeData.peerComparison.xp.average / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Percentile</span>
                  <div className="flex items-center">
                    {getPerformanceIcon(comparativeData.peerComparison.xp.percentile)}
                    <span className="ml-1 font-semibold">
                      {comparativeData.peerComparison.xp.percentile}%
                    </span>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </motion.div>

        {/* Project Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                Project Performance
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Completed</span>
                  <span className="font-semibold text-green-400">
                    {comparativeData.peerComparison.projects.userValue}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Cohort Avg</span>
                  <span className="text-surface-400">
                    {comparativeData.peerComparison.projects.average}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-300">Success Rate</span>
                  <span className="font-semibold text-green-400">
                    {comparativeData.peerComparison.successRate.userValue.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card.Content>
          </Card>
        </motion.div>

      </div>

      {/* Cohort Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-400" />
              Cohort Rankings
            </Card.Title>
            <Card.Description>
              Top performers in your learning cohort
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              {comparativeData.cohortRankings.slice(0, 8).map((student, index) => (
                <motion.div
                  key={student.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    student.isUser 
                      ? 'bg-primary-500/20 border border-primary-500/30' 
                      : 'bg-surface-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      student.badge === 'gold' ? 'bg-yellow-500 text-yellow-900' :
                      student.badge === 'silver' ? 'bg-gray-400 text-gray-900' :
                      student.badge === 'bronze' ? 'bg-orange-600 text-orange-100' :
                      student.isUser ? 'bg-primary-500 text-white' :
                      'bg-surface-600 text-surface-200'
                    }`}>
                      {student.rank}
                    </div>
                    <div>
                      <p className={`font-medium ${student.isUser ? 'text-primary-300' : 'text-surface-200'}`}>
                        {student.name}
                      </p>
                      <p className="text-sm text-surface-400">
                        Level {student.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-surface-200">
                      {(student.xp / 1000).toFixed(1)}K XP
                    </p>
                    {student.badge !== 'normal' && student.badge !== 'user' && (
                      <Badge variant={student.badge === 'gold' ? 'warning' : student.badge === 'silver' ? 'secondary' : 'accent'}>
                        {student.badge === 'gold' ? '🥇' : student.badge === 'silver' ? '🥈' : '🥉'}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </motion.div>

      {/* Performance Benchmarks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-400" />
              Performance Benchmarks
            </Card.Title>
            <Card.Description>
              Track your progress against standard milestones
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparativeData.benchmarks.map((benchmark, index) => (
                <motion.div
                  key={benchmark.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-surface-200">{benchmark.category}</h4>
                  <div className="space-y-2">
                    {benchmark.benchmarks.map((level, _levelIndex) => (
                      <div
                        key={level.level}
                        className={`flex items-center justify-between p-2 rounded ${
                          level.achieved ? 'bg-green-500/20' : 'bg-surface-800/50'
                        }`}
                      >
                        <span className={`text-sm ${level.achieved ? 'text-green-300' : 'text-surface-400'}`}>
                          {level.level}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-surface-400">{level.threshold}</span>
                          {level.achieved ? (
                            <Star className="w-4 h-4 text-green-400" />
                          ) : (
                            <div className="w-4 h-4 border border-surface-600 rounded-full" />
                          )}
                        </div>
                      </div>
                    ))}
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

// Helper functions
const calculatePercentile = (userValue, average) => {
  const ratio = userValue / average;
  if (ratio >= 2) return 95;
  if (ratio >= 1.5) return 85;
  if (ratio >= 1.2) return 75;
  if (ratio >= 1.0) return 60;
  if (ratio >= 0.8) return 45;
  if (ratio >= 0.6) return 30;
  return 15;
};

const calculateRank = (userValue, average) => {
  const percentile = calculatePercentile(userValue, average);
  return Math.ceil((100 - percentile) / 10);
};

const getPerformanceIcon = (percentile) => {
  if (percentile >= 75) return <ArrowUp className="w-4 h-4 text-green-400" />;
  if (percentile >= 50) return <Minus className="w-4 h-4 text-yellow-400" />;
  return <ArrowDown className="w-4 h-4 text-red-400" />;
};

export default ComparativeAnalyticsSection;
