import React from 'react'
import { motion } from 'framer-motion'
import { useQuery, gql } from '@apollo/client'
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import XPProgressionChart from '../charts/XPProgressionChart'
import AuditPerformanceChart from '../charts/AuditPerformanceChart'
import SkillsRadarChart from '../charts/SkillsRadarChart'

interface SkillRadarData {
  skill: string
  level: number
  maxLevel: number
  category: string
  projects?: number
}

interface AnalyticsDashboardProps {
  user: User
}

const GET_ANALYTICS_DATA = gql`
  query GetAnalyticsData($userId: Int!) {
    # XP progression data
    xp_progression: transaction(
      where: { 
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        path: { _nregex: "piscine" }
      }
      order_by: { createdAt: asc }
    ) {
      amount
      createdAt
      object {
        name
        type
      }
    }
    
    # Skills data
    skills: transaction(
      where: { 
        userId: { _eq: $userId }
        type: { _regex: "skill_" }
      }
      order_by: { amount: desc }
    ) {
      type
      amount
    }
    
    # Audit data for trends (completed audits only)
    audits_given: audit(
      where: { auditorId: { _eq: $userId }, grade: { _is_null: false } }
      order_by: { createdAt: asc }
    ) {
      grade
      createdAt
    }
    
    audits_received: audit(
      where: { group: { captainId: { _eq: $userId } }, grade: { _is_null: false } }
      order_by: { createdAt: asc }
      limit: 50
    ) {
      grade
      createdAt
    }
  }
`

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ user }) => {
  const { data, loading, error } = useQuery(GET_ANALYTICS_DATA, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-400">Error loading analytics data</div>

  
  const xpProgression = data?.xp_progression || []
  let cumulativeXP = 0
  const xpProgressionData = xpProgression.map((transaction: any) => {
    cumulativeXP += transaction.amount
    return {
      date: transaction.createdAt,
      xp: transaction.amount,
      cumulativeXP,
      project: transaction.object?.name,
      type: transaction.object?.type
    }
  })

  
  const skillsData = data?.skills || []
  const processedSkills = skillsData.reduce((acc: Record<string, SkillRadarData>, skill: any) => {
    const skillName = skill.type.replace('skill_', '')
    if (!acc[skillName]) {
      acc[skillName] = { skill: skillName, level: 0, maxLevel: 100, category: 'technical' }
    }
    acc[skillName].level += skill.amount
    return acc
  }, {})
  const skillsArray: SkillRadarData[] = (Object.values(processedSkills) as SkillRadarData[]).slice(0, 8) 

  
  const fallbackSkills: SkillRadarData[] = [
    { skill: 'JavaScript', level: 75, maxLevel: 100, category: 'technical' },
    { skill: 'Go', level: 60, maxLevel: 100, category: 'technical' },
    { skill: 'Algorithms', level: 80, maxLevel: 100, category: 'technical' },
    { skill: 'Problem Solving', level: 85, maxLevel: 100, category: 'soft' },
    { skill: 'Git', level: 70, maxLevel: 100, category: 'technical' },
    { skill: 'Linux', level: 65, maxLevel: 100, category: 'technical' }
  ]

  const finalSkillsArray: SkillRadarData[] = skillsArray.length > 0 ? skillsArray : fallbackSkills

  
  const auditsGiven = data?.audits_given || []
  const auditsReceived = data?.audits_received || []
  
  const monthlyAudits = auditsGiven.reduce((acc: any, audit: any) => {
    const month = new Date(audit.createdAt).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    if (!acc[month]) {
      acc[month] = { month, auditsGiven: 0, auditsReceived: 0, totalGradeGiven: 0, totalGradeReceived: 0 }
    }
    acc[month].auditsGiven++
    acc[month].totalGradeGiven += audit.grade
    return acc
  }, {})

  auditsReceived.forEach((audit: any) => {
    const month = new Date(audit.createdAt).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    if (!monthlyAudits[month]) {
      monthlyAudits[month] = { month, auditsGiven: 0, auditsReceived: 0, totalGradeGiven: 0, totalGradeReceived: 0 }
    }
    monthlyAudits[month].auditsReceived++
    monthlyAudits[month].totalGradeReceived += audit.grade
  })

  const auditPerformanceData = Object.values(monthlyAudits).map((month: any) => ({
    ...month,
    avgGradeGiven: month.auditsGiven > 0 ? month.totalGradeGiven / month.auditsGiven : 0,
    avgGradeReceived: month.auditsReceived > 0 ? month.totalGradeReceived / month.auditsReceived : 0,
    ratio: month.auditsReceived > 0 ? month.auditsGiven / month.auditsReceived : 0
  })).slice(-6) 

  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-white/70 text-lg">
          Deep insights into your learning journey and performance
        </p>
      </motion.div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Total Data Points</p>
              <p className="text-3xl font-bold text-blue-400">{xpProgressionData.length}</p>
              <p className="text-white/50 text-xs mt-1">XP transactions analyzed</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Growth Trend</p>
              <p className="text-3xl font-bold text-green-400">
                {xpProgressionData.length > 1 ? '+' : ''}
                {xpProgressionData.length > 1 
                  ? Math.round(((xpProgressionData[xpProgressionData.length - 1]?.cumulativeXP || 0) / 1000))
                  : 0
                }kB
              </p>
              <p className="text-white/50 text-xs mt-1">Current XP level</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Skills Tracked</p>
              <p className="text-3xl font-bold text-purple-400">{finalSkillsArray.length}</p>
              <p className="text-white/50 text-xs mt-1">Technical competencies</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">Analysis Period</p>
              <p className="text-3xl font-bold text-yellow-400">{auditPerformanceData.length}</p>
              <p className="text-white/50 text-xs mt-1">Months of data</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* XP Progression Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6">
            <XPProgressionChart data={xpProgressionData} width={700} height={350} />
          </Card>
        </motion.div>

        {/* Skills Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6">
            <SkillsRadarChart data={finalSkillsArray} size={350} />
          </Card>
        </motion.div>
      </div>

      {/* Audit Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="p-6">
          <AuditPerformanceChart data={auditPerformanceData} width={800} height={350} />
        </Card>
      </motion.div>
    </div>
  )
}

export default AnalyticsDashboard
