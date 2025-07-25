// ============================================================================
// DATA FORMATTING UTILITIES
// Functions for formatting and displaying data in components
// ============================================================================

import config from '../config/appConfig';

// ============================================================================
// XP FORMATTING
// ============================================================================

/**
 * Format XP values for display (rounded kB integers without 'XP' suffix per user preference)
 * @param xp - XP value to format
 * @returns Formatted XP string
 */
// TOTAL XP: Always in kB format (e.g., 1300 kB)
export const formatTotalXP = (xp: number | null | undefined): string => {
  if (!xp || isNaN(xp)) return '0 kB';
  const kbValue = Math.round(xp / 1000);
  return `${kbValue} kB`;
};

// MODULE/PISCINE XP: Always in kB format (e.g., 621 kB, 680 kB) - NOT MB!
export const formatModuleXP = (xp: number | null | undefined): string => {
  if (!xp || isNaN(xp)) return '0 kB';
  const kbValue = Math.round(xp / 1000);
  return `${kbValue} kB`;
};

// AUDIT VALUES: Always in MB format (e.g., 2.8 MB, 1.5 MB)
export const formatAuditMB = (auditValue: number | null | undefined): string => {
  if (!auditValue || isNaN(auditValue)) return '0.0 MB';
  const mbValue = (auditValue / 1000000).toFixed(1);
  return `${mbValue} MB`;
};

// Legacy formatXP for backward compatibility - use formatModuleXP instead
export const formatXP = formatModuleXP;

/**
 * Format XP values for quick stats (kB format, no decimals, no "XP" word)
 * @param xp - XP value to format
 * @returns Formatted XP string for quick stats
 */
export const formatXPForQuickStats = (xp: number | null | undefined): string => {
  if (!xp || isNaN(xp)) return '0 kB';

  // ALWAYS format as kB (never show M) - user preference
  // Convert to kB and round to integer
  const kbValue = Math.round(xp / 1000);
  return `${kbValue} kB`;
};





/**
 * Get XP progress percentage for level progression
 * @param currentXP - Current XP amount
 * @param level - Current level
 * @returns Progress percentage (0-100)
 */
export const getXPProgress = (currentXP: number | null | undefined, level: number | null | undefined): number => {
  if (!currentXP || !level) return 0;
  
  // Simple calculation - each level requires 1000 XP more than the previous
  const currentLevelXP = level * 1000;
  const nextLevelXP = (level + 1) * 1000;
  const progressXP = currentXP - currentLevelXP;
  const requiredXP = nextLevelXP - currentLevelXP;
  
  return Math.min(100, Math.max(0, (progressXP / requiredXP) * 100));
};

// ============================================================================
// USER DATA FORMATTING
// ============================================================================

interface User {
  firstName?: string;
  lastName?: string;
  login?: string;
}

/**
 * Get user display name from user data
 * @param user - User object
 * @returns Formatted display name
 */
export const getUserDisplayName = (user: User | null | undefined): string => {
  if (!user) return 'Unknown User';
  
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstName) {
    return user.firstName;
  }
  if (user.lastName) {
    return user.lastName;
  }
  if (user.login) {
    return user.login;
  }
  return 'Unknown User';
};

interface UserWithEmail extends User {
  attrs?: {
    email?: string;
  };
  email?: string;
}

/**
 * Get user email from user data
 * @param user - User object
 * @returns User email or fallback
 */
export const getUserEmail = (user: UserWithEmail | null | undefined): string => {
  if (!user) return '';

  // Check attrs.email first (primary source from GraphQL)
  if (user.attrs && user.attrs.email) {
    return user.attrs.email;
  }

  // Fallback to direct email field or login
  return user.email || user.login || '';
};

/**
 * Format campus name with proper capitalization
 * @param campus - Campus name to format
 * @returns Formatted campus name
 */
export const formatCampusName = (campus: string | null | undefined): string => {
  if (!campus) return 'Unknown Campus';
  return campus.charAt(0).toUpperCase() + campus.slice(1).toLowerCase();
};

