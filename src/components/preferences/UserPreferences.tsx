import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Palette, Save, RotateCcw, RefreshCw, Database, GripVertical, ArrowUp, ArrowDown, Download, FileText, BarChart3, Users, Calendar, Activity, Target, CheckCircle, Award, Lock } from 'lucide-react'
import { useQuery, useLazyQuery, gql } from '@apollo/client'
import { useUser } from '../../contexts/UserContext'
import { useTheme, Theme } from '../../contexts/ThemeContext'
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
  dashboard: {
    defaultTab: string
    tabOrder: string[]
  }
}

const defaultPreferences: Preferences = {
  dashboard: {
    defaultTab: 'dashboard',
    tabOrder: ['dashboard', 'piscines', 'leaderboard', 'groups', 'audits', 'checkpoints', 'events', 'subjects']
  }
}

type ExportDataType = 'users' | 'objects' | 'events' | 'groups' | 'transactions' | 'progress' | 'audits' | 'results' | 'all'

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
  const { theme, setTheme } = useTheme()

  
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
        ...(prev[section]),
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ 
          duration: 0.3, 
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: 0.05
        }}
        className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="p-8 border-b border-gradient-to-r from-transparent via-white/10 to-transparent relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent mb-2">
                User Preferences
              </h2>
              <p className="text-white/60 text-sm font-medium tracking-wide">Customize your dashboard experience and data settings</p>
            </motion.div>
            <div className="flex items-center space-x-4">
              {hasChanges && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={savePreferences}
                  className="flex items-center px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/10"
              >
                <span className="text-lg font-light">✕</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-64 bg-gradient-to-b from-gray-900/60 to-gray-900/40 backdrop-blur-sm border-r border-white/10 p-6"
          >
            <nav className="space-y-3">
              {sections.map((section, index) => {
                const Icon = section.icon
                const isActive = activeSection === section.id
                
                return (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + (index * 0.05), duration: 0.3 }}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center px-4 py-3.5 rounded-xl text-left transition-all duration-300 relative overflow-hidden group ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/10 text-white shadow-lg border border-primary-500/30'
                        : 'text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/5 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center">
                      <Icon className={`w-5 h-5 mr-3 transition-all duration-300 ${
                        isActive 
                          ? 'text-primary-300 scale-110' 
                          : 'text-white/60 group-hover:text-white group-hover:scale-105'
                      }`} />
                      <span className="font-medium text-sm">{section.label}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-400 rounded-full shadow-lg shadow-primary-400/50"
                      />
                    )}
                  </motion.button>
                )
              })}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <motion.button
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetPreferences}
                className="w-full flex items-center px-4 py-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/10 group"
              >
                <RotateCcw className="w-4 h-4 mr-3 text-white/40 group-hover:text-white/70 group-hover:rotate-12 transition-all duration-300" />
                <span className="font-medium text-sm">Reset to Defaults</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex-1 p-8 overflow-y-auto"
          >
            {activeSection === 'appearance' && (
              <motion.div 
                key="appearance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Appearance Settings</h3>
                  <p className="text-white/60 text-sm">Customize the visual theme of your dashboard</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <label className="block text-white font-semibold mb-4">Theme Selection</label>
                    <div className="space-y-3">
                      {(['dark', 'light', 'auto'] as const).map((themeOption, index) => (
                        <motion.label 
                          key={themeOption} 
                          className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (index * 0.1), duration: 0.3 }}
                        >
                          <input
                            type="radio"
                            name="theme"
                            value={themeOption}
                            checked={theme === themeOption}
                            onChange={(e) => setTheme(e.target.value as Theme)}
                            className="mr-4 w-4 h-4 text-primary-500 bg-gray-700 border-gray-600 focus:ring-primary-500 focus:ring-2"
                          />
                          <span className="text-white/80 capitalize font-medium group-hover:text-white transition-colors duration-200">
                            {themeOption}
                          </span>
                          {theme === themeOption && (
                            <motion.div
                              layoutId="themeIndicator"
                              className="ml-auto w-2 h-2 bg-primary-400 rounded-full shadow-lg shadow-primary-400/50"
                            />
                          )}
                        </motion.label>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}



            {activeSection === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Dashboard Settings</h3>
                  <p className="text-white/60 text-sm">Configure your dashboard layout and default views</p>
                </motion.div>
                
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
              </motion.div>
            )}

            {activeSection === 'data' && (
              <motion.div 
                key="data"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Data Refresh Settings</h3>
                  <p className="text-white/60 text-sm">Manage data synchronization and caching options</p>
                </motion.div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/70 text-sm mb-4">
                    Manage data refresh settings, cache, and synchronization options.
                  </p>
                  <RefreshControl showStats={true} showAutoRefreshToggle={true} />
                </div>
              </motion.div>
            )}

            {activeSection === 'export' && (
              <motion.div 
                key="export"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Data Export</h3>
                  <p className="text-white/60 text-sm">Export comprehensive data from the platform in various formats</p>
                </motion.div>

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
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => performExport(selectedDataType)}
                      disabled={exportStatus[`${selectedDataType}-${selectedFormat}`] === 'loading' || !currentUser?.login}
                      className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                      title={!currentUser?.login ? 'Export disabled: User login not available for password protection' : 'Export data with password protection'}
                    >
                      {exportStatus[`${selectedDataType}-${selectedFormat}`] === 'loading' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <RefreshCw className="w-5 h-5" />
                          </motion.div>
                          <span>Exporting...</span>
                        </>
                      ) : exportStatus[`${selectedDataType}-${selectedFormat}`] === 'success' ? (
                        <>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-300" />
                          </motion.div>
                          <span>Downloaded!</span>
                        </>
                      ) : exportStatus[`${selectedDataType}-${selectedFormat}`] === 'error' ? (
                        <>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                          >
                            <span className="text-red-300">Export Failed</span>
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          <span>Export Secured</span>
                        </>
                      )}
                    </motion.button>
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
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UserPreferences
