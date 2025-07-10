import {
  formatXP,
  formatBytes,
  bytesToKB,
  bytesToMB,
  getAvatarUrl,
  getUserDisplayName,
  getUserEmail,
  calculateUserLevel,
  calculateLevelProgress,
  formatDate,
  formatPercentage,
  formatGrade,
  formatNumber,
  BYTES_TO_KB_FACTOR,
  BYTES_TO_MB_FACTOR,
} from '../utils/dataFormatting';

describe('Data Formatting Utilities', () => {
  describe('XP Formatting', () => {
    test('formatXP should format XP values correctly', () => {
      expect(formatXP(0)).toBe('0');
      expect(formatXP(500)).toBe('500');
      expect(formatXP(1000)).toBe('1.0K');
      expect(formatXP(1500)).toBe('1.5K');
      expect(formatXP(1000000)).toBe('1.0M');
      expect(formatXP(2500000)).toBe('2.5M');
    });

    test('formatXP should handle invalid inputs', () => {
      expect(formatXP(null)).toBe('0');
      expect(formatXP(undefined)).toBe('0');
      expect(formatXP('invalid')).toBe('0');
    });
  });

  describe('Byte Conversion (1000 factor)', () => {
    test('BYTES_TO_KB_FACTOR should be 1000', () => {
      expect(BYTES_TO_KB_FACTOR).toBe(1000);
    });

    test('BYTES_TO_MB_FACTOR should be 1000000', () => {
      expect(BYTES_TO_MB_FACTOR).toBe(1000000);
    });

    test('bytesToKB should convert using 1000 factor', () => {
      expect(bytesToKB(1000)).toBe(1);
      expect(bytesToKB(2000)).toBe(2);
      expect(bytesToKB(1500)).toBe(1.5);
    });

    test('bytesToMB should convert using 1000 factor', () => {
      expect(bytesToMB(1000000)).toBe(1);
      expect(bytesToMB(2000000)).toBe(2);
      expect(bytesToMB(1500000)).toBe(1.5);
    });

    test('formatBytes should use 1000 factor', () => {
      expect(formatBytes(0)).toBe('0 B');
      expect(formatBytes(500)).toBe('500 B');
      expect(formatBytes(1000)).toBe('1.0 KB');
      expect(formatBytes(1000000)).toBe('1.0 MB');
      expect(formatBytes(1000000000)).toBe('1.0 GB');
    });
  });

  describe('User Data Extraction', () => {
    const mockUser = {
      id: 1,
      login: 'testuser',
      profile: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar.jpg'
      }),
      attrs: JSON.stringify({
        alternateEmail: 'john.doe@example.com'
      })
    };

    test('getUserDisplayName should extract display name correctly', () => {
      expect(getUserDisplayName(mockUser)).toBe('John Doe');
      expect(getUserDisplayName({ login: 'testuser' })).toBe('testuser');
      expect(getUserDisplayName(null)).toBe('Unknown User');
    });

    test('getUserEmail should extract email correctly', () => {
      expect(getUserEmail(mockUser)).toBe('john@example.com');
      expect(getUserEmail({ attrs: JSON.stringify({ email: 'test@example.com' }) })).toBe('test@example.com');
      expect(getUserEmail(null)).toBe(null);
    });

    test('getAvatarUrl should extract avatar URL correctly', () => {
      expect(getAvatarUrl(mockUser)).toBe('https://example.com/avatar.jpg');
      expect(getAvatarUrl({ attrs: JSON.stringify({ avatar: 'https://example.com/avatar2.jpg' }) })).toBe('https://example.com/avatar2.jpg');
      expect(getAvatarUrl(null)).toBe(null);
    });
  });

  describe('Level Calculations', () => {
    test('calculateUserLevel should calculate level correctly', () => {
      expect(calculateUserLevel(0)).toBe(1);
      expect(calculateUserLevel(500)).toBe(1);
      expect(calculateUserLevel(1000)).toBe(2);
      expect(calculateUserLevel(2500)).toBe(3);
    });

    test('calculateLevelProgress should calculate progress correctly', () => {
      const progress = calculateLevelProgress(1500);
      expect(progress.currentLevel).toBe(2);
      expect(progress.progressPercentage).toBe(50);
      expect(progress.xpNeeded).toBe(500);
      expect(progress.currentLevelXP).toBe(1000);
      expect(progress.nextLevelXP).toBe(2000);
    });
  });

  describe('Formatting Functions', () => {
    test('formatDate should format dates correctly', () => {
      const date = new Date('2023-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2023');
    });

    test('formatPercentage should format percentages correctly', () => {
      expect(formatPercentage(50)).toBe('50.0%');
      expect(formatPercentage(75.5)).toBe('75.5%');
      expect(formatPercentage(null)).toBe('0%');
    });

    test('formatGrade should format grades correctly', () => {
      expect(formatGrade(0.85)).toBe('85.0%');
      expect(formatGrade(1)).toBe('100.0%');
      expect(formatGrade(null)).toBe('0%');
    });

    test('formatNumber should format numbers with locale', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(null)).toBe('0');
    });
  });
});
