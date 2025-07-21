import { Mail, Calendar, Target, MapPin, Clock } from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import Badge, { XPBadge } from '../ui/Badge';
import { CardSkeleton } from '../ui/Loading';
import Avatar from '../ui/Avatar';
import { formatDate, getAvatarUrl } from '../../utils/dataFormatting';
import { calculateSkillsSuccessRate } from '../../utils/dataProcessing';



const ProfileSection = () => {
  const rawData = useData();



  // Use the processed data directly from DataContext instead of reprocessing
  const profileData = {
    loading: rawData.loading || false,
    hasData: Boolean(rawData.user),
    userInfo: {
      displayName: rawData.user?.firstName && rawData.user?.lastName
        ? `${rawData.user.firstName} ${rawData.user.lastName}`
        : rawData.user?.login || 'Unknown User',
      login: rawData.user?.login || 'unknown',
      email: String((rawData.user?.attrs as any)?.email || 'No email provided'),
      campus: rawData.user?.campus || 'Unknown Campus',
      avatarUrl: getAvatarUrl(rawData.user as any) || null,
      joinedDate: rawData.user?.createdAt ? new Date(rawData.user.createdAt).toLocaleDateString() : 'Unknown',
      startedDate: rawData.user?.updatedAt ? new Date(rawData.user.updatedAt).toLocaleDateString() : 'Unknown',
      // Additional user info from attrs (cast to string for display)
      phone: String(rawData.user?.attrs?.Phone || rawData.user?.attrs?.phone || ''),
      degree: String(rawData.user?.attrs?.Degree || rawData.user?.attrs?.degree || ''),
      gender: String(rawData.user?.attrs?.gender || ''),
      country: String(rawData.user?.attrs?.country || rawData.user?.attrs?.addressCountry || ''),
      jobTitle: String(rawData.user?.attrs?.jobtitle || rawData.user?.attrs?.jobTitle || ''),
      address: rawData.user?.attrs?.addressStreet ?
        `${String(rawData.user.attrs.addressStreet || '')} ${String(rawData.user.attrs.addressCity || '')}, ${String(rawData.user.attrs.addressCountry || '')}`.trim() : '',
      emergencyContact: rawData.user?.attrs?.emergencyFirstName && rawData.user?.attrs?.emergencyLastName ?
        `${String(rawData.user.attrs.emergencyFirstName)} ${String(rawData.user.attrs.emergencyLastName)}` : '',
      dateOfBirth: String(rawData.user?.attrs?.dateOfBirth || ''),
      nationality: String(rawData.user?.attrs?.nationality || rawData.user?.attrs?.countryOfBirth || ''),
      languages: String(rawData.user?.attrs?.languages || ''),
      cprNumber: String(rawData.user?.attrs?.CPRnumber || ''),
      placeOfBirth: String(rawData.user?.attrs?.placeOfBirth || ''),
      medicalInfo: String(rawData.user?.attrs?.medicalInfo || ''),
      qualification: String(rawData.user?.attrs?.qualification || ''),
      employment: String(rawData.user?.attrs?.employment || ''),
      gradDate: String(rawData.user?.attrs?.graddate || '')
    },
    levelInfo: {
      level: rawData.level || 0,
      totalXP: rawData.totalXP || 0,
      formattedXPForQuickStats: rawData.totalXP ? `${Math.round(rawData.totalXP / 1000)}K` : '0'
    },
    projectStats: {
      passed: rawData.passedProjects || 0,
      failed: rawData.failedProjects || 0,
      total: (rawData.passedProjects || 0) + (rawData.failedProjects || 0),
      passRate: rawData.passRate || 0,
      formattedPassRate: `${(rawData.passRate || 0).toFixed(1)}%`
    },
    auditStats: {
      ratio: rawData.auditRatio || 0,
      totalUp: rawData.totalUp || 0,
      totalDown: rawData.totalDown || 0,
      formattedRatio: (rawData.auditRatio || 0).toFixed(1)
    },
    skillsData: {
      hasSkills: (rawData.skills && rawData.skills.length > 0) || false,
      topSkills: (rawData.skills || []).slice(0, 5).map(skill => ({
        name: skill.name || skill.type || 'Unknown Skill',
        displayName: (skill.name || skill.type || 'Unknown Skill').replace(/_/g, ' '),
        totalXP: skill.amount || 0,
        formattedXP: `${Math.round((skill.amount || 0) / 1000)}K`,
        formattedPercentage: rawData.totalXP > 0 ? `${Math.round(((skill.amount || 0) / rawData.totalXP) * 100)}%` : '0%'
      })),
      totalSkills: (rawData.skills || []).length
    }
  };

  // Calculate success rate from skills (average of all skills in %)
  const skillsSuccessRate = rawData.skills && rawData.totalXP ?
    calculateSkillsSuccessRate(rawData.skills, rawData.totalXP) : 0;

  // Create quick stats from the processed data
  const quickStats = [
    {
      label: 'Total XP',
      value: profileData.levelInfo.formattedXPForQuickStats,
      color: 'white'
    },
    {
      label: 'Level',
      value: profileData.levelInfo.level,
      color: 'primary-400'
    },
    {
      label: 'Projects Completed',
      value: profileData.projectStats.passed,
      color: 'green-400'
    },
    {
      label: 'Success Rate',
      value: `${skillsSuccessRate.toFixed(1)}%`,
      color: 'primary-300'
    },
    {
      label: 'Audit Ratio',
      value: profileData.auditStats.formattedRatio,
      color: 'accent-300'
    }
  ];



  if (profileData.loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="space-y-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
      <div className="lg:col-span-2">
        <Card className="h-full bg-gradient-to-br from-surface-800 to-surface-900 border-surface-600">
          <Card.Header className="border-b border-surface-600">
            <Card.Title className="text-xl font-bold text-white">Profile</Card.Title>
          </Card.Header>

          <Card.Content className="p-8">
            <div className="space-y-6">
              {/* Avatar positioned above user info */}
              <div className="flex justify-start">
                <Avatar
                  user={rawData.user as any}
                  size="2xl"
                  showBorder
                  animate
                />
              </div>

              {/* Profile Info - now left-aligned below avatar */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {profileData.userInfo.displayName}
                  </h2>
                  <p className="text-primary-300 text-lg font-medium">
                    @{profileData.userInfo.login}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3 text-surface-200 bg-surface-700/50 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-primary-400" />
                    <span className="text-sm font-medium">{profileData.userInfo.email}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-surface-200 bg-surface-700/50 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent-400" />
                    <span className="text-sm font-medium">
                      {profileData.userInfo.campus}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-surface-200 bg-surface-700/50 p-3 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium">
                      Joined {profileData.userInfo.joinedDate}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-surface-200 bg-surface-700/50 p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium">
                      Started {profileData.userInfo.startedDate}
                    </span>
                  </div>
                </div>

                {/* Additional Profile Information */}
                {(profileData.userInfo.phone || profileData.userInfo.degree || profileData.userInfo.gender ||
                  profileData.userInfo.country || profileData.userInfo.jobTitle || profileData.userInfo.address ||
                  profileData.userInfo.emergencyContact || profileData.userInfo.dateOfBirth ||
                  profileData.userInfo.nationality || profileData.userInfo.languages || profileData.userInfo.cprNumber ||
                  profileData.userInfo.placeOfBirth || profileData.userInfo.qualification || profileData.userInfo.employment ||
                  profileData.userInfo.gradDate) && (
                  <div className="mt-6 pt-6 border-t border-surface-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profileData.userInfo.phone && profileData.userInfo.phone.trim() && (
                        <div className="text-sm">
                          <span className="text-surface-400">Phone:</span>
                          <span className="text-white ml-2">{profileData.userInfo.phone}</span>
                        </div>
                      )}
                      {profileData.userInfo.degree && profileData.userInfo.degree.trim() && (
                        <div className="text-sm">
                          <span className="text-surface-400">Degree:</span>
                          <span className="text-white ml-2">{profileData.userInfo.degree}</span>
                        </div>
                      )}
                      {profileData.userInfo.gender && profileData.userInfo.gender.trim() && (
                        <div className="text-sm">
                          <span className="text-surface-400">Gender:</span>
                          <span className="text-white ml-2">{profileData.userInfo.gender}</span>
                        </div>
                      )}
                      {profileData.userInfo.country && profileData.userInfo.country.trim() && (
                        <div className="text-sm">
                          <span className="text-surface-400">Country:</span>
                          <span className="text-white ml-2">{profileData.userInfo.country}</span>
                        </div>
                      )}
                      {profileData.userInfo.jobTitle && (
                        <div className="text-sm">
                          <span className="text-surface-400">Job Title:</span>
                          <span className="text-white ml-2">{profileData.userInfo.jobTitle}</span>
                        </div>
                      )}
                      {profileData.userInfo.nationality && (
                        <div className="text-sm">
                          <span className="text-surface-400">Nationality:</span>
                          <span className="text-white ml-2">{profileData.userInfo.nationality}</span>
                        </div>
                      )}
                      {profileData.userInfo.dateOfBirth && (
                        <div className="text-sm">
                          <span className="text-surface-400">Date of Birth:</span>
                          <span className="text-white ml-2">{formatDate(profileData.userInfo.dateOfBirth)}</span>
                        </div>
                      )}
                      {profileData.userInfo.address && (
                        <div className="text-sm">
                          <span className="text-surface-400">Address:</span>
                          <span className="text-white ml-2">{profileData.userInfo.address}</span>
                        </div>
                      )}
                      {profileData.userInfo.emergencyContact && (
                        <div className="text-sm">
                          <span className="text-surface-400">Emergency Contact:</span>
                          <span className="text-white ml-2">{profileData.userInfo.emergencyContact}</span>
                        </div>
                      )}
                      {profileData.userInfo.languages && (
                        <div className="text-sm">
                          <span className="text-surface-400">Languages:</span>
                          <span className="text-white ml-2">{Array.isArray(profileData.userInfo.languages) ? profileData.userInfo.languages.join(', ') : profileData.userInfo.languages}</span>
                        </div>
                      )}
                      {profileData.userInfo.cprNumber && (
                        <div className="text-sm">
                          <span className="text-surface-400">CPR Number:</span>
                          <span className="text-white ml-2">{profileData.userInfo.cprNumber}</span>
                        </div>
                      )}
                      {profileData.userInfo.placeOfBirth && (
                        <div className="text-sm">
                          <span className="text-surface-400">Place of Birth:</span>
                          <span className="text-white ml-2">{profileData.userInfo.placeOfBirth}</span>
                        </div>
                      )}
                      {profileData.userInfo.qualification && (
                        <div className="text-sm">
                          <span className="text-surface-400">Qualification:</span>
                          <span className="text-white ml-2">{profileData.userInfo.qualification}</span>
                        </div>
                      )}
                      {profileData.userInfo.employment && (
                        <div className="text-sm">
                          <span className="text-surface-400">Employment:</span>
                          <span className="text-white ml-2">{profileData.userInfo.employment}</span>
                        </div>
                      )}
                      {profileData.userInfo.gradDate && (
                        <div className="text-sm">
                          <span className="text-surface-400">Graduation Date:</span>
                          <span className="text-white ml-2">{profileData.userInfo.gradDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Stats Sidebar */}
      <div className="space-y-6">

        {/* Quick Stats */}
        <Card className="bg-gradient-to-br from-primary-900/20 to-accent-900/20 border-primary-500/30">
          <Card.Header className="border-b border-primary-500/20">
            <Card.Title className="flex items-center text-primary-300">
              <Target className="w-5 h-5 mr-2" />
              Quick Stats
            </Card.Title>
          </Card.Header>

          <Card.Content className="p-6">
            <div className="space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-surface-800/50 rounded-lg border border-surface-600/50 hover:border-primary-500/30 transition-colors">
                  <span className="text-surface-200 font-medium">{stat.label}</span>
                  <span className={`text-${stat.color} font-bold text-lg`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Skills Overview */}
        {profileData.skillsData.hasSkills && (
          <Card className="bg-gradient-to-br from-accent-900/20 to-primary-900/20 border-accent-500/30">
            <Card.Header className="border-b border-accent-500/20">
              <Card.Title className="flex items-center text-accent-300">
                <Target className="w-5 h-5 mr-2" />
                Top Skills
              </Card.Title>
            </Card.Header>

            <Card.Content className="p-6">
              <div className="space-y-3">
                {profileData.skillsData.topSkills.map((skill, index) => (
                  <div key={skill.name || index} className="flex justify-between items-center p-3 bg-surface-800/50 rounded-lg border border-surface-600/50 hover:border-accent-500/30 transition-colors">
                    <span className="text-surface-200 font-medium text-sm capitalize">{skill.displayName}</span>
                    <span className="text-accent-300 font-bold text-sm">
                      {skill.formattedPercentage}
                    </span>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        )}

        {/* TODO: Implement Piscine Performance section with piscine-specific queries */}
      </div>
    </div>
  );
};

export default ProfileSection;
