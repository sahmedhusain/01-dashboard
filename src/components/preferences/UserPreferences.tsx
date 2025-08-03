import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Palette, Save, RotateCcw, RefreshCw, Database, GripVertical, ArrowUp, ArrowDown, Download, FileText, BarChart3, Users, Calendar, Activity, Target, CheckCircle, Award, TrendingUp, Lock } from 'lucide-react'
import { useQuery, useLazyQuery, gql } from '@apollo/client'
import { useUser } from '../../contexts/UserContext'
import Card from '../ui/Card'
import RefreshControl from '../ui/RefreshControl'

const GET_ALL_USERS_EXPORT = gql`
  query Users {
    event_user(
      order_by: { createdAt: desc }
      where: { 
        event: { 
          path: { _like: "/bahrain%" }
        },
      }
    ) {
      userLogin
      userName
      createdAt
      userAuditRatio
      level
      event {
        campus
      }
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

const GET_EXPORT_STATS = gql`
  query GetExportStats {
    event_user_aggregate(
      where: { 
        event: { 
          path: { _like: "/bahrain%" }
        }
      }
    ) { aggregate { count } }
    object_aggregate { aggregate { count } }
    event_aggregate { aggregate { count } }
    group_aggregate { aggregate { count } }
    transaction_aggregate { aggregate { count } }
    progress_aggregate { aggregate { count } }
    audit_aggregate { aggregate { count } }
    result_aggregate { aggregate { count } }
  }
