/**
 * Testing Patterns Example
 * Demonstrates best practices for writing tests in this codebase
 */

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

// Example function to test
const calculateUserStats = (user, transactions) => {
  if (!user || !Array.isArray(transactions)) {
    return {
      totalXP: 0,
      level: 1,
      skillsCount: 0,
      projectsCompleted: 0
    };
  }

  const xpTransactions = transactions.filter(t => t.type === 'xp');
  const skillTransactions = transactions.filter(t => t.type.startsWith('skill_'));
  const projectTransactions = transactions.filter(t => t.object?.type === 'project');

  const totalXP = xpTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const level = Math.floor(totalXP / 50000) + 1; // 50k XP per level

  return {
    totalXP,
    level,
    skillsCount: new Set(skillTransactions.map(t => t.type)).size,
    projectsCompleted: new Set(projectTransactions.map(t => t.object.id)).size
  };
};

describe('Testing Patterns Example', () => {

  // Pattern 1: Group related tests with describe blocks
  describe('calculateUserStats function', () => {
    
    // Pattern 2: Use beforeEach for common setup
    let mockUser;
    let mockTransactions;

    beforeEach(() => {
      mockUser = {
        id: 1,
        login: 'testuser',
        firstName: 'Test',
        lastName: 'User'
      };

      mockTransactions = [
        { id: 1, type: 'xp', amount: 50000, object: { id: 101, type: 'project' } },
        { id: 2, type: 'xp', amount: 75000, object: { id: 102, type: 'project' } },
        { id: 3, type: 'skill_js', amount: 25000, object: { id: 101, type: 'project' } },
        { id: 4, type: 'skill_go', amount: 30000, object: { id: 102, type: 'project' } },
        { id: 5, type: 'skill_js', amount: 20000, object: { id: 103, type: 'project' } }
      ];
    });

    // Pattern 3: Test the happy path first
    test('should calculate stats correctly for valid input', () => {
      const result = calculateUserStats(mockUser, mockTransactions);
      
      expect(result.totalXP).toBe(125000); // 50k + 75k
      expect(result.level).toBe(3); // 125k / 50k + 1 = 3
      expect(result.skillsCount).toBe(2); // js and go
      expect(result.projectsCompleted).toBe(3); // projects 101, 102, 103
    });

    // Pattern 4: Test edge cases and error conditions
    test('should handle null user gracefully', () => {
      const result = calculateUserStats(null, mockTransactions);
      
      expect(result.totalXP).toBe(0);
      expect(result.level).toBe(1);
      expect(result.skillsCount).toBe(0);
      expect(result.projectsCompleted).toBe(0);
    });

    test('should handle empty transactions array', () => {
      const result = calculateUserStats(mockUser, []);
      
      expect(result.totalXP).toBe(0);
      expect(result.level).toBe(1);
      expect(result.skillsCount).toBe(0);
      expect(result.projectsCompleted).toBe(0);
    });

    test('should handle null transactions', () => {
      const result = calculateUserStats(mockUser, null);
      
      expect(result.totalXP).toBe(0);
      expect(result.level).toBe(1);
      expect(result.skillsCount).toBe(0);
      expect(result.projectsCompleted).toBe(0);
    });

    // Pattern 5: Test boundary conditions
    test('should handle exactly 50k XP (level boundary)', () => {
      const transactions = [
        { id: 1, type: 'xp', amount: 50000, object: { id: 101, type: 'project' } }
      ];
      
      const result = calculateUserStats(mockUser, transactions);
      
      expect(result.totalXP).toBe(50000);
      expect(result.level).toBe(2); // 50k / 50k + 1 = 2
    });

    test('should handle zero XP', () => {
      const transactions = [
        { id: 1, type: 'xp', amount: 0, object: { id: 101, type: 'project' } }
      ];
      
      const result = calculateUserStats(mockUser, transactions);
      
      expect(result.totalXP).toBe(0);
      expect(result.level).toBe(1); // 0 / 50k + 1 = 1
    });

    // Pattern 6: Test data variations
    test('should handle transactions with missing amounts', () => {
      const transactions = [
        { id: 1, type: 'xp', object: { id: 101, type: 'project' } }, // No amount
        { id: 2, type: 'xp', amount: 50000, object: { id: 102, type: 'project' } }
      ];
      
      const result = calculateUserStats(mockUser, transactions);
      
      expect(result.totalXP).toBe(50000); // Only the second transaction counts
    });

    test('should deduplicate skills and projects correctly', () => {
      const transactions = [
        { id: 1, type: 'skill_js', amount: 25000, object: { id: 101, type: 'project' } },
        { id: 2, type: 'skill_js', amount: 30000, object: { id: 101, type: 'project' } }, // Same skill, same project
        { id: 3, type: 'skill_go', amount: 20000, object: { id: 102, type: 'project' } }
      ];
      
      const result = calculateUserStats(mockUser, transactions);
      
      expect(result.skillsCount).toBe(2); // js and go (deduplicated)
      expect(result.projectsCompleted).toBe(2); // projects 101 and 102 (deduplicated)
    });
  });

  // Pattern 7: Test async functions (example)
  describe('Async function testing patterns', () => {
    const fetchUserData = async (userId) => {
      if (!userId) throw new Error('User ID is required');
      
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: userId,
            name: 'Test User',
            xp: 100000
          });
        }, 100);
      });
    };

    test('should fetch user data successfully', async () => {
      const result = await fetchUserData(1);
      
      expect(result.id).toBe(1);
      expect(result.name).toBe('Test User');
      expect(result.xp).toBe(100000);
    });

    test('should throw error for missing user ID', async () => {
      await expect(fetchUserData(null)).rejects.toThrow('User ID is required');
    });
  });

  // Pattern 8: Mock functions and spies
  describe('Mock and spy patterns', () => {
    test('should call callback function with correct parameters', () => {
      const mockCallback = vi.fn();
      
      const processData = (data, callback) => {
        const processed = data.map(item => item * 2);
        callback(processed);
        return processed;
      };

      const result = processData([1, 2, 3], mockCallback);
      
      expect(result).toEqual([2, 4, 6]);
      expect(mockCallback).toHaveBeenCalledOnce();
      expect(mockCallback).toHaveBeenCalledWith([2, 4, 6]);
    });

    test('should track function calls', () => {
      const mockFn = vi.fn();
      mockFn.mockReturnValue('mocked result');
      
      const result = mockFn('test input');
      
      expect(result).toBe('mocked result');
      expect(mockFn).toHaveBeenCalledWith('test input');
    });
  });

  // Pattern 9: Cleanup with afterEach
  describe('Cleanup patterns', () => {
    let globalState;

    beforeEach(() => {
      globalState = { counter: 0 };
    });

    afterEach(() => {
      globalState = null;
    });

    test('should modify global state', () => {
      globalState.counter = 5;
      expect(globalState.counter).toBe(5);
    });

    test('should start with clean state', () => {
      expect(globalState.counter).toBe(0); // Clean state from beforeEach
    });
  });

  // Pattern 10: Parameterized tests
  describe('Parameterized test patterns', () => {
    const testCases = [
      { input: 0, expected: 0 },
      { input: 1000, expected: 1 },
      { input: 50000, expected: 50 },
      { input: 100000, expected: 100 }
    ];

    testCases.forEach(({ input, expected }) => {
      test(`should convert ${input} XP to ${expected}K format`, () => {
        const formatXPToK = (xp) => Math.round(xp / 1000);
        expect(formatXPToK(input)).toBe(expected);
      });
    });
  });

});
