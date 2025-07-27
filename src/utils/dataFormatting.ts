// ============================================================================
// DATA FORMATTING UTILITIES
// Functions for formatting and displaying data in components
// ============================================================================

import config from '../config/appConfig';

// ============================================================================
// XP & NUMERIC FORMATTING
// ============================================================================

/**
 * New universal formatter for XP and other large numbers.
 * - < 1000: Displays as Bytes (B).
 * - 1,000 to 999,999: Displays as Kilobytes (kB) with 2 decimal places.
 * - >= 1,000,000: Displays as Megabytes (MB) with 2 decimal places.
 * @param num - The number to format.
 * @returns The formatted string (e.g., "950 B", "25.50 kB", "1.25 MB").
 */
export const formatXPValue = (num: number | null | undefined): string => {
  if (num === null || num === undefined || isNaN(num)) return '0 B';

  if (num < 1000) {
    return `${num} B`;
  }
  if (num < 1000000) {
    return `${(num / 1000).toFixed(2)} kB`;
  }
  return `${(num / 1000000).toFixed(2)} MB`;
};

/**
 * Formats audit values (up/down) which are typically very large.
 * This function will now use the universal formatter.
 * @param auditValue - The audit value to format.
 * @returns The formatted string in B, kB, or MB.
 */
export const formatAuditMB = (auditValue: number | null | undefined): string => {
  return formatXPValue(auditValue);
};

/**
 * Formats the audit ratio to one decimal place.
 * @param ratio - The audit ratio.
 * @returns The formatted string (e.g., "1.9").
 */
export const formatAuditRatio = (ratio: number | null | undefined): string => {
  if (ratio == null || isNaN(ratio)) return '0.0';
  return ratio.toFixed(1);
};

// Deprecated functions for backward compatibility
export const formatTotalXP = (xp: number) => formatXPValue(xp);
export const formatModuleXP = (xp: number) => formatXPValue(xp);
export const formatXP = (xp: number) => formatXPValue(xp);
export const formatXPForQuickStats = (xp: number) => formatXPValue(xp);

/**
 * Get XP progress percentage for level progression
 * @param currentXP - Current XP amount
 * @param level - Current level
 * @returns Progress percentage (0-100)
 */
export const getXPProgress = (currentXP: number | null | undefined, level: number | null | undefined): number => {
  if (!currentXP || !level) return 0;
  
  const currentLevelXP = level * 1000;
  const nextLevelXP = (level + 1) * 1000;
  const progressXP = currentXP - currentLevelXP;
  const requiredXP = nextLevelXP - currentLevelXP;
  
  return Math.min(100, Math.max(0, (progressXP / requiredXP) * 100));
};

// ============================================================================
// SKILL FORMATTING
// ============================================================================

/**
 * Calculates the total points from all skill transactions.
 * @param skillTransactions - An array of transactions of type 'skill_...'.
 * @returns The sum of all skill points.
 */
export const calculateTotalSkillPoints = (skillTransactions: any[]): number => {
  if (!skillTransactions || skillTransactions.length === 0) return 0;
  return skillTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
};

/**
 * Calculates a single skill's percentage of the total skill points.
 * @param skillPoints - The points for a single skill.
 * @param totalSkillPoints - The total points for all skills.
 * @returns The formatted percentage string (e.g., "15.5%").
 */
export const formatSkillPercentage = (skillPoints: number, totalSkillPoints: number): string => {
  if (!skillPoints || !totalSkillPoints) return '0.0%';
  const percentage = (skillPoints / totalSkillPoints) * 100;
  return `${percentage.toFixed(1)}%`;
};

// ============================================================================
// GRADE FORMATTING
// ============================================================================

/**
 * Formats grades as percentages with bonus handling.
 * Grades are multiplied by 100 and displayed as percentages.
 * If grade exceeds 100%, the excess is shown as bonus.
 * @param grade - The grade value (e.g., 1.2 becomes "100% + 20%")
 * @returns The formatted grade string
 */
export const formatGrade = (grade: number | null | undefined): string => {
  if (grade === null || grade === undefined || isNaN(grade)) return '0%';
  
  const percentage = grade * 100;
  
  if (percentage <= 100) {
    return `${percentage.toFixed(0)}%`;
  } else {
    const bonus = percentage - 100;
    return `100% + ${bonus.toFixed(0)}%`;
  }
};

