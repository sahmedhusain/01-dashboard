import React from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Tablet, Monitor, Zap, Heart, Star } from 'lucide-react'

interface ResponsiveShowcaseProps {
  className?: string
}

/**
 * ResponsiveShowcase - A demonstration component showcasing all enhanced responsive features
 * This component serves as both a showcase and reference for responsive design patterns
 */
const ResponsiveShowcase: React.FC<ResponsiveShowcaseProps> = ({
  className = ''
}) => {
  return (
    <div className={`space-fluid-lg ${className}`}>
      {/* Enhanced Responsive Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-fluid-md"
      >
        <h1 className="text-fluid-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Enhanced Responsive Design
        </h1>
        <p className="text-fluid-base text-white/70 dark:text-white/70 light:text-slate-600 max-w-2xl mx-auto">
          A comprehensive showcase of responsive design patterns, fluid typography, and adaptive layouts
        </p>
      </motion.div>

      {/* Breakpoint Indicators */}
      <div className="responsive-auto-grid-sm">
        <div className="breakpoint-xs bg-red-500/20 p-4 rounded-xl text-center">
          <Smartphone className="w-8 h-8 mx-auto mb-2 text-red-400" />
          <p className="text-fluid-sm text-white">Extra Small (xs)</p>
          <p className="text-xs text-white/60">≤ 475px</p>
        </div>
        <div className="breakpoint-sm bg-orange-500/20 p-4 rounded-xl text-center">
          <Smartphone className="w-8 h-8 mx-auto mb-2 text-orange-400" />
          <p className="text-fluid-sm text-white">Small (sm)</p>
          <p className="text-xs text-white/60">≤ 640px</p>
        </div>
        <div className="breakpoint-md bg-blue-500/20 p-4 rounded-xl text-center">
          <Tablet className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <p className="text-fluid-sm text-white">Medium (md)</p>
          <p className="text-xs text-white/60">641px - 768px</p>
        </div>
        <div className="breakpoint-lg bg-purple-500/20 p-4 rounded-xl text-center">
          <Tablet className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <p className="text-fluid-sm text-white">Large (lg)</p>
          <p className="text-xs text-white/60">769px - 1024px</p>
        </div>
        <div className="breakpoint-xl bg-green-500/20 p-4 rounded-xl text-center">
          <Monitor className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <p className="text-fluid-sm text-white">Extra Large (xl)</p>
          <p className="text-xs text-white/60">≥ 1025px</p>
        </div>
      </div>

      {/* Fluid Typography Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/20 light:border-slate-300/30"
      >
        <h2 className="text-fluid-xl font-bold text-white dark:text-white light:text-slate-900 mb-4">
          Fluid Typography Scale
        </h2>
        <div className="space-fluid-sm">
          <p className="text-fluid-xs text-white/80 dark:text-white/80 light:text-slate-700">
            Extra Small (text-fluid-xs) - Perfect for captions and fine print
          </p>
          <p className="text-fluid-sm text-white/80 dark:text-white/80 light:text-slate-700">
            Small (text-fluid-sm) - Ideal for secondary information
          </p>
          <p className="text-fluid-base text-white/80 dark:text-white/80 light:text-slate-700">
            Base (text-fluid-base) - Standard body text with optimal readability
          </p>
          <p className="text-fluid-lg text-white dark:text-white light:text-slate-900">
            Large (text-fluid-lg) - Great for section headings
          </p>
          <p className="text-fluid-xl text-white dark:text-white light:text-slate-900 font-semibold">
            Extra Large (text-fluid-xl) - Perfect for major headings
          </p>
        </div>
      </motion.div>

      {/* Responsive Grid Layouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-fluid-md"
      >
        <h2 className="text-fluid-xl font-bold text-white dark:text-white light:text-slate-900 mb-4">
          Adaptive Grid Systems
        </h2>
        
        {/* Auto-fit grid */}
        <div className="responsive-auto-grid mb-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + item * 0.1 }}
              className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-lg rounded-xl p-4 border border-emerald-500/30 text-center aspect-fluid-card flex flex-col items-center justify-center"
            >
              <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center mb-2">
                <span className="text-white font-bold text-sm">{item}</span>
              </div>
              <p className="text-fluid-sm text-white/80">Auto Grid Item</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Touch Targets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/20 light:border-slate-300/30"
      >
        <h2 className="text-fluid-xl font-bold text-white dark:text-white light:text-slate-900 mb-4">
          Touch-Optimized Controls
        </h2>
        <div className="layout-cluster">
          <button className="touch-optimized-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium focus-ring-enhanced">
            Small Button
          </button>
          <button className="touch-optimized bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium focus-ring-enhanced">
            <Zap className="w-4 h-4 mr-2" />
            Standard Button
          </button>
          <button className="touch-optimized-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white font-medium focus-ring-enhanced">
            <Heart className="w-5 h-5 mr-2" />
            Large Button
          </button>
        </div>
      </motion.div>

      {/* Container Queries Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="container-adaptive bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/20 light:border-slate-300/30"
      >
        <h2 className="text-fluid-xl font-bold text-white dark:text-white light:text-slate-900 mb-4">
          Container Query Adaptation
        </h2>
        <div className="grid grid-cols-1 cq-sm:grid-cols-2 cq-md:grid-cols-2 cq-lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-xl p-4 border border-orange-500/30 text-center"
            >
              <Star className="w-6 h-6 mx-auto mb-2 text-orange-400" />
              <p className="text-fluid-sm text-white/80 cq-sm:text-base cq-md:text-lg cq-lg:text-xl">
                Item {item}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Visibility Classes Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/20 light:border-slate-300/30"
      >
        <h2 className="text-fluid-xl font-bold text-white dark:text-white light:text-slate-900 mb-4">
          Device-Specific Visibility
        </h2>
        <div className="space-fluid-sm">
          <div className="visible-mobile bg-green-500/20 p-3 rounded-lg border border-green-500/30">
            <p className="text-fluid-sm text-green-400 font-medium">📱 Visible on Mobile Only</p>
          </div>
          <div className="visible-tablet bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
            <p className="text-fluid-sm text-blue-400 font-medium">📟 Visible on Tablet Only</p>
          </div>
          <div className="visible-desktop bg-purple-500/20 p-3 rounded-lg border border-purple-500/30">
            <p className="text-fluid-sm text-purple-400 font-medium">🖥️ Visible on Desktop Only</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll Area Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/20 light:border-slate-300/30"
      >
        <h2 className="text-fluid-xl font-bold text-white dark:text-white light:text-slate-900 mb-4">
          Responsive Scroll Area
        </h2>
        <div className="scroll-area-responsive bg-white/5 rounded-lg p-4 border border-white/10">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="py-2 border-b border-white/10 last:border-b-0">
              <p className="text-fluid-sm text-white/80">
                Scrollable item {i + 1} - This content adapts to container height
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Performance Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/20 light:border-slate-300/30"
      >
        <h2 className="text-fluid-xl font-bold text-white dark:text-white light:text-slate-900 mb-4">
          Performance Optimizations
        </h2>
        <div className="layout-cluster">
          <div className="gpu-accelerated will-change-transform bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-fluid-sm text-cyan-400 font-medium">GPU Accelerated</p>
          </div>
          <div className="will-change-opacity bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30">
            <p className="text-fluid-sm text-green-400 font-medium">Optimized Opacity</p>
          </div>
          <div className="will-change-scroll bg-gradient-to-r from-purple-500/20 to-violet-500/20 p-4 rounded-lg border border-purple-500/30">
            <p className="text-fluid-sm text-purple-400 font-medium">Scroll Optimized</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ResponsiveShowcase