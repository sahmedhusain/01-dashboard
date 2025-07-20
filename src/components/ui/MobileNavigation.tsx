import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const MobileNavigation = ({ 
  tabs = [], 
  activeTab, 
  onTabChange, 
  className = '' 
}) => {
  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-40 bg-surface-900/95 backdrop-blur-md border-t border-white/10 md:hidden',
      className
    )}>
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative',
                isActive 
                  ? 'text-primary-300' 
                  : 'text-surface-400 hover:text-surface-200'
              )}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -top-1 w-8 h-1 bg-primary-400 rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium truncate max-w-16">
                {tab.label.split(' ')[0]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