interface UserWithAvatar extends User {
  profile?: {
    avatar?: string;
    avatarUrl?: string;
    picture?: string;
    image?: string;
    photo?: string;
  };
  attrs?: {
    [key: string]: any;
    'pro-picUploadId'?: string;
  };
  avatar?: string;
  avatarUrl?: string;
  picture?: string;
  image?: string;
  photo?: string;
}

/**
 * Get avatar URL for user from GraphQL endpoint
 * @param user - User object from GraphQL query
 * @returns Avatar URL or fallback
 */
export const getAvatarUrl = (user: UserWithAvatar | null | undefined): string | null => {
  // 🐛 DEBUG: Comprehensive avatar URL debugging
  console.group('🎨 getAvatarUrl Debug');
  console.log('👤 Input User:', user);

  if (!user) {
    console.log('❌ No user provided');
    console.groupEnd();
    return null;
  }

  console.log('🔍 Avatar Field Analysis:');
  console.log('  - user.profile:', user.profile);
  console.log('  - user.attrs:', user.attrs);
  console.log('  - user.avatar:', user.avatar);
  console.log('  - user.avatarUrl:', user.avatarUrl);
  console.log('  - user.picture:', user.picture);
  console.log('  - user.image:', user.image);
  console.log('  - user.login:', user.login);

  // Based on GetUserComplete.txt analysis:
  // - profile field is an empty object {}
  // - actual avatar data is in attrs["pro-picUploadId"]
  // - need to construct URL from upload ID

  // Check for profile picture upload ID in attrs (primary source for reboot01)
  if (user.attrs && typeof user.attrs === 'object') {
    const proUploadId = (user.attrs as any)['pro-picUploadId'];
    console.log('  - attrs.pro-picUploadId:', proUploadId);
    if (proUploadId && typeof proUploadId === 'string') {
      // Use dynamic avatar configuration for URL patterns
      const possibleUrls = [
        `${config.avatar.providers.backblaze.baseUrl}/${proUploadId}`,
        `${config.avatar.providers.backblaze.apiUrl}?fileId=${proUploadId}`,
        `${config.api.baseURL}/profile-picture/${proUploadId}`,
        // Fallback to a test avatar for debugging
        'https://via.placeholder.com/128x128/4F46E5/FFFFFF?text=Avatar'
      ];

      // For now, use the first format but log all possibilities
      const avatarUrl = possibleUrls[0];
      console.log('🎯 Constructed avatar URL from upload ID:', avatarUrl);
      console.log('🔗 Upload ID:', proUploadId);
      console.log('🔗 All possible URLs:', possibleUrls);
      console.groupEnd();
      return avatarUrl;
    }
  }

  // Check for avatar in user.profile object (fallback)
  if (user.profile && typeof user.profile === 'object') {
    console.log('✅ Profile object found, checking fields...');
    console.log('  - profile.avatar:', user.profile.avatar);
    console.log('  - profile.avatarUrl:', user.profile.avatarUrl);
    console.log('  - profile.picture:', user.profile.picture);
    console.log('  - profile.image:', user.profile.image);
    console.log('  - profile.photo:', user.profile.photo);

    // Common avatar field names in profile
    if (user.profile.avatar) {
      console.log('🎯 Found avatar in profile.avatar:', user.profile.avatar);
      console.groupEnd();
      return user.profile.avatar;
    }
    if (user.profile.avatarUrl) {
      console.log('🎯 Found avatar in profile.avatarUrl:', user.profile.avatarUrl);
      console.groupEnd();
      return user.profile.avatarUrl;
    }
    if (user.profile.picture) {
      console.log('🎯 Found avatar in profile.picture:', user.profile.picture);
      console.groupEnd();
      return user.profile.picture;
    }
    if (user.profile.image) {
      console.log('🎯 Found avatar in profile.image:', user.profile.image);
      console.groupEnd();
      return user.profile.image;
    }
    if (user.profile.photo) {
      console.log('🎯 Found avatar in profile.photo:', user.profile.photo);
      console.groupEnd();
      return user.profile.photo;
    }
  }

  // Check for direct avatar field on user object
  console.log('🔍 Checking direct user fields...');
  if (user.avatar) {
    console.log('🎯 Found avatar in user.avatar:', user.avatar);
    console.groupEnd();
    return user.avatar;
  }
  if (user.avatarUrl) {
    console.log('🎯 Found avatar in user.avatarUrl:', user.avatarUrl);
    console.groupEnd();
    return user.avatarUrl;
  }
  if (user.picture) {
    console.log('🎯 Found avatar in user.picture:', user.picture);
    console.groupEnd();
    return user.picture;
  }
  if (user.image) {
    console.log('🎯 Found avatar in user.image:', user.image);
    console.groupEnd();
    return user.image;
  }

  // Try platform-specific avatar endpoints
  if (user.login) {
    const githubAvatar = `https://github.com/${user.login}.png?size=128`;
    console.log('🔄 Using GitHub fallback avatar:', githubAvatar);
    console.groupEnd();
    // Try GitHub avatar pattern (common fallback for reboot01 users)
    // The Avatar component will handle 404s gracefully and fall back to initials
    return githubAvatar;
  }

  // No avatar found - return null to trigger fallback in Avatar component
  console.log('❌ No avatar found, returning null');
  console.groupEnd();
  return null;
};

