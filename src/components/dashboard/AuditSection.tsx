import React from 'react'
import { motion } from 'framer-motion'
import { Award, TrendingUp, TrendingDown, Users } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { GET_USER_AUDITS, GET_AUDIT_STATS } from '../../graphql/coreQueries'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'

interface AuditSectionProps {
  user: User
}

const AuditSection: React.FC<AuditSectionProps> = ({ user }) => {
  const { data: auditsData, loading: auditsLoading } = useQuery(gql`
    query GetUserAudits($userId: Int!) {
      audit(
        where: { auditorId: { _eq: $userId } }
        order_by: { createdAt: desc }
        limit: 50
      ) {
        id
        grade
        createdAt
        group {
          id
          path
          object {
            name
            type
          }
        }
      }
    }
  `, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  const { data: statsData, loading: statsLoading } = useQuery(gql`
    query GetAuditStats($userId: Int!) {
      audits_given: audit_aggregate(
        where: { auditorId: { _eq: $userId } }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
      audits_received: audit_aggregate(
        where: {
          group: {
            captainId: { _eq: $userId }
          }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
    }
  `, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  const loading = auditsLoading || statsLoading

  if (loading) return <LoadingSpinner />

  const audits = auditsData?.audit || []
  const auditsGiven = statsData?.audits_given?.aggregate?.count || 0
  const auditsReceived = statsData?.audits_received?.aggregate?.count || 0
  const avgGradeGiven = statsData?.audits_given?.aggregate?.avg?.grade || 0
  const avgGradeReceived = statsData?.audits_received?.aggregate?.avg?.grade || 0

  // Calculate audit ratio (user preference: show ratio instead of given)
  const auditRatio = auditsReceived > 0 ? auditsGiven / auditsReceived : 0

  // Get performance level based on audit ratio
  const getPerformanceLevel = (ratio: number) => {
    if (ratio >= 1.5) return { level: 'Excellent', color: 'text-green-400', bgColor: 'bg-green-500/20' }
    if (ratio >= 1.0) return { level: 'Good', color: 'text-blue-400', bgColor: 'bg-blue-500/20' }
    if (ratio >= 0.8) return { level: 'Average', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' }
    return { level: 'Needs Improvement', color: 'text-red-400', bgColor: 'bg-red-500/20' }
  }

  const performance = getPerformanceLevel(auditRatio)

  return (
    <div className="space-y-6">
      {/* Audit Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Audit Ratio</p>
              <p className="text-3xl font-bold text-primary-400">{auditRatio.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${performance.bgColor} ${performance.color}`}>
            {performance.level}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Audits Given</p>
              <p className="text-3xl font-bold text-green-400">{auditsGiven}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Audits Received</p>
              <p className="text-3xl font-bold text-blue-400">{auditsReceived}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Avg Grade Given</p>
              <p className="text-3xl font-bold text-purple-400">{avgGradeGiven.toFixed(1)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Audit Ratio Visualization */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Audit Balance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Given</span>
            <span className="text-white/70">Received</span>
          </div>
          
          {/* Visual representation */}
          <div className="relative">
            <div className="flex h-8 bg-white/10 rounded-lg overflow-hidden">
              <motion.div
                className="bg-green-500 flex items-center justify-center text-white text-sm font-medium"
                initial={{ width: 0 }}
                animate={{ width: `${(auditsGiven / (auditsGiven + auditsReceived)) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {auditsGiven > 0 && <span>{auditsGiven}</span>}
              </motion.div>
              <motion.div
                className="bg-blue-500 flex items-center justify-center text-white text-sm font-medium"
                initial={{ width: 0 }}
                animate={{ width: `${(auditsReceived / (auditsGiven + auditsReceived)) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                {auditsReceived > 0 && <span>{auditsReceived}</span>}
              </motion.div>
            </div>
          </div>
          
          <div className="text-center text-white/60 text-sm">
            Ratio: {auditRatio.toFixed(2)} ({performance.level})
          </div>
        </div>
      </Card>

      {/* Recent Audits */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Audits</h3>
        <div className="space-y-3">
          {audits.length > 0 ? (
            audits.slice(0, 10).map((audit: any, index: number) => (
              <motion.div
                key={audit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">
                    {audit.group?.object?.name || 'Unknown Project'}
                  </p>
                  <p className="text-white/60 text-sm">
                    {new Date(audit.createdAt).toLocaleDateString()}
                  </p>
                  {audit.group?.path && (
                    <p className="text-white/50 text-xs">
                      Project: {audit.group.path.split('/').pop()}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-sm font-medium ${
                    audit.grade >= 1 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {audit.grade >= 1 ? 'PASS' : 'FAIL'}
                  </div>
                  <p className="text-white/60 text-xs mt-1">
                    Grade: {audit.grade.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-white/60 py-8">
              <Award className="w-12 h-12 mx-auto mb-4 text-white/30" />
              <p>No audit history available</p>
              <p className="text-sm mt-2">Start participating in peer reviews to see your audit activity here.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Audit Performance Tips */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Insights</h3>
        <div className="space-y-3">
          {auditRatio < 1.0 && (
            <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-200 text-sm">
                💡 <strong>Tip:</strong> Your audit ratio is below 1.0. Consider participating in more peer reviews to improve your standing.
              </p>
            </div>
          )}
          
          {avgGradeGiven > 0 && avgGradeGiven < 0.8 && (
            <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200 text-sm">
                📊 <strong>Insight:</strong> Your average grade given is {avgGradeGiven.toFixed(2)}. Consider being more thorough in your evaluations.
              </p>
            </div>
          )}
          
          {auditRatio >= 1.5 && (
            <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-200 text-sm">
                🌟 <strong>Excellent!</strong> You have an outstanding audit ratio of {auditRatio.toFixed(2)}. Keep up the great work!
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default AuditSection