`;

interface UserPreferencesProps {
  userId: number
  onClose: () => void
  defaultTabs?: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }>
}

interface Preferences {
  theme: 'dark' | 'light' | 'auto'
  dashboard: {
    defaultTab: string
    tabOrder: string[]
  }
}

const defaultPreferences: Preferences = {
  theme: 'dark',
  dashboard: {
    defaultTab: 'dashboard',
    tabOrder: ['dashboard', 'piscines', 'leaderboard', 'groups', 'audits', 'checkpoints', 'events', 'subjects']
  }
}

type ExportDataType = 'users' | 'objects' | 'events' | 'groups' | 'transactions' | 'progress' | 'audits' | 'results' | 'all'
type ExportFormat = 'json' | 'csv' | 'txt'
type ExportStatus = 'idle' | 'loading' | 'success' | 'error'

const encryptData = (data: string, password: string): string => {
  
  const encoder = new TextEncoder()
  const dataBytes = encoder.encode(data)
  const passwordBytes = encoder.encode(password)
  
  
  const keyPattern = new Uint8Array(dataBytes.length)
  for (let i = 0; i < dataBytes.length; i++) {
    keyPattern[i] = passwordBytes[i % passwordBytes.length]
  }
  
  
  const encrypted = new Uint8Array(dataBytes.length)
  for (let i = 0; i < dataBytes.length; i++) {
    encrypted[i] = dataBytes[i] ^ keyPattern[i]
  }
  
  
  let binary = ''
  for (let i = 0; i < encrypted.length; i++) {
    binary += String.fromCharCode(encrypted[i])
  }
  
  return btoa(binary)
}


const createProtectedContent = (content: string, password: string, format: string, dataType: string): string => {
  const encryptedContent = encryptData(content, password)
  const timestamp = new Date().toISOString()
  
  const protectedFile = {
    _encrypted: true,
    _format: format,
    _dataType: dataType,
    _timestamp: timestamp,
    _instructions: {
      message: "This file is password protected. Use the decryption tool with your credentials.",
      decryption: "To decrypt: 1) Use your credential 2) Apply XOR decryption with base64 encoding 3) Parse the resulting content"
    },
    _encryptedData: encryptedContent
  }
  
  return JSON.stringify(protectedFile, null, 2)
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ userId, onClose, defaultTabs = [] }) => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences)
  const [hasChanges, setHasChanges] = useState(false)
  const [activeSection, setActiveSection] = useState<'appearance' | 'dashboard' | 'data' | 'export'>('appearance')
  const [exportStatus, setExportStatus] = useState<{ [key: string]: 'idle' | 'loading' | 'success' | 'error' }>({})
  const [selectedDataType, setSelectedDataType] = useState<'users' | 'objects' | 'events' | 'groups' | 'transactions' | 'progress' | 'audits' | 'results' | 'all'>('users')
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv' | 'txt'>('json')
  const [includeMetadata, setIncludeMetadata] = useState(true)

  
  const { user: currentUser } = useUser()

  
  useEffect(() => {
    const saved = localStorage.getItem(`user-preferences-${userId}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPreferences({ ...defaultPreferences, ...parsed })
      } catch (error) {
      }
    }
  }, [userId])

  
  const { data: statsData } = useQuery(GET_EXPORT_STATS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  })

  const [exportUsers] = useLazyQuery(GET_ALL_USERS_EXPORT, { errorPolicy: 'all' })
  const [exportObjects] = useLazyQuery(GET_ALL_OBJECTS_EXPORT, { errorPolicy: 'all' })
  const [exportEvents] = useLazyQuery(GET_ALL_EVENTS_EXPORT, { errorPolicy: 'all' })
  const [exportGroups] = useLazyQuery(GET_ALL_GROUPS_EXPORT, { errorPolicy: 'all' })
  const [exportTransactions] = useLazyQuery(GET_ALL_TRANSACTIONS_EXPORT, { errorPolicy: 'all' })
  const [exportProgress] = useLazyQuery(GET_ALL_PROGRESS_EXPORT, { errorPolicy: 'all' })
  const [exportAudits] = useLazyQuery(GET_ALL_AUDITS_EXPORT, { errorPolicy: 'all' })
  const [exportResults] = useLazyQuery(GET_ALL_RESULTS_EXPORT, { errorPolicy: 'all' })

  const updatePreference = (section: keyof Preferences, key: string, value: string | boolean | string[]) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, unknown>),
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  const savePreferences = () => {
    localStorage.setItem(`user-preferences-${userId}`, JSON.stringify(preferences))
    setHasChanges(false)
    
  }

  const resetPreferences = () => {
    setPreferences(defaultPreferences)
    setHasChanges(true)
  }

  const moveTab = (fromIndex: number, toIndex: number) => {
    const newTabOrder = [...preferences.dashboard.tabOrder]
    const [movedTab] = newTabOrder.splice(fromIndex, 1)
    newTabOrder.splice(toIndex, 0, movedTab)
    
    updatePreference('dashboard', 'tabOrder', newTabOrder)
  }

  const resetTabOrder = () => {
    updatePreference('dashboard', 'tabOrder', defaultPreferences.dashboard.tabOrder)
  }

  
  const setStatus = (key: string, status: 'idle' | 'loading' | 'success' | 'error') => {
    setExportStatus(prev => ({ ...prev, [key]: status }))
  }

  const formatDataForExport = (data: Record<string, unknown>[], dataType: string, format: 'json' | 'csv' | 'txt') => {
    if (!data || data.length === 0) return ''

    const exportData = includeMetadata 
      ? {
          metadata: {
            exportedAt: new Date().toISOString(),
            dataType,
            format,
            recordCount: data.length,
            exportedBy: userId
          },
          data
        }
      : data

    switch (format) {
      case 'json':
        return JSON.stringify(exportData, null, 2)
      case 'csv': {
        if (data.length === 0) return ''
        const headers = Object.keys(data[0]).join(',')
        const rows = data.map(item => 
          Object.values(item).map(value => 
            typeof value === 'string' && value.includes(',') 
              ? `"${value.replace(/"/g, '""')}"` 
              : value
          ).join(',')
        )
        return includeMetadata 
          ? `# Exported on ${new Date().toISOString()}\n# Data type: ${dataType}\n# Records: ${data.length}\n${headers}\n${rows.join('\n')}`
          : `${headers}\n${rows.join('\n')}`
      }
      case 'txt': {
        const txtContent = data.map(item => 
          Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('\n')
        ).join('\n---\n')
        return includeMetadata 
          ? `Export Date: ${new Date().toISOString()}\nData Type: ${dataType}\nTotal Records: ${data.length}\nExported By: User ${userId}\n\n---\n${txtContent}`
          : txtContent
      }
      default:
        return JSON.stringify(exportData, null, 2)
    }
  }

  const downloadFile = (content: string, filename: string, format: 'json' | 'csv' | 'txt', dataType: string) => {
    
    if (!currentUser?.login) {
      return
    }

    
    const protectedContent = createProtectedContent(content, currentUser.login, format, dataType)
    
    
    const mimeTypes = {
      json: 'application/json',
      csv: 'text/csv',
      txt: 'text/plain'
    }
    
    const fileExtensions = {
      json: 'protected.json',
      csv: 'protected.csv',
      txt: 'protected.txt'
    }
    
    const mimeType = mimeTypes[format]
    const fileExtension = fileExtensions[format]
    
    const blob = new Blob([protectedContent], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.${fileExtension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const performExport = async (dataType: 'users' | 'objects' | 'events' | 'groups' | 'transactions' | 'progress' | 'audits' | 'results' | 'all') => {
    const exportKey = `${dataType}-${selectedFormat}`
    setStatus(exportKey, 'loading')

    try {
      const queries = {
        users: exportUsers,
        objects: exportObjects,
        events: exportEvents,
        groups: exportGroups,
        transactions: exportTransactions,
        progress: exportProgress,
        audits: exportAudits,
        results: exportResults
      }

      if (dataType === 'all') {
        
        const allPromises = Object.entries(queries).map(async ([key, queryFn]) => {
          const result = await queryFn()
          const dataKey = key === 'users' ? 'event_user' : 
                         key === 'objects' ? 'object' :
                         key === 'events' ? 'event' :
                         key === 'groups' ? 'group' :
                         key === 'transactions' ? 'transaction' :
                         key === 'progress' ? 'progress' :
                         key === 'audits' ? 'audit' :
                         'result'
          return { [key]: result.data?.[dataKey] || [] }
        })

        const allResults = await Promise.all(allPromises)
        const combinedData = Object.assign({}, ...allResults)
        
        const content = formatDataForExport([combinedData], 'all', selectedFormat)
        const timestamp = new Date().toISOString().split('T')[0]
        downloadFile(content, `reboot01_all_data_${timestamp}`, selectedFormat, 'all')
      } else {
        
        const queryFn = queries[dataType]
        const result = await queryFn()
        
        const dataKey = dataType === 'users' ? 'event_user' : 
                       dataType === 'objects' ? 'object' :
                       dataType === 'events' ? 'event' :
                       dataType === 'groups' ? 'group' :
                       dataType === 'transactions' ? 'transaction' :
                       dataType === 'progress' ? 'progress' :
                       dataType === 'audits' ? 'audit' :
                       'result'
        
        const data = result.data?.[dataKey] || []
        const content = formatDataForExport(data, dataType, selectedFormat)
        const timestamp = new Date().toISOString().split('T')[0]
        downloadFile(content, `reboot01_${dataType}_${timestamp}`, selectedFormat, dataType)
      }

      setStatus(exportKey, 'success')
      setTimeout(() => setStatus(exportKey, 'idle'), 3000)
    } catch (error) {
      setStatus(exportKey, 'error')
      setTimeout(() => setStatus(exportKey, 'idle'), 5000)
    }
  }

  const sections = [
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'dashboard' as const, label: 'Dashboard', icon: Settings },
    { id: 'data' as const, label: 'Data Refresh', icon: Database },
    { id: 'export' as const, label: 'Data Export', icon: Download }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">User Preferences</h2>
              <p className="text-white/60 mt-1">Customize your dashboard experience</p>
            </div>
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={savePreferences}
                  className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </motion.button>
              )}
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900/50 border-r border-gray-700 p-4">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                const isActive = activeSection === section.id
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {section.label}
                  </button>
                )
              })}
            </nav>

            <div className="mt-8 pt-4 border-t border-gray-700">
              <button
                onClick={resetPreferences}
                className="w-full flex items-center px-3 py-2 text-white/60 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-3" />
                Reset to Defaults
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Appearance Settings</h3>
                
                <Card className="p-4">
                  <label className="block text-white font-medium mb-3">Theme</label>
                  <div className="space-y-2">
                    {(['dark', 'light', 'auto'] as const).map((theme) => (
                      <label key={theme} className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value={theme}
                          checked={preferences.theme === theme}
                          onChange={(e) => updatePreference('theme', 'theme', e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-white/80 capitalize">{theme}</span>
                      </label>
                    ))}
                  </div>
                </Card>
              </div>
            )}



            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Dashboard Settings</h3>
                
                <Card className="p-4">
                  <div className="space-y-4">
                    {Object.entries(preferences.dashboard).map(([key, value]) => {
                      if (key === 'defaultTab') {
                        return (
                          <div key={key}>
                            <label className="block text-white/80 mb-2">Default Tab</label>
                            <select
                              value={value as string}
                              onChange={(e) => updatePreference('dashboard', key, e.target.value)}
                              className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            >
                              <option value="dashboard">Dashboard</option>
                              <option value="piscines">Piscines</option>
                              <option value="leaderboard">Leaderboard</option>
                              <option value="groups">Groups</option>
                              <option value="audits">Audits</option>
                              <option value="checkpoints">Checkpoints</option>
                              <option value="events">Events</option>
                              <option value="subjects">Subjects</option>
                            </select>
                          </div>
                        )
                      }
                      
                      if (key === 'tabOrder') {
                        return (
                          <div key={key}>
                            <div className="flex items-center justify-between mb-3">
                              <label className="block text-white/80">Tab Order</label>
                              <button
                                onClick={resetTabOrder}
                                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                Reset to Default
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(value as string[]).map((tabId, index) => {
                                const tab = defaultTabs.find(t => t.id === tabId)
                                if (!tab) return null
                                const Icon = tab.icon
                                
                                return (
                                  <div key={tabId} className="flex items-center bg-gray-700/50 rounded px-3 py-2">
                                    <GripVertical className="w-4 h-4 text-white/40 mr-2" />
                                    <Icon className="w-4 h-4 text-white/60 mr-2" />
                                    <span className="text-white/80 flex-1">{tab.label}</span>
                                    <div className="flex space-x-1">
                                      <button
                                        onClick={() => index > 0 && moveTab(index, index - 1)}
                                        disabled={index === 0}
                                        className="p-1 text-white/40 hover:text-white/60 disabled:opacity-30 disabled:cursor-not-allowed"
                                      >
                                        <ArrowUp className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() => index < (value as string[]).length - 1 && moveTab(index, index + 1)}
                                        disabled={index === (value as string[]).length - 1}
                                        className="p-1 text-white/40 hover:text-white/60 disabled:opacity-30 disabled:cursor-not-allowed"
                                      >
                                        <ArrowDown className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      }
                      
                      return null 
                    })}
                  </div>
                </Card>
              </div>
            )}

            {activeSection === 'data' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Data Refresh Settings</h3>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/70 text-sm mb-4">
                    Manage data refresh settings, cache, and synchronization options.
                  </p>
                  <RefreshControl showStats={true} showAutoRefreshToggle={true} />
                </div>
              </div>
            )}

            {activeSection === 'export' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Data Export</h3>
                <p className="text-white/60">Export comprehensive data from the platform in various formats</p>

                {/* Export Statistics */}
                {statsData && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { icon: Users, label: 'Users', count: statsData.event_user_aggregate?.aggregate?.count || 0, color: 'bg-blue-500/20 text-blue-400' },
                      { icon: FileText, label: 'Objects', count: statsData.object_aggregate?.aggregate?.count || 0, color: 'bg-green-500/20 text-green-400' },
                      { icon: Calendar, label: 'Events', count: statsData.event_aggregate?.aggregate?.count || 0, color: 'bg-orange-500/20 text-orange-400' },
                      { icon: Users, label: 'Groups', count: statsData.group_aggregate?.aggregate?.count || 0, color: 'bg-purple-500/20 text-purple-400' },
                      { icon: Activity, label: 'Transactions', count: statsData.transaction_aggregate?.aggregate?.count || 0, color: 'bg-indigo-500/20 text-indigo-400' },
                      { icon: Target, label: 'Progress', count: statsData.progress_aggregate?.aggregate?.count || 0, color: 'bg-pink-500/20 text-pink-400' },
                      { icon: CheckCircle, label: 'Audits', count: statsData.audit_aggregate?.aggregate?.count || 0, color: 'bg-yellow-500/20 text-yellow-400' },
                      { icon: Award, label: 'Results', count: statsData.result_aggregate?.aggregate?.count || 0, color: 'bg-red-500/20 text-red-400' }
                    ].map(({ icon: Icon, label, count, color }) => (
                      <div key={label} className={`${color} rounded-lg p-3 border border-current border-opacity-30`}>
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{label}</span>
                        </div>
                        <div className="text-lg font-bold mt-1">{count.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Export Controls */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-6">
                  {/* Data Type Selection */}
                  <div className="space-y-3">
                    <label className="block text-white/80 font-medium">Data Type</label>
                    <select
                      value={selectedDataType}
                      onChange={(e) => setSelectedDataType(e.target.value as ExportDataType)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="users">Users</option>
                      <option value="objects">Objects</option>
                      <option value="events">Events</option>
                      <option value="groups">Groups</option>
                      <option value="transactions">Transactions</option>
                      <option value="progress">Progress</option>
                      <option value="audits">Audits</option>
                      <option value="results">Results</option>
                      <option value="all">All Data (Combined)</option>
                    </select>
                  </div>

                  {/* Format Selection */}
                  <div className="space-y-3">
                    <label className="block text-white/80 font-medium">Export Format</label>
                    <div className="flex space-x-4">
                      {[
                        { value: 'json' as const, label: 'JSON', icon: FileText },
                        { value: 'csv' as const, label: 'CSV', icon: BarChart3 },
                        { value: 'txt' as const, label: 'TXT', icon: FileText }
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => setSelectedFormat(value)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                            selectedFormat === value
                              ? 'bg-primary-500/20 border-primary-500/30 text-primary-300'
                              : 'bg-gray-700/50 border-gray-600/50 text-white/70 hover:bg-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Export Options */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={includeMetadata}
                        onChange={(e) => setIncludeMetadata(e.target.checked)}
                        className="rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-white/80">Include metadata (export date, record count, etc.)</span>
                    </label>
                  </div>

                  {/* Export Button */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="text-sm text-white/60">
                      {selectedDataType === 'all' ? 'Export all data types' : `Export ${selectedDataType} data`} as {selectedFormat.toLowerCase()}
                    </div>
                    <button
                      onClick={() => performExport(selectedDataType)}
                      disabled={exportStatus[`${selectedDataType}-${selectedFormat}`] === 'loading' || !currentUser?.login}
                      className="flex items-center space-x-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                      title={!currentUser?.login ? 'Export disabled: User login not available for password protection' : 'Export data with password protection'}
                    >
                      {exportStatus[`${selectedDataType}-${selectedFormat}`] === 'loading' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Exporting...</span>
                        </>
                      ) : exportStatus[`${selectedDataType}-${selectedFormat}`] === 'success' ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Downloaded!</span>
                        </>
                      ) : exportStatus[`${selectedDataType}-${selectedFormat}`] === 'error' ? (
                        <>
                          <span className="text-red-300">Export Failed</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Export Secured</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lock className="w-3 h-3 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-amber-200 text-sm font-medium">Security Protection</p>
                      <div className="text-amber-100/70 text-xs mt-2 space-y-1">
                        <p>• All exported files are password-protected for security</p>
                        <p>• Your login credential (<strong>{currentUser?.login || 'Not Available'}</strong>) is used as the password</p>
                        <p>• Files are encrypted and saved with .protected extension in your selected format</p>
                        <p>• Use decryption tools or contact support to access the data</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export Info */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-200 text-sm font-medium">Export Information</p>
                      <div className="text-blue-100/70 text-xs mt-2 space-y-1">
                        <p>• Exports include all available fields and data for the selected type</p>
                        <p>• Large datasets may take some time to process</p>
                        <p>• All exports are generated fresh from the current database state</p>
                        <p>• Metadata includes export timestamp, record counts, and user information</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserPreferences
