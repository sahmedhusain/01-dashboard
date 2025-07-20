/**
 * Data Formatting Tests
 * Tests for all data formatting utility functions
 */

import { describe, test, expect } from 'vitest';
import {
  formatXP,
  formatXPForQuickStats,
  formatSkillPercentage,
  formatAuditRatio,
  formatAuditAmount,
  formatDate,
  formatDateTime,
  formatPercentage,
  getUserDisplayName,
  getUserEmail,
  getAvatarUrl,
  formatCampusName
} from '../../../src/utils/dataFormatting';

describe('Data Formatting Utilities', () => {

  describe('formatXP', () => {
    test('should format XP values correctly', () => {
      expect(formatXP(0)).toBe('0 XP');
      expect(formatXP(500)).toBe('500 XP');
      expect(formatXP(1500)).toBe('2k XP');
      expect(formatXP(50000)).toBe('50k XP');
      expect(formatXP(1000000)).toBe('1.0M XP');
      expect(formatXP(1300000)).toBe('1.3M XP');
      expect(formatXP(2500000)).toBe('2.5M XP');
    });

    test('should handle invalid inputs', () => {
      expect(formatXP(null)).toBe('0 XP');
      expect(formatXP(undefined)).toBe('0 XP');
      expect(formatXP('invalid')).toBe('0 XP');
      expect(formatXP(NaN)).toBe('0 XP');
    });

    test('should handle negative values', () => {
      expect(formatXP(-1000)).toBe('0 XP');
    });
  });

  describe('formatXPForQuickStats', () => {
    test('should format XP without "XP" suffix', () => {
      expect(formatXPForQuickStats(0)).toBe('0');
      expect(formatXPForQuickStats(500)).toBe('500');
      expect(formatXPForQuickStats(1500)).toBe('2K');
      expect(formatXPForQuickStats(50000)).toBe('50K');
      expect(formatXPForQuickStats(1000000)).toBe('1M');
      expect(formatXPForQuickStats(1300000)).toBe('1M'); // Rounded
      expect(formatXPForQuickStats(1700000)).toBe('2M'); // Rounded up
    });

    test('should return rounded integers', () => {
      expect(formatXPForQuickStats(1234)).toBe('1K');
      expect(formatXPForQuickStats(1567)).toBe('2K');
      expect(formatXPForQuickStats(1234567)).toBe('1M');
      expect(formatXPForQuickStats(1567890)).toBe('2M');
    });

    test('should handle invalid inputs', () => {
      expect(formatXPForQuickStats(null)).toBe('0');
      expect(formatXPForQuickStats(undefined)).toBe('0');
      expect(formatXPForQuickStats('invalid')).toBe('0');
      expect(formatXPForQuickStats(NaN)).toBe('0');
    });
  });

  describe('formatSkillPercentage', () => {
    test('should calculate percentages correctly', () => {
      expect(formatSkillPercentage(25000, 100000)).toBe('25%');
      expect(formatSkillPercentage(33333, 100000)).toBe('33%');
      expect(formatSkillPercentage(66666, 100000)).toBe('67%');
      expect(formatSkillPercentage(100000, 100000)).toBe('100%');
    });

    test('should handle edge cases', () => {
      expect(formatSkillPercentage(0, 100000)).toBe('0%');
      expect(formatSkillPercentage(50000, 0)).toBe('0%');
      expect(formatSkillPercentage(0, 0)).toBe('0%');
      expect(formatSkillPercentage(null, 100000)).toBe('0%');
      expect(formatSkillPercentage(50000, null)).toBe('0%');
    });

    test('should round to nearest integer', () => {
      expect(formatSkillPercentage(12345, 100000)).toBe('12%');
      expect(formatSkillPercentage(12567, 100000)).toBe('13%');
    });
  });

  describe('formatAuditRatio', () => {
    test('should format audit ratios to one decimal place', () => {
      expect(formatAuditRatio(1.234)).toBe('1.2');
      expect(formatAuditRatio(0.567)).toBe('0.6');
      expect(formatAuditRatio(2.0)).toBe('2.0');
      expect(formatAuditRatio(0)).toBe('0.0');
      expect(formatAuditRatio(10.999)).toBe('11.0');
    });

    test('should handle invalid inputs', () => {
      expect(formatAuditRatio(null)).toBe('0.0');
      expect(formatAuditRatio(undefined)).toBe('0.0');
      expect(formatAuditRatio('invalid')).toBe('0.0');
      expect(formatAuditRatio(NaN)).toBe('0.0');
    });
  });

  describe('formatAuditAmount', () => {
    test('should format audit amounts as integers', () => {
      expect(formatAuditAmount(1234.56)).toBe('1235');
      expect(formatAuditAmount(1000)).toBe('1000');
      expect(formatAuditAmount(0)).toBe('0');
      expect(formatAuditAmount(999.4)).toBe('999');
      expect(formatAuditAmount(999.6)).toBe('1000');
    });

    test('should handle invalid inputs', () => {
      expect(formatAuditAmount(null)).toBe('0');
      expect(formatAuditAmount(undefined)).toBe('0');
      expect(formatAuditAmount('invalid')).toBe('0');
      expect(formatAuditAmount(NaN)).toBe('0');
    });
  });

  describe('formatDate', () => {
    test('should format dates correctly', () => {
      const date = '2024-01-15T10:30:00Z';
      const formatted = formatDate(date);
      expect(formatted).toMatch(/Jan 15, 2024/);
    });

    test('should handle Date objects', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/Jan 15, 2024/);
    });

    test('should handle invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
      expect(formatDate('')).toBe('');
    });
  });

  describe('formatDateTime', () => {
    test('should format date and time correctly', () => {
      const date = '2024-01-15T10:30:00Z';
      const formatted = formatDateTime(date);
      expect(formatted).toMatch(/Jan 15, 2024.*10:30/);
    });

    test('should handle invalid dates', () => {
      expect(formatDateTime('invalid-date')).toBe('');
      expect(formatDateTime(null)).toBe('');
      expect(formatDateTime(undefined)).toBe('');
    });
  });

  describe('formatPercentage', () => {
    test('should format percentages correctly', () => {
      expect(formatPercentage(0.25)).toBe('25%');
      expect(formatPercentage(0.8567)).toBe('86%');
      expect(formatPercentage(1.0)).toBe('100%');
      expect(formatPercentage(0)).toBe('0%');
    });

    test('should handle values over 100%', () => {
      expect(formatPercentage(1.5)).toBe('150%');
    });

    test('should handle invalid inputs', () => {
      expect(formatPercentage(null)).toBe('0%');
      expect(formatPercentage(undefined)).toBe('0%');
      expect(formatPercentage('invalid')).toBe('0%');
    });
  });

  describe('getUserDisplayName', () => {
    test('should format full name correctly', () => {
      const user = { firstName: 'John', lastName: 'Doe' };
      expect(getUserDisplayName(user)).toBe('John Doe');
    });

    test('should handle missing last name', () => {
      const user = { firstName: 'John' };
      expect(getUserDisplayName(user)).toBe('John');
    });

    test('should handle missing first name', () => {
      const user = { lastName: 'Doe' };
      expect(getUserDisplayName(user)).toBe('Doe');
    });

    test('should fallback to login', () => {
      const user = { login: 'johndoe' };
      expect(getUserDisplayName(user)).toBe('johndoe');
    });

    test('should handle empty user', () => {
      expect(getUserDisplayName(null)).toBe('Unknown User');
      expect(getUserDisplayName({})).toBe('Unknown User');
    });
  });

  describe('getUserEmail', () => {
    test('should extract email from attrs', () => {
      const user = { attrs: { email: 'test@example.com' } };
      expect(getUserEmail(user)).toBe('test@example.com');
    });

    test('should fallback to direct email field', () => {
      const user = { email: 'test@example.com' };
      expect(getUserEmail(user)).toBe('test@example.com');
    });

    test('should fallback to login', () => {
      const user = { login: 'testuser' };
      expect(getUserEmail(user)).toBe('testuser');
    });

    test('should handle empty user', () => {
      expect(getUserEmail(null)).toBe('');
      expect(getUserEmail({})).toBe('');
    });
  });

  describe('getAvatarUrl', () => {
    test('should extract avatar from profile', () => {
      const user = { profile: { avatar: 'https://example.com/avatar.jpg' } };
      expect(getAvatarUrl(user)).toBe('https://example.com/avatar.jpg');
    });

    test('should try multiple profile fields', () => {
      const user1 = { profile: { avatarUrl: 'https://example.com/avatar.jpg' } };
      expect(getAvatarUrl(user1)).toBe('https://example.com/avatar.jpg');
      
      const user2 = { profile: { picture: 'https://example.com/picture.jpg' } };
      expect(getAvatarUrl(user2)).toBe('https://example.com/picture.jpg');
    });

    test('should fallback to direct avatar field', () => {
      const user = { avatar: 'https://example.com/avatar.jpg' };
      expect(getAvatarUrl(user)).toBe('https://example.com/avatar.jpg');
    });

    test('should generate GitHub avatar URL', () => {
      const user = { login: 'testuser' };
      expect(getAvatarUrl(user)).toBe('https://github.com/testuser.png?size=128');
    });

    test('should return null for empty user', () => {
      expect(getAvatarUrl(null)).toBeNull();
      expect(getAvatarUrl({})).toBeNull();
    });
  });

  describe('formatCampusName', () => {
    test('should capitalize campus names', () => {
      expect(formatCampusName('bahrain')).toBe('Bahrain');
      expect(formatCampusName('LONDON')).toBe('London');
      expect(formatCampusName('pArIs')).toBe('Paris');
    });

    test('should handle empty input', () => {
      expect(formatCampusName('')).toBe('Unknown Campus');
      expect(formatCampusName(null)).toBe('Unknown Campus');
      expect(formatCampusName(undefined)).toBe('Unknown Campus');
    });
  });

});
