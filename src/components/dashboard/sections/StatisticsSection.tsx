import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, Award, Target, Users, Code, BookOpen, Calendar, 
  Zap, Star, Trophy, Activity, BarChart3, Clock, CheckCircle
} from 'lucide-react'
import { formatXPValue, formatDate } from '../../../utils/dataFormatting'

interface StatisticsSectionProps {
  analytics: any
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ analytics }) => {
  
  // Calculate various statistics
  const averageXPPerMonth = analytics.xp.monthlyData.reduce((sum: number, month: any) => sum + month.xp, 0) / 12
  const mostActiveMonth = analytics.xp.monthlyData.reduce((prev: any, current: any) => 
    current.xp > prev.xp ? current : prev, { month: 'N/A', xp: 0 }
  )
  
  const recentTrend = analytics.xp.monthlyData.slice(-3).reduce((sum: number, month: any) => sum + month.xp, 0) / 3
  const trendDirection = recentTrend > averageXPPerMonth ? 'improving' : 'declining'
  
  return (
    <div className="space-y-6">
      {/* Statistics Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Performance Statistics</h2>
        <p className="text-white/70">Complete metrics and key performance indicators</p>
      </motion.div>

      {/* Key Performance Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <Zap className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{formatXPValue(analytics.xp.total)}</div>
          <div className="text-white/70 text-sm">Total XP</div>
          <div className="text-blue-400 text-xs mt-2">
            Level {analytics.level.current} ({analytics.level.progress.toFixed(1)}% to next)
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{analytics.audits.ratio.toFixed(2)}</div>
          <div className="text-white/70 text-sm">Audit Ratio</div>
          <div className="text-green-400 text-xs mt-2">
            {analytics.audits.given} audits given
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{analytics.projects.passRate.toFixed(1)}%</div>
          <div className="text-white/70 text-sm">Success Rate</div>
          <div className="text-yellow-400 text-xs mt-2">
            {analytics.projects.passed}/{analytics.projects.total} projects
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <Code className="w-12 h-12 text-purple-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{analytics.skills.total}</div>
          <div className="text-white/70 text-sm">Skills Mastered</div>
          <div className="text-purple-400 text-xs mt-2">
            {analytics.skills.top[0]?.name || 'None'} leading
          </div>
        </div>
      </motion.div>

      {/* Detailed Statistics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
            Learning Progress Statistics
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Completed Projects</span>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">{analytics.projects.completed}</div>
                <div className="text-white/60 text-xs">
                  {((analytics.projects.completed / analytics.projects.total) * 100).toFixed(1)}% of total
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-sm">In Progress</span>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold">{analytics.projects.inProgress}</div>
                <div className="text-white/60 text-xs">Active projects</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span className="text-white text-sm">Average Grade</span>
              </div>
              <div className="text-right">
                <div className="text-purple-400 font-bold">{analytics.projects.avgGrade.toFixed(2)}</div>
                <div className="text-white/60 text-xs">Project average</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">XP per Project</span>
              </div>
              <div className="text-right">
                <div className="text-blue-400 font-bold">{formatXPValue(analytics.xp.average)}</div>
                <div className="text-white/60 text-xs">Average earning</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity & Engagement Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-400" />
            Activity & Engagement
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Audits Completed</span>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">{analytics.audits.completed}</div>
                <div className="text-white/60 text-xs">
                  {((analytics.audits.completed / analytics.audits.given) * 100).toFixed(1)}% completion rate
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">Group Leadership</span>
              </div>
              <div className="text-right">
                <div className="text-blue-400 font-bold">{analytics.groups.captained}</div>
                <div className="text-white/60 text-xs">Groups led</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-white text-sm">Recent Activity</span>
              </div>
              <div className="text-right">
                <div className="text-purple-400 font-bold">{analytics.activity.recent}</div>
                <div className="text-white/60 text-xs">Last 30 days</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-sm">Monthly Average XP</span>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold">{formatXPValue(averageXPPerMonth)}</div>
                <div className="text-white/60 text-xs">
                  {trendDirection === 'improving' ? '↗' : '↘'} {trendDirection}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Module Comparison Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-orange-400" />
          Module Comparison Statistics
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BH Module Stats */}
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 text-blue-400" />
              BH Module (Main Curriculum)
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">XP Earned</span>
                <span className="text-blue-400 font-bold">{formatXPValue(analytics.xp.bhModule)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Projects</span>
                <span className="text-white font-bold">{analytics.projects.bhModule.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Contribution to Total</span>
                <span className="text-white font-bold">
                  {((analytics.xp.bhModule / analytics.xp.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(analytics.xp.bhModule / analytics.xp.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Piscines Stats */}
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3 flex items-center">
              <Code className="w-4 h-4 mr-2 text-green-400" />
              Piscines (Intensive Training)
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">XP Earned</span>
                <span className="text-green-400 font-bold">{formatXPValue(analytics.xp.piscines)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Projects</span>
                <span className="text-white font-bold">{analytics.projects.piscines.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Modules Completed</span>
                <span className="text-white font-bold">{analytics.moduleData.piscines}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(analytics.xp.piscines / analytics.xp.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Skills Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2 text-purple-400" />
          Skills Development Statistics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.skills.top.slice(0, 6).map((skill: any, index: number) => (
            <div key={skill.name} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm font-medium capitalize">
                  {skill.name.replace(/-/g, ' ')}
                </span>
                <span className="text-purple-400 font-bold text-sm">#{index + 1}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{skill.points}</div>
              <div className="text-white/60 text-xs">Points earned</div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                <div 
                  className="bg-purple-400 h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${Math.min(100, (skill.points / Math.max(...analytics.skills.top.map((s: any) => s.points))) * 100)}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-400" />
          Performance Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 mb-2">{mostActiveMonth.month}</div>
            <div className="text-white/70 text-sm mb-1">Most Active Month</div>
            <div className="text-blue-400 text-xs">{formatXPValue(mostActiveMonth.xp)} XP earned</div>
          </div>
          
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-green-400 mb-2">
              {analytics.audits.avgGrade.toFixed(2)}
            </div>
            <div className="text-white/70 text-sm mb-1">Avg Audit Grade</div>
            <div className="text-green-400 text-xs">Given to others</div>
          </div>
          
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-2">
              {((analytics.groups.total / (analytics.projects.total || 1)) * 100).toFixed(0)}%
            </div>
            <div className="text-white/70 text-sm mb-1">Collaboration Rate</div>
            <div className="text-purple-400 text-xs">Projects in groups</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default StatisticsSection