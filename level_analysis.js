#!/usr/bin/env node

// Analysis script for user's level progression
// User data: Level 26, 39 transactions, 691kB XP, 66.6kB remaining

console.log('='.repeat(60));
console.log('USER LEVEL PROGRESSION ANALYSIS');
console.log('='.repeat(60));

// User's stated data
const userLevel = 26;
const userTransactionCount = 39;
const userTotalXP = 691; // kB
const userRemainingXP = 66.6; // kB

console.log('User\'s Data:');
console.log(`- Current Level: ${userLevel}`);
console.log(`- Total Transactions: ${userTransactionCount}`);
console.log(`- Total XP: ${userTotalXP} kB`);
console.log(`- Remaining to next level: ${userRemainingXP} kB`);
console.log('');

// Level 26 thresholds using square root method
const level26Start = Math.pow(25, 2); // 625 kB
const level26End = Math.pow(26, 2);   // 676 kB
const level27Start = level26End;      // 676 kB
const level27End = Math.pow(27, 2);   // 729 kB

console.log('Square Root Level Thresholds:');
console.log(`- Level 26: ${level26Start} kB - ${level26End} kB (range: ${level26End - level26Start} kB)`);
console.log(`- Level 27: ${level27Start} kB - ${level27End} kB (range: ${level27End - level27Start} kB)`);
console.log('');

// Analysis 1: If user is level 26 with 691kB total
console.log('ANALYSIS 1: User says level 26 with 691kB total');
const calculatedLevel = Math.floor(Math.sqrt(userTotalXP)) + 1;
console.log(`- Calculated level for ${userTotalXP}kB: ${calculatedLevel}`);

if (calculatedLevel === 27) {
    // User would be in level 27, calculate remaining to level 28
    const level28End = Math.pow(28, 2); // 784 kB
    const actualRemaining = level28End - userTotalXP;
    console.log(`- Actual remaining to level 28: ${actualRemaining} kB`);
    console.log(`- User expects: ${userRemainingXP} kB remaining`);
    console.log(`- Difference: ${Math.abs(actualRemaining - userRemainingXP)} kB`);
}
console.log('');

// Analysis 2: What XP would give level 26 with 66.6kB remaining?
console.log('ANALYSIS 2: What XP gives level 26 with 66.6kB remaining?');
const nextLevelAfter26 = Math.pow(27, 2); // 729 kB (level 27)
const xpForLevel26With66_6Remaining = nextLevelAfter26 - userRemainingXP;
console.log(`- XP for level 26 with ${userRemainingXP}kB remaining: ${xpForLevel26With66_6Remaining} kB`);
console.log(`- This would be level: ${Math.floor(Math.sqrt(xpForLevel26With66_6Remaining)) + 1}`);

// Check if this XP falls in level 26 range
if (xpForLevel26With66_6Remaining >= level26Start && xpForLevel26With66_6Remaining < level26End) {
    console.log(`- ✓ This XP (${xpForLevel26With66_6Remaining}kB) falls in level 26 range`);
} else {
    console.log(`- ✗ This XP (${xpForLevel26With66_6Remaining}kB) does NOT fall in level 26 range`);
}
console.log('');

// Analysis 3: Alternative - maybe the XP counting excludes certain types
console.log('ANALYSIS 3: Alternative XP calculation methods');
console.log('Possible explanations:');
console.log('1. XP for level calculation excludes audit/review XP');
console.log('2. XP for level calculation excludes piscine/checkpoint XP');
console.log('3. There\'s a different level calculation method');
console.log('4. The 691kB includes all XP but level calculation uses subset');
console.log('');

// Test different XP amounts that would give level 26
console.log('XP values that would result in level 26:');
for (let xp = level26Start; xp < level26End; xp += 5) {
    const level = Math.floor(Math.sqrt(xp)) + 1;
    const remaining = level27Start - xp;
    if (level === 26) {
        console.log(`- ${xp}kB → Level ${level}, remaining: ${remaining}kB`);
        if (Math.abs(remaining - userRemainingXP) < 1) {
            console.log(`  ★ CLOSE MATCH! (${remaining}kB ≈ ${userRemainingXP}kB)`);
        }
    }
}
console.log('');

// Final recommendation
console.log('RECOMMENDATION:');
console.log('1. Check the actual XP transactions in browser console');
console.log('2. Verify which XP types are included in level calculation');
console.log('3. Confirm if audit/review XP should be excluded');
console.log('4. Look for any XP filtering that reduces 691kB to ~662kB');
console.log('='.repeat(60));