import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  X, 
  RefreshCw, 
  Home, 
  LogIn, 
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  Info,
  AlertCircle
} from 'lucide-react';
import { ErrorUtils, ERROR_SEVERITY, ERROR_TYPES } from '../../utils/errorHandling/errorManager.js';

/**
 * Error Feedback Component
 * Displays user-friendly error messages with recovery actions
 */
const ErrorFeedback = () => {
  const [errors, setErrors] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Register for error feedback
    const handleError = (error) => {
      const errorNotification = {
        id: `error_${Date.now()}`,
        type: 'error',
        title: getErrorTitle(error),
        message: error.userMessage,
        severity: error.severity,
        recoveryActions: error.recoveryActions,
        timestamp: Date.now(),
        autoClose: error.severity === ERROR_SEVERITY.LOW,
        duration: getNotificationDuration(error.severity)
      };

      setErrors(prev => [...prev, errorNotification]);
      
      // Auto-remove low severity errors
      if (errorNotification.autoClose) {
        setTimeout(() => {
          removeError(errorNotification.id);
        }, errorNotification.duration);
      }
    };

    ErrorUtils.onUserFeedback(handleError);

    return () => {
      // Cleanup would go here in a real implementation
    };
  }, []);

  /**
   * Remove error notification
   * @param {string} errorId - Error ID to remove
   */
  const removeError = (errorId) => {
    setErrors(prev => prev.filter(error => error.id !== errorId));
  };

  /**
   * Handle recovery action
   * @param {string} action - Action to perform
   * @param {string} errorId - Error ID
   */
  const handleRecoveryAction = (action, errorId) => {
    switch (action) {
      case 'retry':
        // Trigger retry logic
        window.location.reload();
        break;
      case 'refresh':
        window.location.reload();
        break;
      case 'home':
        window.location.href = '/';
        break;
      case 'login':
        // Trigger login flow
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 'go_back':
        window.history.back();
        break;
      case 'contact_support':
        // Open support contact
        window.open('mailto:support@example.com', '_blank');
        break;
      case 'report':
        // Open error reporting
        reportError(errorId);
        break;
      default:
        console.warn('Unknown recovery action:', action);
    }

    // Remove the error after action
    removeError(errorId);
  };

  /**
   * Report error to support
   * @param {string} errorId - Error ID to report
   */
  const reportError = (errorId) => {
    const error = errors.find(e => e.id === errorId);
    if (error) {
      // In a real app, this would send to a support system
      console.log('Reporting error:', error);
      
      // Show success notification
      showNotification({
        type: 'success',
        title: 'Error Reported',
        message: 'Thank you for reporting this issue. Our team will investigate.',
        duration: 3000
      });
    }
  };

  /**
   * Show notification
   * @param {Object} notification - Notification data
   */
  const showNotification = (notification) => {
    const notif = {
      id: `notif_${Date.now()}`,
      timestamp: Date.now(),
      duration: 3000,
      ...notification
    };

    setNotifications(prev => [...prev, notif]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notif.id));
    }, notif.duration);
  };

  /**
   * Get error title based on type
   * @param {Object} error - Error object
   * @returns {string} Error title
   */
  const getErrorTitle = (error) => {
    const titles = {
      [ERROR_TYPES.NETWORK]: 'Connection Error',
      [ERROR_TYPES.GRAPHQL]: 'Data Loading Error',
      [ERROR_TYPES.AUTHENTICATION]: 'Authentication Error',
      [ERROR_TYPES.VALIDATION]: 'Validation Error',
      [ERROR_TYPES.PERMISSION]: 'Permission Error',
      [ERROR_TYPES.SYSTEM]: 'System Error',
      [ERROR_TYPES.USER_INPUT]: 'Input Error'
    };

    return titles[error.type] || 'Error';
  };

  /**
   * Get notification duration based on severity
   * @param {string} severity - Error severity
   * @returns {number} Duration in milliseconds
   */
  const getNotificationDuration = (severity) => {
    const durations = {
      [ERROR_SEVERITY.LOW]: 3000,
      [ERROR_SEVERITY.MEDIUM]: 5000,
      [ERROR_SEVERITY.HIGH]: 8000,
      [ERROR_SEVERITY.CRITICAL]: 0 // Manual dismiss only
    };

    return durations[severity] || 5000;
  };

  /**
   * Get error icon based on severity
   * @param {string} severity - Error severity
   * @returns {React.Component} Icon component
   */
  const getErrorIcon = (severity) => {
    const icons = {
      [ERROR_SEVERITY.LOW]: Info,
      [ERROR_SEVERITY.MEDIUM]: AlertCircle,
      [ERROR_SEVERITY.HIGH]: AlertTriangle,
      [ERROR_SEVERITY.CRITICAL]: AlertTriangle
    };

    const IconComponent = icons[severity] || AlertCircle;
    return <IconComponent className="w-5 h-5" />;
  };

  /**
   * Get error colors based on severity
   * @param {string} severity - Error severity
   * @returns {Object} Color classes
   */
  const getErrorColors = (severity) => {
    const colors = {
      [ERROR_SEVERITY.LOW]: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        button: 'bg-blue-500 hover:bg-blue-600'
      },
      [ERROR_SEVERITY.MEDIUM]: {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        button: 'bg-yellow-500 hover:bg-yellow-600'
      },
      [ERROR_SEVERITY.HIGH]: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        button: 'bg-red-500 hover:bg-red-600'
      },
      [ERROR_SEVERITY.CRITICAL]: {
        bg: 'bg-red-600/20',
        border: 'border-red-600/50',
        text: 'text-red-300',
        button: 'bg-red-600 hover:bg-red-700'
      }
    };

    return colors[severity] || colors[ERROR_SEVERITY.MEDIUM];
  };

  /**
   * Get action icon
   * @param {string} action - Action type
   * @returns {React.Component} Icon component
   */
  const getActionIcon = (action) => {
    const icons = {
      retry: RefreshCw,
      refresh: RefreshCw,
      home: Home,
      login: LogIn,
      go_back: ArrowLeft,
      contact_support: MessageCircle,
      report: MessageCircle
    };

    const IconComponent = icons[action];
    return IconComponent ? <IconComponent className="w-4 h-4 mr-2" /> : null;
  };

  return (
    <>
      {/* Error Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {errors.map((error) => {
            const colors = getErrorColors(error.severity);
            
            return (
              <motion.div
                key={error.id}
                initial={{ opacity: 0, x: 300, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 300, scale: 0.9 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                className={`max-w-md p-4 rounded-lg border backdrop-blur-md ${colors.bg} ${colors.border} shadow-lg`}
              >
                <div className="flex items-start space-x-3">
                  <div className={colors.text}>
                    {getErrorIcon(error.severity)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white mb-1">
                      {error.title}
                    </h4>
                    <p className="text-sm text-surface-300 mb-3">
                      {error.message}
                    </p>
                    
                    {/* Recovery Actions */}
                    {error.recoveryActions && error.recoveryActions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {error.recoveryActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleRecoveryAction(action.action, error.id)}
                            className={`inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded transition-colors ${colors.button}`}
                          >
                            {getActionIcon(action.action)}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => removeError(error.id)}
                    className="text-surface-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Success/Info Notifications */}
      <div className="fixed top-4 left-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -300, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className={`max-w-md p-4 rounded-lg border backdrop-blur-md shadow-lg ${
                notification.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-blue-500/10 border-blue-500/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={notification.type === 'success' ? 'text-green-400' : 'text-blue-400'}>
                  {notification.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Info className="w-5 h-5" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-surface-300">
                    {notification.message}
                  </p>
                </div>
                
                <button
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                  className="text-surface-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ErrorFeedback;
