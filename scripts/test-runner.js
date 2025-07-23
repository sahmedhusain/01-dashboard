#!/usr/bin/env node

const { execSync, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

// Configuration
const config = {
  testSuites: [
    {
      name: 'Unit Tests',
      pattern: 'src/tests/unit/**/*.test.(ts|tsx)',
      description: 'Individual component and utility function tests'
    },
    {
      name: 'Integration Tests',
      pattern: 'src/tests/integration/**/*.test.(ts|tsx)',
      description: 'Tests for component interactions and data flow'
    },
    {
      name: 'Component Tests',
      pattern: 'src/tests/components/**/*.test.(ts|tsx)',
      description: 'React component rendering and behavior tests'
    },
    {
      name: 'GraphQL Tests',
      pattern: 'src/tests/graphql/**/*.test.(ts|tsx)',
      description: 'GraphQL query and mutation tests'
    },
    {
      name: 'Validation Tests',
      pattern: 'src/tests/validation/**/*.test.(ts|tsx)',
      description: 'Comprehensive application validation tests'
    }
  ],
  coverageThreshold: {
    statements: 70,
    branches: 70,
    functions: 70,
    lines: 70
  }
}

// Utility functions
const log = {
  info: (msg) => console.log(chalk.blue('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  header: (msg) => console.log(chalk.bold.cyan(`\n${msg}\n${'='.repeat(msg.length)}`))
}

const runCommand = (command, options = {}) => {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: 'pipe',
      ...options
    })
    return { success: true, output: result }
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout }
  }
}

const runCommandAsync = (command, args = [], options = {}) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      ...options
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, code })
      } else {
        reject({ success: false, code })
      }
    })

    child.on('error', (error) => {
      reject({ success: false, error: error.message })
    })
  })
}

// Pre-test checks
const runPreTestChecks = () => {
  log.header('Pre-Test Checks')

  // Check if Node.js version is compatible
  const nodeVersion = process.version
  log.info(`Node.js version: ${nodeVersion}`)

  // Check if required dependencies are installed
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const requiredDeps = [
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@apollo/client',
    'jest',
    'ts-jest'
  ]

  const missingDeps = requiredDeps.filter(dep => 
    !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
  )

  if (missingDeps.length > 0) {
    log.error(`Missing required dependencies: ${missingDeps.join(', ')}`)
    process.exit(1)
  }

  log.success('All required dependencies are installed')

  // Check TypeScript configuration
  if (!fs.existsSync('tsconfig.json')) {
    log.warning('tsconfig.json not found')
  } else {
    log.success('TypeScript configuration found')
  }

  // Check Jest configuration
  if (!fs.existsSync('jest.config.js') && !packageJson.jest) {
    log.warning('Jest configuration not found')
  } else {
    log.success('Jest configuration found')
  }

  // Check test setup file
  if (!fs.existsSync('src/tests/setup.ts')) {
    log.warning('Test setup file not found')
  } else {
    log.success('Test setup file found')
  }
}

// Run individual test suite
const runTestSuite = async (suite, options = {}) => {
  log.header(`Running ${suite.name}`)
  log.info(suite.description)

  const jestArgs = [
    '--testPathPattern', suite.pattern,
    '--verbose',
    '--colors'
  ]

  if (options.coverage) {
    jestArgs.push('--coverage')
  }

  if (options.watch) {
    jestArgs.push('--watch')
  }

  if (options.updateSnapshots) {
    jestArgs.push('--updateSnapshot')
  }

  try {
    await runCommandAsync('npx', ['jest', ...jestArgs])
    log.success(`${suite.name} completed successfully`)
    return { success: true, suite: suite.name }
  } catch (error) {
    log.error(`${suite.name} failed: ${error.error || error.code}`)
    return { success: false, suite: suite.name, error }
  }
}

