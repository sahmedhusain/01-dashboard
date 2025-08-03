import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Award, TrendingUp } from 'lucide-react'

interface TimelineEvent {
  id: string
  date: string
  title: string
  description?: string
  type: 'achievement' | 'milestone' | 'activity' | 'deadline'
  value?: number
  metadata?: Record<string, any>
}

interface TimelineVisualizationProps {
  title: string
  events: TimelineEvent[]
  className?: string
  maxEvents?: number
  showValues?: boolean
  dateFormat?: 'short' | 'long' | 'relative'
}

const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({
  title,
  events,
  className = '',
  maxEvents = 20,
  showValues = true,
  dateFormat = 'short'
}) => {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'achievement':
        return <Award className="w-5 h-5 text-yellow-400" />
      case 'milestone':
        return <TrendingUp className="w-5 h-5 text-green-400" />
      case 'activity':
        return <Clock className="w-5 h-5 text-blue-400" />
      case 'deadline':
        return <Calendar className="w-5 h-5 text-red-400" />
    }
  }

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'achievement':
        return 'border-yellow-400 bg-yellow-400/20'
      case 'milestone':
        return 'border-green-400 bg-green-400/20'
      case 'activity':
        return 'border-blue-400 bg-blue-400/20'
      case 'deadline':
        return 'border-red-400 bg-red-400/20'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    switch (dateFormat) {
      case 'long':
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      case 'relative':
        if (diffDays === 0) return 'Today'
        if (diffDays === 1) return date < now ? 'Yesterday' : 'Tomorrow'
        if (diffDays < 7) return `${diffDays} days ${date < now ? 'ago' : 'from now'}`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      default:
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
    }
  }

  
  const sortedEvents = [...events]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, maxEvents)

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="text-white/60 text-sm">
          {events.length} events
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/20" />

        <div className="space-y-6">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex items-start gap-4"
            >
              {/* Timeline dot */}
              <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getEventColor(event.type)}`}>
                {getEventIcon(event.type)}
              </div>

              {/* Event content */}
              <div className="flex-1 bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-medium">{event.title}</h4>
                    {event.description && (
                      <p className="text-white/70 text-sm mt-1">{event.description}</p>
                    )}
                  </div>
                  
                  {showValues && event.value !== undefined && (
                    <div className="text-right">
                      <p className="text-primary-400 font-bold">
                        {event.value.toLocaleString()}
                      </p>
                      <p className="text-white/50 text-xs">
                        {event.type === 'achievement' ? 'XP' : 'Value'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white/50 text-sm">
                    {formatDate(event.date)}
                  </p>
                  
                  {event.metadata && Object.keys(event.metadata).length > 0 && (
                    <div className="flex gap-2">
                      {Object.entries(event.metadata).slice(0, 2).map(([key, value]) => (
                        <span
                          key={key}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-white/70"
                        >
                          {key}: {String(value)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {events.length > maxEvents && (
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Showing {maxEvents} of {events.length} events
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TimelineVisualization
