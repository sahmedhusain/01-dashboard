// Comprehensive Error Handling and Validation Utilities
import { ApolloError } from '@apollo/client';

// ============================================================================
// ERROR TYPES AND CLASSIFICATIONS
// ============================================================================

export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  GRAPHQL: 'GRAPHQL_ERROR',
  AUTHENTICATION: 'AUTH_ERROR',
  AUTHORIZATION: 'AUTHORIZATION_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  RATE_LIMIT: 'RATE_LIMIT_ERROR',
  SERVER: 'SERVER_ERROR',
  CLIENT: 'CLIENT_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

// ============================================================================
// ERROR CLASSIFICATION AND PROCESSING
// ============================================================================

// Classify and process GraphQL errors
export const processGraphQLError = (error) => {
  if (!error) return null;

  const processedError = {
    type: ERROR_TYPES.UNKNOWN,
    severity: ERROR_SEVERITY.MEDIUM,
    message: 'An unexpected error occurred',
    userMessage: 'Something went wrong. Please try again.',
    code: null,
    details: null,
    timestamp: new Date().toISOString(),
    retryable: false,
    fallbackAction: null,
  };

  // Handle ApolloError
  if (error instanceof ApolloError) {
    return processApolloError(error, processedError);
  }

  // Handle network errors
  if (error.networkError) {
    return processNetworkError(error.networkError, processedError);
  }

  // Handle GraphQL errors
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return processGraphQLErrors(error.graphQLErrors, processedError);
  }

  // Handle generic errors
  if (error.message) {
    processedError.message = error.message;
    processedError.userMessage = getUserFriendlyMessage(error.message);
  }

  return processedError;
};

// Process Apollo-specific errors
const processApolloError = (error, baseError) => {
  const processed = { ...baseError };

  // Network error handling
  if (error.networkError) {
    return processNetworkError(error.networkError, processed);
  }

  // GraphQL errors handling
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return processGraphQLErrors(error.graphQLErrors, processed);
  }

  processed.message = error.message;
  processed.userMessage = getUserFriendlyMessage(error.message);
  
  return processed;
};

// Process network errors
const processNetworkError = (networkError, baseError) => {
  const processed = { ...baseError };
  processed.type = ERROR_TYPES.NETWORK;
  processed.retryable = true;

  if (networkError.statusCode) {
    switch (networkError.statusCode) {
      case 401:
        processed.type = ERROR_TYPES.AUTHENTICATION;
        processed.severity = ERROR_SEVERITY.HIGH;
        processed.userMessage = 'Please log in to continue';
        processed.fallbackAction = 'redirect_to_login';
        processed.retryable = false;
        break;
      
      case 403:
        processed.type = ERROR_TYPES.AUTHORIZATION;
        processed.severity = ERROR_SEVERITY.HIGH;
        processed.userMessage = 'You do not have permission to access this resource';
        processed.retryable = false;
        break;
      
      case 429:
        processed.type = ERROR_TYPES.RATE_LIMIT;
        processed.severity = ERROR_SEVERITY.MEDIUM;
        processed.userMessage = 'Too many requests. Please wait a moment and try again';
        processed.retryable = true;
        break;
      
      case 500:
      case 502:
      case 503:
      case 504:
        processed.type = ERROR_TYPES.SERVER;
        processed.severity = ERROR_SEVERITY.HIGH;
        processed.userMessage = 'Server is temporarily unavailable. Please try again later';
        processed.retryable = true;
        break;
      
      default:
        processed.userMessage = `Network error (${networkError.statusCode}). Please check your connection`;
    }
  } else {
    processed.userMessage = 'Network connection failed. Please check your internet connection';
  }

  processed.message = networkError.message || 'Network error occurred';
  processed.details = {
    statusCode: networkError.statusCode,
    statusText: networkError.statusText,
  };

  return processed;
};

// Process GraphQL-specific errors
const processGraphQLErrors = (graphQLErrors, baseError) => {
  const processed = { ...baseError };
  processed.type = ERROR_TYPES.GRAPHQL;

  // Take the first error for primary processing
  const primaryError = graphQLErrors[0];
  
  if (primaryError.extensions) {
    const { code, exception } = primaryError.extensions;
    processed.code = code;

    switch (code) {
      case 'UNAUTHENTICATED':
        processed.type = ERROR_TYPES.AUTHENTICATION;
        processed.severity = ERROR_SEVERITY.HIGH;
        processed.userMessage = 'Authentication required. Please log in';
        processed.fallbackAction = 'redirect_to_login';
        break;
      
      case 'FORBIDDEN':
        processed.type = ERROR_TYPES.AUTHORIZATION;
        processed.severity = ERROR_SEVERITY.HIGH;
        processed.userMessage = 'Access denied. You do not have permission for this action';
        break;
      
      case 'BAD_USER_INPUT':
        processed.type = ERROR_TYPES.VALIDATION;
        processed.severity = ERROR_SEVERITY.LOW;
        processed.userMessage = 'Invalid input. Please check your data and try again';
        processed.retryable = true;
        break;
      
      case 'INTERNAL_ERROR':
        processed.type = ERROR_TYPES.SERVER;
        processed.severity = ERROR_SEVERITY.HIGH;
        processed.userMessage = 'Internal server error. Please try again later';
        processed.retryable = true;
        break;
      
      default:
        processed.userMessage = getUserFriendlyMessage(primaryError.message);
    }

    if (exception) {
      processed.details = {
        stacktrace: exception.stacktrace,
        code: exception.code,
      };
    }
  }

  processed.message = primaryError.message;
  processed.graphQLErrors = graphQLErrors;

  return processed;
};

