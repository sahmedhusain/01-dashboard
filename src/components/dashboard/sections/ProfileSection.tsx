import React from 'react'
import { motion } from 'framer-motion'
import { User as UserType } from '../../../types'
import { 
  User, Calendar, MapPin, Mail, Award, Star, Trophy, Code, Users, Target, 
  Phone, CreditCard, Heart, Home, Shield, FileText, UserCheck, AlertTriangle,
  Briefcase, Building, ExternalLink, Github, Linkedin, Globe, UserCog, Tag
} from 'lucide-react'
import Avatar from '../../ui/Avatar'
import { 
  formatXPValue, formatDate, formatAuditRatio, formatSkillPercentage,
  extractPersonalInfo, formatPhoneNumber, formatCPRNumber, getRankFromLevel
} from '../../../utils/dataFormatting'
import { useToken } from '../../../store'

interface ProfileSectionProps {
  user: UserType
  analytics: any
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user, analytics }) => {
  const userData = analytics.user
  const token = useToken()

  const getAvatarUrl = () => {
    const fileId = userData.attrs?.['pro-picUploadId'];
    if (token && fileId) {
      return `https://learn.reboot01.com/api/storage?token=${token}&fileId=${fileId}`;
    }
    return null;
  };

  // Total skill points calculation no longer needed - skills show latest amounts directly
  const personalInfo = extractPersonalInfo(userData.attrs || {});

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* User Info Container - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Profile Information */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar
                  user={{
                    ...userData,
                    attrs: {
                      ...userData.attrs,
                      avatarUrl: getAvatarUrl()
                    }
                  }}
                  size="2xl"
                  className="ring-4 ring-white/20 shadow-2xl"
                />
                {analytics.performance && (
                  <div className="absolute -bottom-2 -right-2 bg-primary-500 rounded-full p-2 border-2 border-white/20">
                    <span className="text-lg">{analytics.performance.badge}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {userData.attrs?.displayName || 
                   `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 
                   user.login}
                </h2>
                <p className="text-white/70 text-lg mb-3">@{user.login}</p>
                
                {analytics.performance && (
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary-500/20 px-3 py-1 rounded-lg border border-primary-500/30">
                      <span className="text-primary-400 font-semibold text-sm">
                        {analytics.performance.notation}
                      </span>
                    </div>
                    {analytics.rawData?.userLabels && analytics.rawData.userLabels.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {analytics.rawData.userLabels.map((userLabel: any) => (
                          <div 
                            key={userLabel.id} 
                            className="bg-cyan-400/20 px-3 py-1 rounded-lg border border-cyan-400/30"
                            title={userLabel.label.description}
                          >
                            <span className="text-cyan-400 font-semibold text-sm">
                              {userLabel.label.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Complete Contact & Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  Contact Information
                </h3>
                
                {personalInfo.email && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-white">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Phone className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-white">{formatPhoneNumber(personalInfo.phone)}</span>
                  </div>
                )}
                {personalInfo.alternativePhone && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Phone className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-white/70">Alt: {formatPhoneNumber(personalInfo.alternativePhone)}</span>
                  </div>
                )}
                {(personalInfo.address?.street || personalInfo.address?.city) && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <MapPin className="h-4 w-4 text-purple-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Address</span>
                      <div className="text-sm text-white">
                        {personalInfo.address?.street && personalInfo.address?.complementStreet && 
                          `${personalInfo.address.street}, Building ${personalInfo.address.complementStreet}`}
                        {personalInfo.address?.street && !personalInfo.address?.complementStreet && 
                          personalInfo.address.street}
                        {personalInfo.address?.city && 
                          `, ${personalInfo.address.city}`}
                        {personalInfo.address?.postalCode && 
                          ` ${personalInfo.address.postalCode}`}
                        {`, ${personalInfo.address?.country || 'Bahrain'}`}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-white">Joined {formatDate(userData.createdAt)}</span>
                </div>
              </div>

              {/* Identity Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-green-400" />
                  Identity Information
                </h3>
                
                {personalInfo.cprNumber && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <CreditCard className="h-4 w-4 text-blue-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">CPR Number</span>
                      <div className="text-sm text-white font-mono">{formatCPRNumber(personalInfo.cprNumber)}</div>
                    </div>
                  </div>
                )}
                {personalInfo.nationalId && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <FileText className="h-4 w-4 text-green-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">National ID</span>
                      <div className="text-sm text-white font-mono">{personalInfo.nationalId}</div>
                    </div>
                  </div>
                )}
                {personalInfo.studentId && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <User className="h-4 w-4 text-cyan-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Student ID</span>
                      <div className="text-sm text-white font-mono">{personalInfo.studentId}</div>
                    </div>
                  </div>
                )}
                {personalInfo.dateOfBirth && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Date of Birth</span>
                      <div className="text-sm text-white">{formatDate(personalInfo.dateOfBirth)}</div>
                    </div>
                  </div>
                )}
                {personalInfo.nationality && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Shield className="h-4 w-4 text-orange-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Nationality</span>
                      <div className="text-sm text-white">{personalInfo.nationality}</div>
                    </div>
                  </div>
                )}
                {personalInfo.placeOfBirth && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <MapPin className="h-4 w-4 text-pink-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Place of Birth</span>
                      <div className="text-sm text-white">{personalInfo.placeOfBirth}, {personalInfo.countryOfBirth || 'Bahrain'}</div>
                    </div>
                  </div>
                )}
                {personalInfo.gender && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <User className="h-4 w-4 text-indigo-400" />
                    <div className="flex-1">
                      <span className="text-xs text-white/60">Gender</span>
                      <div className="text-sm text-white">{personalInfo.gender}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Information */}
            {(personalInfo.currentEmployer || personalInfo.jobTitle || personalInfo.workExperience || personalInfo.employment) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                    Professional Information
                  </h3>
                  
                  {personalInfo.jobTitle && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <UserCheck className="h-4 w-4 text-green-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Job Title</span>
                        <div className="text-sm text-white">{personalInfo.jobTitle}</div>
                      </div>
                    </div>
                  )}
                  
                  {personalInfo.employment && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <Briefcase className="h-4 w-4 text-orange-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Employment Status</span>
                        <div className="text-sm text-white">{personalInfo.employment}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Educational Background */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-purple-400" />
                    Educational Background
                  </h3>
                  
                  {personalInfo.degree && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Qualification</span>
                        <div className="text-sm text-white">{personalInfo.degree}</div>
                      </div>
                    </div>
                  )}                 
                  {personalInfo.graduationDate && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Graduation Date</span>
                        <div className="text-sm text-white">{personalInfo.graduationDate}</div>
                      </div>
                    </div>
                  )}
                  
                  {personalInfo.qualification && (
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <Award className="h-4 w-4 text-green-400" />
                      <div className="flex-1">
                        <span className="text-xs text-white/60">Qualification Level</span>
                        <div className="text-sm text-white">{personalInfo.qualification}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* User Roles */}
            {analytics.rawData?.userRoles && analytics.rawData.userRoles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <UserCog className="w-5 h-5 mr-2 text-yellow-400" />
                  User Roles
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {analytics.rawData.userRoles.map((userRole: any) => (
                    <div 
                      key={userRole.id} 
                      className="bg-yellow-400/20 px-3 py-2 rounded-lg border border-yellow-400/30"
                      title={userRole.role.description}
                    >
                      <span className="text-yellow-400 font-semibold text-sm">
                        {userRole.role.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            {personalInfo.emergencyContact?.name && (
              <div className="bg-white/5 rounded-lg p-4 border border-red-500/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-400" />
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-white/60">Name</span>
                    <div className="text-sm text-white font-medium">{personalInfo.emergencyContact.name}</div>
                  </div>
                  {personalInfo.emergencyContact.phone && (
                    <div>
                      <span className="text-xs text-white/60">Phone</span>
                      <div className="text-sm text-white font-mono">{formatPhoneNumber(personalInfo.emergencyContact.phone)}</div>
                    </div>
                  )}
                  {personalInfo.emergencyContact.relationship && (
                    <div>
                      <span className="text-xs text-white/60">Relationship</span>
                      <div className="text-sm text-white">{personalInfo.emergencyContact.relationship}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Level Container - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/30 backdrop-blur-lg rounded-2xl p-6 border border-primary-500/30 shadow-2xl">
              {/* Level Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-4">
                  <Trophy className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Current Level</h3>
                <div className="text-6xl font-bold text-white mb-2 bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                  {analytics.level.current}
                </div>
                <div className="text-sm text-white/70">{analytics.performance?.notation || 'Student'}</div>
              </div>

              {/* Progress Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {/* Background circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - analytics.level.progress / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {analytics.level.progress.toFixed(1)}%
                    </div>
                    <div className="text-xs text-white/60 text-center">
                      Progress to<br />Level {analytics.level.current + 1}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Details */}
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Current Progress</span>
                    <span className="text-primary-400 font-bold">{analytics.level.progressInKB?.toFixed(1) || '0.0'} kB</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-400 to-primary-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analytics.level.progress}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Remaining to Next Level</span>
                    <span className="text-orange-400 font-bold">{analytics.level.remainingInKB?.toFixed(1) || '100.0'} kB</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Total XP Earned</span>
                    <span className="text-green-400 font-bold">{formatXPValue(analytics.xp.total)}</span>
                  </div>
                </div>
              </div>

              {/* Next Level Preview */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-white/60 text-xs mb-2">Next Level Unlocks</div>
                  <div className="text-sm text-white font-medium">
                    {getRankFromLevel(analytics.level.current + 1).notation}
                  </div>
                  <div className="text-2xl mt-2">
                    {getRankFromLevel(analytics.level.current + 1).badge}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Achievements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            Academic Achievements
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">Total XP Earned</span>
              </div>
              <span className="text-blue-400 font-bold">{formatXPValue(analytics.xp.total)}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Audit Ratio</span>
              </div>
              <span className="text-green-400 font-bold">{formatAuditRatio(analytics.audits.ratio)}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-white text-sm">Projects Completed</span>
              </div>
              <span className="text-purple-400 font-bold">{analytics.projects.completed}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Code className="w-5 h-5 text-orange-400" />
                <span className="text-white text-sm">Skills Mastered</span>
              </div>
              <span className="text-orange-400 font-bold">{analytics.skills.total}</span>
            </div>
          </div>
        </motion.div>

        {/* Community Involvement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-400" />
            Community Involvement
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">Audits Given</span>
              </div>
              <span className="text-blue-400 font-bold">{analytics.audits.given}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-sm">Groups Led</span>
              </div>
              <span className="text-yellow-400 font-bold">{analytics.groups.captained}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Group Participations</span>
              </div>
              <span className="text-green-400 font-bold">{analytics.groups.total}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="text-white text-sm">Success Rate</span>
              </div>
              <span className="text-purple-400 font-bold">{analytics.projects.passRate.toFixed(1)}%</span>
            </div>
          </div>
        </motion.div>
      </div>


      {/* Top Skills Display */}
      {analytics.skills.top.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-orange-400" />
            Top Skills
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.skills.top.slice(0, 6).map((skill: any, index: number) => (
              <div key={skill.name} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm font-medium capitalize">
                    {skill.name.replace(/-/g, ' ')}
                  </span>
                  <span className="text-orange-400 font-bold text-sm">
                    {formatSkillPercentage(skill.currentAmount)}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-orange-400 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${skill.currentAmount}%`
                    }}
                  />
                </div>
                <div className="text-white/60 text-xs mt-1">
                  Rank #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Module Progress Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-blue-400" />
          Learning Journey Overview
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BH Module Progress */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">BH Module (Main Curriculum)</h4>
              <span className="text-blue-400 font-bold">{formatXPValue(analytics.xp.bhModule)}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Projects:</span>
                <span>{analytics.projects.bhModule?.total || analytics.projects.bhModule || 0}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Current Level:</span>
                <span>{analytics.level.current}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-400 h-2 rounded-full"
                  style={{ width: `${(analytics.xp.bhModule / analytics.xp.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Piscines Progress */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Piscines (Intensive Training)</h4>
              <span className="text-green-400 font-bold">{formatXPValue(analytics.xp.piscines)}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Projects:</span>
                <span>{analytics.projects.piscines?.total || analytics.projects.piscines || 0}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Modules:</span>
                <span>{analytics.moduleData?.piscines || 0}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: `${(analytics.xp.piscines / analytics.xp.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfileSection