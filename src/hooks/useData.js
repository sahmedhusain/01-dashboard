// ============================================================================
// DATA HOOKS - UNIFIED EXPORT
// ============================================================================

// Export all individual GraphQL data hooks
export * from './useGraphQLData.js';

// Export context hook for dashboard components
export { useData } from '../contexts/DataContext.jsx';

// Export DataProvider for convenience
export { DataProvider } from '../contexts/DataContext.jsx';
