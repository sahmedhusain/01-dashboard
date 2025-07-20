/**
 * Profile Section Data Processors
 * Handles all data processing logic for ProfileSection component
 * Separates data processing from JSX presentation logic
 */

// Type definitions
interface User {
  id?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  campus?: string;
  auditRatio?: number;
  totalUp?: number;
  totalDown?: number;
  attrs?: {
    email?: string;
    Phone?: string;
    PhoneNumber?: string;
    phone?: string;
    Degree?: string;
    degree?: string;
    gender?: string;
    genders?: string;
    country?: string;
    addressCountry?: string;
    [key: string]: unknown;
  };
  profile?: {
    avatar?: string;
    avatarUrl?: string;
    picture?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface Skill {
  name?: string;
  type?: string;
  amount?: number;
  totalXP?: number;
}

interface ProcessedUserInfo {
  displayName: string;
  email: string;
  campus: string;
  avatarUrl: string | null;
  joinDate: string;
  lastActivity: string;
  login?: string;
  registrationDate?: string | null;
  joinedDate?: string;
  startedDate?: string;
  phone?: string | null;
  degree?: string | null;
  gender?: string | null;
  country?: string | null;
  [key: string]: unknown;
}

interface ProcessedLevelInfo {
  level: number;
  totalXP: number;
  formattedXP: string;
  formattedXPForQuickStats: string;
  levelProgress: number;
  formattedProgress: string;
}

interface ProcessedProjectStats {
  passed: number;
  failed: number;
  total: number;
  passRate: number;
  formattedPassRate: string;
  hasProjects: boolean;
}

interface ProcessedAuditStats {
  given: number;
  received: number;
  ratio: number;
  formattedRatio: string;
  formattedGiven: string;
  formattedReceived: string;
  hasAudits: boolean;
}

interface ProcessedSkill {
  name: string;
  displayName: string;
  totalXP: number;
  formattedXP: string;
  formattedPercentage: string;
}

interface ProcessedSkills {
  topSkills: ProcessedSkill[];
  hasSkills: boolean;
  totalSkills: number;
}

import {
  formatDate,
  formatXP,
  formatXPForQuickStats,
  getXPProgress,
  getUserDisplayName,
  getUserEmail,
  getAvatarUrl,
  formatPercentage,
  formatCampusName,
  formatAuditRatio,
  formatAuditAmount,
  formatSkillPercentage
} from '../dataFormatting';

/**
 * Process user profile basic information
 * @param user - User data
 * @returns Processed user profile info
 */
export const processUserProfileInfo = (user: User | null | undefined): ProcessedUserInfo => {
  // 🐛 DEBUG: Comprehensive logging for user profile info processing
  console.group('🔍 processUserProfileInfo Debug');
  console.log('👤 Input User:', user);

  if (!user) {
    console.log('❌ No user data provided');
    console.groupEnd();
    return {
      displayName: 'Unknown User',
      email: 'No email provided',
      campus: 'Unknown Campus',
      login: 'unknown',
      registrationDate: null,
      avatarUrl: null,
      joinedDate: 'Unknown',
      startedDate: 'Unknown',
      joinDate: 'Unknown',
      lastActivity: 'Unknown'
    };
  }

  // 🐛 DEBUG: Log avatar-related data
  console.log('🎨 Avatar Debug:');
  console.log('  - user.profile:', user.profile);
  console.log('  - user.profile?.avatar:', user.profile?.avatar);
  console.log('  - user.profile?.avatarUrl:', user.profile?.avatarUrl);
  console.log('  - user.profile?.picture:', user.profile?.picture);

  // Extract email from attrs.email if available, fallback to getUserEmail
  const attrsEmail = user.attrs && typeof user.attrs === 'object' ? user.attrs.email : null;
  const email = attrsEmail || getUserEmail(user) || 'No email provided';

  // Extract additional attrs information
  const attrs = user.attrs && typeof user.attrs === 'object' ? user.attrs : {};

  // 🐛 DEBUG: Log email and attrs processing
  console.log('📧 Email Processing:');
  console.log('  - attrsEmail:', attrsEmail);
  console.log('  - getUserEmail result:', getUserEmail(user));
  console.log('  - final email:', email);
  console.log('📋 Attrs:', attrs);

  const avatarUrl = getAvatarUrl(user);

  // 🐛 DEBUG: Log final avatar URL result
  console.log('🎨 Final Avatar URL:', avatarUrl);

  const result = {
    displayName: getUserDisplayName(user) || 'Unknown User',
    email: email,
    campus: formatCampusName(user.campus),
    login: user.login || 'unknown',
    registrationDate: user.createdAt,
    avatarUrl: avatarUrl,
    joinedDate: formatDate(user.createdAt),
    startedDate: formatDate(user.updatedAt),
    // Additional attrs information from raw data structure
    phone: attrs.Phone || attrs.PhoneNumber || attrs.phone || null,
    degree: attrs.Degree || attrs.degree || null,
    gender: attrs.gender || attrs.genders || null,
    country: attrs.country || attrs.addressCountry || null,
    jobTitle: attrs.jobtitle || attrs.jobTitle || attrs.job_title || null,
    address: `${attrs.addressStreet || ''} ${attrs.addressComplementStreet || ''}, ${attrs.addressCity || ''}, ${attrs.addressCountry || ''}`.trim().replace(/^,\s*|,\s*$/g, '') || null,
    emergencyContact: attrs.emergencyFirstName && attrs.emergencyLastName ?
      `${attrs.emergencyFirstName} ${attrs.emergencyLastName} (${attrs.emergencyAffiliation || 'Contact'}) - ${attrs.emergencyTel || ''}`.trim() : null,
    dateOfBirth: attrs.dateOfBirth || null,
    nationality: attrs.countryOfBirth || attrs.nationality || null,
    languages: attrs.languages || null,
    // Additional fields from raw data
    cprNumber: attrs.CPRnumber || null,
    placeOfBirth: attrs.placeOfBirth || null,
    medicalInfo: attrs.medicalInfo || null,
    qualification: attrs.qualification || attrs.qualifica || null,
    employment: attrs.employment || null,
    gradDate: attrs.graddate || null,
    joinDate: formatDate(user.createdAt),
    lastActivity: formatDate(user.updatedAt)
  };

  console.log('👤 Final User Profile Info Result:', result);
  console.groupEnd();

  return result;
};

/**
 * Process user level and XP information
 * @param {number} totalXP - Total XP amount
 * @param {number} level - User level
 * @returns {Object} Processed level and XP data
 */
export const processUserLevelInfo = (totalXP: number | null | undefined, level: number | null | undefined): ProcessedLevelInfo => {
  const userLevel = level || 0;
  const levelProgress = getXPProgress(totalXP, userLevel);

  return {
    level: userLevel,
    totalXP: totalXP || 0,
    formattedXP: formatXP(totalXP || 0),
    formattedXPForQuickStats: formatXPForQuickStats(totalXP || 0),
    levelProgress: levelProgress,
    formattedProgress: formatPercentage(levelProgress)
  };
};

/**
 * Process user project statistics
 * @param {number} passedProjects - Number of passed projects
 * @param {number} failedProjects - Number of failed projects
 * @param {number} passRate - Project pass rate
 * @returns {Object} Processed project statistics
 */
export const processUserProjectStats = (passedProjects: number | null | undefined, failedProjects: number | null | undefined, passRate: number | null | undefined): ProcessedProjectStats => {
  const totalProjects = (passedProjects || 0) + (failedProjects || 0);
  const projectPassRate = passRate || 0;

  return {
    passed: passedProjects || 0,
    failed: failedProjects || 0,
    total: totalProjects,
    passRate: projectPassRate,
    formattedPassRate: formatPercentage(projectPassRate),
    hasProjects: totalProjects > 0
  };
};

/**
 * Process user audit statistics
 * @param {number} auditRatio - Audit ratio
 * @param {number} totalUp - Total up audits
 * @param {number} totalDown - Total down audits
 * @returns {Object} Processed audit statistics
 */
export const processUserAuditStats = (auditRatio: number | null | undefined, totalUp: number | null | undefined, totalDown: number | null | undefined): ProcessedAuditStats => {
  const auditsGiven = totalUp || 0;
  const auditsReceived = totalDown || 0;
  const ratio = auditRatio || 0;

  return {
    given: auditsGiven,
    received: auditsReceived,
    ratio: ratio,
    formattedRatio: formatAuditRatio(ratio),
    formattedGiven: formatAuditAmount(auditsGiven),
    formattedReceived: formatAuditAmount(auditsReceived),
    hasAudits: auditsGiven > 0 || auditsReceived > 0
  };
};

/**
 * Process user skills for display (profile-specific version)
 * @param {Array} skills - User skills array
 * @param {number} totalXP - Total XP for percentage calculation
 * @param {number} maxSkills - Maximum number of skills to show
 * @returns {Object} Processed skills data
 */
export const processUserSkills = (skills: Skill[] | null | undefined, totalXP: number | null | undefined, maxSkills = 5): ProcessedSkills => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return {
      topSkills: [],
      hasSkills: false,
      totalSkills: 0
    };
  }

