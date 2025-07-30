import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Palette, Save, RotateCcw, RefreshCw, Database, GripVertical, ArrowUp, ArrowDown } from 'lucide-react'
import Card from '../ui/Card'
import RefreshControl from '../ui/RefreshControl'

interface UserPreferencesProps {
  userId: number
  onClose: () => void
  defaultTabs?: Array<{ id: string; label: string; icon: any }>
}

interface Preferences {
  theme: 'dark' | 'light' | 'auto'
  dashboard: {
    compactMode: boolean
    showAnimations: boolean
    defaultTab: string
    chartsEnabled: boolean
    tabOrder: string[]
  }
}

const defaultPreferences: Preferences = {
  theme: 'dark',
  dashboard: {
    compactMode: false,
    showAnimations: true,
    defaultTab: 'dashboard',
    chartsEnabled: true,
    tabOrder: ['dashboard', 'piscines', 'leaderboard', 'groups', 'audits', 'checkpoints', 'events', 'export']
  }
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ userId, onClose, defaultTabs = [] }) => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences)
  const [hasChanges, setHasChanges] = useState(false)
  const [activeSection, setActiveSection] = useState<'appearance' | 'dashboard' | 'data'>('appearance')

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`user-preferences-${userId}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPreferences({ ...defaultPreferences, ...parsed })
      } catch (error) {
        console.error('Failed to parse preferences:', error)
      }
    }
  }, [userId])

  const updatePreference = (section: keyof Preferences, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  const savePreferences = () => {
    localStorage.setItem(`user-preferences-${userId}`, JSON.stringify(preferences))
    setHasChanges(false)
    // Here you could also send to backend API
    console.log('Preferences saved:', preferences)
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

  const sections = [
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'dashboard' as const, label: 'Dashboard', icon: Settings },
    { id: 'data' as const, label: 'Data Refresh', icon: Database }
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
                              <option value="export">Export</option>
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
                      
                      return (
                        <label key={key} className="flex items-center justify-between">
                          <span className="text-white/80 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => updatePreference('dashboard', key, e.target.checked)}
                            className="ml-3"
                          />
                        </label>
                      )
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
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserPreferences
