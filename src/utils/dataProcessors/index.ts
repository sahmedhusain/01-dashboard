// Export all data processors
export * from './xpProcessor'
export * from './progressProcessor'
export * from './auditProcessor'

// Re-export commonly used functions
export {
  processXPTransactions,
  calculateXPSummary,
  createXPProgressionData,
  detectPiscineTypes
} from './xpProcessor'

export {
  processProgressData,
  calculateProjectStats,
  calculateProjectTrends,
  analyzeProjectDifficulty
} from './progressProcessor'

export {
  processAuditData,
  calculateAuditStats,
  calculateAuditTrends
} from './auditProcessor'

// Note: formatAuditMB and formatAuditRatio are available in src/utils/dataFormatting.ts