// Run all test suites
const runAllTests = async (options = {}) => {
  log.header('Running All Test Suites')

  const results = []
  let totalPassed = 0
  let totalFailed = 0

  for (const suite of config.testSuites) {
    const result = await runTestSuite(suite, options)
    results.push(result)

    if (result.success) {
      totalPassed++
    } else {
      totalFailed++
    }

    // Add delay between test suites to prevent resource conflicts
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Summary
  log.header('Test Results Summary')
  results.forEach(result => {
    if (result.success) {
      log.success(`${result.suite}: PASSED`)
    } else {
      log.error(`${result.suite}: FAILED`)
    }
  })

  log.info(`Total: ${totalPassed + totalFailed} suites`)
  log.success(`Passed: ${totalPassed}`)
  if (totalFailed > 0) {
    log.error(`Failed: ${totalFailed}`)
  }

  return { totalPassed, totalFailed, results }
}

// Generate test report
const generateTestReport = async () => {
  log.header('Generating Test Report')

  try {
    // Run tests with coverage
    await runCommandAsync('npx', ['jest', '--coverage', '--coverageReporters=json', '--coverageReporters=html'])

    // Check if coverage meets threshold
    if (fs.existsSync('coverage/coverage-summary.json')) {
      const coverageSummary = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'))
      const total = coverageSummary.total

      log.info('Coverage Summary:')
      log.info(`  Statements: ${total.statements.pct}%`)
      log.info(`  Branches: ${total.branches.pct}%`)
      log.info(`  Functions: ${total.functions.pct}%`)
      log.info(`  Lines: ${total.lines.pct}%`)

      const meetsThreshold = 
        total.statements.pct >= config.coverageThreshold.statements &&
        total.branches.pct >= config.coverageThreshold.branches &&
        total.functions.pct >= config.coverageThreshold.functions &&
        total.lines.pct >= config.coverageThreshold.lines

      if (meetsThreshold) {
        log.success('Coverage threshold met!')
      } else {
        log.warning('Coverage threshold not met')
      }
    }

    log.success('Test report generated in coverage/ directory')
  } catch (error) {
    log.error(`Failed to generate test report: ${error.error || error.code}`)
  }
}

// Lint and format code
const runCodeQuality = async () => {
  log.header('Running Code Quality Checks')

  // TypeScript compilation check
  log.info('Checking TypeScript compilation...')
  const tscResult = runCommand('npx tsc --noEmit')
  if (tscResult.success) {
    log.success('TypeScript compilation check passed')
  } else {
    log.error('TypeScript compilation check failed')
    console.log(tscResult.error)
  }

  // ESLint check (if available)
  if (fs.existsSync('.eslintrc.js') || fs.existsSync('.eslintrc.json')) {
    log.info('Running ESLint...')
    const eslintResult = runCommand('npx eslint src --ext .ts,.tsx')
    if (eslintResult.success) {
      log.success('ESLint check passed')
    } else {
      log.warning('ESLint found issues')
      console.log(eslintResult.output)
    }
  }

  // Prettier check (if available)
  if (fs.existsSync('.prettierrc') || fs.existsSync('prettier.config.js')) {
    log.info('Checking code formatting...')
    const prettierResult = runCommand('npx prettier --check src')
    if (prettierResult.success) {
      log.success('Code formatting check passed')
    } else {
      log.warning('Code formatting issues found')
      console.log(prettierResult.output)
    }
  }
}

// Main CLI interface
const main = async () => {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'check':
      runPreTestChecks()
      break

    case 'unit':
      await runTestSuite(config.testSuites[0], { coverage: args.includes('--coverage') })
      break

    case 'integration':
      await runTestSuite(config.testSuites[1], { coverage: args.includes('--coverage') })
      break

    case 'components':
      await runTestSuite(config.testSuites[2], { coverage: args.includes('--coverage') })
      break

    case 'graphql':
      await runTestSuite(config.testSuites[3], { coverage: args.includes('--coverage') })
      break

    case 'validation':
      await runTestSuite(config.testSuites[4], { coverage: args.includes('--coverage') })
      break

    case 'all':
      runPreTestChecks()
      const results = await runAllTests({ 
        coverage: args.includes('--coverage'),
        watch: args.includes('--watch')
      })
      if (results.totalFailed > 0) {
        process.exit(1)
      }
      break

    case 'report':
      await generateTestReport()
      break

    case 'quality':
      await runCodeQuality()
      break

    case 'ci':
      log.header('Running CI Test Suite')
      runPreTestChecks()
      await runCodeQuality()
      const ciResults = await runAllTests({ coverage: true })
      await generateTestReport()
      
      if (ciResults.totalFailed > 0) {
        log.error('CI tests failed')
        process.exit(1)
      } else {
        log.success('All CI tests passed')
      }
      break

    default:
      console.log(`
GraphQL Dashboard Test Runner

Usage: node scripts/test-runner.js <command> [options]

Commands:
  check       Run pre-test checks
  unit        Run unit tests
  integration Run integration tests
  components  Run component tests
  graphql     Run GraphQL tests
  validation  Run validation tests
  all         Run all test suites
  report      Generate test coverage report
  quality     Run code quality checks
  ci          Run complete CI test suite

Options:
  --coverage  Generate coverage report
  --watch     Watch mode for development
  --update    Update snapshots

Examples:
  node scripts/test-runner.js all --coverage
  node scripts/test-runner.js unit --watch
  node scripts/test-runner.js ci
      `)
      break
  }
}

// Run the CLI
if (require.main === module) {
  main().catch(error => {
    log.error(`Test runner failed: ${error.message}`)
    process.exit(1)
  })
}

module.exports = {
  runPreTestChecks,
  runTestSuite,
  runAllTests,
  generateTestReport,
  runCodeQuality
}
