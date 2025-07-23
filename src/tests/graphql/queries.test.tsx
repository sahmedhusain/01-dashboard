import { gql } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'

// Import our comprehensive queries
import {
  GET_ALL_USERS,
  GET_ALL_TRANSACTIONS,
  GET_ALL_PROGRESS,
  GET_ALL_AUDITS,
  GET_ALL_GROUPS,
  GET_ALL_EVENTS,
  GET_ALL_OBJECTS,
  GET_ALL_REGISTRATIONS,
  GET_ALL_RESULTS
} from '../../graphql/allQueries'

// Mock data for testing
const mockUser = {
  id: 1,
  login: 'testuser',
  firstName: 'Test',
  lastName: 'User',
  campus: 'london',
  auditRatio: 1.5,
  totalUp: 50000,
  totalDown: 1000,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
}

const mockXPTransactions = [
  {
    id: 1,
    amount: 1000,
    createdAt: '2024-01-01T00:00:00Z',
    path: '/bahrain/bh-module/js/piscine-js/tell-me-who',
    object: {
      name: 'tell-me-who',
      type: 'exercise'
    }
  },
  {
    id: 2,
    amount: 2000,
    createdAt: '2024-01-02T00:00:00Z',
    path: '/bahrain/bh-module/js/piscine-js/tell-me-how-many',
    object: {
      name: 'tell-me-how-many',
      type: 'exercise'
    }
  }
]

const mockProgress = [
  {
    id: 1,
    userId: 1,
    objectId: 100,
    grade: 85.5,
    path: '/bahrain/bh-module/js/piscine-js/tell-me-who',
    campus: 'london',
    createdAt: '2024-01-01T00:00:00Z',
    isDone: true
  }
]

const mockAudits = [
  {
    id: 1,
    auditorId: 1,
    groupId: 10,
    grade: 90,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

const mockGroups = [
  {
    id: 1,
    path: '/bahrain/bh-module/js/piscine-js/tell-me-who/group-1',
    campus: 'london',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    objectId: 100,
    eventId: 200
  }
]

const mockEvents = [
  {
    id: 1,
    path: '/bahrain/bh-module/js/piscine-js',
    campus: 'london',
    createdAt: '2024-01-01T00:00:00Z',
    endAt: '2024-12-31T23:59:59Z',
    objectId: 100
  }
]

const mockObjects = [
  {
    id: 1,
    name: 'tell-me-who',
    type: 'exercise',
    attrs: '{}',
    createdAt: '2024-01-01T00:00:00Z',
    campus: 'london',
    authorId: 1
  }
]

const mockRegistrations = [
  {
    id: 1,
    userId: 1,
    eventId: 200,
    createdAt: '2024-01-01T00:00:00Z'
  }
]

const mockResults = [
  {
    id: 1,
    userId: 1,
    objectId: 100,
    grade: 85.5,
    type: 'exercise',
    path: '/bahrain/bh-module/js/piscine-js/tell-me-who',
    createdAt: '2024-01-01T00:00:00Z'
  }
]

// Test component to test queries
const TestQueryComponent: React.FC<{ query: any; variables?: any }> = ({ query, variables }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useQuery } = require('@apollo/client')
  const { data, loading, error } = useQuery(query, { variables })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (data) return <div>Data loaded</div>
  return <div>No data</div>
}

describe('GraphQL Queries', () => {
  describe('User Profile Query', () => {
    it('should fetch user profile data correctly', async () => {
      const mocks = [
        {
          request: {
            query: GET_ALL_USERS,
            variables: {}
          },
          result: {
            data: {
              user: [mockUser]
            }
          }
        }
      ]

      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestQueryComponent query={GET_ALL_USERS} variables={{}} />
        </MockedProvider>
      )

      expect(getByText('Loading...')).toBeInTheDocument()
      await waitFor(() => {
        expect(getByText('Data loaded')).toBeInTheDocument()
      })
    })

    it('should handle user profile query errors', async () => {
      const mocks = [
        {
          request: {
            query: GET_ALL_USERS,
            variables: {}
          },
          error: new Error('User not found')
        }
      ]

      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestQueryComponent query={GET_ALL_USERS} variables={{}} />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('Error: User not found')).toBeInTheDocument()
      })
    })
  })

  describe('XP Transactions Query', () => {
    it('should fetch XP transactions correctly', async () => {
      const mocks = [
        {
          request: {
            query: GET_ALL_TRANSACTIONS,
            variables: {}
          },
          result: {
            data: {
              transaction: mockXPTransactions
            }
          }
        }
      ]

      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestQueryComponent query={GET_ALL_TRANSACTIONS} variables={{}} />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('Data loaded')).toBeInTheDocument()
      })
    })
  })

  describe('Progress Query', () => {
    it('should fetch user progress correctly', async () => {
      const mocks = [
        {
          request: {
            query: GET_ALL_PROGRESS,
            variables: {}
          },
          result: {
            data: {
              progress: mockProgress
            }
          }
        }
      ]

      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestQueryComponent query={GET_ALL_PROGRESS} variables={{}} />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('Data loaded')).toBeInTheDocument()
      })
    })
  })

  describe('Audit Queries', () => {
    it('should fetch audits given correctly', async () => {
      const mocks = [
        {
          request: {
            query: GET_ALL_AUDITS,
            variables: {}
          },
          result: {
            data: {
              audit: mockAudits
            }
          }
        }
      ]

      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestQueryComponent query={GET_ALL_AUDITS} variables={{}} />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('Data loaded')).toBeInTheDocument()
      })
    })

    it('should fetch audits received correctly', async () => {
      const mocks = [
        {
          request: {
            query: GET_ALL_AUDITS,
            variables: {}
          },
          result: {
            data: {
              audit: mockAudits
            }
          }
        }
      ]

      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestQueryComponent query={GET_ALL_AUDITS} variables={{}} />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('Data loaded')).toBeInTheDocument()
      })
    })
  })

  describe('Complex Data Queries', () => {
    it('should fetch user groups correctly', async () => {
      const mocks = [
        {
          request: {
            query: GET_ALL_GROUPS,
            variables: {}
          },
          result: {
            data: {
              group: mockGroups
            }
          }
        }
      ]

      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestQueryComponent query={GET_ALL_GROUPS} variables={{}} />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('Data loaded')).toBeInTheDocument()
      })
    })

    it('should fetch user events correctly', async () => {
      const mocks = [
        {
          request: {
            query: GET_ALL_EVENTS,
            variables: {}
          },
          result: {
            data: {
              event: mockEvents
            }
          }
        }
      ]

      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestQueryComponent query={GET_ALL_EVENTS} variables={{}} />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('Data loaded')).toBeInTheDocument()
      })
    })
  })

  describe('Query Performance', () => {
    it('should handle large datasets efficiently', async () => {
      const largeXPTransactions = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        amount: Math.floor(Math.random() * 5000),
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        path: `/bahrain/bh-module/js/exercise-${i}`,
        object: {
          name: `exercise-${i}`,
          type: 'exercise'
        }
      }))

      const mocks = [
        {
          request: {
            query: GET_ALL_TRANSACTIONS,
            variables: {}
          },
          result: {
            data: {
              transaction: largeXPTransactions
            }
          }
        }
      ]

      const startTime = Date.now()
      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestQueryComponent query={GET_ALL_TRANSACTIONS} variables={{}} />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('Data loaded')).toBeInTheDocument()
      })

      const endTime = Date.now()
      const renderTime = endTime - startTime

      // Should render within reasonable time (less than 1 second)
      expect(renderTime).toBeLessThan(1000)
    })
  })
})