  const topSkills = skills
    .slice(0, maxSkills)
    .map(skill => {
      // Skills from transaction data have 'amount' field, not 'totalXP'
      const skillAmount = skill.amount || skill.totalXP || 0;
      const skillName = skill.name || skill.type?.replace(/^skill_/, '') || 'Unknown Skill';

      return {
        name: skillName,
        displayName: skillName.replace(/_/g, ' '),
        totalXP: skillAmount,
        formattedXP: formatXP(skillAmount),
        formattedPercentage: formatSkillPercentage(skillAmount, totalXP)
      };
    });

  return {
    topSkills,
    hasSkills: skills.length > 0,
    totalSkills: skills.length
  };
};

/**
 * Process complete profile section data
 * @param {Object} data - Raw data from useData hook
 * @returns {Object} Processed profile section data
 */
export const processProfileSectionData = (data: any) => {
  // 🐛 DEBUG: Comprehensive logging for profile section data processing
  console.group('🔍 processProfileSectionData Debug');
  console.log('📊 Raw Input Data:', data);

  if (!data) {
    console.log('❌ No data provided to processProfileSectionData');
    console.groupEnd();
    return {
      userInfo: processUserProfileInfo(null),
      levelInfo: processUserLevelInfo(0, 0),
      projectStats: processUserProjectStats(0, 0, 0),
      auditStats: processUserAuditStats(0, 0, 0),
      skillsData: processUserSkills([], 0),
      loading: true,
      hasData: false
    };
  }

  const {
    user,
    totalXP,
    level,
    auditRatio,
    totalUp,
    totalDown,
    skills,
    passedProjects,
    failedProjects,
    passRate,
    loading
  } = data;

  // 🐛 DEBUG: Log extracted values
  console.log('📈 Extracted Values:');
  console.log('  - user:', user);
  console.log('  - totalXP:', totalXP);
  console.log('  - level:', level);
  console.log('  - auditRatio:', auditRatio);
  console.log('  - totalUp:', totalUp);
  console.log('  - totalDown:', totalDown);
  console.log('  - skills:', skills);
  console.log('  - passedProjects:', passedProjects);
  console.log('  - failedProjects:', failedProjects);
  console.log('  - passRate:', passRate);
  console.log('  - loading:', loading);

  const result = {
    userInfo: processUserProfileInfo(user),
    levelInfo: processUserLevelInfo(totalXP, level),
    projectStats: processUserProjectStats(passedProjects, failedProjects, passRate),
    auditStats: processUserAuditStats(auditRatio, totalUp, totalDown),
    skillsData: processUserSkills(skills, totalXP),
    loading: loading || false,
    hasData: Boolean(user)
  };

  console.log('📊 Final Processed Result:', result);
  console.groupEnd();

  return result;
};