// ============================================================================
// DATE FORMATTING
// ============================================================================

/**
 * Format date for display
 * @param dateInput - Date to format
 * @returns Formatted date string
 */
export const formatDate = (dateInput: string | Date | null | undefined): string => {
  if (!dateInput) return '';
  
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return '';
  }
};

/**
 * Format date and time for display
 * @param dateInput - Date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (dateInput: string | Date | null | undefined): string => {
  if (!dateInput) return '';
  
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};

// ============================================================================
// PERCENTAGE AND NUMERIC FORMATTING
// ============================================================================

/**
 * Format percentage for display
 * @param value - Value to format as percentage
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number | null | undefined, decimals = 1): string => {
  if (value == null || isNaN(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Calculate percentage from two values
 * @param {number} value - Numerator value
 * @param {number} total - Denominator value
 * @returns {number} Percentage (0-100)
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

// ============================================================================
// SKILL AND PROFICIENCY FORMATTING
// ============================================================================

/**
 * Calculate proficiency level from skill amount
 * @param {number} amount - Skill amount/XP
 * @returns {string} Proficiency level
 */
export const calculateProficiencyLevel = (amount) => {
  if (!amount || amount < 100) return 'Beginner';
  if (amount < 500) return 'Novice';
  if (amount < 1000) return 'Intermediate';
  if (amount < 2000) return 'Advanced';
  if (amount < 5000) return 'Expert';
  return 'Master';
};

/**
 * Get skill color based on proficiency
 * @param {number} amount - Skill amount/XP
 * @returns {string} CSS color class or hex color
 */
export const getSkillColor = (amount) => {
  // Use dynamic colors from configuration with fallbacks
  if (!amount || amount < 100) return config.ui.theme.secondary || '#6b7280'; // Gray
  if (amount < 500) return config.ui.theme.primary || '#3b82f6'; // Blue
  if (amount < 1000) return '#10b981'; // Green (fallback)
  if (amount < 2000) return '#f59e0b'; // Yellow (fallback)
  if (amount < 5000) return '#ef4444'; // Red (fallback)
  return config.ui.theme.accent || '#8b5cf6'; // Purple
};

// ============================================================================
// PROJECT AND AUDIT FORMATTING
// ============================================================================

/**
 * Format project name from path
 * @param {string} path - Project path
 * @returns {string} Formatted project name
 */
