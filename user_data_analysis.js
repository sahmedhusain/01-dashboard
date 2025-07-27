#!/usr/bin/env node

// Comprehensive analysis based on console logs and user data
console.log('='.repeat(80));
console.log('COMPREHENSIVE USER DATA ANALYSIS');
console.log('='.repeat(80));

// Data from console logs
const logData = {
  totalXPTransactions: 152,
  totalXP: 1300313, // bytes
  bhModuleXP: 619025, // bytes  
  projectXP: 1286321, // bytes
  auditXP: 13992, // bytes
  levelAchievementTransaction: 112,
  levelAchievementDate: '2024-06-24T17:51:22.532971+00:00',
  xpBeforeLevel26: 619713, // bytes
  xpAfterLevel26: 628913 // bytes
};

// User's stated data
const userData = {
  currentLevel: 26,
  totalTransactions: 39,
  totalXP: 691000, // bytes (691kB)
  remainingXP: 66600 // bytes (66.6kB)
};

console.log('DATA COMPARISON:');
console.log('Console Logs vs User Statements:');
console.log('');

console.log('📊 Transaction Count:');
console.log(`  Console: ${logData.totalXPTransactions} XP transactions`);
console.log(`  User:    ${userData.totalTransactions} transactions`);
console.log(`  Ratio:   ${(logData.totalXPTransactions / userData.totalTransactions).toFixed(1)}x`);
console.log('');

console.log('💰 Total XP:');
console.log(`  Console: ${(logData.totalXP / 1000).toFixed(1)} kB`);
console.log(`  User:    ${(userData.totalXP / 1000).toFixed(1)} kB`);
console.log(`  Diff:    ${((logData.totalXP - userData.totalXP) / 1000).toFixed(1)} kB`);
console.log('');

console.log('🎯 Level 26 Achievement Analysis:');
console.log(`  Achievement found at transaction #${logData.levelAchievementTransaction}`);
console.log(`  XP before level 26: ${(logData.xpBeforeLevel26 / 1000).toFixed(1)} kB`);
console.log(`  User stated total: ${(userData.totalXP / 1000).toFixed(1)} kB`);
console.log(`  Difference: ${((userData.totalXP - logData.xpBeforeLevel26) / 1000).toFixed(1)} kB`);
console.log('');

// Hypothesis: User is referring to specific transaction subset
console.log('🔍 HYPOTHESIS TESTING:');
console.log('');

console.log('Hypothesis 1: User counts only BH Module transactions');
const bhLevel = Math.floor(Math.sqrt(logData.bhModuleXP / 1000)) + 1;
console.log(`  BH Module XP: ${(logData.bhModuleXP / 1000).toFixed(1)} kB → Level ${bhLevel}`);
if (bhLevel === userData.currentLevel) {
  console.log('  ✓ Level matches!');
} else {
  console.log('  ✗ Level mismatch');
}
console.log('');

console.log('Hypothesis 2: User refers to XP at time of level 26 achievement + progress');
const xpAtLevel26Plus = logData.xpBeforeLevel26 + (userData.totalXP - logData.xpBeforeLevel26);
console.log(`  XP at level 26 + user progress: ${(xpAtLevel26Plus / 1000).toFixed(1)} kB`);
console.log('');

console.log('Hypothesis 3: Different filtering method');
console.log('  Possible filtered amounts that give ~691kB:');

// Try different filtering approaches
const filteringOptions = [
  {
    name: 'Only main module (exclude piscines/checkpoints/audits)',
    value: logData.bhModuleXP
  },
  {
    name: 'BH Module + some additional XP',
    value: logData.bhModuleXP + 72000 // to get to 691kB
  },
  {
    name: 'Project XP minus large exclusions',
    value: logData.projectXP - 595321 // to get to 691kB
  }
];

filteringOptions.forEach(option => {
  const kB = option.value / 1000;
  const level = Math.floor(Math.sqrt(kB)) + 1;
  
  // Calculate remaining XP to next level
  const nextLevelXP = Math.pow(level + 1, 2) * 1000;
  const remaining = (nextLevelXP - option.value) / 1000;
  
  console.log(`  ${option.name}:`);
  console.log(`    XP: ${kB.toFixed(1)} kB`);
  console.log(`    Level: ${level}`);
  console.log(`    Remaining: ${remaining.toFixed(1)} kB`);
  
  if (level === userData.currentLevel && Math.abs(remaining - userData.remainingXP/1000) < 10) {
    console.log('    ★ POTENTIAL MATCH!');
  }
  console.log('');
});

console.log('🎯 RECOMMENDATIONS:');
console.log('');
console.log('1. Check which specific transaction subset gives 39 transactions');
console.log('2. Verify the filtering criteria used in the original calculation');
console.log('3. The 691kB likely represents a specific filtered view, not total XP');
console.log('4. Level 26 with 66.6kB remaining suggests ~662.4kB for level calculation');
console.log('5. Need to identify which 609kB of XP should be excluded from 1300kB total');
console.log('');
console.log('='.repeat(80));