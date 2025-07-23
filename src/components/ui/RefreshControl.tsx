import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RefreshCw, 
  Settings, 
  Zap, 
  Clock, 
  Wifi, 
  WifiOff,
  Database,
  Activity,
  CheckCircle,
  XCircle,
  BarChart3,
  Info
} from 'lucide-react'
import { useRefresh } from '../../hooks/useRefresh'
import { formatDate } from '../../utils/dataFormatting'

interface RefreshControlProps {
  className?: string
  showStats?: boolean
  showAutoRefreshToggle?: boolean
  compact?: boolean
}

const RefreshControl: React.FC<RefreshControlProps> = ({
  className = '',
  showStats = true,
  showAutoRefreshToggle = true,
  compact = false
}) => {
  const {
    isGlobalRefreshing,
    refreshStats,
    refreshAll,
    hardRefresh,
    enableAutoRefresh,
    disableAutoRefresh,
    isAutoRefreshEnabled,
    autoRefreshInterval,
    clearCache,
    getCacheSize,
    isOnline,
    lastOnlineTime
  } = useRefresh()

  const [showSettings, setShowSettings] = useState(false)
  const [customInterval, setCustomInterval] = useState(Math.round(autoRefreshInterval / 1000))

  const handleAutoRefreshToggle = () => {
    if (isAutoRefreshEnabled) {
      disableAutoRefresh()
    } else {
      enableAutoRefresh(customInterval * 1000)
    }
  }

  const handleIntervalChange = (seconds: number) => {
    setCustomInterval(seconds)
    if (isAutoRefreshEnabled) {
      enableAutoRefresh(seconds * 1000)
    }
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  const formatInterval = (ms: number) => {
    const seconds = Math.round(ms / 1000)
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.round(seconds / 60)
    if (minutes < 60) return `${minutes}m`
    const hours = Math.round(minutes / 60)
    return `${hours}h`
  }

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* Network Status */}
        <div className="flex items-center">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-400" />
          )}
        </div>

        {/* Auto-refresh indicator */}
        {isAutoRefreshEnabled && (
          <div className="flex items-center text-xs text-primary-400">
            <Zap className="w-3 h-3 mr-1" />
            {formatInterval(autoRefreshInterval)}
          </div>
        )}

        {/* Refresh button */}
        <motion.button
          onClick={refreshAll}
          disabled={isGlobalRefreshing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg transition-all ${
            isGlobalRefreshing
              ? 'bg-primary-500/20 text-primary-400 cursor-wait'
              : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isGlobalRefreshing ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>
    )
  }

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary-500/20">
            <RefreshCw className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">Data Refresh</h3>
            <p className="text-white/60 text-sm">
              {isOnline ? 'Online' : 'Offline'} • 
              {isAutoRefreshEnabled ? ` Auto: ${formatInterval(autoRefreshInterval)}` : ' Manual'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Network Status */}
          <div className={`p-2 rounded-lg ${isOnline ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
          </div>

          {/* Settings */}
          <motion.button
            onClick={() => setShowSettings(!showSettings)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-all ${
              showSettings
                ? 'bg-primary-500/20 text-primary-400'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Main Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* Refresh All */}
        <motion.button
          onClick={refreshAll}
          disabled={isGlobalRefreshing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-3 rounded-lg border transition-all text-left ${
            isGlobalRefreshing
              ? 'bg-primary-500/20 border-primary-500/30 text-primary-400 cursor-wait'
              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
          }`}
        >
          <div className="flex items-center space-x-2 mb-1">
            <RefreshCw className={`w-4 h-4 ${isGlobalRefreshing ? 'animate-spin' : ''}`} />
            <span className="font-medium">Refresh All</span>
          </div>
          <p className="text-xs text-white/60">
            {isGlobalRefreshing ? 'Refreshing...' : 'Update all data'}
          </p>
        </motion.button>

        {/* Hard Refresh */}
        <motion.button
          onClick={hardRefresh}
          disabled={isGlobalRefreshing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-3 rounded-lg border bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all text-left disabled:opacity-50"
        >
          <div className="flex items-center space-x-2 mb-1">
            <Database className="w-4 h-4" />
            <span className="font-medium">Hard Refresh</span>
          </div>
          <p className="text-xs text-white/60">Clear cache & refresh</p>
        </motion.button>

        {/* Auto-refresh Toggle */}
        {showAutoRefreshToggle && (
          <motion.button
            onClick={handleAutoRefreshToggle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-lg border transition-all text-left ${
              isAutoRefreshEnabled
                ? 'bg-green-500/20 border-green-500/30 text-green-400'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="w-4 h-4" />
              <span className="font-medium">Auto Refresh</span>
            </div>
            <p className="text-xs text-white/60">
              {isAutoRefreshEnabled ? `Every ${formatInterval(autoRefreshInterval)}` : 'Disabled'}
            </p>
          </motion.button>
        )}
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 pt-4"
          >
            <h4 className="text-white font-medium mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Refresh Settings
            </h4>

            {/* Auto-refresh Interval */}
            <div className="mb-4">
              <label className="block text-white/80 text-sm mb-2">
                Auto-refresh Interval
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={customInterval}
                  onChange={(e) => handleIntervalChange(Number(e.target.value))}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white/70 text-sm w-12">
                  {customInterval}s
                </span>
              </div>
            </div>

            {/* Cache Management */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Cache Size</p>
                <p className="text-white/60 text-xs">{getCacheSize()} entries</p>
              </div>
              <motion.button
                onClick={clearCache}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-all"
              >
                Clear Cache
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistics */}
      {showStats && (
        <div className="border-t border-white/10 pt-4 mt-4">
          <h4 className="text-white font-medium mb-3 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Refresh Statistics
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-lg font-bold text-white">{refreshStats.totalRefreshes}</p>
              <p className="text-xs text-white/60">Total</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-lg font-bold text-white">{refreshStats.successfulRefreshes}</p>
              <p className="text-xs text-white/60">Success</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <XCircle className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-lg font-bold text-white">{refreshStats.failedRefreshes}</p>
              <p className="text-xs text-white/60">Failed</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-lg font-bold text-white">
                {formatDuration(refreshStats.averageRefreshTime)}
              </p>
              <p className="text-xs text-white/60">Avg Time</p>
            </div>
          </div>

          {refreshStats.lastRefreshTime && (
            <div className="mt-3 text-center">
              <p className="text-white/60 text-xs">
                Last refresh: {formatDate(refreshStats.lastRefreshTime)}
              </p>
            </div>
          )}

          {!isOnline && lastOnlineTime && (
            <div className="mt-3 text-center">
              <p className="text-red-400 text-xs flex items-center justify-center">
                <WifiOff className="w-3 h-3 mr-1" />
                Last online: {formatDate(lastOnlineTime)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RefreshControl
