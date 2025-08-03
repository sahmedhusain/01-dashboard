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

export const formatAuditMB = (auditValue: number | null | undefined): string => {
  return formatXPValue(auditValue);
};

export const formatAuditRatio = (ratio: number | null | undefined): string => {
  if (ratio == null || isNaN(ratio)) return '0.0';
  return ratio.toFixed(1);
};

export const formatTotalXP = (xp: number) => formatXPValue(xp);
export const formatModuleXP = (xp: number) => formatXPValue(xp);
export const formatXP = (xp: number) => formatXPValue(xp);
export const formatXPForQuickStats = (xp: number) => formatXPValue(xp);

export const getXPProgress = (currentXP: number | null | undefined, level: number | null | undefined): number => {
  if (!currentXP || !level) return 0;
  
  const currentLevelXP = level * 1000;
  const nextLevelXP = (level + 1) * 1000;
  const progressXP = currentXP - currentLevelXP;
  const requiredXP = nextLevelXP - currentLevelXP;
  
  return Math.min(100, Math.max(0, (progressXP / requiredXP) * 100));
};

export const calculateSkillData = (skillTransactions: any[]) => {
  if (!skillTransactions || skillTransactions.length === 0) {
    return { skills: [], totalSkills: 0 };
  }
  
  const skillGroups: { [key: string]: any[] } = {};
  
  skillTransactions.forEach(transaction => {
    const skillName = transaction.type?.replace('skill_', '') || 'unknown';
    if (!skillGroups[skillName]) {
      skillGroups[skillName] = [];
    }
    skillGroups[skillName].push(transaction);
  });
  const skills = Object.keys(skillGroups).map(skillName => {
    const skillTxs = skillGroups[skillName].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    
    const latestTransaction = skillTxs[skillTxs.length - 1];
    const previousTransaction = skillTxs.length > 1 ? skillTxs[skillTxs.length - 2] : null;
    
    const currentAmount = latestTransaction.amount || 0;
    const previousAmount = previousTransaction?.amount || 0;
    const progress = currentAmount - previousAmount;
    
    return {
      name: formatSkillName(skillName),
      rawName: skillName,
      currentAmount,
      previousAmount,
      progress,
      percentage: currentAmount,
      latestDate: latestTransaction.createdAt,
      transactions: skillTxs
    };
  });
  
  skills.sort((a, b) => b.currentAmount - a.currentAmount);
  return {
    skills,
    totalSkills: skills.length
  };
};

export const calculateTotalSkillPoints = (skillTransactions: any[]): number => {
  if (!skillTransactions || skillTransactions.length === 0) return 0;
  return skillTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
};

export const formatSkillPercentage = (skillAmount: number): string => {
  if (skillAmount == null || isNaN(skillAmount)) return '0%';
  return `${skillAmount}%`;
};

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


export const formatDate = (dateInput: string | Date | null | undefined, options?: Intl.DateTimeFormatOptions): string => {
  if (!dateInput) return '';
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    const defaultOptions: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options || defaultOptions);
  } catch {
    return '';
  }
};

export const formatDateTimeDetailed = (dateInput: string | Date | null | undefined): string => {
  if (!dateInput) return '';
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    
    return date.toLocaleString('en-US', options);
  } catch {
    return '';
  }
};

export const formatDateTime = (dateInput: string | Date | null | undefined): string => {
  if (!dateInput) return '';
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    
    const dateOptions: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const timeOptions: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    };
    
    const dateStr = date.toLocaleDateString('en-US', dateOptions);
    const timeStr = date.toLocaleTimeString('en-US', timeOptions);
    
    return `${dateStr} ${timeStr}`;
  } catch {
    return '';
  }
};

export const formatTime = (dateInput: string | Date | null | undefined): string => {
  if (!dateInput) return '';
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    
    const timeOptions: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    };
    
    return date.toLocaleTimeString('en-US', timeOptions);
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
      mainModule.push(item);
      return;
    }
    
    if (item.path.includes('piscine-') || item.path.includes('/bh-piscine/')) {
      let piscineType = 'unknown';
      
      if (item.path.includes('/bh-piscine/')) {
        piscineType = 'go';
      } else {
        const piscineMatch = item.path.match(/piscine-(\w+)/);
        if (piscineMatch) {
          piscineType = piscineMatch[1];
        }
      }
      
      if (!piscines[piscineType]) piscines[piscineType] = [];
      piscines[piscineType].push(item);
      allPiscines.push(item);
      return;
    }
    
    if (item.path.includes('checkpoint')) {
      checkpoints.push(item);
      return;
    }
    
    mainModule.push(item);
  });
  
  return { mainModule, piscines, checkpoints, allPiscines, all: data };
};

