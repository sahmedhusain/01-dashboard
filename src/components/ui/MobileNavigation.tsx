import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
  onClick?: () => void
  badge?: string | number
}

interface MobileNavigationProps {
  items: NavigationItem[]
  activeItem?: string
  onItemClick?: (itemId: string) => void
  className?: string
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  activeItem,
  onItemClick,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleItemClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick()
    }
    if (onItemClick) {
      onItemClick(item.id)
    }
    setIsOpen(false)
  }

  const activeItemData = items.find(item => item.id === activeItem)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className={`md:hidden ${className}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-between w-full p-3 bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-sm border border-white/20 dark:border-white/20 light:border-slate-300/30 rounded-xl touch-target hover:bg-white/15 transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            {activeItemData?.icon && (
              <activeItemData.icon className="w-5 h-5 text-white" />
            )}
            <span className="text-white dark:text-white light:text-slate-900 font-medium truncate">
              {activeItemData?.label || 'Menu'}
            </span>
          </div>
          <Menu className="w-5 h-5 text-white/70" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-800 light:from-white light:to-slate-50 border-l border-white/20 dark:border-white/20 light:border-slate-300/50 z-50 md:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <h2 className="text-lg font-semibold text-white">Navigation</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors touch-target"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-2 space-y-1">
                  {items.map((item, index) => {
                    const Icon = item.icon
                    const isActive = item.id === activeItem

                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleItemClick(item)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 touch-target ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                            : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 flex-shrink-0 ${
                            isActive ? 'text-white' : 'text-white/70'
                          }`} />
                          <span className="font-medium truncate">{item.label}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                              isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-primary-500/20 text-primary-300'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className={`w-4 h-4 ${
                            isActive ? 'text-white/70' : 'text-white/50'
                          }`} />
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/20">
                <p className="text-xs text-white/50 text-center">
                  Reboot01 Student Dashboard
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileNavigation
