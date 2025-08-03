import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  Database,
  BarChart3,
  Award,
  TrendingUp,
  CheckCircle,
  Users,
  Calendar,
  Activity,
  Target,
  Settings,
  Zap,
  BookOpen,
  Filter,
  RefreshCw
} from 'lucide-react'
import { useQuery, useLazyQuery, gql } from '@apollo/client'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import { formatDate, formatXPValue } from '../../utils/dataFormatting'

interface ExportSectionProps {
  user: User
}

type ExportFormat = 'json' | 'csv' | 'txt'
type DataType = 'users' | 'objects' | 'events' | 'groups' | 'transactions' | 'progress' | 'audits' | 'results' | 'all'

const GET_ALL_USERS_EXPORT = gql`
  query GetAllUsersExport {
    user(order_by: { totalUp: desc }) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      createdAt
      updatedAt
    }
  }
`;

const GET_ALL_OBJECTS_EXPORT = gql`
  query GetAllObjectsExport {
    object(order_by: { createdAt: desc }) {
      id
      name
      type
      attrs
      createdAt
      campus
      authorId
    }
  }
`;

const GET_ALL_EVENTS_EXPORT = gql`
  query GetAllEventsExport {
    event(order_by: { createdAt: desc }) {
      id
      path
      campus
      createdAt
      endAt
      objectId
    }
  }
`;

const GET_ALL_GROUPS_EXPORT = gql`
  query GetAllGroupsExport {
    group(order_by: { createdAt: desc }) {
      id
      path
      campus
      createdAt
      updatedAt
      objectId
      eventId
    }
  }
`;

const GET_ALL_TRANSACTIONS_EXPORT = gql`
  query GetAllTransactionsExport {
    transaction(order_by: { createdAt: desc }) {
      id
      type
      amount
      createdAt
      path
      userId
      objectId
      eventId
      campus
    }
  }
`;

const GET_ALL_PROGRESS_EXPORT = gql`
  query GetAllProgressExport {
    progress(order_by: { createdAt: desc }) {
      id
      userId
      objectId
      grade
      path
      campus
      createdAt
      isDone
    }
  }
`;

const GET_ALL_AUDITS_EXPORT = gql`
  query GetAllAuditsExport {
    audit(order_by: { createdAt: desc }) {
      id
      auditorId
      groupId
      grade
      createdAt
      updatedAt
    }
  }
`;

const GET_ALL_RESULTS_EXPORT = gql`
  query GetAllResultsExport {
    result(order_by: { createdAt: desc }) {
      id
      userId
      objectId
      grade
      type
      path
      createdAt
    }
  }
`;

