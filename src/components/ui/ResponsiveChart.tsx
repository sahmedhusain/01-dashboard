import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ResponsiveChartProps {
  children: React.ReactNode
  className?: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait'
  minHeight?: number
  maxHeight?: number
  title?: string
  subtitle?: string
  loading?: boolean
  error?: boolean
  controls?: React.ReactNode
  legend?: React.ReactNode
}

const ResponsiveChart: React.FC<ResponsiveChartProps> = ({
  children,
  className = '',
  aspectRatio = 'video',
  minHeight = 200,
  maxHeight = 500,
  title,
  subtitle,
  loading = false,
  error = false,
  controls,
  legend
}) => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]'
  }

  const getResponsiveHeight = () => {
    if (isMobile) {
      return `min-h-[${minHeight}px] max-h-[${Math.min(maxHeight, 400)}px]`
    }
    return `min-h-[${minHeight * 1.2}px] max-h-[${maxHeight}px]`
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`
          ${getResponsiveHeight()}
          bg-red-500/10 border border-red-500/30 rounded-2xl
          flex items-center justify-center p-6
          ${className}
        `}
      >
        <div className="text-center text-red-400">
          <div className="text-lg font-semibold mb-2">Chart Error</div>
          <div className="text-sm opacity-80">Unable to load chart data</div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative
        bg-white/5 backdrop-blur-sm rounded-2xl
        border border-white/10
        overflow-hidden
        ${className}
      `}
    >
      {/* Header */}
      {(title || subtitle || controls) && (
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-white/60 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {controls && (
              <div className="flex-shrink-0">
                {controls}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chart Content */}
      <div className={`
        relative
        ${getResponsiveHeight()}
        ${aspectRatioClasses[aspectRatio]}
        p-4 sm:p-6
      `}>
        {loading ? (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
              <div className="text-sm text-white/60">Loading chart...</div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            {children}
          </div>
        )}
      </div>

      {/* Legend */}
      {legend && !loading && (
        <div className="p-4 sm:p-6 border-t border-white/10 bg-white/5">
          {legend}
        </div>
      )}

      {/* Mobile scroll indicator for wide content */}
      {isMobile && (
        <div className="absolute bottom-2 right-2 opacity-60">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default ResponsiveChart