/**
 * Formats grades with decimal precision for detailed display.
 * @param grade - The grade value
 * @param decimals - Number of decimal places (default: 1)
 * @returns The formatted grade string with decimals
 */
export const formatGradeDetailed = (grade: number | null | undefined, decimals: number = 1): string => {
  if (grade === null || grade === undefined || isNaN(grade)) return '0.0%';
  
  const percentage = grade * 100;
  
  if (percentage <= 100) {
    return `${percentage.toFixed(decimals)}%`;
  } else {
    const bonus = percentage - 100;
    return `100% + ${bonus.toFixed(decimals)}%`;
  }
};

// ============================================================================
// USER DATA FORMATTING
// ============================================================================

interface User {
  firstName?: string;
  lastName?: string;
  login?: string;
}

export const getUserDisplayName = (user: User | null | undefined): string => {
  if (!user) return 'Unknown User';
  if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
  return user.firstName || user.lastName || user.login || 'Unknown User';
};

// ============================================================================
// DATE FORMATTING
// ============================================================================

export const formatDate = (dateInput: string | Date | null | undefined, options?: Intl.DateTimeFormatOptions): string => {
  if (!dateInput) return '';
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    const defaultOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options || defaultOptions);
  } catch {
    return '';
  }
};

export const getRelativeTime = (dateInput: string | Date) => {
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
// MODULE & PROJECT UTILITIES
// ============================================================================

export const separateModuleData = (data: any[]) => {
  if (!data || !Array.isArray(data)) {
    return { mainModule: [], piscines: {}, allPiscines: [], all: [] };
  }
  const mainModule: any[] = [];
  const piscines: { [key: string]: any[] } = {};
  const allPiscines: any[] = [];
  data.forEach(item => {
    if (!item.path) {
      mainModule.push(item);
      return;
    }
    if (item.path.includes('/bh-piscine/')) {
      const piscineType = 'go';
      if (!piscines[piscineType]) piscines[piscineType] = [];
      piscines[piscineType].push(item);
      allPiscines.push(item);
    } else if (item.path.includes('/bh-module/piscine-')) {
      const piscineMatch = item.path.match(/piscine-(\w+)/);
      if (piscineMatch) {
        const piscineType = piscineMatch[1];
        if (!piscines[piscineType]) piscines[piscineType] = [];
        piscines[piscineType].push(item);
        allPiscines.push(item);
      }
    } else {
      mainModule.push(item);
    }
  });
  return { mainModule, piscines, allPiscines, all: data };
};

export const calculateModuleXPTotals = (transactions: any[]) => {
  if (!transactions || !Array.isArray(transactions)) {
    return { total: 0, bhModule: 0, piscines: {} as { [key: string]: number }, allPiscines: 0 };
  }
  const xpTransactions = transactions.filter(t => t.type === 'xp');
  const totals = { total: 0, bhModule: 0, piscines: {} as { [key: string]: number }, allPiscines: 0 };
  xpTransactions.forEach(t => {
    const amount = t.amount || 0;
    totals.total += amount;
    if (t.path && t.path.includes('piscine')) {
      const piscineMatch = t.path.match(/piscine-(\w+)/);
      if (piscineMatch) {
        const piscineType = piscineMatch[1];
        if (!totals.piscines[piscineType]) totals.piscines[piscineType] = 0;
        totals.piscines[piscineType] += amount;
        totals.allPiscines += amount;
      }
    } else {
      totals.bhModule += amount;
    }
  });
  return totals;
};

export const calculateProjectStats = (progresses: any[]) => {
  const projectsByPath: { [key: string]: any[] } = {};
  progresses.forEach(p => {
    if (!projectsByPath[p.path]) projectsByPath[p.path] = [];
    projectsByPath[p.path].push(p);
  });
  let totalProjects = 0, passedProjects = 0, failedProjects = 0;
  Object.keys(projectsByPath).forEach(path => {
    const projectVersions = projectsByPath[path];
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

// ============================================================================
// LEVEL & RANK UTILITIES
// ============================================================================

export const calculateLevel = (totalXP: number): number => {
  if (!totalXP || totalXP <= 0) return 1;
  return Math.floor(Math.sqrt(totalXP / 1000)) + 1;
};

/**
 * Calculate level progress using the correct square root method with BH Module XP only
 * This matches the original reboot01 level calculation system
 * @param {number} bhModuleXP - BH Module XP in bytes (excluding piscines)
 * @returns {object} Level information with correct progress calculation
 */
export const calculateLevelProgress = (bhModuleXP: number) => {
  console.log('🔍 Level Calculation Debug (Square Root Method):', {
    bhModuleXP,
    bhModuleXPInKB: bhModuleXP / 1000,
    bhModuleXPInMB: bhModuleXP / 1000000
  });

  if (!bhModuleXP || bhModuleXP <= 0) {
    return {
      currentLevel: 1,
      progress: 0,
      remainingXP: 1000, // 1kB for first level
      nextLevelXP: 1000,
      currentLevelStartXP: 0,
      progressInKB: 0,
      remainingInKB: 1
    };
  }

  // Square root calculation: level = floor(sqrt(xp_in_kb)) + 1
  const xpInKB = bhModuleXP / 1000;
  const currentLevel = Math.floor(Math.sqrt(xpInKB)) + 1;
  
  // Calculate XP thresholds for square root method
  const currentLevelStartXP = Math.pow(currentLevel - 1, 2) * 1000; // in bytes
  const nextLevelXP = Math.pow(currentLevel, 2) * 1000; // in bytes
  
  // Calculate progress within current level
  const xpInCurrentLevel = bhModuleXP - currentLevelStartXP;
  const remainingXP = nextLevelXP - bhModuleXP;
  const levelRange = nextLevelXP - currentLevelStartXP;
  const progress = levelRange > 0 ? (xpInCurrentLevel / levelRange) * 100 : 0;
  
  // Convert to kB for display
  const progressInKB = xpInCurrentLevel / 1000;
  const remainingInKB = remainingXP / 1000;
  
  const result = {
    currentLevel,
    progress: Math.min(100, Math.max(0, progress)),
    remainingXP,
    nextLevelXP,
    currentLevelStartXP,
    progressInKB,
    remainingInKB
  };

  console.log('📊 Level Calculation Result (Square Root):', {
    ...result,
    xpInCurrentLevel,
    progressInKB: progressInKB.toFixed(1),
    remainingInKB: remainingInKB.toFixed(1),
    levelRange: levelRange / 1000
  });
  
  return result;
};

export const getRankFromLevel = (level: number) => {
  if (level >= 60) return { notation: "Full-Stack developer", badge: "🏆" };
  if (level >= 55) return { notation: "Confirmed developer", badge: "⭐" };
  if (level >= 50) return { notation: "Junior developer", badge: "🚀" };
  if (level >= 40) return { notation: "Basic developer", badge: "✨" };
  if (level >= 30) return { notation: "Assistant developer", badge: "📈" };
  if (level >= 20) return { notation: "Apprentice developer", badge: "🛠️" };
  if (level >= 10) return { notation: "Beginner developer", badge: "🌱" };
  return { notation: "Aspiring developer", badge: "💡" };
};

/**
 * Format skill name for display (replace underscores with spaces and capitalize)
 * @param {string} skillName - Raw skill name
 * @returns {string} Formatted skill name
 */
export const formatSkillName = (skillName: string) => {
  if (!skillName) return 'Unknown Skill';
  return skillName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// ============================================================================
// PERSONAL INFORMATION UTILITIES
// ============================================================================

/**
 * Extract personal information from user attrs
 * @param {any} attrs - User attributes object
 * @returns {object} Extracted personal information
 */
export const extractPersonalInfo = (attrs: any) => {
  if (!attrs) return {};

  return {
    // Personal Details
    dateOfBirth: attrs.dateOfBirth || attrs.dob || attrs.birthDate,
    nationality: attrs.nationality || attrs.country,
    nationalId: attrs.nationalId || attrs.idNumber || attrs.civilId,
    cprNumber: attrs.cprNumber || attrs.cpr || attrs.civilId,
    studentId: attrs.studentId || attrs.id,
    
    // Contact Information
    email: attrs.email || attrs.emailAddress,
    phone: attrs.phone || attrs.phoneNumber || attrs.mobile,
    alternativePhone: attrs.alternativePhone || attrs.altPhone,
    
    // Emergency Contact
    emergencyContact: {
      name: attrs.emergencyContactName || attrs.emergencyName || attrs.nextOfKinName,
      phone: attrs.emergencyContactPhone || attrs.emergencyPhone || attrs.nextOfKinPhone,
      relationship: attrs.emergencyContactRelationship || attrs.emergencyRelation || attrs.nextOfKinRelation,
      address: attrs.emergencyContactAddress || attrs.emergencyAddress
    },
    
    // Address Information
    address: {
      street: attrs.addressStreet || attrs.street || attrs.address,
      city: attrs.addressCity || attrs.city,
      country: attrs.addressCountry || attrs.country || 'Bahrain',
      postalCode: attrs.addressPostalCode || attrs.postalCode || attrs.zipCode,
      area: attrs.addressArea || attrs.area || attrs.district
    },
    
    // Academic Information
    cohort: attrs.cohort || attrs.cohortName || extractCohortFromPath(attrs.path),
    cohortNumber: attrs.cohortNumber || attrs.batch || extractCohortNumber(attrs.cohort),
    academicLevel: attrs.academicLevel || attrs.educationLevel,
    
    // Additional Information
    profilePicture: attrs['pro-picUploadId'] || attrs.profilePic || attrs.avatar,
    linkedIn: attrs.linkedIn || attrs.linkedin,
    github: attrs.github || attrs.githubUsername,
    personalWebsite: attrs.website || attrs.personalSite,
    
    // Medical/Health Information (if available)
    allergies: attrs.allergies || attrs.medicalAllergies,
    medicalConditions: attrs.medicalConditions || attrs.healthConditions,
    bloodType: attrs.bloodType || attrs.bloodGroup,
    
    // Professional Information
    currentEmployer: attrs.currentEmployer || attrs.employer,
    jobTitle: attrs.jobTitle || attrs.position,
    workExperience: attrs.workExperience || attrs.experience,
    
    // Educational Background
    previousEducation: attrs.previousEducation || attrs.education,
    university: attrs.university || attrs.college,
    degree: attrs.degree || attrs.qualification
  };
};

/**
 * Extract cohort information from path
 * @param {string} path - User path
 * @returns {string} Cohort name
 */
export const extractCohortFromPath = (path: string) => {
  if (!path) return null;
  
  // Try to extract cohort from path patterns like /bahrain/bh-<cohort>/
  const cohortMatch = path.match(/\/bahrain\/bh-([^\/]+)\//);
  if (cohortMatch) {
    return cohortMatch[1];
  }
  
  // Try other patterns
  const moduleMatch = path.match(/\/bahrain\/([^\/]+)\//);
  if (moduleMatch) {
    return moduleMatch[1];
  }
  
  return null;
};

/**
 * Extract cohort number from cohort string
 * @param {string} cohort - Cohort string
 * @returns {string} Cohort number
 */
export const extractCohortNumber = (cohort: string) => {
  if (!cohort) return null;
  
  const numberMatch = cohort.match(/(\d+)/);
  return numberMatch ? numberMatch[1] : null;
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone: string) => {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Bahraini numbers
  if (cleaned.startsWith('973')) {
    return `+973 ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }
  
  // Format other international numbers
  if (cleaned.length > 10) {
    return `+${cleaned}`;
  }
  
  // Format local numbers
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }
  
  return phone;
};

/**
 * Format CPR number for display (mask sensitive parts)
 * @param {string} cpr - CPR number
 * @returns {string} Formatted CPR number
 */
export const formatCPRNumber = (cpr: string, maskSensitive = true) => {
  if (!cpr) return '';
  
  const cleaned = cpr.replace(/\D/g, '');
  
  if (cleaned.length === 9) {
    if (maskSensitive) {
      return `${cleaned.slice(0, 2)}****${cleaned.slice(6)}`;
    } else {
      return `${cleaned.slice(0, 6)}-${cleaned.slice(6)}`;
    }
  }
  
  return cpr;
};

/**
 * Get cohort display name
 * @param {string} cohort - Cohort identifier
 * @returns {string} Display name for cohort
 */
export const getCohortDisplayName = (cohort: string) => {
  if (!cohort) return 'Cohort';
  
  // Handle different cohort formats
  if (cohort.startsWith('bh-')) {
    const cohortName = cohort.replace('bh-', '').replace(/[-_]/g, ' ');
    return `BH ${cohortName.charAt(0).toUpperCase() + cohortName.slice(1)}`;
  }
  
  if (cohort.includes('module')) {
    return cohort.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  
  // Extract numbers for simple display
  const numberMatch = cohort.match(/(\d+)/);
  if (numberMatch) {
    return `Cohort ${numberMatch[1]}`;
  }
  
  return cohort.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};