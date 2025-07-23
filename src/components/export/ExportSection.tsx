import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Database, BarChart3, Award, TrendingUp, CheckCircle } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { GET_USER_XP_TRANSACTIONS, GET_AUDITS_GIVEN, GET_AUDITS_RECEIVED, GET_USER_PROGRESS } from '../../graphql/queries'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import { 
  exportToJSON, 
  exportXPDataToCSV, 
  exportAuditDataToCSV, 
  exportProgressDataToCSV,
  exportStatsReport 
} from '../../utils/dataExport'

interface ExportSectionProps {
  user: User
}

const ExportSection: React.FC<ExportSectionProps> = ({ user }) => {
  const [exportStatus, setExportStatus] = useState<{ [key: string]: 'idle' | 'loading' | 'success' | 'error' }>({})

  // Fetch all user data for export
  const { data: xpData, loading: xpLoading } = useQuery(gql`
    query GetUserXPTransactions($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
        }
        order_by: { createdAt: desc }
      ) {
        id
        amount
        path
        createdAt
        object {
          name
          type
        }
      }
    }
  `, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  const { data: auditData, loading: auditLoading } = useQuery(gql`
    query GetUserAudits($userId: Int!) {
      audit(
        where: { auditorId: { _eq: $userId } }
        order_by: { createdAt: desc }
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

  const { data: progressData, loading: progressLoading } = useQuery(GET_USER_PROGRESS, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  const isLoading = xpLoading || auditLoading || progressLoading

  const setStatus = (key: string, status: 'idle' | 'loading' | 'success' | 'error') => {
    setExportStatus(prev => ({ ...prev, [key]: status }))
    if (status === 'success') {
      setTimeout(() => {
        setExportStatus(prev => ({ ...prev, [key]: 'idle' }))
      }, 3000)
    }
  }

  const handleExport = async (type: string, exportFunction: () => void) => {
    setStatus(type, 'loading')
    try {
      await exportFunction()
      setStatus(type, 'success')
    } catch (error) {
      console.error(`Export failed for ${type}:`, error)
      setStatus(type, 'error')
    }
  }

  const exportOptions = [
    {
      id: 'complete-json',
      title: 'Complete Profile Data',
      description: 'Export all your profile data in JSON format',
      icon: Database,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      action: () => exportToJSON({
        user,
        xpData: xpData?.transaction,
        auditData: auditData?.audit,
        progressData: progressData?.progress
      })
    },
    {
      id: 'xp-csv',
      title: 'XP Transactions',
      description: 'Export XP history as CSV spreadsheet',
      icon: TrendingUp,
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      action: () => exportXPDataToCSV(xpData?.transaction || [], user.login),
      disabled: !xpData?.transaction?.length
    },
    {
      id: 'audit-csv',
      title: 'Audit History',
      description: 'Export audit records as CSV spreadsheet',
      icon: Award,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      action: () => exportAuditDataToCSV(auditData?.audit || [], user.login),
      disabled: !auditData?.audit?.length
    },
    {
      id: 'progress-csv',
      title: 'Project Progress',
      description: 'Export project completion data as CSV',
      icon: BarChart3,
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      action: () => exportProgressDataToCSV(progressData?.progress || [], user.login),
      disabled: !progressData?.progress?.length
    },
    {
      id: 'stats-report',
      title: 'Performance Report',
      description: 'Generate comprehensive text report',
      icon: FileText,
      color: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      action: () => exportStatsReport({
        user,
        xpData: xpData?.transaction,
        auditData: auditData?.audit,
        progressData: progressData?.progress
      })
    }
  ]

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Download className="w-6 h-6 mr-2 text-primary-400" />
          Export Data
        </h2>
      </div>

      {/* Info Card */}
      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Data Export Options</h3>
            <p className="text-white/70 mb-4">
              Export your profile data in various formats for backup, analysis, or sharing. 
              All exports include only your personal data and maintain privacy standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-white/60">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Privacy Protected
              </div>
              <div className="flex items-center text-white/60">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Multiple Formats
              </div>
              <div className="flex items-center text-white/60">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Instant Download
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exportOptions.map((option, index) => {
          const Icon = option.icon
          const status = exportStatus[option.id] || 'idle'
          const isDisabled = option.disabled || isLoading

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 border transition-all ${
                isDisabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:border-white/30 cursor-pointer'
              } ${option.color}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {option.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4">
                        {option.description}
                      </p>
                      
                      {/* Data availability info */}
                      {option.id === 'xp-csv' && (
                        <p className="text-xs text-white/50">
                          {xpData?.transaction?.length || 0} XP transactions available
                        </p>
                      )}
                      {option.id === 'audit-csv' && (
                        <p className="text-xs text-white/50">
                          {auditData?.audit?.length || 0} audit records available
                        </p>
                      )}
                      {option.id === 'progress-csv' && (
                        <p className="text-xs text-white/50">
                          {progressData?.progress?.length || 0} progress entries available
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => !isDisabled && handleExport(option.id, option.action)}
                    disabled={isDisabled}
                    whileHover={!isDisabled ? { scale: 1.05 } : {}}
                    whileTap={!isDisabled ? { scale: 0.95 } : {}}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                      isDisabled
                        ? 'bg-white/10 text-white/50 cursor-not-allowed'
                        : status === 'loading'
                        ? 'bg-primary-500 text-white cursor-wait'
                        : status === 'success'
                        ? 'bg-green-500 text-white'
                        : status === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Exporting...
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Downloaded!
                      </>
                    ) : status === 'error' ? (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Retry
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </>
                    )}
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Usage Tips */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Export Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
          <div>
            <h4 className="font-medium text-white mb-2">JSON Format</h4>
            <p>Best for developers and complete data backup. Can be imported into other tools.</p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">CSV Format</h4>
            <p>Perfect for spreadsheet analysis in Excel, Google Sheets, or data visualization tools.</p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Text Report</h4>
            <p>Human-readable summary with insights and statistics. Great for sharing achievements.</p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Privacy Note</h4>
            <p>All exports contain only your personal data. No sensitive information is included.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ExportSection