export const calculateModuleXPTotals = (transactions: any[]) => {
  if (!transactions || !Array.isArray(transactions)) {
    return { 
      total: 0, 
      bhModule: 0, 
      piscines: {} as { [key: string]: number }, 
      checkpoints: 0,
      allPiscines: 0,
      auditXP: 0,
      projectXP: 0
    };
  }
  
  const xpTransactions = transactions.filter(t => t.type === 'xp');
  
  const auditXPTransactions = xpTransactions.filter(t => {
    if (t.attrs) {
      const attrsStr = typeof t.attrs === 'string' ? t.attrs : JSON.stringify(t.attrs);
      if (attrsStr.toLowerCase().includes('audit') || 
          attrsStr.toLowerCase().includes('review') ||
          attrsStr.toLowerCase().includes('corrector')) {
        return true;
      }
    }
    
    if (t.path && (t.path.includes('audit') || t.path.includes('review'))) {
      return true;
    }
    
    return false;
  });
  
  const projectXPTransactions = xpTransactions.filter(t => 
    !auditXPTransactions.includes(t)
  );

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
  
  totals.checkpoints = separatedXP.checkpoints.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  totals.allPiscines = separatedXP.allPiscines.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  Object.keys(separatedXP.piscines).forEach(piscineType => {
    totals.piscines[piscineType] = separatedXP.piscines[piscineType]
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  });
  
    const piscinesXP = separatedXP.allPiscines.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  totals.auditXP = auditXPTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  const mainModuleXP = separatedXP.mainModule.reduce((sum, t) => sum + (t.amount || 0), 0);
  const mainCheckpointsXP = separatedXP.checkpoints.reduce((sum, t) => sum + (t.amount || 0), 0);
  
  totals.projectXP = mainModuleXP + mainCheckpointsXP + piscinesXP;
  
  totals.total = totals.projectXP;
  
  totals.bhModule = totals.projectXP - piscinesXP;
  
  
  return totals;
};

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
  
  const separatedProgress = separateModuleData(progresses);
  
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
  
  const bhModuleStats = calculateCategoryStats(separatedProgress.mainModule);
  const piscineStats = calculateCategoryStats(separatedProgress.allPiscines);
  const checkpointStats = calculateCategoryStats(separatedProgress.checkpoints);
  
  const overallStats = calculateCategoryStats(progresses);

  return {
    ...overallStats,
    bhModule: bhModuleStats,
    piscines: piscineStats,
    checkpoints: checkpointStats
  };
};

export const calculateLevel = (totalXP: number): number => {
  if (!totalXP || totalXP <= 0) return 1;
  return Math.floor(Math.sqrt(totalXP / 1000)) + 1;
};

