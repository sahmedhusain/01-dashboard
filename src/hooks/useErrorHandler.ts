import { useCallback, useState } from 'react'
import { ApolloError } from '@apollo/client'
import toast from 'react-hot-toast'

interface ErrorInfo {
  message: string
  code?: string
  type: 'network' | 'graphql' | 'auth' | 'validation' | 'unknown'
  retryable: boolean
  details?: any
}

interface UseErrorHandlerReturn {
  error: ErrorInfo | null
  clearError: () => void
  handleError: (error: any, context?: string) => ErrorInfo
  isRetryable: boolean
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setError] = useState<ErrorInfo | null>(null)

  const parseApolloError = useCallback((apolloError: ApolloError): ErrorInfo => {
    // Network errors
    if (apolloError.networkError) {
      const networkError = apolloError.networkError as any
      
      if (networkError.statusCode === 401) {
        return {
          message: 'Authentication required. Please log in again.',
          code: 'AUTH_REQUIRED',
          type: 'auth',
          retryable: false,
          details: networkError
        }
      }
      
      if (networkError.statusCode === 403) {
        return {
          message: 'Access denied. You don\'t have permission to access this resource.',
          code: 'ACCESS_DENIED',
          type: 'auth',
          retryable: false,
          details: networkError
        }
      }
      
      if (networkError.statusCode >= 500) {
        return {
          message: 'Server error. Please try again later.',
          code: 'SERVER_ERROR',
          type: 'network',
          retryable: true,
          details: networkError
        }
      }
      
      return {
        message: 'Network connection failed. Please check your internet connection.',
        code: 'NETWORK_ERROR',
        type: 'network',
        retryable: true,
        details: networkError
      }
    }

    // GraphQL errors
    if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
      const gqlError = apolloError.graphQLErrors[0]
      
      if (gqlError.extensions?.code === 'validation-failed') {
        return {
          message: 'Invalid data provided. Please check your input.',
          code: 'VALIDATION_ERROR',
          type: 'validation',
          retryable: false,
          details: gqlError
        }
      }
      
      return {
        message: gqlError.message || 'GraphQL query failed',
        code: 'GRAPHQL_ERROR',
        type: 'graphql',
        retryable: false,
        details: gqlError
      }
    }

    return {
      message: apolloError.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      type: 'unknown',
      retryable: true,
      details: apolloError
    }
  }, [])

  const handleError = useCallback((error: any, context?: string): ErrorInfo => {
    let errorInfo: ErrorInfo

    if (error instanceof ApolloError) {
      errorInfo = parseApolloError(error)
    } else if (error instanceof Error) {
      errorInfo = {
        message: error.message,
        type: 'unknown',
        retryable: true,
        details: error
      }
    } else if (typeof error === 'string') {
      errorInfo = {
        message: error,
        type: 'unknown',
        retryable: true
      }
    } else {
      errorInfo = {
        message: 'An unexpected error occurred',
        type: 'unknown',
        retryable: true,
        details: error
      }
    }

    // Add context if provided
    if (context) {
      errorInfo.message = `${context}: ${errorInfo.message}`
    }

    setError(errorInfo)

    // Show toast notification for certain error types
    if (errorInfo.type === 'network' || errorInfo.type === 'auth') {
      toast.error(errorInfo.message, {
        duration: 5000,
        position: 'top-right'
      })
    }

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error handled:', errorInfo, error)
    }

    return errorInfo
  }, [parseApolloError])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    clearError,
    handleError,
    isRetryable: error?.retryable || false
  }
}