export const formatProjectName = (path) => {
  if (!path) return 'Unknown Project';
  
  // Extract the last part of the path and format it
  const name = path.split('/').pop() || path;
  
  // Convert kebab-case or snake_case to Title Case
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Format audit ratio for display
 * @param ratio - Audit ratio value
 * @returns Formatted audit ratio
 */
export const formatAuditRatio = (ratio: number | null | undefined): string => {
  if (ratio == null || isNaN(ratio)) return '0.0';
  return ratio.toFixed(1); // 1 decimal place as per requirements
};

/**
 * Format audit amounts (received/done) for display
 * @param {number} amount - Audit amount value
 * @returns {string} Formatted audit amount
 */
export const formatAuditAmount = (amount) => {
  if (amount == null || isNaN(amount)) return '0';
  // Audit amounts are already in correct units, no need to divide
  return Math.round(amount).toString();
};

/**
 * Format skill XP as percentage for display
 * @param skillXP - Skill XP value
 * @param totalXP - Total XP for percentage calculation
 * @returns Formatted skill percentage
 */
export const formatSkillPercentage = (skillXP: number | null | undefined, totalXP: number | null | undefined): string => {
  if (!skillXP || !totalXP || totalXP === 0) return '0%';
  const percentage = (skillXP / totalXP) * 100;
  return `${Math.round(percentage)}%`;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format large numbers with kB/MB suffixes
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' MB';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' kB';
  }
  return num.toString() + ' B';
};

/**
 * Get relative time string (e.g., "2 days ago")
 * @param {string|Date} dateInput - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateInput) => {
  if (!dateInput) return '';

  try {
    const date = new Date(dateInput);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch {
    return '';
  }
};

// ============================================================================
// ENHANCED UTILITY FUNCTIONS FOR COMPONENT PROCESSORS
// ============================================================================

/**
 * Enhanced XP progress calculation with detailed information
 * @param {number} currentXP - Current XP amount
 * @param {number} level - Current level
 * @returns {Object} Detailed progress information
 */
export const getXPProgressDetailed = (currentXP, level) => {
  if (!currentXP || !level) {
    return {
      percentage: 0,
      current: 0,
      required: 1000,
      remaining: 1000
    };
  }

  const currentLevelXP = level * 1000;
  const nextLevelXP = (level + 1) * 1000;
  const progressXP = currentXP - currentLevelXP;
  const requiredXP = nextLevelXP - currentLevelXP;
  const remainingXP = requiredXP - progressXP;

  return {
    percentage: Math.min(100, Math.max(0, (progressXP / requiredXP) * 100)),
    current: Math.max(0, progressXP),
    required: requiredXP,
    remaining: Math.max(0, remainingXP)
  };
};



/**
 * Format skill name for display (replace underscores with spaces)
 * @param {string} skillName - Raw skill name
 * @returns {string} Formatted skill name
 */
export const formatSkillName = (skillName) => {
  if (!skillName) return 'Unknown Skill';
  return skillName.replace(/_/g, ' ');
};

interface Thresholds {
  high?: number;
  medium?: number;
}

/**
 * Get badge variant based on numeric value and thresholds
 * @param value - Numeric value to evaluate
 * @param thresholds - Threshold configuration
 * @returns Badge variant
 */
export const getBadgeVariant = (value: number, thresholds: Thresholds = {}): string => {
  const { high = 70, medium = 40 } = thresholds;

  if (value >= high) return 'success';
  if (value >= medium) return 'primary';
  return 'warning';
};

// ============================================================================
// DYNAMIC MODULE DATA SEPARATION
// ============================================================================

/**
 * CORRECTLY separate piscine data from main BH module data
 * Handles ALL piscine types with correct path detection:
 * - BH Module: /bahrain/bh-module/{{project}} (NOT piscine)
 * - Standard Piscines: /bahrain/bh-module/piscine-{{name}}/{{project}}
 * - Go Piscine: /bahrain/bh-piscine/{{project}}
 * @param data - Array of data records with path property
 * @returns Object with separated data by module type
 */
