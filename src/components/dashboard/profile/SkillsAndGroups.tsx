import React from 'react'
import { motion } from 'framer-motion'
import { Code, Users } from 'lucide-react'

interface SkillsAndGroupsProps {
  analytics: any
}

const SkillsAndGroups: React.FC<SkillsAndGroupsProps> = ({ analytics }) => {
  if (!analytics) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Skills Analytics */}
      {analytics.skills.skillData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-orange-400" />
            All Skills & Learning Progress
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {analytics.skills.skillData.map((skill: any) => (
              <div key={skill.name} className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{skill.name}</span>
                  <span className="text-blue-400 font-bold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div 
                    className="bg-orange-400 h-2 rounded-full transition-all duration-1000" 
                    style={{width: `${Math.min(100, skill.percentage)}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Groups Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-400" />
          Groups & Collaboration
        </h3>
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Captain of</span>
              <span className="text-yellow-400 font-bold">{analytics.groups.captained}</span>
            </div>
            <div className="text-white/60 text-xs">Leading groups</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Member of</span>
              <span className="text-green-400 font-bold">{analytics.groups.member}</span>
            </div>
            <div className="text-white/60 text-xs">Participating in</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Total Groups</span>
              <span className="text-blue-400 font-bold">{analytics.groups.total}</span>
            </div>
            <div className="text-white/60 text-xs">All group activities</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SkillsAndGroups
