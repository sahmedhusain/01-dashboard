import React from 'react'
import { motion } from 'framer-motion'
import { User as UserIcon, MapPin, Calendar, Mail, Phone, Award, Star, Trophy } from 'lucide-react'
import { useQuery, gql } from '@apollo/client'
import { GET_USER_BY_ID } from '../../graphql/coreQueries'
import { User } from '../../types'
import Avatar from '../ui/Avatar'
import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import {
  formatAuditRatio,
  formatAuditMB,
  extractContactInfo,
  getPerformanceNotation,
  formatDate
} from '../../utils/dataFormatting'

interface ProfileSectionProps {
  user: User
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  const { data, loading, error } = useQuery(gql(GET_USER_BY_ID), {
    variables: { userId: user.id },
    errorPolicy: 'all'
  })

  if (loading) return <LoadingSpinner />
  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-400">
          <p>Error loading profile data</p>
          <p className="text-sm text-white/60 mt-2">{error.message}</p>
        </div>
      </Card>
    )
  }

  const userData = data?.user?.[0]
  if (!userData) {
    return (
      <Card className="p-6">
        <div className="text-center text-white/60">
          <p>No profile data available</p>
        </div>
      </Card>
    )
  }

  const profileInfo = userData.profile || {}
  const attrs = userData.attrs || {}
  const contactInfo = extractContactInfo(attrs)
  const performanceNotation = getPerformanceNotation(userData.auditRatio || 0)

  return (
    <div className="space-y-6">
      {/* Debug Component */}
      <GraphQLTest userId={user.id} />
      {/* Main Profile Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Avatar user={userData} size="2xl" showBorder animate />
          </motion.div>

          {/* User Info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {userData.firstName && userData.lastName 
                  ? `${userData.firstName} ${userData.lastName}`
                  : userData.login
                }
              </h2>
              <p className="text-primary-400 font-medium mb-1">@{userData.login}</p>

              {/* Performance Notation */}
              <div className={`flex items-center mb-2 ${performanceNotation.color}`}>
                <span className="mr-2">{performanceNotation.badge}</span>
                <span className="font-medium">{performanceNotation.notation}</span>
                <span className="text-white/60 text-sm ml-2">• {performanceNotation.description}</span>
              </div>

              {/* Campus */}
              {userData.campus && (
                <div className="flex items-center text-white/70 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="capitalize">{userData.campus}</span>
                </div>
              )}

              {/* Join Date */}
              <div className="flex items-center text-white/70">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Joined {formatDate(userData.createdAt)}</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 text-center"
          >
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-primary-400">
                {formatAuditRatio(userData.auditRatio)}
              </div>
              <div className="text-xs text-white/60">Audit Ratio</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">
                {formatAuditMB(userData.totalUp)}
              </div>
              <div className="text-xs text-white/60">Audits Given</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">
                {formatAuditMB(userData.totalDown)}
              </div>
              <div className="text-xs text-white/60">Audits Received</div>
            </div>
          </motion.div>
        </div>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-primary-400" />
            Contact Information
          </h3>
          <div className="space-y-3">
            {contactInfo?.personal?.email && (
              <div className="flex items-center text-white/80">
                <Mail className="w-4 h-4 mr-3 text-white/50" />
                <span>{contactInfo.personal.email}</span>
              </div>
            )}
            {contactInfo?.personal?.phone && (
              <div className="flex items-center text-white/80">
                <Phone className="w-4 h-4 mr-3 text-white/50" />
                <span>{contactInfo.personal.phone}</span>
              </div>
            )}
            {contactInfo?.address?.city && contactInfo?.address?.country && (
              <div className="flex items-center text-white/80">
                <MapPin className="w-4 h-4 mr-3 text-white/50" />
                <span>{contactInfo.address.city}, {contactInfo.address.country}</span>
              </div>
            )}
            {!contactInfo?.personal?.email && !contactInfo?.personal?.phone && (
              <p className="text-white/50 text-sm">No contact information available</p>
            )}
          </div>
        </Card>

        {/* Profile Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <UserIcon className="w-5 h-5 mr-2 text-primary-400" />
            Profile Details
          </h3>
          <div className="space-y-3">
            {attrs.country && (
              <div>
                <span className="text-white/60 text-sm">Country:</span>
                <p className="text-white/80">{attrs.country}</p>
              </div>
            )}
            {attrs.degree && (
              <div>
                <span className="text-white/60 text-sm">Education:</span>
                <p className="text-white/80">{attrs.degree}</p>
              </div>
            )}
            {profileInfo.bio && (
              <div>
                <span className="text-white/60 text-sm">Bio:</span>
                <p className="text-white/80">{profileInfo.bio}</p>
              </div>
            )}
            {!attrs.country && !attrs.degree && !profileInfo.bio && (
              <p className="text-white/50 text-sm">No additional details available</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProfileSection
