import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Trophy, Code, Activity, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { formatXPValue, formatGrade } from '../../utils/dataFormatting'
import Card from '../ui/Card'

type ActivityItem = {
  id: string | number
  type: 'xp' | 'level' | 'skill' | 'progress' | 'audit'
  title: string
  details: string
  timestamp: string
  amount?: number
  grade?: number
  isDone?: boolean
}

interface ActivityFeedProps {
  transactions: any[]
  progress: any[]
  audits: any[]
  limit?: number
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ transactions, progress, audits, limit = 20 }) => {
  const combinedActivities: ActivityItem[] = [
    ...transactions.map(t => ({
      id: t.id,
      type: t.type.startsWith('skill') ? 'skill' as const : 'xp' as const,
      title: t.type.startsWith('skill') ? `Skill: ${t.type.replace('skill_', '')}` : `XP: ${t.path.split('/').pop()}`,
      details: `Received ${formatXPValue(t.amount)} XP`,
      timestamp: t.createdAt,
      amount: t.amount,
    })),
    ...progress.map(p => ({
      id: p.id,
      type: 'progress' as const,
      title: `Project: ${p.path.split('/').pop()}`,
      details: p.isDone ? `Completed with grade ${formatGrade(p.grade)}` : 'In Progress',
      timestamp: p.updatedAt,
      grade: p.grade,
      isDone: p.isDone,
    })),
    ...audits.map(a => ({
      id: a.id,
      type: 'audit' as const,
      title: 'Audit',
      details: `Completed audit with grade ${formatGrade(a.grade)}`,
      timestamp: a.endAt,
      grade: a.grade,
    })),
  ]

  const sortedActivities = combinedActivities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)

  const getIcon = (item: ActivityItem) => {
    switch (item.type) {
      case 'xp': return <Zap className="h-4 w-4 text-blue-400" />
      case 'level': return <Trophy className="h-4 w-4 text-yellow-400" />
      case 'skill': return <Code className="h-4 w-4 text-green-400" />
      case 'progress':
        if (item.isDone) {
          return item.grade && item.grade >= 1 ? <CheckCircle className="h-4 w-4 text-green-400" /> : <AlertTriangle className="h-4 w-4 text-red-400" />
        }
        return <Clock className="h-4 w-4 text-white/60" />
      case 'audit': return <Activity className="h-4 w-4 text-purple-400" />
      default: return <Activity className="h-4 w-4 text-white/60" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-green-400" />
        Recent Activity
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedActivities.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white/10">
                {getIcon(item)}
              </div>
              <div>
                <p className="font-medium text-white text-sm">{item.title}</p>
                <p className="text-xs text-white/60">{item.details}</p>
                <p className="text-xs text-white/40" title={format(new Date(item.timestamp), 'PPP p')}>
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="text-right">
              {item.type === 'xp' && (
                <div className="text-sm font-bold text-blue-400">
                  +{formatXPValue(item.amount || 0)}
                </div>
              )}
              {item.type === 'progress' && item.isDone && (
                <div className={`text-sm font-bold ${item.grade && item.grade >= 1 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatGrade(item.grade)}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {sortedActivities.length === 0 && (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/60 text-sm">No recent activity found</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ActivityFeed
