import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Award, Target } from 'lucide-react'
import Card from '../ui/Card'
import { formatXPValue } from '../../utils/dataFormatting'

interface PiscineStatsProps {
  piscineType: string
  totalXP: number
  projectStats: {
    passed: number
    failed: number
    passRate: number
  }
}

const PiscineStats: React.FC<PiscineStatsProps> = ({ piscineType, totalXP, projectStats }) => {
  const stats = [
    {
      label: `Piscine ${piscineType.toUpperCase()} XP`,
      value: formatXPValue(totalXP),
      icon: BookOpen,
      color: 'primary',
    },
    {
      label: 'Projects Passed',
      value: projectStats.passed,
      icon: Award,
      color: 'green',
    },
    {
      label: 'Projects Failed',
      value: projectStats.failed,
      icon: Target,
      color: 'red',
    },
    {
      label: 'Success Rate',
      value: `${projectStats.passRate}%`,
      icon: TrendingUp,
      color: 'blue',
    },
  ]

  const colors = {
    primary: 'text-primary-400',
    green: 'text-green-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
  }

  const bgColors = {
    primary: 'bg-primary-500/20',
    green: 'bg-green-500/20',
    red: 'bg-red-500/20',
    blue: 'bg-blue-500/20',
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 h-full bg-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className={`text-3xl font-bold ${colors[stat.color]}`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${bgColors[stat.color]} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${colors[stat.color]}`} />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default PiscineStats
