import { ApolloClient } from '@apollo/client'
import { GET_ALL_USERS, GET_ALL_TRANSACTIONS, GET_ALL_PROGRESS, GET_ALL_AUDITS } from '../graphql/allQueries'

interface PerformanceTestResult {
  queryName: string
  executionTime: number
  dataSize: number
  success: boolean
  error?: string
  memoryBefore: number
  memoryAfter: number
  memoryDelta: number
}

interface PerformanceTestSuite {
  totalTests: number
  passedTests: number
  failedTests: number
  averageExecutionTime: number
  totalDataSize: number
  results: PerformanceTestResult[]
  recommendations: string[]
}

export class PerformanceTestRunner {
  private client: ApolloClient<any>
  private results: PerformanceTestResult[] = []

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024 // MB
    }
    return 0
  }

  private async runSingleTest(queryName: string, query: any, variables: any = {}): Promise<PerformanceTestResult> {
    const memoryBefore = this.getMemoryUsage()
    const startTime = performance.now()

    try {
      const result = await this.client.query({
        query,
        variables,
        fetchPolicy: 'network-only' // Ensure fresh data for testing
      })

      const endTime = performance.now()
      const memoryAfter = this.getMemoryUsage()
      const executionTime = endTime - startTime

      // Calculate data size (approximate)
      const dataSize = JSON.stringify(result.data).length

      return {
        queryName,
        executionTime,
        dataSize,
        success: true,
        memoryBefore,
        memoryAfter,
        memoryDelta: memoryAfter - memoryBefore
      }
    } catch (error) {
      const endTime = performance.now()
      const memoryAfter = this.getMemoryUsage()
      const executionTime = endTime - startTime

      return {
        queryName,
        executionTime,
        dataSize: 0,
        success: false,
        error: error instanceof Error ? error.message : String(error),
        memoryBefore,
        memoryAfter,
        memoryDelta: memoryAfter - memoryBefore
      }
    }
  }

  async runPerformanceTests(): Promise<PerformanceTestSuite> {
    console.log('🚀 Starting Performance Test Suite...')
    
    const tests = [
      { name: 'GET_ALL_USERS', query: GET_ALL_USERS },
      { name: 'GET_ALL_TRANSACTIONS', query: GET_ALL_TRANSACTIONS },
      { name: 'GET_ALL_PROGRESS', query: GET_ALL_PROGRESS },
      { name: 'GET_ALL_AUDITS', query: GET_ALL_AUDITS }
    ]

    this.results = []

    for (const test of tests) {
      console.log(`⏳ Testing ${test.name}...`)
      const result = await this.runSingleTest(test.name, test.query)
      this.results.push(result)
      
      // Add delay between tests to prevent overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    return this.generateTestSuite()
  }

  private generateTestSuite(): PerformanceTestSuite {
    const totalTests = this.results.length
    const passedTests = this.results.filter(r => r.success).length
    const failedTests = totalTests - passedTests
    
    const successfulResults = this.results.filter(r => r.success)
    const averageExecutionTime = successfulResults.length > 0 
      ? successfulResults.reduce((sum, r) => sum + r.executionTime, 0) / successfulResults.length
      : 0
    
    const totalDataSize = this.results.reduce((sum, r) => sum + r.dataSize, 0)

    const recommendations = this.generateRecommendations()

    return {
      totalTests,
      passedTests,
      failedTests,
      averageExecutionTime,
      totalDataSize,
      results: this.results,
      recommendations
    }
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = []
    
    // Check for slow queries
    const slowQueries = this.results.filter(r => r.success && r.executionTime > 1000)
    if (slowQueries.length > 0) {
      recommendations.push(`⚠️ Slow queries detected: ${slowQueries.map(q => q.queryName).join(', ')}. Consider adding pagination or optimizing these queries.`)
    }

    // Check for large data sizes
    const largeDataQueries = this.results.filter(r => r.success && r.dataSize > 100000) // 100KB
    if (largeDataQueries.length > 0) {
      recommendations.push(`📊 Large data responses detected: ${largeDataQueries.map(q => q.queryName).join(', ')}. Consider implementing pagination or field selection.`)
    }

    // Check for memory leaks
    const memoryLeaks = this.results.filter(r => r.memoryDelta > 10) // 10MB increase
    if (memoryLeaks.length > 0) {
      recommendations.push(`🧠 Potential memory leaks detected in: ${memoryLeaks.map(q => q.queryName).join(', ')}. Monitor memory usage closely.`)
    }

    // Check for failed queries
    const failedQueries = this.results.filter(r => !r.success)
    if (failedQueries.length > 0) {
      recommendations.push(`❌ Failed queries: ${failedQueries.map(q => q.queryName).join(', ')}. Check authentication and query syntax.`)
    }

    // General performance recommendations
    if (this.results.filter(r => r.success).length > 0) {
      const avgTime = this.results.filter(r => r.success).reduce((sum, r) => sum + r.executionTime, 0) / this.results.filter(r => r.success).length
      if (avgTime > 500) {
        recommendations.push('🚀 Consider implementing query caching and data prefetching to improve performance.')
      }
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ All queries are performing well! No immediate optimizations needed.')
    }

    return recommendations
  }

  logResults(suite: PerformanceTestSuite): void {
    console.group('📊 Performance Test Results')
    console.log(`Total Tests: ${suite.totalTests}`)
    console.log(`Passed: ${suite.passedTests}`)
    console.log(`Failed: ${suite.failedTests}`)
    console.log(`Average Execution Time: ${suite.averageExecutionTime.toFixed(2)}ms`)
    console.log(`Total Data Size: ${(suite.totalDataSize / 1024).toFixed(2)}KB`)
    
    console.group('Individual Results')
    suite.results.forEach(result => {
      const status = result.success ? '✅' : '❌'
      console.log(`${status} ${result.queryName}: ${result.executionTime.toFixed(2)}ms, ${(result.dataSize / 1024).toFixed(2)}KB`)
      if (!result.success && result.error) {
        console.error(`   Error: ${result.error}`)
      }
    })
    console.groupEnd()

    console.group('Recommendations')
    suite.recommendations.forEach(rec => console.log(rec))
    console.groupEnd()

    console.groupEnd()
  }
}

export const runPerformanceTests = async (client: ApolloClient<any>): Promise<PerformanceTestSuite> => {
  const runner = new PerformanceTestRunner(client)
  const results = await runner.runPerformanceTests()
  runner.logResults(results)
  return results
}
