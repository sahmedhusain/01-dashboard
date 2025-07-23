import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { motion } from 'framer-motion'

interface ErrorStateProps {
  error?: Error | string
  onRetry?: () => void
  onGoHome?: () => void
  title?: string
  description?: string
  showRetry?: boolean
  showGoHome?: boolean
  className?: string
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  onGoHome,
  title = 'Something went wrong',
  description,
  showRetry = true,
  showGoHome = false,
  className = ''
}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message || 'An unexpected error occurred'
  const defaultDescription = description || `We encountered an issue while loading your data. ${errorMessage}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      
      <p className="text-white/70 mb-6 max-w-md leading-relaxed">
        {defaultDescription}
      </p>

      {/* Error Details (for development) */}
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mb-6 w-full max-w-md">
          <summary className="text-white/50 text-sm cursor-pointer hover:text-white/70 transition-colors">
            Show error details
          </summary>
          <div className="mt-2 p-3 bg-red-900/20 border border-red-500/30 rounded text-left">
            <pre className="text-xs text-red-300 whitespace-pre-wrap break-words">
              {typeof error === 'string' ? error : error.stack || error.message}
            </pre>
          </div>
        </details>
      )}

      <div className="flex gap-3">
        {showRetry && onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </motion.button>
        )}
        
        {showGoHome && onGoHome && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGoHome}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default ErrorState
