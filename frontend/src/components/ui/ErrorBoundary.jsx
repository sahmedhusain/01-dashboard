import { Component } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Card from './Card';
import Button from './Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <Card className="text-center">
              <Card.Content>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </motion.div>

                <h1 className="text-2xl font-bold text-white mb-2">
                  Oops! Something went wrong
                </h1>
                
                <p className="text-surface-300 mb-6">
                  We encountered an unexpected error. This has been logged and we'll look into it.
                </p>

                {import.meta.env.DEV && this.state.error && (
                  <details className="mb-6 text-left">
                    <summary className="cursor-pointer text-surface-400 hover:text-surface-200 mb-2">
                      Error Details (Development)
                    </summary>
                    <div className="bg-surface-800/50 rounded-lg p-4 text-sm">
                      <p className="text-red-400 font-mono mb-2">
                        {this.state.error.toString()}
                      </p>
                      {this.state.errorInfo.componentStack && (
                        <pre className="text-surface-300 text-xs overflow-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  </details>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={this.handleRetry}
                    className="flex-1"
                    variant="primary"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  
                  <Button
                    onClick={this.handleReload}
                    className="flex-1"
                    variant="secondary"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Reload Page
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
