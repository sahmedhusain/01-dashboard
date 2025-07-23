import React from 'react'
import { ApolloError } from '@apollo/client'
import LoadingSpinner from './LoadingSpinner'
import ErrorState from './ErrorState'
import { useErrorHandler } from '../../hooks/useErrorHandler'

interface QueryWrapperProps {
  loading: boolean
  error?: ApolloError
  data?: any
  children: React.ReactNode
  loadingMessage?: string
  errorTitle?: string
  errorDescription?: string
  onRetry?: () => void
  showRetry?: boolean
  minHeight?: string
  className?: string
  emptyState?: React.ReactNode
  emptyMessage?: string
}

const QueryWrapper: React.FC<QueryWrapperProps> = ({
  loading,
  error,
  data,
  children,
  loadingMessage = 'Loading data...',
  errorTitle,
  errorDescription,
  onRetry,
  showRetry = true,
  minHeight = 'min-h-[200px]',
  className = '',
  emptyState,
  emptyMessage = 'No data available'
}) => {
  const { handleError } = useErrorHandler()

  // Handle loading state
  if (loading) {
    return (
      <div className={`${minHeight} ${className} flex items-center justify-center`}>
        <LoadingSpinner text={loadingMessage} />
      </div>
    )
  }

  // Handle error state
  if (error) {
    const errorInfo = handleError(error, 'Data loading failed')
    
    return (
      <div className={`${minHeight} ${className} flex items-center justify-center`}>
        <ErrorState
          error={error}
          title={errorTitle || errorInfo.message}
          description={errorDescription}
          onRetry={onRetry}
          showRetry={showRetry && errorInfo.retryable}
        />
      </div>
    )
  }

  // Handle empty data state
  if (!data || (Array.isArray(data) && data.length === 0)) {
    if (emptyState) {
      return (
        <div className={`${minHeight} ${className}`}>
          {emptyState}
        </div>
      )
    }
    
    return (
      <div className={`${minHeight} ${className} flex items-center justify-center`}>
        <div className="text-center text-white/60">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📭</span>
          </div>
          <p className="text-lg font-medium mb-2">No Data</p>
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  // Render children with data
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default QueryWrapper