export const separateModuleData = (data: any[]) => {
  if (!data || !Array.isArray(data)) {
    return {
      mainModule: [],
      piscines: {},
      allPiscines: [],
      all: []
    };
  }

  const mainModule: any[] = [];
  const piscines: { [key: string]: any[] } = {};
  const allPiscines: any[] = [];

  data.forEach(item => {
    if (!item.path) {
      mainModule.push(item);
      return;
    }

    // CORRECT PISCINE DETECTION:
    if (item.path.includes('/bh-piscine/')) {
      // Go Piscine: /bahrain/bh-piscine/{{project}}
      const piscineType = 'go';
      if (!piscines[piscineType]) {
        piscines[piscineType] = [];
      }
      piscines[piscineType].push(item);
      allPiscines.push(item);
    } else if (item.path.includes('/bh-module/piscine-')) {
      // Standard Piscines: /bahrain/bh-module/piscine-{{name}}/{{project}}
      const piscineMatch = item.path.match(/piscine-(\w+)/);
      if (piscineMatch) {
        const piscineType = piscineMatch[1]; // js, rust, flutter, etc.
        if (!piscines[piscineType]) {
          piscines[piscineType] = [];
        }
        piscines[piscineType].push(item);
        allPiscines.push(item);
      }
    } else {
      // BH Module: /bahrain/bh-module/{{project}} (main module)
      mainModule.push(item);
    }
  });

  return {
    mainModule,
    piscines,
    allPiscines,
    all: data
  };
};

/**
 * Calculate CORRECT XP totals by module type (BH Module vs Piscines)
 * Based on actual data analysis: Total=1300K, BH=0.62MB, Piscine=0.68MB
 * @param transactions - Array of XP transactions
 * @returns Object with XP totals by module
 */
export const calculateModuleXPTotals = (transactions: any[]) => {
  if (!transactions || !Array.isArray(transactions)) {
    return {
      total: 0,
      bhModule: 0,
      piscines: {} as { [key: string]: number },
      allPiscines: 0
    };
  }

  const xpTransactions = transactions.filter(t => t.type === 'xp');

  const totals = {
    total: 0,
    bhModule: 0,
    piscines: {} as { [key: string]: number },
    allPiscines: 0
  };

  // Separate BH Module from Piscines
  xpTransactions.forEach(t => {
    const amount = t.amount || 0;
    totals.total += amount;

    if (t.path && t.path.includes('piscine')) {
      // This is a piscine transaction
      const piscineMatch = t.path.match(/piscine-(\w+)/);
      if (piscineMatch) {
        const piscineType = piscineMatch[1];
        if (!totals.piscines[piscineType]) {
          totals.piscines[piscineType] = 0;
        }
        totals.piscines[piscineType] += amount;
        totals.allPiscines += amount;
      }
    } else {
      // This is BH Module transaction
      totals.bhModule += amount;
    }
  });

  return totals;
};

/**
 * Calculate correct level from total XP (in bytes)
 * Formula: floor(sqrt(totalXP / 1000)) + 1
 * @param totalXP - Total XP in bytes
 * @returns User level
 */
export const calculateLevel = (totalXP: number): number => {
  if (!totalXP || totalXP <= 0) return 1;
  return Math.floor(Math.sqrt(totalXP / 1000)) + 1;
};

/**
 * Calculate unique project statistics (avoiding double counting)
 * @param progresses - Array of progress records
 * @returns Object with project statistics
 */
export const calculateProjectStats = (progresses: any[]) => {
  const projectsByPath: { [key: string]: any[] } = {};

  // Group by path to handle multiple attempts
  progresses.forEach(p => {
    if (!projectsByPath[p.path]) {
      projectsByPath[p.path] = [];
    }
    projectsByPath[p.path].push(p);
  });

  let totalProjects = 0;
  let passedProjects = 0;
  let failedProjects = 0;

  // Analyze each unique project
  Object.keys(projectsByPath).forEach(path => {
    const projectVersions = projectsByPath[path];
    // Get the latest version (most recent attempt)
    const latestVersion = projectVersions.reduce((latest, current) =>
      new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
    );

    totalProjects++;
    if (latestVersion.isDone && latestVersion.grade >= 1) {
      passedProjects++;
    } else {
      failedProjects++;
    }
  });

  return {
    total: totalProjects,
    passed: passedProjects,
    failed: failedProjects,
    passRate: totalProjects > 0 ? Math.round((passedProjects / totalProjects) * 100) : 0
  };
};

