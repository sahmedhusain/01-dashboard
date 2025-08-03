
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

export class AppError extends Error {
  public type: string;
  public severity: string;
  public timestamp: string;
  public userMessage: string;
  public recoveryActions: Array<{ label: string; action: string }>;
  public context: Record<string, unknown>;
  public retryable: boolean;
  public reportable: boolean;

  constructor(message: string, type = ERROR_TYPES.SYSTEM, severity = ERROR_SEVERITY.MEDIUM, options: Record<string, unknown> = {}) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.timestamp = new Date().toISOString();
    this.userMessage = (options.userMessage as string) || this.generateUserMessage();
    this.recoveryActions = (options.recoveryActions as Array<{ label: string; action: string }>) || this.generateRecoveryActions();
    this.context = (options.context as Record<string, unknown>) || {};
    this.retryable = options.retryable !== false;
    this.reportable = options.reportable !== false;
  }


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

class ErrorManager {
  private errorLog: AppError[];
  private errorHandlers: Map<string, ((error: AppError) => void)[]>;
  private userFeedbackCallbacks: ((error: AppError) => void)[];
  private maxLogSize: number;

  constructor() {
    this.errorLog = [];
    this.errorHandlers = new Map();
    this.userFeedbackCallbacks = [];
    this.maxLogSize = 100;
    
    
    this.initializeGlobalHandlers();
  }

  initializeGlobalHandlers() {
    
    window.addEventListener('unhandledrejection', (event) => {
      const error = new AppError(
        event.reason?.message || 'Unhandled promise rejection',
        ERROR_TYPES.SYSTEM,
        ERROR_SEVERITY.HIGH,
        { context: { reason: event.reason } }
      );
      this.handleError(error);
    });

    
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

  handleError(error, context = {}) {
    
    if (!(error instanceof AppError)) {
      error = this.convertToAppError(error, context);
    }

    
    this.logError(error);

    
    this.executeErrorHandlers(error);

    
    this.provideUserFeedback(error);

    
    if (error.severity === ERROR_SEVERITY.CRITICAL && error.reportable) {
      this.reportError(error);
    }

    return error;
  }

  convertToAppError(error, context = {}) {
    let type = ERROR_TYPES.SYSTEM;
    let severity = ERROR_SEVERITY.MEDIUM;

    
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

  logError(error) {
    this.errorLog.push({
      ...error.toJSON(),
      id: this.generateErrorId()
    });

    
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    
    if (import.meta.env.DEV) {
    }
  }

  executeErrorHandlers(error) {
    const handlers = this.errorHandlers.get(error.type) || [];
    handlers.forEach(handler => {
      try {
        handler(error);
      } catch (handlerError) {
      }
    });
  }

  provideUserFeedback(error) {
    this.userFeedbackCallbacks.forEach(callback => {
      try {
        callback(error);
      } catch (callbackError) {
      }
    });
  }

  registerErrorHandler(errorType, handler) {
    if (!this.errorHandlers.has(errorType)) {
      this.errorHandlers.set(errorType, []);
    }
    this.errorHandlers.get(errorType).push(handler);
  }

  registerUserFeedbackCallback(callback) {
    this.userFeedbackCallbacks.push(callback);
  }

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

  clearErrorLog() {
    this.errorLog = [];
  }

  generateErrorId() {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  reportError(error) {
    
  }

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

const errorManager = new ErrorManager();

export const ErrorUtils = {
  
  getInstance: () => errorManager,
  
  
  handle: (error, context) => errorManager.handleError(error, context),
  
  
  create: (message, type, severity, options) => new AppError(message, type, severity, options),
  
  
  onError: (type, handler) => errorManager.registerErrorHandler(type, handler),
  onUserFeedback: (callback) => errorManager.registerUserFeedbackCallback(callback),
  
  
  getStats: () => errorManager.getErrorStats(),
  
  
  clearLog: () => errorManager.clearErrorLog(),
  
  
  createBoundary: () => errorManager.createErrorBoundaryHandler()
};

export default errorManager;
