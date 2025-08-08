import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="text-center max-w-sm sm:max-w-md mx-auto">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 200
          }}
          className="mb-6 sm:mb-8"
        >
          <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary-500 mb-4">404</div>
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-white/40" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-white/70 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-2">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3 sm:space-y-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors w-full justify-center text-sm sm:text-base"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Go to Dashboard
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors w-full justify-center text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Go Back
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 sm:mt-12"
        >
          <p className="text-white/50 text-xs sm:text-sm">
            01 Student Dashboard
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage
