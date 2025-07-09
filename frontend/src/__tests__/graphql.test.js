import { describe, it, expect } from 'vitest';
import { gql } from '@apollo/client';
import { 
  GET_USER_PROFILE, 
  GET_XP_STATISTICS, 
  GET_USER_PROGRESS,
  GET_PROJECT_STATISTICS 
} from '../graphql/queries';

describe('GraphQL Queries', () => {
  it('should have valid GraphQL syntax for GET_USER_PROFILE', () => {
    expect(GET_USER_PROFILE).toBeDefined();
    expect(GET_USER_PROFILE.kind).toBe('Document');
  });

  it('should have valid GraphQL syntax for GET_XP_STATISTICS', () => {
    expect(GET_XP_STATISTICS).toBeDefined();
    expect(GET_XP_STATISTICS.kind).toBe('Document');
  });

  it('should have valid GraphQL syntax for GET_USER_PROGRESS', () => {
    expect(GET_USER_PROGRESS).toBeDefined();
    expect(GET_USER_PROGRESS.kind).toBe('Document');
  });

  it('should have valid GraphQL syntax for GET_PROJECT_STATISTICS', () => {
    expect(GET_PROJECT_STATISTICS).toBeDefined();
    expect(GET_PROJECT_STATISTICS.kind).toBe('Document');
  });

  it('should not contain problematic fields', () => {
    const queryString = GET_USER_PROFILE.loc.source.body;
    
    // Should not contain githubLogin field
    expect(queryString).not.toContain('githubLogin');
  });

  it('should have proper query structure', () => {
    const queryString = GET_XP_STATISTICS.loc.source.body;
    
    // Should contain required fields
    expect(queryString).toContain('userId');
    expect(queryString).toContain('transaction_aggregate');
  });
});