export const calculateLevelProgress = (bhModuleXP: number) => {

  if (!bhModuleXP || bhModuleXP <= 0) {
    return {
      currentLevel: 1,
      progress: 0,
      remainingXP: 1000,
      nextLevelXP: 1000,
      currentLevelStartXP: 0,
      progressInKB: 0,
      remainingInKB: 1
    };
  }

  const xpInKB = bhModuleXP / 1000;
  const currentLevel = Math.floor(Math.sqrt(xpInKB)) + 1;
  
  const currentLevelStartXP = Math.pow(currentLevel - 1, 2) * 1000;
  const nextLevelXP = Math.pow(currentLevel, 2) * 1000;
  
  const xpInCurrentLevel = bhModuleXP - currentLevelStartXP;
  const remainingXP = nextLevelXP - bhModuleXP;
  const levelRange = nextLevelXP - currentLevelStartXP;
  const progress = levelRange > 0 ? (xpInCurrentLevel / levelRange) * 100 : 0;
  
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

export const calculatePiscineLevel = (xp: number): number => {
  if (!xp || xp <= 0) return 0;
  return Math.floor(xp / 10000);
};

export const formatSkillName = (skillName: string) => {
  if (!skillName) return 'Unknown Skill';
  return skillName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const extractPersonalInfo = (attrs: any) => {
  if (!attrs) return {};

  return {
    dateOfBirth: attrs.dateOfBirth || attrs.dob || attrs.birthDate,
    placeOfBirth: attrs.placeOfBirth,
    countryOfBirth: attrs.countryOfBirth,
    nationality: attrs.nationality || attrs.country,
    nationalId: attrs.nationalId || attrs.idNumber || attrs.civilId,
    cprNumber: attrs.CPRnumber || attrs.cprNumber || attrs.cpr || attrs.civilId,
    studentId: attrs.studentId || attrs.id,
    gender: attrs.gender || attrs.genders,
    
    email: attrs.email || attrs.emailAddress,
    phone: attrs.Phone || attrs.PhoneNumber || attrs.phone || attrs.phoneNumber || attrs.mobile,
    alternativePhone: attrs.alternativePhone || attrs.altPhone,
    
    emergencyContact: {
      name: `${attrs.emergencyFirstName || ''} ${attrs.emergencyLastName || ''}`.trim() || 
            attrs.emergencyContactName || attrs.emergencyName || attrs.nextOfKinName,
      phone: attrs.emergencyTel || attrs.emergencyContactPhone || attrs.emergencyPhone || attrs.nextOfKinPhone,
      relationship: attrs.emergencyAffiliation || attrs.emergencyContactRelationship || attrs.emergencyRelation || attrs.nextOfKinRelation,
      address: attrs.emergencyContactAddress || attrs.emergencyAddress
    },
    
    address: {
      street: attrs.addressStreet || attrs.street || attrs.address,
      complementStreet: attrs.addressComplementStreet,
      city: attrs.addressCity || attrs.city,
      country: attrs.addressCountry || attrs.country || 'Bahrain',
      postalCode: attrs.addressPostalCode || attrs.postalCode || attrs.zipCode,
      area: attrs.addressArea || attrs.area || attrs.district
    },
    
    cohort: attrs.cohort || attrs.cohortName || extractCohortFromPath(attrs.path),
    cohortNumber: attrs.cohortNumber || attrs.batch || extractCohortNumber(attrs.cohort),
    academicLevel: attrs.academicLevel || attrs.educationLevel,
    
    degree: attrs.Degree || attrs.degree || attrs.qualification,
    qualification: attrs.qualification || attrs.qualifica,
    schoolAndDegree: attrs.schoolanddegree,
    graduationDate: attrs.graddate,
    howDidYouHear: attrs.howdidyou,
    
    employment: attrs.employment,
    jobTitle: attrs.jobtitle || attrs.jobTitle || attrs.position,
    currentEmployer: attrs.currentEmployer || attrs.employer,
    otherEmployer: attrs.otheremp,
    workExperience: attrs.workExperience || attrs.experience,
    
    profilePicture: attrs['pro-picUploadId'] || attrs.profilePic || attrs.avatar,
    idCardUpload: attrs['id-cardUploadId'],
    linkedIn: attrs.linkedIn || attrs.linkedin,
    github: attrs.github || attrs.githubUsername,
    personalWebsite: attrs.website || attrs.personalSite,
    
    medicalInfo: attrs.medicalInfo,
    allergies: attrs.allergies || attrs.medicalAllergies,
    medicalConditions: attrs.medicalConditions || attrs.healthConditions,
    bloodType: attrs.bloodType || attrs.bloodGroup,
    
    other: attrs.other,
    ifOther: attrs.ifother,
    otherEq: attrs.othereq,
    generalConditionsAccepted: attrs['general-conditionsAccepted']
  };
};

export const extractCohortFromPath = (path: string) => {
  if (!path) return null;
  
  const cohortMatch = path.match(/\/bahrain\/bh-([^/]+)\//);
  if (cohortMatch) {
    return cohortMatch[1];
  }
  
  const moduleMatch = path.match(/\/bahrain\/([^/]+)\//);
  if (moduleMatch) {
    return moduleMatch[1];
  }
  
  return null;
};

export const extractCohortNumber = (cohort: string) => {
  if (!cohort) return null;
  
  const numberMatch = cohort.match(/(\d+)/);
  return numberMatch ? numberMatch[1] : null;
};

export const formatPhoneNumber = (phone: string) => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('973')) {
    return `+973 ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }
  
  if (cleaned.length > 10) {
    return `+${cleaned}`;
  }
  
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }
  
  return phone;
};



export const getCohortDisplayName = (cohort: string) => {
  if (!cohort) return 'Cohort';
  
  if (cohort.startsWith('bh-')) {
    const cohortName = cohort.replace('bh-', '').replace(/[-_]/g, ' ');
    return `BH ${cohortName.charAt(0).toUpperCase() + cohortName.slice(1)}`;
  }
  
  if (cohort.includes('module')) {
    return cohort.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  
  const numberMatch = cohort.match(/(\d+)/);
  if (numberMatch) {
    return `Cohort ${numberMatch[1]}`;
  }
  
  return cohort.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const analyzeLevelProgression = (transactions: any[], currentLevel: number) => {
  if (!transactions || !Array.isArray(transactions) || currentLevel < 1) {
    return null;
  }
  
  const xpTransactions = transactions
    .filter(t => t.type === 'xp')
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  

  
  const levelStartXP = Math.pow(currentLevel - 1, 2) * 1000;
  const levelEndXP = Math.pow(currentLevel, 2) * 1000;
  
  let cumulativeXP = 0;
  let levelAchievedAt = null;
  let xpAtLevelAchievement = 0;
  let transactionsAfterLevel = [];
  
  for (let i = 0; i < xpTransactions.length; i++) {
    const transaction = xpTransactions[i];
    const previousXP = cumulativeXP;
    cumulativeXP += transaction.amount || 0;
    
    const newLevel = Math.floor(Math.sqrt(cumulativeXP / 1000)) + 1;
    
    if (newLevel >= currentLevel && !levelAchievedAt) {
      levelAchievedAt = transaction.createdAt;
      xpAtLevelAchievement = previousXP;
      

    }
    
    if (levelAchievedAt && new Date(transaction.createdAt) > new Date(levelAchievedAt)) {
      transactionsAfterLevel.push(transaction);
    }
  }
  
  const xpEarnedSinceLevel = transactionsAfterLevel.reduce((sum, t) => sum + (t.amount || 0), 0);
  
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
  
  
  return result;
};