const ExportSection: React.FC<ExportSectionProps> = ({ user }) => {
  const [exportStatus, setExportStatus] = useState<{ [key: string]: 'idle' | 'loading' | 'success' | 'error' }>({})
  const [selectedDataType, setSelectedDataType] = useState<DataType>('users')
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json')
  const [includeMetadata, setIncludeMetadata] = useState(true)

  const [exportUsers] = useLazyQuery(GET_ALL_USERS_EXPORT, { errorPolicy: 'all' })
  const [exportObjects] = useLazyQuery(GET_ALL_OBJECTS_EXPORT, { errorPolicy: 'all' })
  const [exportEvents] = useLazyQuery(GET_ALL_EVENTS_EXPORT, { errorPolicy: 'all' })
  const [exportGroups] = useLazyQuery(GET_ALL_GROUPS_EXPORT, { errorPolicy: 'all' })
  const [exportTransactions] = useLazyQuery(GET_ALL_TRANSACTIONS_EXPORT, { errorPolicy: 'all' })
  const [exportProgress] = useLazyQuery(GET_ALL_PROGRESS_EXPORT, { errorPolicy: 'all' })
  const [exportAudits] = useLazyQuery(GET_ALL_AUDITS_EXPORT, { errorPolicy: 'all' })
  const [exportResults] = useLazyQuery(GET_ALL_RESULTS_EXPORT, { errorPolicy: 'all' })

  const { data: statsData, loading: statsLoading } = useQuery(gql`
    query GetExportStats {
      user_aggregate { aggregate { count } }
      object_aggregate { aggregate { count } }
      event_aggregate { aggregate { count } }
      group_aggregate { aggregate { count } }
      transaction_aggregate { aggregate { count } }
      progress_aggregate { aggregate { count } }
      audit_aggregate { aggregate { count } }
      result_aggregate { aggregate { count } }
    }
  `, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  if (statsLoading) {
    return <LoadingSpinner />
  }

  // Get statistics for display
  const stats = statsData || {}
  const userCount = stats.user_aggregate?.aggregate?.count || 0
  const objectCount = stats.object_aggregate?.aggregate?.count || 0
  const eventCount = stats.event_aggregate?.aggregate?.count || 0
  const groupCount = stats.group_aggregate?.aggregate?.count || 0
  const transactionCount = stats.transaction_aggregate?.aggregate?.count || 0
  const progressCount = stats.progress_aggregate?.aggregate?.count || 0
  const auditCount = stats.audit_aggregate?.aggregate?.count || 0
  const resultCount = stats.result_aggregate?.aggregate?.count || 0

  const setStatus = (key: string, status: 'idle' | 'loading' | 'success' | 'error') => {
    setExportStatus(prev => ({ ...prev, [key]: status }))
    if (status === 'success') {
      setTimeout(() => {
        setExportStatus(prev => ({ ...prev, [key]: 'idle' }))
      }, 3000)
    }
  }

  // Export utility functions
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const formatDataForExport = (data: any[], dataType: DataType, format: ExportFormat) => {
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${dataType}_export_${timestamp}`

    if (format === 'json') {
      const exportData = {
        ...(includeMetadata && {
          metadata: {
            exportDate: new Date().toISOString(),
            dataType,
            recordCount: data.length,
            exportedBy: user.login
          }
        }),
        data
      }
      return {
        content: JSON.stringify(exportData, null, 2),
        filename: `${filename}.json`,
        type: 'application/json'
      }
    }

    if (format === 'csv') {
      if (data.length === 0) {
        return {
          content: 'No data available',
          filename: `${filename}.csv`,
          type: 'text/csv'
        }
      }

      const headers = Object.keys(data[0]).join(',')
      const rows = data.map(item =>
        Object.values(item).map(value =>
          typeof value === 'string' && value.includes(',')
            ? `"${value}"`
            : value
        ).join(',')
      )

      const csvContent = [
        ...(includeMetadata ? [
          `# Export Date: ${new Date().toISOString()}`,
          `# Data Type: ${dataType}`,
          `# Record Count: ${data.length}`,
          `# Exported By: ${user.login}`,
          ''
        ] : []),
        headers,
        ...rows
      ].join('\n')

      return {
        content: csvContent,
        filename: `${filename}.csv`,
        type: 'text/csv'
      }
    }

    if (format === 'txt') {
      const txtContent = [
        ...(includeMetadata ? [
          `Export Date: ${new Date().toISOString()}`,
          `Data Type: ${dataType}`,
          `Record Count: ${data.length}`,
          `Exported By: ${user.login}`,
          '=' .repeat(50),
          ''
        ] : []),
        ...data.map((item, index) => [
          `Record ${index + 1}:`,
          ...Object.entries(item).map(([key, value]) => `  ${key}: ${value}`),
          ''
        ].join('\n'))
      ].join('\n')

      return {
        content: txtContent,
        filename: `${filename}.txt`,
        type: 'text/plain'
      }
    }

    return { content: '', filename: '', type: '' }
  }

  // Handle complete data export
  const handleExport = async (dataType: DataType) => {
    const exportKey = `${dataType}_${selectedFormat}`
    setStatus(exportKey, 'loading')

    try {
      let queryResult

      switch (dataType) {
        case 'users':
          queryResult = await exportUsers()
          break
        case 'objects':
          queryResult = await exportObjects()
          break
        case 'events':
          queryResult = await exportEvents()
          break
        case 'groups':
          queryResult = await exportGroups()
          break
        case 'transactions':
          queryResult = await exportTransactions()
          break
        case 'progress':
          queryResult = await exportProgress()
          break
        case 'audits':
          queryResult = await exportAudits()
          break
        case 'results':
          queryResult = await exportResults()
          break
        case 'all':
          // Export all data types
          const allQueries = await Promise.all([
            exportUsers(),
            exportObjects(),
            exportEvents(),
            exportGroups(),
            exportTransactions(),
            exportProgress(),
            exportAudits(),
            exportResults()
          ])

          const allData = {
            users: allQueries[0]?.data?.user || [],
            objects: allQueries[1]?.data?.object || [],
            events: allQueries[2]?.data?.event || [],
            groups: allQueries[3]?.data?.group || [],
            transactions: allQueries[4]?.data?.transaction || [],
            progress: allQueries[5]?.data?.progress || [],
            audits: allQueries[6]?.data?.audit || [],
            results: allQueries[7]?.data?.result || []
          }

          const { content, filename, type } = formatDataForExport([allData], 'all', selectedFormat)
          downloadFile(content, filename, type)
          setStatus(exportKey, 'success')
          return
        default:
          throw new Error('Invalid data type')
      }

      if (queryResult?.error) {
        throw queryResult.error
      }

      const data = queryResult?.data?.[dataType] || []
      const { content, filename, type } = formatDataForExport(data, dataType, selectedFormat)
      downloadFile(content, filename, type)
      setStatus(exportKey, 'success')
    } catch (error) {
      setStatus(exportKey, 'error')
    }
  }

  // Data type options with statistics
  const dataTypeOptions = [
    { id: 'users' as DataType, label: 'Users', icon: Users, count: userCount, description: 'All platform users with profiles and statistics' },
    { id: 'objects' as DataType, label: 'Learning Objects', icon: Database, count: objectCount, description: 'Curriculum objects, projects, and learning materials' },
    { id: 'events' as DataType, label: 'Events', icon: Calendar, count: eventCount, description: 'Platform events and activities' },
    { id: 'groups' as DataType, label: 'Groups', icon: Users, count: groupCount, description: 'User groups and team formations' },
    { id: 'transactions' as DataType, label: 'Transactions', icon: Activity, count: transactionCount, description: 'All platform transactions including XP, up/down votes' },
    { id: 'progress' as DataType, label: 'Progress', icon: Target, count: progressCount, description: 'User learning progress and completion records' },
    { id: 'audits' as DataType, label: 'Audits', icon: Award, count: auditCount, description: 'Peer review and audit records' },
    { id: 'results' as DataType, label: 'Results', icon: TrendingUp, count: resultCount, description: 'Assessment results and grades' },
    { id: 'all' as DataType, label: 'Complete Dataset', icon: Database, count: userCount + objectCount + eventCount + groupCount + transactionCount + progressCount + auditCount + resultCount, description: 'Export all data types in a single file' }
  ]

  // Format options
  const formatOptions = [
    { id: 'json' as ExportFormat, label: 'JSON', icon: FileText, description: 'Structured data format, ideal for developers' },
    { id: 'csv' as ExportFormat, label: 'CSV', icon: BarChart3, description: 'Spreadsheet format, ideal for analysis' },
    { id: 'txt' as ExportFormat, label: 'Text', icon: FileText, description: 'Human-readable format, ideal for reports' }
  ]

  return (
    <div className="bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 h-full w-full relative">
      {/* Full Screen Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(34, 197, 94, 0.1) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      <div className="relative z-10 h-full w-full overflow-y-auto">
        
        <div className="relative space-y-8 p-6">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4">
              <Download className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent">
              Data Export Center
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Export comprehensive datasets from <span className="text-green-400 font-semibold">{(userCount + objectCount + eventCount + groupCount + transactionCount + progressCount + auditCount + resultCount).toLocaleString()}</span> total records
            </p>
          </motion.div>

          {/* Enhanced Statistics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6"
          >
            <StatCard 
              icon={Users} 
              title="Users" 
              value={userCount.toLocaleString()} 
              color="bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
              bgGradient="bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
              subValue="Student profiles"
            />

            <StatCard 
              icon={Database} 
              title="Learning Objects" 
              value={objectCount.toLocaleString()} 
              color="bg-gradient-to-r from-purple-500/30 to-violet-500/30"
              bgGradient="bg-gradient-to-br from-purple-900/20 to-violet-900/20"
              subValue="Curriculum items"
            />

            <StatCard 
              icon={Calendar} 
              title="Events" 
              value={eventCount.toLocaleString()} 
              color="bg-gradient-to-r from-orange-500/30 to-red-500/30"
              bgGradient="bg-gradient-to-br from-orange-900/20 to-red-900/20"
              subValue="Platform activities"
            />

            <StatCard 
              icon={Users} 
              title="Groups" 
              value={groupCount.toLocaleString()} 
              color="bg-gradient-to-r from-emerald-500/30 to-teal-500/30"
              bgGradient="bg-gradient-to-br from-emerald-900/20 to-teal-900/20"
              subValue="Team formations"
            />

            <StatCard 
              icon={Activity} 
              title="Transactions" 
              value={transactionCount.toLocaleString()} 
              color="bg-gradient-to-r from-yellow-500/30 to-amber-500/30"
              bgGradient="bg-gradient-to-br from-yellow-900/20 to-amber-900/20"
              subValue="XP & interactions"
            />

            <StatCard 
              icon={Target} 
              title="Progress Records" 
              value={progressCount.toLocaleString()} 
              color="bg-gradient-to-r from-pink-500/30 to-rose-500/30"
              bgGradient="bg-gradient-to-br from-pink-900/20 to-rose-900/20"
              subValue="Learning progress"
            />

            <StatCard 
              icon={Award} 
              title="Audits" 
              value={auditCount.toLocaleString()} 
              color="bg-gradient-to-r from-indigo-500/30 to-purple-500/30"
              bgGradient="bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
              subValue="Peer reviews"
            />

            <StatCard 
              icon={TrendingUp} 
              title="Results" 
              value={resultCount.toLocaleString()} 
              color="bg-gradient-to-r from-green-500/30 to-emerald-500/30"
              bgGradient="bg-gradient-to-br from-green-900/20 to-emerald-900/20"
              subValue="Assessment data"
            />
          </motion.div>

      {/* Export Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Data Type Selection */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2 text-green-400" />
            Select Data Type
          </h3>
          <div className="space-y-3">
            {dataTypeOptions.map((option) => {
              const Icon = option.icon
              const isSelected = selectedDataType === option.id

              return (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedDataType(option.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="font-medium">{option.label}</p>
                        <p className="text-sm text-white/60">{option.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-400">
                        {option.count.toLocaleString()}
                      </p>
                      <p className="text-xs text-white/60">records</p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Format Selection */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-400" />
            Export Format
          </h3>
          <div className="space-y-3 mb-6">
            {formatOptions.map((format) => {
              const Icon = format.icon
              const isSelected = selectedFormat === format.id

              return (
                <motion.button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium">{format.label}</p>
                      <p className="text-sm text-white/60">{format.description}</p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="includeMetadata"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e.target.checked)}
                className="w-4 h-4 text-primary-500 bg-white/10 border-white/20 rounded focus:ring-primary-500"
              />
              <label htmlFor="includeMetadata" className="text-white/80 text-sm">
                Include export metadata (date, user, record count)
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Export Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-lg">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Ready to Export {getDataTypeLabel(selectedDataType)}?
            </h3>
            <p className="text-white/70 mb-6">
              Export <span className="text-green-400 font-semibold">{getDataTypeCount(selectedDataType).toLocaleString()}</span> records in {selectedFormat.toUpperCase()} format
            </p>

            <motion.button
              onClick={() => handleExport(selectedDataType)}
              disabled={exportStatus[`${selectedDataType}_${selectedFormat}`] === 'loading'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center mx-auto shadow-lg ${
                exportStatus[`${selectedDataType}_${selectedFormat}`] === 'loading'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white cursor-wait'
                  : exportStatus[`${selectedDataType}_${selectedFormat}`] === 'success'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : exportStatus[`${selectedDataType}_${selectedFormat}`] === 'error'
                  ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-500/25'
              }`}
            >
              {exportStatus[`${selectedDataType}_${selectedFormat}`] === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Exporting...
                </>
              ) : exportStatus[`${selectedDataType}_${selectedFormat}`] === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Export Complete!
                </>
              ) : exportStatus[`${selectedDataType}_${selectedFormat}`] === 'error' ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-3" />
                  Retry Export
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-3" />
                  Start Export
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Usage Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-400" />
            Export Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/70">
            <div>
              <h4 className="font-medium text-white mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-400" />
                JSON Format
              </h4>
              <p>Structured data format perfect for developers, APIs, and data backup. Preserves all data types and relationships.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-green-400" />
                CSV Format
              </h4>
              <p>Spreadsheet-compatible format ideal for data analysis, Excel, Google Sheets, and business intelligence tools.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-400" />
                Text Format
              </h4>
              <p>Human-readable format perfect for reports, documentation, and sharing insights with stakeholders.</p>
            </div>
          </div>
        </div>
      </motion.div>
        </div>
      </div>
    </div>
  )

  // Helper functions
  function getDataTypeLabel(dataType: DataType): string {
    return dataTypeOptions.find(option => option.id === dataType)?.label || 'Data'
  }

  function getDataTypeCount(dataType: DataType): number {
    return dataTypeOptions.find(option => option.id === dataType)?.count || 0
  }
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

export default ExportSection
