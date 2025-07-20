// ============================================================================
// COMPREHENSIVE ERROR HANDLING & USER FEEDBACK SYSTEM
// Advanced error management with user-friendly feedback and recovery options
// ============================================================================

/**
 * Error types and severity levels
 */
export const ERROR_TYPES = {
  NETWORK: 'network',
  GRAPHQL: 'graphql',
  AUTHENTICATION: 'authentication',
  VALIDATION: 'validation',
  PERMISSION: 'permission',
  SYSTEM: 'system',
  USER_INPUT: 'user_input'
};

export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

/**
 * Enhanced Error Class
 * Provides structured error information with user-friendly messages
 */
export class AppError extends Error {
  constructor(message, type = ERROR_TYPES.SYSTEM, severity = ERROR_SEVERITY.MEDIUM, options = {}) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.timestamp = new Date().toISOString();
    this.userMessage = options.userMessage || this.generateUserMessage();
    this.recoveryActions = options.recoveryActions || this.generateRecoveryActions();
    this.context = options.context || {};
    this.retryable = options.retryable !== false;
    this.reportable = options.reportable !== false;
  }

  /**
   * Generate user-friendly error message
   */
  generateUserMessage() {
    const messages = {
      [ERROR_TYPES.NETWORK]: 'Connection issue. Please check your internet connection and try again.',
      [ERROR_TYPES.GRAPHQL]: 'Data loading failed. Please refresh the page or try again later.',
      [ERROR_TYPES.AUTHENTICATION]: 'Authentication failed. Please log in again.',
      [ERROR_TYPES.VALIDATION]: 'Invalid input. Please check your data and try again.',
      [ERROR_TYPES.PERMISSION]: 'Access denied. You don\'t have permission to perform this action.',
      [ERROR_TYPES.SYSTEM]: 'Something went wrong. Please try again or contact support.',
      [ERROR_TYPES.USER_INPUT]: 'Invalid input. Please check your data and try again.'
    };

    return messages[this.type] || messages[ERROR_TYPES.SYSTEM];
  }

  /**
   * Generate recovery actions based on error type
   */
  generateRecoveryActions() {
    const actions = {
      [ERROR_TYPES.NETWORK]: [
        { label: 'Retry', action: 'retry' },
        { label: 'Check Connection', action: 'check_connection' }
      ],
      [ERROR_TYPES.GRAPHQL]: [
        { label: 'Refresh Page', action: 'refresh' },
        { label: 'Retry', action: 'retry' }
      ],
      [ERROR_TYPES.AUTHENTICATION]: [
        { label: 'Login Again', action: 'login' },
        { label: 'Go to Home', action: 'home' }
      ],
      [ERROR_TYPES.VALIDATION]: [
        { label: 'Fix Input', action: 'fix_input' },
        { label: 'Reset Form', action: 'reset_form' }
      ],
      [ERROR_TYPES.PERMISSION]: [
        { label: 'Go Back', action: 'go_back' },
        { label: 'Contact Support', action: 'contact_support' }
      ],
      [ERROR_TYPES.SYSTEM]: [
        { label: 'Retry', action: 'retry' },
        { label: 'Refresh Page', action: 'refresh' },
        { label: 'Report Issue', action: 'report' }
      ]
    };

    return actions[this.type] || actions[ERROR_TYPES.SYSTEM];
  }

  /**
   * Convert to JSON for logging/reporting
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      severity: this.severity,
      timestamp: this.timestamp,
      userMessage: this.userMessage,
      recoveryActions: this.recoveryActions,
      context: this.context,
      stack: this.stack,
      retryable: this.retryable,
      reportable: this.reportable
    };
  }
}

/**
 * Error Manager Class
 * Centralized error handling, logging, and user feedback
 */
class ErrorManager {
  constructor() {
    this.errorLog = [];
    this.errorHandlers = new Map();
    this.userFeedbackCallbacks = [];
    this.maxLogSize = 100;
    
    // Initialize global error handlers
    this.initializeGlobalHandlers();
  }

