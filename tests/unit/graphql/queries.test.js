/**
 * GraphQL Queries Tests
 * Tests for GraphQL query execution, validation, and error handling
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { GraphQLDataService } from '../../../src/graphql/dataService';
import { 
  GET_USER_INFO, 
  GET_TOTAL_XP, 
  GET_USER_SKILLS,
  GET_USER_LEVEL 
} from '../../../src/graphql/coreQueries';
import {
  createMockJWT
} from '../../setup/test-utils';
import graphqlResponses from '../../fixtures/graphql-responses.json';

describe('GraphQL Queries', () => {
  let dataService;
  
  beforeEach(() => {
    global.fetch = vi.fn();
    dataService = new GraphQLDataService();
    
    // Mock authentication
    const mockToken = createMockJWT();
    localStorage.setItem('auth_token', mockToken);
  });

  describe('Query Syntax Validation', () => {
    test('GET_USER_INFO should have valid GraphQL syntax', () => {
      expect(GET_USER_INFO).toContain('query GetUserInfo');
      expect(GET_USER_INFO).toContain('$userLogin: String!');
      expect(GET_USER_INFO).toContain('user(where: { login: { _eq: $userLogin } })');
      expect(GET_USER_INFO).toContain('id');
      expect(GET_USER_INFO).toContain('login');
      expect(GET_USER_INFO).toContain('firstName');
      expect(GET_USER_INFO).toContain('lastName');
    });

    test('GET_TOTAL_XP should have valid GraphQL syntax', () => {
      expect(GET_TOTAL_XP).toContain('query GetUserTotalXP');
      expect(GET_TOTAL_XP).toContain('$userLogin: String!');
      expect(GET_TOTAL_XP).toContain('transaction_aggregate');
      expect(GET_TOTAL_XP).toContain('type: { _eq: "xp" }');
      expect(GET_TOTAL_XP).toContain('sum { amount }');
    });

    test('GET_USER_SKILLS should have valid GraphQL syntax', () => {
      expect(GET_USER_SKILLS).toContain('query GetUserSkills');
      expect(GET_USER_SKILLS).toContain('$userLogin: String!');
      expect(GET_USER_SKILLS).toContain('transaction');
      expect(GET_USER_SKILLS).toContain('type: { _like: "%skill%" }');
    });

    test('GET_USER_LEVEL should have valid GraphQL syntax', () => {
      expect(GET_USER_LEVEL).toContain('query GetUserLevel');
      expect(GET_USER_LEVEL).toContain('$userLogin: String!');
      expect(GET_USER_LEVEL).toContain('event_user');
    });
  });

  describe('getUserInfo', () => {
    test('should fetch user info successfully', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.getUserInfo.success
      });

      const [result, error] = await dataService.getUserInfo('testuser');
      
      expect(error).toBeNull();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(expect.objectContaining({
        id: 1,
        login: 'sayehusain',
        firstName: 'Sayed',
        lastName: 'Ahmed Husain'
      }));
    });

    test('should handle user not found', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.getUserInfo.error
      });

      const [result, error] = await dataService.getUserInfo('nonexistent');
      
      expect(result).toBeNull();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('User not found');
    });

    test('should handle network errors', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const [result, error] = await dataService.getUserInfo('testuser');
      
      expect(result).toBeNull();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Network error');
    });

    test('should include authentication headers', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.getUserInfo.success
      });

      await dataService.getUserInfo('testuser');
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': expect.stringContaining('Bearer ')
          })
        })
      );
    });
  });

  describe('getTotalXP', () => {
    test('should fetch total XP successfully', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.getTotalXP.success
      });

      const [result, error] = await dataService.getTotalXP('testuser');
      
      expect(error).toBeNull();
      expect(result).toEqual(expect.objectContaining({
        aggregate: expect.objectContaining({
          sum: { amount: 1300000 },
          count: 25
        })
      }));
    });

    test('should handle empty XP data', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.getTotalXP.empty
      });

      const [result, error] = await dataService.getTotalXP('testuser');
      
      expect(error).toBeNull();
      expect(result.aggregate.sum.amount).toBeNull();
      expect(result.aggregate.count).toBe(0);
    });
  });

  describe('getUserSkills', () => {
    test('should fetch user skills successfully', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.getUserSkills.success
      });

      const [result, error] = await dataService.getUserSkills('testuser');
      
      expect(error).toBeNull();
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(expect.objectContaining({
        type: 'skill_js',
        amount: 50000
      }));
    });

    test('should handle empty skills data', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.getUserSkills.empty
      });

      const [result, error] = await dataService.getUserSkills('testuser');
      
      expect(error).toBeNull();
      expect(result).toHaveLength(0);
    });
  });

  describe('Error Handling', () => {
    test('should handle GraphQL errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.authenticationError
      });

      const [result, error] = await dataService.getUserInfo('testuser');
      
      expect(result).toBeNull();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Authentication required');
    });

    test('should handle permission errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.permissionError
      });

      const [result, error] = await dataService.getUserInfo('testuser');
      
      expect(result).toBeNull();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Insufficient permissions');
    });

    test('should handle HTTP errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const [result, error] = await dataService.getUserInfo('testuser');
      
      expect(result).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('Query Variables', () => {
    test('should pass variables correctly', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.getUserInfo.success
      });

      await dataService.getUserInfo('testuser');
      
      const fetchCall = global.fetch.mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);
      
      expect(requestBody.variables).toEqual({
        userLogin: 'testuser'
      });
    });

    test('should handle special characters in variables', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => graphqlResponses.getUserInfo.success
      });

      await dataService.getUserInfo('user@example.com');
      
      const fetchCall = global.fetch.mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);
      
      expect(requestBody.variables.userLogin).toBe('user@example.com');
    });
  });

});
