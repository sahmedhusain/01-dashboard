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
 * Gets the latest skill amounts and calculates skill progress correctly.
 * Skills show the latest transaction amount as percentage (e.g., last go skill = 55 → 55%)
 * @param skillTransactions - An array of transactions of type 'skill_...'.
 * @returns Object with skill data including latest amounts and progress.
 */
export const calculateSkillData = (skillTransactions: any[]) => {
  if (!skillTransactions || skillTransactions.length === 0) {
    return { skills: [], totalSkills: 0 };
  }
  
  // Group transactions by skill type
  const skillGroups: { [key: string]: any[] } = {};
  
  skillTransactions.forEach(transaction => {
    const skillName = transaction.type?.replace('skill_', '') || 'unknown';
    if (!skillGroups[skillName]) {
      skillGroups[skillName] = [];
    }
    skillGroups[skillName].push(transaction);
  });
  
  // Process each skill group
  const skills = Object.keys(skillGroups).map(skillName => {
    const skillTxs = skillGroups[skillName].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    
    const latestTransaction = skillTxs[skillTxs.length - 1];
    const previousTransaction = skillTxs.length > 1 ? skillTxs[skillTxs.length - 2] : null;
    
    const currentAmount = latestTransaction.amount || 0;
    const previousAmount = previousTransaction?.amount || 0;
    const progress = currentAmount - previousAmount; // Difference for transaction display
    
    return {
      name: formatSkillName(skillName),
      rawName: skillName,
      currentAmount, // This is the percentage (e.g., 55 = 55%)
      previousAmount,
      progress, // For transaction display (e.g., +5 if went from 50 to 55)
      percentage: currentAmount, // Direct amount as percentage
      latestDate: latestTransaction.createdAt,
      transactions: skillTxs
    };
  });
  
  // Sort by current amount (highest skills first)
  skills.sort((a, b) => b.currentAmount - a.currentAmount);
  
  console.log('🎯 Skill Data Calculated:', {
    totalSkills: skills.length,
    topSkills: skills.slice(0, 3).map(s => ({
      name: s.name,
      percentage: s.currentAmount + '%',
      progress: s.progress > 0 ? `+${s.progress}%` : `${s.progress}%`
    }))
  });
  
  return {
    skills,
    totalSkills: skills.length
  };
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use calculateSkillData instead
 */
export const calculateTotalSkillPoints = (skillTransactions: any[]): number => {
  console.warn('calculateTotalSkillPoints is deprecated, use calculateSkillData instead');
  if (!skillTransactions || skillTransactions.length === 0) return 0;
  return skillTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
};

/**
 * Formats skill percentage correctly (skill amount = percentage)
 * @param skillAmount - The skill amount (which IS the percentage)
 * @returns The formatted percentage string (e.g., "55%").
 */
export const formatSkillPercentage = (skillAmount: number): string => {
  if (skillAmount == null || isNaN(skillAmount)) return '0%';
  return `${skillAmount}%`;
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

/**
 * Separate BH Module data from piscines and checkpoints based on ALL_PATHS_STRUCTURE.md
 * True BH module projects are the 74 direct projects that don't contain "piscine-" or "checkpoint"
 * @param {any[]} data - Array of transactions, progress, or other data with path property
 * @returns {object} Separated data with mainModule (true BH), piscines, checkpoints, and all
 */
export const separateModuleData = (data: any[]) => {
  if (!data || !Array.isArray(data)) {
    return { mainModule: [], piscines: {}, checkpoints: [], allPiscines: [], all: [] };
  }
  
  const mainModule: any[] = [];
  const piscines: { [key: string]: any[] } = {};
  const checkpoints: any[] = [];
  const allPiscines: any[] = [];
  
  data.forEach(item => {
    if (!item.path) {
      // Items without path are considered mainModule (legacy data)
      mainModule.push(item);
      return;
    }
    
    // Check for checkpoint patterns (these are NOT BH module projects)
    if (item.path.includes('checkpoint')) {
      checkpoints.push(item);
      return;
    }
    
    // Check for piscine patterns (these are NOT BH module projects)
    if (item.path.includes('piscine-') || item.path.includes('/bh-piscine/')) {
      // Extract piscine type for categorization
      let piscineType = 'unknown';
      
      if (item.path.includes('/bh-piscine/')) {
        piscineType = 'go'; // Legacy Go piscine
      } else {
        const piscineMatch = item.path.match(/piscine-(\w+)/);
        if (piscineMatch) {
          piscineType = piscineMatch[1]; // js, rust, etc.
        }
      }
      
      if (!piscines[piscineType]) piscines[piscineType] = [];
      piscines[piscineType].push(item);
      allPiscines.push(item);
      return;
    }
    
    // Everything else is considered true BH module (the 74 direct projects)
    mainModule.push(item);
  });
  
  console.log('🔍 Data Separation Results:', {
    totalItems: data.length,
    mainModuleItems: mainModule.length,
    checkpointItems: checkpoints.length,
    piscineItems: allPiscines.length,
    piscineTypes: Object.keys(piscines)
  });
  
  return { mainModule, piscines, checkpoints, allPiscines, all: data };
};

/**
 * Calculate XP totals with proper BH Module filtering based on ALL_PATHS_STRUCTURE.md
 * Excludes piscines and checkpoints from BH Module XP calculation
 * @param {any[]} transactions - Array of XP transactions
 * @returns {object} XP totals separated by category
 */
export const calculateModuleXPTotals = (transactions: any[]) => {
  if (!transactions || !Array.isArray(transactions)) {
    return { 
      total: 0, 
      bhModule: 0, 
      piscines: {} as { [key: string]: number }, 
      checkpoints: 0,
      allPiscines: 0 
    };
  }
  
  // Filter only XP transactions
  const xpTransactions = transactions.filter(t => t.type === 'xp');
  console.log('🔍 XP Transactions found:', xpTransactions.length);
  
  // Enhanced audit XP detection - check multiple indicators
  const auditXPTransactions = xpTransactions.filter(t => {
    // Check attrs field for audit indicators
    if (t.attrs) {
      const attrsStr = typeof t.attrs === 'string' ? t.attrs : JSON.stringify(t.attrs);
      if (attrsStr.toLowerCase().includes('audit') || 
          attrsStr.toLowerCase().includes('review') ||
          attrsStr.toLowerCase().includes('corrector')) {
        return true;
      }
    }
    
    // Check path for audit indicators
    if (t.path && (t.path.includes('audit') || t.path.includes('review'))) {
      return true;
    }
    
    // Check if transaction is associated with audit events (small amounts typically)
    // Audit XP is usually much smaller than project XP
    if (t.amount && t.amount < 1000) { // Less than 1kB might be audit XP
      return true;
    }
    
    return false;
  });
  
  const projectXPTransactions = xpTransactions.filter(t => 
    !auditXPTransactions.includes(t)
  );
  
  console.log('🎯 Transaction Separation (Enhanced Audit Detection):', {
    totalXPTransactions: xpTransactions.length,
    auditXPTransactions: auditXPTransactions.length,
    projectXPTransactions: projectXPTransactions.length,
    auditXPTotal: auditXPTransactions.reduce((sum, t) => sum + (t.amount || 0), 0),
    auditXPSample: auditXPTransactions.slice(0, 3).map(t => ({
      amount: t.amount,
      path: t.path,
      attrs: t.attrs,
      date: t.createdAt
    }))
  });
  
  // Separate project XP data using the updated separation logic (exclude audits)
  const separatedXP = separateModuleData(projectXPTransactions);
  
  const totals = {
    total: 0,
    bhModule: 0,
    piscines: {} as { [key: string]: number },
    checkpoints: 0,
    allPiscines: 0,
    auditXP: 0,
    projectXP: 0
  };
  
  // Calculate BH Module XP (true module projects only)
  totals.bhModule = separatedXP.mainModule.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  // Calculate checkpoint XP
  totals.checkpoints = separatedXP.checkpoints.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  // Calculate piscine XP by type
  Object.keys(separatedXP.piscines).forEach(piscineType => {
    totals.piscines[piscineType] = separatedXP.piscines[piscineType]
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  });
  
  // Calculate total piscine XP
  totals.allPiscines = separatedXP.allPiscines.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  // Calculate audit XP
  totals.auditXP = auditXPTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  // Calculate project XP (excluding audits)
  totals.projectXP = projectXPTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  // Calculate grand total (all XP including audits)
  totals.total = totals.projectXP + totals.auditXP;
  
  console.log('📊 XP Calculation Results (Audit Separation):', {
    totalXP: totals.total,
    bhModuleXP: totals.bhModule,
    bhModuleXPInKB: (totals.bhModule / 1000).toFixed(1),
    projectXP: totals.projectXP,
    projectXPInKB: (totals.projectXP / 1000).toFixed(1),
    auditXP: totals.auditXP,
    auditXPInKB: (totals.auditXP / 1000).toFixed(1),
    checkpointXP: totals.checkpoints,
    piscineXP: totals.allPiscines,
    piscineBreakdown: totals.piscines,
    userExpectedForLevel26: '662.4kB (total 691kB - 28.6kB audit)'
  });
  
  return totals;
};

/**
 * Calculate project statistics with proper BH Module filtering
 * Excludes piscines and checkpoints from BH Module project counting
 * @param {any[]} progresses - Array of progress objects
 * @returns {object} Project statistics separated by category
 */
export const calculateProjectStats = (progresses: any[]) => {
  if (!progresses || !Array.isArray(progresses)) {
    return {
      total: 0,
      passed: 0,
      failed: 0,
      passRate: 0,
      bhModule: { total: 0, passed: 0, failed: 0, passRate: 0 },
      piscines: { total: 0, passed: 0, failed: 0, passRate: 0 },
      checkpoints: { total: 0, passed: 0, failed: 0, passRate: 0 }
    };
  }
  
  // Separate progress data by category
  const separatedProgress = separateModuleData(progresses);
  
  // Helper function to calculate stats for a category
  const calculateCategoryStats = (progressList: any[]) => {
    const projectsByPath: { [key: string]: any[] } = {};
    
    progressList.forEach(p => {
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
      } else if (latestVersion.isDone) {
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
  
  // Calculate stats for each category
  const bhModuleStats = calculateCategoryStats(separatedProgress.mainModule);
  const piscineStats = calculateCategoryStats(separatedProgress.allPiscines);
  const checkpointStats = calculateCategoryStats(separatedProgress.checkpoints);
  
  // Calculate overall stats
  const overallStats = calculateCategoryStats(progresses);
  
  console.log('📊 Project Statistics:', {
    overall: overallStats,
    bhModule: bhModuleStats,
    piscines: piscineStats,
    checkpoints: checkpointStats
  });
  
  return {
    ...overallStats,
    bhModule: bhModuleStats,
    piscines: piscineStats,
    checkpoints: checkpointStats
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
 * Excludes piscines and checkpoints as per ALL_PATHS_STRUCTURE.md
 * @param {number} bhModuleXP - BH Module XP in bytes (excluding piscines and checkpoints)
 * @returns {object} Level information with correct progress calculation
 */
export const calculateLevelProgress = (bhModuleXP: number) => {
  console.log('🔍 Level Calculation Debug (Square Root Method - BH Module Only):', {
    bhModuleXP,
    bhModuleXPInKB: bhModuleXP / 1000,
    bhModuleXPInMB: bhModuleXP / 1000000,
    note: 'Using only true BH module XP (excluding piscines and checkpoints)'
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

  console.log('📊 Level Calculation Result (Square Root - BH Module Only):', {
    ...result,
    xpInCurrentLevel,
    progressInKB: progressInKB.toFixed(1),
    remainingInKB: remainingInKB.toFixed(1),
    levelRange: (levelRange / 1000).toFixed(1) + 'kB',
    expectedUserData: {
      bhModuleXP: '691kB',
      remainingXP: '66.6kB'
    }
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
    // Personal Details (based on actual API data)
    dateOfBirth: attrs.dateOfBirth || attrs.dob || attrs.birthDate,
    placeOfBirth: attrs.placeOfBirth,
    countryOfBirth: attrs.countryOfBirth,
    nationality: attrs.nationality || attrs.country,
    nationalId: attrs.nationalId || attrs.idNumber || attrs.civilId,
    cprNumber: attrs.CPRnumber || attrs.cprNumber || attrs.cpr || attrs.civilId,
    studentId: attrs.studentId || attrs.id,
    gender: attrs.gender || attrs.genders,
    
    // Contact Information (based on actual API data)
    email: attrs.email || attrs.emailAddress,
    phone: attrs.Phone || attrs.PhoneNumber || attrs.phone || attrs.phoneNumber || attrs.mobile,
    alternativePhone: attrs.alternativePhone || attrs.altPhone,
    
    // Emergency Contact (based on actual API data)
    emergencyContact: {
      name: `${attrs.emergencyFirstName || ''} ${attrs.emergencyLastName || ''}`.trim() || 
            attrs.emergencyContactName || attrs.emergencyName || attrs.nextOfKinName,
      phone: attrs.emergencyTel || attrs.emergencyContactPhone || attrs.emergencyPhone || attrs.nextOfKinPhone,
      relationship: attrs.emergencyAffiliation || attrs.emergencyContactRelationship || attrs.emergencyRelation || attrs.nextOfKinRelation,
      address: attrs.emergencyContactAddress || attrs.emergencyAddress
    },
    
    // Address Information (based on actual API data)
    address: {
      street: attrs.addressStreet || attrs.street || attrs.address,
      complementStreet: attrs.addressComplementStreet,
      city: attrs.addressCity || attrs.city,
      country: attrs.addressCountry || attrs.country || 'Bahrain',
      postalCode: attrs.addressPostalCode || attrs.postalCode || attrs.zipCode,
      area: attrs.addressArea || attrs.area || attrs.district
    },
    
    // Academic Information
    cohort: attrs.cohort || attrs.cohortName || extractCohortFromPath(attrs.path),
    cohortNumber: attrs.cohortNumber || attrs.batch || extractCohortNumber(attrs.cohort),
    academicLevel: attrs.academicLevel || attrs.educationLevel,
    
    // Educational Background (based on actual API data)
    degree: attrs.Degree || attrs.degree || attrs.qualification,
    qualification: attrs.qualification || attrs.qualifica,
    schoolAndDegree: attrs.schoolanddegree,
    graduationDate: attrs.graddate,
    howDidYouHear: attrs.howdidyou,
    
    // Employment Information (based on actual API data)
    employment: attrs.employment,
    jobTitle: attrs.jobtitle || attrs.jobTitle || attrs.position,
    currentEmployer: attrs.currentEmployer || attrs.employer,
    otherEmployer: attrs.otheremp,
    workExperience: attrs.workExperience || attrs.experience,
    
    // Additional Information
    profilePicture: attrs['pro-picUploadId'] || attrs.profilePic || attrs.avatar,
    idCardUpload: attrs['id-cardUploadId'],
    linkedIn: attrs.linkedIn || attrs.linkedin,
    github: attrs.github || attrs.githubUsername,
    personalWebsite: attrs.website || attrs.personalSite,
    
    // Medical/Health Information (based on actual API data)
    medicalInfo: attrs.medicalInfo,
    allergies: attrs.allergies || attrs.medicalAllergies,
    medicalConditions: attrs.medicalConditions || attrs.healthConditions,
    bloodType: attrs.bloodType || attrs.bloodGroup,
    
    // Other fields
    other: attrs.other,
    ifOther: attrs.ifother,
    otherEq: attrs.othereq,
    generalConditionsAccepted: attrs['general-conditionsAccepted']
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

/**
 * Analyze transaction history to find level achievement points and calculate remaining XP
 * @param {any[]} transactions - Array of XP transactions (sorted by date)
 * @param {number} currentLevel - User's current level
 * @returns {object} Level analysis with transaction breakdown
 */
export const analyzeLevelProgression = (transactions: any[], currentLevel: number) => {
  if (!transactions || !Array.isArray(transactions) || currentLevel < 1) {
    return null;
  }
  
  // Filter and sort XP transactions by date
  const xpTransactions = transactions
    .filter(t => t.type === 'xp')
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
  console.log('🔍 Analyzing Level Progression:', {
    totalXPTransactions: xpTransactions.length,
    currentLevel,
    analyzing: 'Transaction history to find level achievement points'
  });
  
  // Calculate level thresholds
  const levelStartXP = Math.pow(currentLevel - 1, 2) * 1000; // in bytes
  const levelEndXP = Math.pow(currentLevel, 2) * 1000; // in bytes
  
  // Track cumulative XP and find when each level was achieved
  let cumulativeXP = 0;
  let levelAchievedAt = null;
  let xpAtLevelAchievement = 0;
  let transactionsAfterLevel = [];
  
  for (let i = 0; i < xpTransactions.length; i++) {
    const transaction = xpTransactions[i];
    const previousXP = cumulativeXP;
    cumulativeXP += transaction.amount || 0;
    
    // Check if this transaction caused the level to be achieved
    const previousLevel = Math.floor(Math.sqrt(previousXP / 1000)) + 1;
    const newLevel = Math.floor(Math.sqrt(cumulativeXP / 1000)) + 1;
    
    if (newLevel >= currentLevel && !levelAchievedAt) {
      levelAchievedAt = transaction.createdAt;
      xpAtLevelAchievement = previousXP; // XP before this transaction
      
      console.log('🎯 Level Achievement Found:', {
        transaction: i + 1,
        date: levelAchievedAt,
        xpBefore: previousXP,
        xpAfter: cumulativeXP,
        transactionAmount: transaction.amount,
        levelBefore: previousLevel,
        levelAfter: newLevel,
        path: transaction.path
      });
    }
    
    // Collect transactions after level achievement
    if (levelAchievedAt && new Date(transaction.createdAt) > new Date(levelAchievedAt)) {
      transactionsAfterLevel.push(transaction);
    }
  }
  
  // Calculate XP earned since level achievement
  const xpEarnedSinceLevel = transactionsAfterLevel.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  // Calculate remaining XP to next level
  const nextLevelXP = Math.pow(currentLevel + 1, 2) * 1000;
  const currentTotalXP = xpAtLevelAchievement + xpEarnedSinceLevel;
  const remainingXP = nextLevelXP - currentTotalXP;
  
  const result = {
    currentLevel,
    levelStartXP: levelStartXP / 1000,
    levelEndXP: levelEndXP / 1000,
    nextLevelXP: nextLevelXP / 1000,
    levelAchievedAt,
    xpAtLevelAchievement: xpAtLevelAchievement / 1000,
    xpEarnedSinceLevel: xpEarnedSinceLevel / 1000,
    currentTotalXP: currentTotalXP / 1000,
    remainingXP: remainingXP / 1000,
    transactionsAfterLevel: transactionsAfterLevel.length,
    transactionDetails: transactionsAfterLevel.map(t => ({
      date: t.createdAt,
      amount: t.amount,
      path: t.path,
      type: t.type
    }))
  };
  
  console.log('📊 Level Progression Analysis:', result);
  
  return result;
};