/**
 * Get user performance notation based on audit ratio and other metrics
 * @param auditRatio - User's audit ratio
 * @param totalXP - User's total XP
 * @param completedProjects - Number of completed projects
 * @returns Performance notation object
 */
export const getRankFromLevel = (level: number) => {
  if (level >= 60) {
    return {
      notation: "Full-Stack Developer",
      description: "Master of the digital realm",
      color: "text-purple-400",
      badge: "🏆"
    };
  } else if (level >= 55) {
    return {
      notation: "Confirmed Developer",
      description: "Seasoned and reliable coder",
      color: "text-blue-400",
      badge: "⭐"
    };
  } else if (level >= 50) {
    return {
      notation: "Junior Developer",
      description: "Capable and growing",
      color: "text-cyan-400",
      badge: "🚀"
    };
  } else if (level >= 40) {
    return {
      notation: "Basic Developer",
      description: "Solid foundational skills",
      color: "text-green-400",
      badge: "✨"
    };
  } else if (level >= 30) {
    return {
      notation: "Assistant Developer",
      description: "Assisting and learning",
      color: "text-teal-400",
      badge: "📈"
    };
  } else if (level >= 20) {
    return {
      notation: "Apprentice Developer",
      description: "On the path to mastery",
      color: "text-yellow-400",
      badge: "🛠️"
    };
  } else if (level >= 10) {
    return {
      notation: "Beginner Developer",
      description: "Starting the coding journey",
      color: "text-orange-400",
      badge: "🌱"
    };
  } else {
    return {
      notation: "Aspiring Developer",
      description: "Eager to learn and grow",
      color: "text-gray-400",
      badge: "💡"
    };
  }
};

/**
 * Extract complete contact information from user attributes
 * @param attrs - User attributes object
 * @returns Complete contact information object
 */
export const extractContactInfo = (attrs: any) => {
  if (!attrs) return null;

  return {
    personal: {
      email: attrs.email || null,
      phone: attrs.Phone || attrs.PhoneNumber || null,
      dateOfBirth: attrs.dateOfBirth || null,
      placeOfBirth: attrs.placeOfBirth || null,
      nationality: attrs.countryOfBirth || attrs.addressCountry || null,
      cprNumber: attrs.CPRnumber || null,
      gender: attrs.gender || attrs.genders || null
    },
    address: {
      street: attrs.addressStreet || null,
      complement: attrs.addressComplementStreet || null,
      city: attrs.addressCity || null,
      country: attrs.addressCountry || null,
      postalCode: attrs.addressPostalCode || null
    },
    emergency: {
      firstName: attrs.emergencyFirstName || null,
      lastName: attrs.emergencyLastName || null,
      fullName: `${attrs.emergencyFirstName || ''} ${attrs.emergencyLastName || ''}`.trim() || null,
      phone: attrs.emergencyTel || null,
      relation: attrs.emergencyAffiliation || null
    },
    education: {
      degree: attrs.Degree || attrs.schoolanddegree || null,
      qualification: attrs.qualification || attrs.qualifica || null,
      graduationDate: attrs.graddate || null
    },
    employment: {
      status: attrs.employment || null,
      jobTitle: attrs.jobtitle || null,
      other: attrs.otheremp || null
    },
    uploads: {
      profilePicture: attrs['pro-picUploadId'] || null,
      idCard: attrs['id-cardUploadId'] || null
    },
    other: {
      medicalInfo: attrs.medicalInfo || null,
      howDidYouHear: attrs.howdidyou || null,
      conditionsAccepted: attrs['general-conditionsAccepted'] || false
    }
  };
};