// ============================================================================
// USER-FRIENDLY MESSAGE GENERATION
// ============================================================================

// Convert technical error messages to user-friendly ones
const getUserFriendlyMessage = (technicalMessage) => {
  const lowerMessage = technicalMessage.toLowerCase();

  // Common error patterns and their user-friendly equivalents
  const errorPatterns = [
    {
      pattern: /jwt|token|authentication/i,
      message: 'Your session has expired. Please log in again',
    },
    {
      pattern: /network|connection|fetch/i,
      message: 'Connection problem. Please check your internet and try again',
    },
    {
      pattern: /timeout/i,
      message: 'Request timed out. Please try again',
    },
    {
      pattern: /not found|404/i,
      message: 'The requested information could not be found',
    },
    {
      pattern: /permission|forbidden|unauthorized/i,
      message: 'You do not have permission to perform this action',
    },
    {
      pattern: /validation|invalid|bad input/i,
      message: 'Please check your input and try again',
    },
    {
      pattern: /server error|internal error|500/i,
      message: 'Server error. Please try again later',
    },
    {
      pattern: /rate limit|too many requests/i,
      message: 'Too many requests. Please wait a moment and try again',
    },
  ];

  for (const { pattern, message } of errorPatterns) {
    if (pattern.test(lowerMessage)) {
      return message;
    }
  }

  // Default fallback
  return 'An unexpected error occurred. Please try again';
};

// ============================================================================
// INPUT VALIDATION
// ============================================================================

// Validate GraphQL query variables
export const validateQueryVariables = (variables, schema) => {
  const errors = [];

  if (!variables || typeof variables !== 'object') {
    errors.push({
      field: 'variables',
      message: 'Variables must be an object',
      code: 'INVALID_TYPE',
    });
    return errors;
  }

  // Validate based on schema if provided
  if (schema) {
    Object.entries(schema).forEach(([field, rules]) => {
      const value = variables[field];
      
      // Required field validation
      if (rules.required && (value === undefined || value === null)) {
        errors.push({
          field,
          message: `${field} is required`,
          code: 'REQUIRED_FIELD',
        });
        return;
      }

      // Type validation
      if (value !== undefined && rules.type) {
        if (!validateFieldType(value, rules.type)) {
          errors.push({
            field,
            message: `${field} must be of type ${rules.type}`,
            code: 'INVALID_TYPE',
          });
        }
      }

      // Custom validation
      if (value !== undefined && rules.validate) {
        const customError = rules.validate(value);
        if (customError) {
          errors.push({
            field,
            message: customError,
            code: 'CUSTOM_VALIDATION',
          });
        }
      }
    });
  }

  return errors;
};

// Validate field type
const validateFieldType = (value, expectedType) => {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'array':
      return Array.isArray(value);
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'date':
      return value instanceof Date || !isNaN(Date.parse(value));
    default:
      return true;
  }
};

// ============================================================================
// RETRY LOGIC
// ============================================================================

// Retry configuration
export const RETRY_CONFIG = {
  maxAttempts: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffFactor: 2,
  retryableErrors: [
    ERROR_TYPES.NETWORK,
    ERROR_TYPES.SERVER,
    ERROR_TYPES.RATE_LIMIT,
  ],
};

// Implement exponential backoff retry
export const retryWithBackoff = async (operation, config = RETRY_CONFIG) => {
  let lastError;
  
  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const processedError = processGraphQLError(error);
      
      // Don't retry if error is not retryable
      if (!processedError.retryable || !config.retryableErrors.includes(processedError.type)) {
        throw error;
      }
      
      // Don't retry on last attempt
      if (attempt === config.maxAttempts) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(
        config.baseDelay * Math.pow(config.backoffFactor, attempt - 1),
        config.maxDelay
      );
      
      // Add jitter to prevent thundering herd
      const jitteredDelay = delay + Math.random() * 1000;
      
      await new Promise(resolve => setTimeout(resolve, jitteredDelay));
    }
  }
  
  throw lastError;
};

// ============================================================================
// ERROR LOGGING AND REPORTING
// ============================================================================

// Log error for debugging and monitoring
export const logError = (error, context = {}) => {
  const processedError = processGraphQLError(error);
  
  const logEntry = {
    ...processedError,
    context,
    userAgent: navigator.userAgent,
    url: window.location.href,
    userId: context.userId,
    sessionId: context.sessionId,
  };

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('GraphQL Error:', logEntry);
  }

  // In production, you would send this to your error tracking service
  // Example: Sentry, LogRocket, etc.
  if (import.meta.env.PROD) {
    // sendToErrorTrackingService(logEntry);
  }

  return logEntry;
};

// ============================================================================
// FALLBACK MECHANISMS
// ============================================================================

// Provide fallback data when queries fail
export const getFallbackData = (queryType, error) => {
  const processedError = processGraphQLError(error);
  
  // Return appropriate fallback based on query type and error
  switch (queryType) {
    case 'user_profile':
      return {
        id: null,
        login: 'Unknown User',
        profile: null,
        loading: false,
        error: processedError,
      };
    
    case 'user_transactions':
      return {
        transactions: [],
        totalCount: 0,
        loading: false,
        error: processedError,
      };
    
    case 'user_progress':
      return {
        progress: [],
        completionRate: 0,
        loading: false,
        error: processedError,
      };
    
    default:
      return {
        data: null,
        loading: false,
        error: processedError,
      };
  }
};
