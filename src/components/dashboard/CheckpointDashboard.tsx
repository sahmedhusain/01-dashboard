import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Target, TrendingUp, Award } from 'lucide-react'
import { useQuery } from '@apollo/client'
import { GET_ALL_USER_CHECKPOINT_DATA } from '../../graphql/queries'
import { User } from '../../types'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import {
  formatModuleXP,
  separateModuleData,
  calculateModuleXPTotals,
  getRelativeTime
} from '../../utils/dataFormatting'

interface CheckpointDashboardProps {
  user: User
}

const CheckpointDashboard: React.FC<CheckpointDashboardProps> = ({ user }) => {
  const [activeCheckpointTab, setActiveCheckpointTab] = useState<string>('main')

  // Query all checkpoint data
  const { data: checkpointData, loading, error } = useQuery(GET_ALL_USER_CHECKPOINT_DATA, {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-400">
          <p>Error loading checkpoint data</p>
          <p className="text-sm text-white/60 mt-2">{error.message}</p>
        </div>
      </Card>
    )
  }

  // Process checkpoint data
  const mainCheckpoints = checkpointData?.mainCheckpoints || []
  const goPiscineCheckpoints = checkpointData?.goPiscineCheckpoints || []
  const otherPiscineCheckpoints = checkpointData?.otherPiscineCheckpoints || []
  
  const mainCheckpointAggregate = checkpointData?.mainCheckpointAggregate?.aggregate
  const goPiscineCheckpointAggregate = checkpointData?.goPiscineCheckpointAggregate?.aggregate
  const otherPiscineCheckpointAggregate = checkpointData?.otherPiscineCheckpointAggregate?.aggregate

  // Detect available checkpoint types
  const availableCheckpointTypes = []
  if (mainCheckpoints.length > 0) availableCheckpointTypes.push('main')
  if (goPiscineCheckpoints.length > 0) availableCheckpointTypes.push('go')
  if (otherPiscineCheckpoints.length > 0) availableCheckpointTypes.push('piscines')

  // Detect specific piscine checkpoint types
  const detectPiscineCheckpointTypes = (checkpoints: any[]) => {
    const piscineSet = new Set<string>()
    
    checkpoints.forEach(checkpoint => {
      const path = checkpoint.path
      const piscineMatch = path.match(/\/bahrain\/bh-module\/piscine-([^\/]+)\/checkpoint\//)
      if (piscineMatch) {
        piscineSet.add(piscineMatch[1])
      }
    })
    
    return Array.from(piscineSet)
  }

  const piscineCheckpointTypes = detectPiscineCheckpointTypes(otherPiscineCheckpoints)

  if (availableCheckpointTypes.length === 0) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Checkpoints Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Your checkpoint progress and achievements
          </p>
        </motion.div>

        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="w-16 h-16 text-white/30" />
            <h3 className="text-xl font-semibold text-white">No Checkpoints Found</h3>
            <p className="text-white/60">
              You haven't completed any checkpoints yet. Checkpoints will appear here once you start completing them.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Checkpoints Dashboard
        </h1>
        <p className="text-white/70 text-lg">
          Your checkpoint progress and achievements
        </p>
      </motion.div>

      {/* Checkpoint Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Module Checkpoints */}
        {mainCheckpoints.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Target className="w-6 h-6 text-primary-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">Main Module</h3>
              </div>
              <span className="text-2xl font-bold text-primary-400">
                {mainCheckpointAggregate?.count || 0}
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-white/60 text-sm">Total XP</div>
              <div className="text-xl font-bold text-white">
                {formatModuleXP(mainCheckpointAggregate?.sum?.amount || 0)}
              </div>
            </div>
          </Card>
        )}

        {/* Go Piscine Checkpoints */}
        {goPiscineCheckpoints.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">Go Piscine</h3>
              </div>
              <span className="text-2xl font-bold text-green-400">
                {goPiscineCheckpointAggregate?.count || 0}
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-white/60 text-sm">Total XP</div>
              <div className="text-xl font-bold text-white">
                {formatModuleXP(goPiscineCheckpointAggregate?.sum?.amount || 0)}
              </div>
            </div>
          </Card>
        )}

        {/* Other Piscine Checkpoints */}
        {otherPiscineCheckpoints.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Award className="w-6 h-6 text-yellow-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">Other Piscines</h3>
              </div>
              <span className="text-2xl font-bold text-yellow-400">
                {otherPiscineCheckpointAggregate?.count || 0}
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-white/60 text-sm">Total XP</div>
              <div className="text-xl font-bold text-white">
                {formatModuleXP(otherPiscineCheckpointAggregate?.sum?.amount || 0)}
              </div>
              {piscineCheckpointTypes.length > 0 && (
                <div className="text-white/60 text-sm">
                  Types: {piscineCheckpointTypes.join(', ')}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Checkpoint Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <nav className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {availableCheckpointTypes.map((type) => (
              <motion.button
                key={type}
                onClick={() => setActiveCheckpointTab(type)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeCheckpointTab === type
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {type === 'main' ? 'Main Module' : 
                 type === 'go' ? 'Go Piscine' : 
                 'Other Piscines'}
              </motion.button>
            ))}
          </div>
        </nav>
      </motion.div>

      {/* Active Checkpoint Content */}
      <motion.div
        key={activeCheckpointTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            {activeCheckpointTab === 'main' ? 'Main Module Checkpoints' :
             activeCheckpointTab === 'go' ? 'Go Piscine Checkpoints' :
             'Other Piscine Checkpoints'}
          </h3>
          
          {/* Checkpoint List */}
          <div className="space-y-4">
            {(activeCheckpointTab === 'main' ? mainCheckpoints :
              activeCheckpointTab === 'go' ? goPiscineCheckpoints :
              otherPiscineCheckpoints).map((checkpoint: any) => (
              <div key={checkpoint.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{checkpoint.object?.name || 'Checkpoint'}</h4>
                    <p className="text-white/60 text-sm">{checkpoint.path}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-400">
                      {formatModuleXP(checkpoint.amount)}
                    </div>
                    <div className="text-white/60 text-sm">
                      {getRelativeTime(checkpoint.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default CheckpointDashboard
