// Debug script to test level calculation for User ID 1599
// Run this with your JWT token to verify level progress

const JWT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTk5IiwiaWF0IjoxNzUzNTY3OTAyLCJpcCI6IjE3Mi4xOC4wLjIiLCJleHAiOjE3NTM2NTQzMDIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWNhbXB1c2VzIjoie30iLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6IjE1OTkiLCJ4LWhhc3VyYS10b2tlbi1pZCI6IjhkNmVkZTIyLWFlMDEtNDQ4Ni1iNmNjLWZkOTk4YjFhOTIyYiJ9fQ.cR7mZz9clKpsUMfGw2o3oKxMDaHR91-V0FuGbwvKP4I";

const GRAPHQL_ENDPOINT = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";

// Level calculation function (matches your current implementation)
function calculateLevelProgress(totalXP) {
  console.log('🔍 Level Calculation Debug:', {
    totalXP,
    totalXPInKB: totalXP / 1000,
    totalXPInMB: totalXP / 1000000
  });

  if (!totalXP || totalXP <= 0) {
    return {
      currentLevel: 1,
      progress: 0,
      remainingXP: 100000, // 100kB
      nextLevelXP: 100000,
      currentLevelStartXP: 0,
      progressInKB: 0,
      remainingInKB: 100
    };
  }

  // Each level is 100kB (100,000 bytes)
  const XP_PER_LEVEL = 100000; // 100kB
  
  // Calculate current level (1-based)
  const currentLevel = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  
  // Calculate XP ranges for current level
  const currentLevelStartXP = (currentLevel - 1) * XP_PER_LEVEL;
  const nextLevelXP = currentLevel * XP_PER_LEVEL;
  
  // Calculate progress within current level
  const xpInCurrentLevel = totalXP - currentLevelStartXP;
  const remainingXP = nextLevelXP - totalXP;
  const progress = (xpInCurrentLevel / XP_PER_LEVEL) * 100;
  
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

  console.log('📊 Level Calculation Result:', {
    ...result,
    xpInCurrentLevel,
    progressInKB: progressInKB.toFixed(1),
    remainingInKB: remainingInKB.toFixed(1)
  });
  
  return result;
}

// Query to get ALL XP transactions for user 1599
const XP_TRANSACTIONS_QUERY = `
  query GetAllXPTransactions {
    transaction(
      where: {
        userId: { _eq: 1599 }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      id
      amount
      path
      createdAt
      object {
        name
        type
      }
    }
  }
`;

// Query to get XP aggregate
const XP_AGGREGATE_QUERY = `
  query GetXPAggregate {
    transaction_aggregate(
      where: {
        userId: { _eq: 1599 }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
  }
`;

// Query to get user info
const USER_INFO_QUERY = `
  query GetUserInfo {
    user(where: { id: { _eq: 1599 } }) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      attrs
      createdAt
    }
  }
`;

// Test queries
async function runQueries() {
  console.log('🚀 Starting Level Calculation Debug for User 1599\n');

  try {
    // 1. Get user info
    console.log('1️⃣ Fetching User Information...');
    const userResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({
        query: USER_INFO_QUERY
      })
    });

    const userData = await userResponse.json();
    console.log('👤 User Data:', userData.data.user[0]);

    // 2. Get XP aggregate
    console.log('\n2️⃣ Fetching XP Aggregate...');
    const aggregateResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({
        query: XP_AGGREGATE_QUERY
      })
    });

    const aggregateData = await aggregateResponse.json();
    const totalXP = aggregateData.data.transaction_aggregate.aggregate.sum.amount;
    const transactionCount = aggregateData.data.transaction_aggregate.aggregate.count;
    
    console.log('💰 XP Aggregate:', {
      totalXP,
      totalXPInKB: (totalXP / 1000).toFixed(1),
      totalXPInMB: (totalXP / 1000000).toFixed(2),
      transactionCount
    });

    // 3. Calculate level progress
    console.log('\n3️⃣ Calculating Level Progress...');
    const levelInfo = calculateLevelProgress(totalXP);

    console.log('\n📈 Final Level Analysis:');
    console.log(`Current Level: ${levelInfo.currentLevel}`);
    console.log(`Progress: ${levelInfo.progress.toFixed(1)}%`);
    console.log(`Progress in current level: ${levelInfo.progressInKB.toFixed(1)} kB`);
    console.log(`Remaining to next level: ${levelInfo.remainingInKB.toFixed(1)} kB`);
    console.log(`Total XP: ${(totalXP / 1000).toFixed(1)} kB`);

    // 4. Get some XP transactions to verify
    console.log('\n4️⃣ Fetching Recent XP Transactions...');
    const transactionsResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({
        query: `
          query GetRecentXPTransactions {
            transaction(
              where: {
                userId: { _eq: 1599 }
                type: { _eq: "xp" }
              }
              order_by: { createdAt: desc }
              limit: 10
            ) {
              id
              amount
              path
              createdAt
              object {
                name
                type
              }
            }
          }
        `
      })
    });

    const transactionsData = await transactionsResponse.json();
    console.log('📋 Recent XP Transactions:');
    transactionsData.data.transaction.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.object?.name || t.path} - ${(t.amount / 1000).toFixed(1)} kB (${new Date(t.createdAt).toLocaleDateString()})`);
    });

    // Verify if this matches your example (Level 26, 66.6kB remaining)
    console.log('\n🎯 Verification:');
    if (levelInfo.currentLevel === 26 && Math.abs(levelInfo.remainingInKB - 66.6) < 1) {
      console.log('✅ Level calculation matches your example!');
    } else {
      console.log('❌ Level calculation does not match expected values:');
      console.log(`Expected: Level 26, 66.6kB remaining`);
      console.log(`Actual: Level ${levelInfo.currentLevel}, ${levelInfo.remainingInKB.toFixed(1)}kB remaining`);
    }

  } catch (error) {
    console.error('❌ Error running queries:', error);
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runQueries, calculateLevelProgress };
} else {
  // Run if in browser
  runQueries();
}

console.log('📝 To run this debug script:');
console.log('1. Copy this code to browser console on the dashboard page');
console.log('2. Or save as debug_level_calculation.js and run with Node.js');
console.log('3. Check console output for level calculation details');