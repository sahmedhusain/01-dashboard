import React from 'react'
import { AlertTriangle, RefreshCw, Home, Bug, Mail, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

interface ErrorStateProps {
  error?: Error | string
  onRetry?: () => void
  onGoHome?: () => void
  title?: string
  description?: string
  showRetry?: boolean
  showGoHome?: boolean
  showSupport?: boolean
  supportEmail?: string
  errorType?: 'network' | 'auth' | 'server' | 'client' | 'unknown'
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
  showSupport = false,
  supportEmail = 'support@reboot01.com',
  errorType = 'unknown',
  className = ''
}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message || 'An unexpected error occurred'
  const defaultDescription = description || `We encountered an issue while loading your data. ${errorMessage}`

  // Enhanced error type handling
  const getErrorTypeInfo = () => {
    switch (errorType) {
      case 'network':
        return {
          icon: RefreshCw,
          title: 'Connection Problem',
          suggestion: 'Please check your internet connection and try again.'
        }
      case 'auth':
        return {
          icon: Home,
          title: 'Authentication Required',
          suggestion: 'Please log in again to continue.'
        }
      case 'server':
        return {
          icon: AlertTriangle,
          title: 'Server Error',
          suggestion: 'Our servers are experiencing issues. Please try again later.'
        }
      case 'client':
        return {
          icon: Bug,
          title: 'Application Error',
          suggestion: 'A client-side error occurred. Refreshing might help.'
        }
      default:
        return {
          icon: AlertTriangle,
          title: 'Something went wrong',
          suggestion: 'An unexpected error occurred. Please try again.'
        }
    }
  }

  const errorInfo = getErrorTypeInfo()
  const ErrorIcon = errorInfo.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-red-500/20 dark:bg-red-500/20 light:bg-red-500/30 rounded-full flex items-center justify-center mb-4 border border-red-500/30 dark:border-red-500/30 light:border-red-500/40"
      >
        <ErrorIcon className="w-8 h-8 text-red-400" />
      </motion.div>
      
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-white dark:text-white light:text-slate-900 mb-2"
      >
        {title || errorInfo.title}
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-white/70 dark:text-white/70 light:text-slate-600 mb-4 max-w-md leading-relaxed"
      >
        {defaultDescription || errorInfo.suggestion}
      </motion.p>

      {/* Additional suggestion based on error type */}
      {errorInfo.suggestion && description && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/50 dark:text-white/50 light:text-slate-500 mb-6 max-w-md text-sm leading-relaxed"
        >
          💡 {errorInfo.suggestion}
        </motion.p>
      )}

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