  /**
   * Initialize global error handlers
   */
  initializeGlobalHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = new AppError(
        event.reason?.message || 'Unhandled promise rejection',
        ERROR_TYPES.SYSTEM,
        ERROR_SEVERITY.HIGH,
        { context: { reason: event.reason } }
      );
      this.handleError(error);
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      const error = new AppError(
        event.message || 'JavaScript error',
        ERROR_TYPES.SYSTEM,
        ERROR_SEVERITY.HIGH,
        { 
          context: { 
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
          } 
        }
      );
      this.handleError(error);
    });
  }

  /**
   * Handle error with appropriate response
   * @param {Error|AppError} error - Error to handle
   * @param {Object} context - Additional context
   */
  handleError(error, context = {}) {
    // Convert regular errors to AppError
    if (!(error instanceof AppError)) {
      error = this.convertToAppError(error, context);
    }

    // Add to error log
    this.logError(error);

    // Execute registered error handlers
    this.executeErrorHandlers(error);

    // Provide user feedback
    this.provideUserFeedback(error);

    // Report critical errors
    if (error.severity === ERROR_SEVERITY.CRITICAL && error.reportable) {
      this.reportError(error);
    }

    return error;
  }

  /**
   * Convert regular Error to AppError
   * @param {Error} error - Regular error
   * @param {Object} context - Additional context
   * @returns {AppError} Converted AppError
   */
  convertToAppError(error, context = {}) {
    let type = ERROR_TYPES.SYSTEM;
    let severity = ERROR_SEVERITY.MEDIUM;

    // Determine error type based on error message/properties
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      type = ERROR_TYPES.NETWORK;
    } else if (error.message?.includes('GraphQL') || error.message?.includes('query')) {
      type = ERROR_TYPES.GRAPHQL;
    } else if (error.message?.includes('auth') || error.message?.includes('token')) {
      type = ERROR_TYPES.AUTHENTICATION;
      severity = ERROR_SEVERITY.HIGH;
    }

    return new AppError(error.message, type, severity, { context });
  }

  /**
   * Log error to internal log
   * @param {AppError} error - Error to log
   */
  logError(error) {
    this.errorLog.push({
      ...error.toJSON(),
      id: this.generateErrorId()
    });

    // Maintain log size
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    // Console logging for development
    if (import.meta.env.DEV) {
      console.group(`🚨 ${error.severity.toUpperCase()} ERROR: ${error.type}`);
      console.error('Message:', error.message);
      console.error('User Message:', error.userMessage);
      console.error('Context:', error.context);
      console.error('Recovery Actions:', error.recoveryActions);
      console.error('Stack:', error.stack);
      console.groupEnd();
    }
  }

  /**
   * Execute registered error handlers
   * @param {AppError} error - Error to handle
   */
  executeErrorHandlers(error) {
    const handlers = this.errorHandlers.get(error.type) || [];
    handlers.forEach(handler => {
      try {
        handler(error);
      } catch (handlerError) {
        console.error('Error handler failed:', handlerError);
      }
    });
  }

  /**
   * Provide user feedback through registered callbacks
   * @param {AppError} error - Error to show to user
   */
  provideUserFeedback(error) {
    this.userFeedbackCallbacks.forEach(callback => {
      try {
        callback(error);
      } catch (callbackError) {
        console.error('User feedback callback failed:', callbackError);
      }
    });
  }

  /**
   * Register error handler for specific error type
   * @param {string} errorType - Error type to handle
   * @param {Function} handler - Handler function
   */
  registerErrorHandler(errorType, handler) {
    if (!this.errorHandlers.has(errorType)) {
      this.errorHandlers.set(errorType, []);
    }
    this.errorHandlers.get(errorType).push(handler);
  }

  /**
   * Register user feedback callback
   * @param {Function} callback - Callback function
   */
  registerUserFeedbackCallback(callback) {
    this.userFeedbackCallbacks.push(callback);
  }

  /**
   * Get error statistics
   * @returns {Object} Error statistics
   */
  getErrorStats() {
    const stats = {
      total: this.errorLog.length,
      byType: {},
      bySeverity: {},
      recent: this.errorLog.slice(-10)
    };

    this.errorLog.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    });

    return stats;
  }

  /**
   * Clear error log
   */
  clearErrorLog() {
    this.errorLog = [];
  }

  /**
   * Generate unique error ID
   * @returns {string} Unique error ID
   */
  generateErrorId() {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Report error to external service (placeholder)
   * @param {AppError} error - Error to report
   */
  reportError(error) {
    // In a real application, this would send to an error reporting service
    console.warn('Error reported:', error.toJSON());
  }

  /**
   * Create error boundary handler
   * @returns {Function} Error boundary handler
   */
  createErrorBoundaryHandler() {
    return (error, errorInfo) => {
      const appError = new AppError(
        error.message,
        ERROR_TYPES.SYSTEM,
        ERROR_SEVERITY.HIGH,
        {
          context: { errorInfo },
          userMessage: 'A component error occurred. Please refresh the page.',
          recoveryActions: [
            { label: 'Refresh Page', action: 'refresh' },
            { label: 'Go Home', action: 'home' }
          ]
        }
      );
      this.handleError(appError);
    };
  }
}

// Create singleton instance
const errorManager = new ErrorManager();

/**
 * Utility functions for error handling
 */
export const ErrorUtils = {
  // Get error manager instance
  getInstance: () => errorManager,
  
  // Handle error
  handle: (error, context) => errorManager.handleError(error, context),
  
  // Create AppError
  create: (message, type, severity, options) => new AppError(message, type, severity, options),
  
  // Register handlers
  onError: (type, handler) => errorManager.registerErrorHandler(type, handler),
  onUserFeedback: (callback) => errorManager.registerUserFeedbackCallback(callback),
  
  // Get statistics
  getStats: () => errorManager.getErrorStats(),
  
  // Clear log
  clearLog: () => errorManager.clearErrorLog(),
  
  // Create error boundary
  createBoundary: () => errorManager.createErrorBoundaryHandler()
};

export default errorManager;
