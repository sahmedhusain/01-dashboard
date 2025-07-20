import { Mail, Calendar, Target, MapPin, Clock } from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import Badge, { XPBadge } from '../ui/Badge';
import { CardSkeleton } from '../ui/Loading';
import Avatar from '../ui/Avatar';
import { formatDate } from '../../utils/dataFormatting';
import {
  processProfileSectionData,
  processProfileBadges,
  processQuickStats
} from '../../utils/componentDataProcessors/profileProcessors';

const ProfileSection = () => {
  const rawData = useData();

  // Process all profile data using utility functions
  const profileData = processProfileSectionData(rawData);
  const _badges = processProfileBadges(profileData); // Badges for future use
  const quickStats = processQuickStats(profileData);

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
        <Card className="h-full">
          <Card.Header>
            <Card.Title>Profile</Card.Title>
          </Card.Header>
          
          <Card.Content>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar
                  user={{
                    ...rawData.user,
                    avatarUrl: profileData.userInfo.avatarUrl,
                    displayName: profileData.userInfo.displayName
                  }}
                  size="xl"
                  showBorder
                  animate
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {profileData.userInfo.displayName}
                  </h2>
                  <p className="text-surface-300">
                    @{profileData.userInfo.login}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-surface-300">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{profileData.userInfo.email}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-surface-300">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {profileData.userInfo.campus}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-surface-300">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Account Created At {profileData.userInfo.joinedDate}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-surface-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      Started {profileData.userInfo.startedDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <XPBadge xp={profileData.levelInfo.totalXP} />
                  <Badge variant="primary">
                    {profileData.projectStats.passed} Projects Completed
                  </Badge>
                  {profileData.projectStats.passRate > 0 && (
                    <Badge variant="success">
                      {profileData.projectStats.formattedPassRate} Success Rate
                    </Badge>
                  )}
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
                      {profileData.userInfo.phone && (
                        <div className="text-sm">
                          <span className="text-surface-400">Phone:</span>
                          <span className="text-white ml-2">{profileData.userInfo.phone}</span>
                        </div>
                      )}
                      {profileData.userInfo.degree && (
                        <div className="text-sm">
                          <span className="text-surface-400">Degree:</span>
                          <span className="text-white ml-2">{profileData.userInfo.degree}</span>
                        </div>
                      )}
                      {profileData.userInfo.gender && (
                        <div className="text-sm">
                          <span className="text-surface-400">Gender:</span>
                          <span className="text-white ml-2">{profileData.userInfo.gender}</span>
                        </div>
                      )}
                      {profileData.userInfo.country && (
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
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Quick Stats
            </Card.Title>
          </Card.Header>
          
          <Card.Content>
            <div className="space-y-3">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-surface-300">{stat.label}</span>
                  <span className={`text-${stat.color} font-semibold`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Skills Overview */}
        {profileData.skillsData.hasSkills && (
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Top Skills
              </Card.Title>
            </Card.Header>

            <Card.Content>
              <div className="space-y-2">
                {profileData.skillsData.topSkills.map((skill, index) => (
                  <div key={skill.name || index} className="flex justify-between items-center">
                    <span className="text-surface-300 text-sm">{skill.displayName}</span>
                    <span className="text-primary-300 font-medium text-sm">
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