/**
 * Process profile badges data
 * @param {Object} profileData - Processed profile data
 * @returns {Array} Array of badge configurations
 */
export const processProfileBadges = (profileData: any) => {
  const badges = [];

  // XP Badge
  badges.push({
    type: 'xp',
    value: profileData.levelInfo.totalXP,
    formatted: profileData.levelInfo.formattedXP
  });

  // Projects Badge
  if (profileData.projectStats.hasProjects) {
    badges.push({
      type: 'projects',
      value: `${profileData.projectStats.passed} / ${profileData.projectStats.total}`,
      label: 'Projects'
    });
  }

  // Audit Ratio Badge
  if (profileData.auditStats.hasAudits) {
    badges.push({
      type: 'audit-ratio',
      value: profileData.auditStats.formattedRatio,
      label: 'Audit Ratio'
    });
  }

  // Success Rate Badge
  if (profileData.projectStats.passRate > 0) {
    badges.push({
      type: 'success-rate',
      value: profileData.projectStats.formattedPassRate,
      label: 'Success Rate'
    });
  }

  return badges;
};

/**
 * Process quick stats data for sidebar
 * @param {Object} profileData - Processed profile data
 * @returns {Array} Array of quick stat items
 */
export const processQuickStats = (profileData: any) => {
  // 🐛 DEBUG: Comprehensive logging for quick stats processing
  console.group('🔍 processQuickStats Debug');
  console.log('📊 Input profileData:', profileData);

  if (!profileData) {
    console.log('❌ No profile data provided to processQuickStats');
    console.groupEnd();
    return [];
  }

  // 🐛 DEBUG: Log individual sections
  console.log('⚡ Level Info:', profileData.levelInfo);
  console.log('🎯 Project Stats:', profileData.projectStats);
  console.log('🔍 Audit Stats:', profileData.auditStats);
  console.log('👤 User Info:', profileData.userInfo);

  const result = [
    {
      label: 'Total XP',
      value: profileData.levelInfo?.formattedXPForQuickStats || '0',
      color: 'white'
    },
    {
      label: 'Projects Completed',
      value: profileData.projectStats?.passed || 0,
      color: 'green-400'
    },
    {
      label: 'Success Rate',
      value: profileData.projectStats?.formattedPassRate || '0%',
      color: 'primary-300'
    },
    {
      label: 'Audit Ratio',
      value: profileData.auditStats?.formattedRatio || '0.0',
      color: 'accent-300'
    },
    {
      label: 'Campus',
      value: profileData.userInfo?.campus || 'Unknown',
      color: 'surface-200'
    }
  ];

  console.log('📊 Final Quick Stats Result:', result);
  console.groupEnd();

  return result;
};

/**
 * Validate profile data structure
 * @param {Object} data - Raw profile data
 * @returns {Object} Validation result
 */
export const validateProfileData = (data: any) => {
  const errors = [];
  const warnings = [];

  if (!data) {
    errors.push('Profile data is null or undefined');
    return { isValid: false, errors, warnings };
  }

  if (!data.user) {
    warnings.push('User data is missing');
  }

  if (typeof data.totalXP !== 'number' || data.totalXP < 0) {
    warnings.push('Invalid totalXP value');
  }

  if (typeof data.level !== 'number' || data.level < 0) {
    warnings.push('Invalid level value');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Get profile completion percentage
 * @param {Object} profileData - Processed profile data
 * @returns {number} Completion percentage (0-100)
 */
export const getProfileCompletion = (profileData: any) => {
  if (!profileData) return 0;

  const fields = [
    profileData.userInfo?.displayName,
    profileData.userInfo?.email,
    profileData.userInfo?.campus,
    profileData.levelInfo?.totalXP > 0,
    profileData.projectStats?.total > 0,
    profileData.auditStats?.hasAudits,
    profileData.skillsData?.hasSkills
  ];

  const completedFields = fields.filter(Boolean).length;
  return Math.round((completedFields / fields.length) * 100);
};
