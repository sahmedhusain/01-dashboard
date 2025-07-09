import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const FloatingActionButton = ({ 
  actions = [], 
  className = '',
  position = 'bottom-right' // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn('fixed z-50', positionClasses[position], className)}>
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col space-y-3 mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                onClick={action.onClick}
                className="w-12 h-12 bg-surface-700 hover:bg-surface-600 text-white rounded-full shadow-material-lg flex items-center justify-center transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={action.label}
              >
                <action.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={toggleMenu}
        className="w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-material-xl flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
