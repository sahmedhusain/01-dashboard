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
  
  
  const averageXPPerMonth = analytics.xp.monthlyData.reduce((sum: number, month: any) => sum + month.xp, 0) / 12
  const mostActiveMonth = analytics.xp.monthlyData.reduce((prev: any, current: any) => 
    current.xp > prev.xp ? current : prev, { month: 'N/A', xp: 0 }
  )
  
  const recentTrend = analytics.xp.monthlyData.slice(-3).reduce((sum: number, month: any) => sum + month.xp, 0) / 3
  const trendDirection = recentTrend > averageXPPerMonth ? 'improving' : 'declining'
  
  return (
    <div className="space-y-6 relative">
      {/* Full Screen Background for Statistics Section */}
      <div className="fixed inset-0 opacity-15 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/3 to-cyan-500/3"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40px 40px, rgba(34, 197, 94, 0.06) 2px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>
      <div className="relative z-10">
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

      {/* Enhanced Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
      >
        <StatCard 
          icon={Zap} 
          title="Total XP (Main Module)" 
          value={formatXPValue(analytics.xp.bhModule)} 
          color="bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
          bgGradient="bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
          subValue={`Level ${analytics.level.current} (${analytics.level.progress.toFixed(1)}% to next)`}
          trend={analytics.level.progress > 50 ? { value: Math.round(analytics.level.progress - 40), isPositive: true } : undefined}
        />

        <StatCard 
          icon={Target} 
          title="Audit Ratio" 
          value={analytics.audits.ratio.toFixed(1)} 
          color="bg-gradient-to-r from-green-500/30 to-emerald-500/30"
          bgGradient="bg-gradient-to-br from-green-900/20 to-emerald-900/20"
          subValue={`${analytics.audits.given} audits completed`}
          trend={analytics.audits.ratio > 1 ? { value: Math.round((analytics.audits.ratio - 1) * 100), isPositive: true } : undefined}
        />

        <StatCard 
          icon={Trophy} 
          title="Success Rate" 
          value={`${analytics.projects.bhModule.passRate.toFixed(1)}%`} 
          color="bg-gradient-to-r from-yellow-500/30 to-amber-500/30"
          bgGradient="bg-gradient-to-br from-yellow-900/20 to-amber-900/20"
          subValue={`${analytics.projects.bhModule.passed}/${analytics.projects.bhModule.total} projects`}
          trend={analytics.projects.bhModule.passRate > 75 ? { value: Math.round(analytics.projects.bhModule.passRate - 60), isPositive: true } : undefined}
        />

        <StatCard 
          icon={Code} 
          title="Skills Mastered" 
          value={analytics.skills.total} 
          color="bg-gradient-to-r from-purple-500/30 to-violet-500/30"
          bgGradient="bg-gradient-to-br from-purple-900/20 to-violet-900/20"
          subValue={`${analytics.skills.top[0]?.name || 'None'} leading skill`}
        />

        <StatCard 
          icon={Activity} 
          title="Monthly Average XP" 
          value={formatXPValue(averageXPPerMonth)} 
          color="bg-gradient-to-r from-indigo-500/30 to-purple-500/30"
          bgGradient="bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
          subValue={`${mostActiveMonth.month} was peak month`}
          trend={trendDirection === 'improving' ? { value: 15, isPositive: true } : { value: 10, isPositive: false }}
        />

        <StatCard 
          icon={Calendar} 
          title="Recent Trend" 
          value={trendDirection === 'improving' ? '📈 Rising' : '📉 Stable'} 
          color="bg-gradient-to-r from-rose-500/30 to-pink-500/30"
          bgGradient="bg-gradient-to-br from-rose-900/20 to-pink-900/20"
          subValue={`${formatXPValue(recentTrend)} avg (3 months)`}
        />
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
                <span className="text-white text-sm">Completed  Projects</span>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">{analytics.projects.bhModule.completed}</div>
                <div className="text-white/60 text-xs">
                  {((analytics.projects.bhModule.completed / analytics.projects.bhModule.total) * 100).toFixed(0)}% 
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-sm">In Progress</span>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold">{analytics.projects.bhModule.inProgress}</div>
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
                <span className="text-white/70 text-sm">vs Piscines</span>
                <span className="text-white font-bold">
                  {((analytics.xp.bhModule / (analytics.xp.bhModule + analytics.xp.piscines)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(analytics.xp.bhModule / (analytics.xp.bhModule + analytics.xp.piscines)) * 100}%` }}
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
                  style={{ width: `${(analytics.xp.piscines / (analytics.xp.bhModule + analytics.xp.piscines)) * 100}%` }}
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
          {analytics.skills.skillData.map((skill: any, index: number) => (
            <div key={skill.name} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm font-medium capitalize">
                  {skill.name.replace(/-/g, ' ')}
                </span>
                <span className="text-purple-400 font-bold text-sm">#{index + 1}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{skill.percentage}%</div>
              <div className="text-white/60 text-xs">Skill percentage</div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                <div 
                  className="bg-purple-400 h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${Math.min(100, skill.percentage)}%` 
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
    </div>
  )
}

const StatCard = ({ icon: Icon, title, value, color, subValue, trend, bgGradient }: { 
  icon: React.ElementType, 
  title: string, 
  value: string | number, 
  color: string,
  subValue?: string,
  trend?: { value: number, isPositive: boolean },
  bgGradient?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`${bgGradient || 'bg-gradient-to-br from-slate-800/50 to-slate-900/50'} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} backdrop-blur-sm`}>
        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
      {trend && (
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
          trend.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{value}</h3>
    <p className="text-white/70 text-sm font-medium">{title}</p>
    {subValue && <p className="text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1">{subValue}</p>}
  </motion.div>
);

export default StatisticsSection