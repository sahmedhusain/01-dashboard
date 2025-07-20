
import {
  // Core user queries
  GET_USER_INFO,
  GET_USER_BY_ID,
  GET_USER_COMPLETE,
  GET_USER_STATISTICS,
  GET_USERS_WITH_PAGINATION,

  // Transaction queries
  GET_USER_TRANSACTIONS,
  GET_USER_XP_TRANSACTIONS,
  GET_TRANSACTION_AGGREGATES,
  GET_TOTAL_XP,

  // Progress and audit queries
  GET_USER_PROGRESS,
  GET_PROGRESS_STATS,
  GET_USER_AUDITS,
  GET_AUDIT_STATS,

  // Group queries
  GET_USER_GROUPS,
  GET_GROUP_DETAILS,

  // Leaderboard and search
  GET_LEADERBOARD,
  SEARCH_USERS,
  GET_CAMPUS_STATS,

  // Legacy compatibility exports
  GET_AUDIT_RATIO,
  GET_PENDING_AUDITS,
  GET_TOP_XP_EARNERS,
  GET_XP_TIMELINE,
  GET_AUDIT_TIMELINE,
  GET_PROJECT_RESULTS,
  GET_PROJECT_ANALYTICS,
  GET_TECH_SKILLS,
  GET_AUDIT_PERFORMANCE,
  GET_XP_BREAKDOWN,
  GET_DASHBOARD_DATA,
  GET_USERS_ABOVE_LEVEL,
  GET_USERS_ABOVE_LEVEL_IN_COHORT,
  GET_TRANSACTIONS_BY_TYPE,
  GET_ALL_ROLES,
  GET_ROLE_STATISTICS,
  GET_ROOT_OBJECTS,
  GET_LEAF_OBJECTS,
  GET_COMPLETED_PROGRESS,
  GET_IN_PROGRESS,
  GET_LATEST_RESULTS,
} from './coreQueries';

// ============================================================================
// GRAPHQL DATA SERVICE - FOLLOWING REFERENCE PATTERN
// Simplified service class for GraphQL operations similar to graphqlexample1
// ============================================================================

export class GraphQLService {
  private client: any;
  private apiUrl: string;

  constructor(client: any) {
    this.client = client;
    this.apiUrl = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";
  }

  // Get JWT token from localStorage
  #getJWT() {
    return localStorage.getItem("reboot01_jwt_token");
  }

  // Generic fetch method with enhanced error handling (aligned with reference patterns)
  async #fetchData(query, variables = {}) {
    const jwt = this.#getJWT();
    if (!jwt || jwt.split(".").length !== 3) {
      return [null, new Error('Authentication required: Invalid or missing JWT token')];
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          query: query.trim(),
          variables
        }),
      });

      if (!response.ok) {
        // Enhanced error handling for different HTTP status codes
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        if (response.status === 401 || response.status === 403) {
          return [null, new Error(`Authentication failed: ${errorMessage}`)];
        }
        if (response.status >= 500) {
          return [null, new Error(`Server error: ${errorMessage}`)];
        }
        return [null, new Error(`Request failed: ${errorMessage}`)];
      }

      const result = await response.json();

      // Enhanced GraphQL error handling
      if (result.errors && result.errors.length > 0) {
        const errorMessages = result.errors.map(error => {
          const message = error.message || 'Unknown GraphQL error';
          const path = error.path ? ` at ${error.path.join('.')}` : '';
          return `${message}${path}`;
        });

        console.error("GraphQL Errors:", result.errors);
        return [null, new Error(`GraphQL Error: ${errorMessages.join('; ')}`)];
      }

      // Return data even if partial errors exist (following reference pattern)
      return [result.data, null];
    } catch (error) {
      console.error("Network/Parse Error:", error.message);
      return [null, new Error(`Network error: ${error.message}`)];
    }
  }

  // ============================================================================
  // USER INFORMATION METHODS - UPDATED FOR REFERENCE SCHEMA
  // ============================================================================

  async getUserInfo(userLogin) {
    const [data, error] = await this.#fetchData(GET_USER_INFO, { userLogin });
    if (error !== null) {
      return [null, error];
    }
    if ('user' in data && Array.isArray(data.user)) {
      const userData = data.user[0] || null;
      return [userData, null];
    }
    return [null, new Error("'user' key not in response")];
  }

  async getUserComplete(userLogin) {
    const [data, error] = await this.#fetchData(GET_USER_COMPLETE, { userLogin });
    if (error !== null) {
      return [null, error];
    }
    if ('user' in data && Array.isArray(data.user)) {
      const userData = data.user[0] || null;
      return [userData, null];
    }
    return [null, new Error("'user' key not in response")];
  }

  async getUserById(userId) {
    if (import.meta.env.DEV) {
      console.log('getUserById called with userId:', userId, typeof userId);
    }
    const [data, error] = await this.#fetchData(GET_USER_BY_ID, { userId });
    if (error !== null) {
      return [null, error];
    }
    if ('user' in data && Array.isArray(data.user)) {
      const userData = data.user[0] || null;
      return [userData, null];
    }
    return [null, new Error("'user' key not in response")];
  }

  async getUserStatistics() {
    const [data, error] = await this.#fetchData(GET_USER_STATISTICS);
    if (error !== null) {
      return [null, error];
    }
    if ('user_aggregate' in data) {
      return [data.user_aggregate, null];
    }
    return [null, new Error("'user_aggregate' key not in response")];
  }

  async getUsersWithPagination() {
    const [data, error] = await this.#fetchData(GET_USERS_WITH_PAGINATION);
    if (error !== null) {
      return [null, error];
    }
    return [data, null];
  }

  async getUsersByCampus(campus) {
    const [data, error] = await this.#fetchData(GET_USERS_WITH_PAGINATION, { campus, limit: 50, offset: 0 });
    if (error !== null) {
      return [null, error];
    }
    if ('user' in data) {
      return [data.user, null];
    }
    return [null, new Error("'user' key not in response")];
  }

  // ============================================================================
  // XP AND LEVEL METHODS
  // ============================================================================

  async getTotalXP(userLogin) {
    const [data, error] = await this.#fetchData(GET_TOTAL_XP, { userLogin });
    if (error !== null) {
      return [null, error];
    }
    if ('transaction_aggregate' in data) {
      return [data.transaction_aggregate, null];
    }
    return [null, new Error("'transaction_aggregate' key not in response")];
  }

  async getUserLevel(userLogin) {
    // Use user statistics to calculate level from XP
    const [data, error] = await this.#fetchData(GET_USER_STATISTICS, { userLogin });
    if (error !== null) {
      return [null, error];
    }
    if ('user' in data && Array.isArray(data.user) && data.user[0]) {
      const user = data.user[0];
      const totalXP = user.xp_total?.aggregate?.sum?.amount || 0;
      // Simple level calculation: level = floor(totalXP / 1000)
      const level = Math.floor(totalXP / 1000);
      return [{ level, totalXP, user }, null];
    }
    return [{ level: 0, totalXP: 0 }, null];
  }

  async getXPByProject(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_USER_XP_TRANSACTIONS,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('transaction' in data) {
      return [data.transaction, null];
    }
    return [null, new Error("'transaction' key not in response")];
  }

  // ============================================================================
  // SKILLS METHODS
  // ============================================================================

  async getUserSkills(userLogin) {
    // Use complete user profile to get skills data
    const [data, error] = await this.#fetchData(GET_USER_COMPLETE, { userLogin });
    if (error !== null) {
      return [null, error];
    }
    if ('user' in data && Array.isArray(data.user) && data.user[0]) {
      // Extract skills from transactions
      const user = data.user[0];
      const skillTransactions = user.transactions?.filter(t => t.type === 'up' || t.type === 'down') || [];
      return [skillTransactions, null];
    }
    return [[], null];
  }

  // ============================================================================
  // AUDIT METHODS - UPDATED FOR CORRECTED SCHEMA
  // ============================================================================

  async getPendingAudits() {
    const [data, error] = await this.#fetchData(GET_PENDING_AUDITS);
    if (error !== null) {
      return [null, error];
    }
    if ('audit' in data) {
      return [data.audit, null];
    }
    return [null, new Error("'audit' key not in response")];
  }

  async getCompletedAudits() {
    // Use pending audits query as fallback
    const [data, error] = await this.#fetchData(GET_PENDING_AUDITS);
    if (error !== null) {
      return [null, error];
    }
    if ('audit' in data) {
      return [data.audit, null];
    }
    return [null, new Error("'audit' key not in response")];
  }

  async getAuditRatio(userLogin) {
    const [data, error] = await this.#fetchData(GET_AUDIT_RATIO, { userLogin });
    if (error !== null) {
      return [null, error];
    }
    if ('user' in data && Array.isArray(data.user)) {
      return [data.user[0] || null, null];
    }
    return [null, new Error("'user' key not in response")];
  }

  // ============================================================================
  // PROGRESS AND RESULTS METHODS
  // ============================================================================

  async getUserProgress(userId) {
    const [data, error] = await this.#fetchData(
      GET_USER_PROGRESS,
      { userId }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('progress' in data) {
      return [data.progress, null];
    }
    return [null, new Error("'progress' key not in response")];
  }

  async getUserResults(userLogin) {
    // Use progress stats to get results data
    const [data, error] = await this.#fetchData(GET_PROGRESS_STATS, { userLogin });
    if (error !== null) {
      return [null, error];
    }
    return [data, null];
  }

  // ============================================================================
  // GROUP AND COLLABORATION METHODS - UPDATED
  // ============================================================================

  async getActiveGroups() {
    // Use campus stats as fallback for group data
    const [data, error] = await this.#fetchData(GET_CAMPUS_STATS, { campus: "bahrain" });
    if (error !== null) {
      return [null, error];
    }
    return [data.group_stats || [], null];
  }

  async getUserGroups(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_USER_GROUPS,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('group' in data) {
      return [data.group, null];
    }
    return [null, new Error("'group' key not in response")];
  }

  // ============================================================================
  // TRANSACTION METHODS - UPDATED
  // ============================================================================

  async getTopXPEarners() {
    const [data, error] = await this.#fetchData(GET_TOP_XP_EARNERS);
    if (error !== null) {
      return [null, error];
    }
    return [data, null];
  }

  async getTransactionsByType(type) {
    const [data, error] = await this.#fetchData(GET_TRANSACTIONS_BY_TYPE, { type });
    if (error !== null) {
      return [null, error];
    }
    if ('transaction' in data) {
      return [data.transaction, null];
    }
    return [null, new Error("'transaction' key not in response")];
  }

  // ============================================================================
  // ROLE METHODS
  // ============================================================================

  async getAllRoles() {
    const [data, error] = await this.#fetchData(GET_ALL_ROLES);
    if (error !== null) {
      return [null, error];
    }
    if ('transaction' in data) {
      return [data.transaction, null];
    }
    return [null, new Error("'transaction' key not in response")];
  }

  async getRoleStatistics() {
    const [data, error] = await this.#fetchData(GET_ROLE_STATISTICS);
    if (error !== null) {
      return [null, error];
    }
    return [data, null];
  }

  // ============================================================================
  // OBJECT METHODS
  // ============================================================================

  async getRootObjects() {
    const [data, error] = await this.#fetchData(GET_ROOT_OBJECTS);
    if (error !== null) {
      return [null, error];
    }
    if ('object' in data) {
      return [data.object, null];
    }
    return [null, new Error("'object' key not in response")];
  }

  async getLeafObjects() {
    const [data, error] = await this.#fetchData(GET_LEAF_OBJECTS);
    if (error !== null) {
      return [null, error];
    }
    if ('object' in data) {
      return [data.object, null];
    }
    return [null, new Error("'object' key not in response")];
  }

  // ============================================================================
  // ENHANCED PROGRESS METHODS
  // ============================================================================

  async getCompletedProgress() {
    const [data, error] = await this.#fetchData(GET_COMPLETED_PROGRESS);
    if (error !== null) {
      return [null, error];
    }
    if ('progress' in data) {
      return [data.progress, null];
    }
    return [null, new Error("'progress' key not in response")];
  }

  async getInProgress() {
    const [data, error] = await this.#fetchData(GET_IN_PROGRESS);
    if (error !== null) {
      return [null, error];
    }
    if ('progress' in data) {
      return [data.progress, null];
    }
    return [null, new Error("'progress' key not in response")];
  }

  // ============================================================================
  // ENHANCED RESULT METHODS
  // ============================================================================

  async getLatestResults() {
    const [data, error] = await this.#fetchData(GET_LATEST_RESULTS);
    if (error !== null) {
      return [null, error];
    }
    if ('result' in data) {
      return [data.result, null];
    }
    return [null, new Error("'result' key not in response")];
  }

  // ============================================================================
  // RANKING METHODS
  // ============================================================================

  async getUsersAboveLevel(level) {
    const [data, error] = await this.#fetchData(
      GET_USERS_ABOVE_LEVEL,
      { level }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('event_user' in data) {
      return [data.event_user, null];
    }
    return [null, new Error("'event_user' key not in response")];
  }

  async getUsersAboveLevelInCohort(level, eventId) {
    const [data, error] = await this.#fetchData(
      GET_USERS_ABOVE_LEVEL_IN_COHORT,
      { level, eventId }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('event_user' in data) {
      return [data.event_user, null];
    }
    return [null, new Error("'event_user' key not in response")];
  }

  // ============================================================================
  // DASHBOARD METHOD
  // ============================================================================

  async getDashboardData(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_DASHBOARD_DATA,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    return [data, null];
  }

  // ============================================================================
  // TIMELINE AND PROGRESSION METHODS
  // ============================================================================

  async getXPTimeline(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_XP_TIMELINE,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('transaction' in data) {
      return [data.transaction, null];
    }
    return [null, new Error("'transaction' key not in response")];
  }

  async getAuditTimeline(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_AUDIT_TIMELINE,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('transaction' in data) {
      return [data.transaction, null];
    }
    return [null, new Error("'transaction' key not in response")];
  }

  async getProjectResults(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_PROJECT_RESULTS,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('result' in data) {
      return [data.result, null];
    }
    return [null, new Error("'result' key not in response")];
  }

  // ============================================================================
  // SEARCH METHODS
  // ============================================================================

  async searchGroups(eventId, pathSearch, status) {
    const query = `
      query GroupSearch($eventId: Int!, $pathSearch: String!, $status: group_status_enum!) {
        group(
          where: {
            eventId: { _eq: $eventId },
            path: { _like: $pathSearch },
            status: { _eq: $status }
          },
          order_by: [
            { status: asc },
            { updatedAt: desc }
          ]
        ) {
          status
          path
          members {
            userLogin
            user {
              firstName
              lastName
            }
          }
        }
      }
    `;

    const variables = {
      eventId,
      pathSearch,
      status
    };

    const [data, error] = await this.#fetchData(query, variables);
    if (error !== null) {
      return [null, error];
    }
    if ('group' in data) {
      return [data.group, null];
    }
    return [null, new Error("'group' key not in response")];
  }

  // ============================================================================
  // ENHANCED ANALYTICS METHODS FOR PROFESSIONAL DASHBOARD
  // ============================================================================

  async getProjectAnalytics(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_PROJECT_ANALYTICS,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('result' in data) {
      return [data.result, null];
    }
    return [null, new Error("'result' key not in response")];
  }

  async getTechSkills(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_TECH_SKILLS,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('transaction' in data) {
      return [data.transaction, null];
    }
    return [null, new Error("'transaction' key not in response")];
  }

  async getAuditPerformance(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_AUDIT_PERFORMANCE,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    return [data, null];
  }

  async getXPBreakdown(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_XP_BREAKDOWN,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('transaction' in data) {
      return [data.transaction, null];
    }
    return [null, new Error("'transaction' key not in response")];
  }

  // Comprehensive analytics method that combines multiple data sources
  async getComprehensiveAnalytics(userLogin) {
    // Temporarily disabled caching for debugging
    /* const cacheManager = CacheUtils.getInstance();
    const cachedData = cacheManager.get(CacheUtils.config.KEYS.ANALYTICS_DATA, userLogin);

    if (cachedData !== null) {
      return [cachedData, null];
    } */

    try {
      const [
        [userInfo, userError],
        [totalXP, xpError],
        [skills, skillsError],
        [projectAnalytics, projectError],
        [techSkills, techError],
        [auditPerformance, auditError],
        [xpTimeline, timelineError],
        [xpBreakdown, breakdownError]
      ] = await Promise.all([
        this.getUserInfo(userLogin),
        this.getTotalXP(userLogin),
        this.getUserSkills(userLogin),
        this.getProjectAnalytics(userLogin),
        this.getTechSkills(userLogin),
        this.getAuditPerformance(userLogin),
        this.getXPTimeline(userLogin),
        this.getXPBreakdown(userLogin)
      ]);

      // Check for any errors
      const errors = [userError, xpError, skillsError, projectError, techError, auditError, timelineError, breakdownError]
        .filter(error => error !== null);

      if (errors.length > 0) {
        console.warn('Some analytics data failed to load:', errors);
      }

      const analyticsData = {
        user: userInfo?.[0] || null,
        totalXP: totalXP?.aggregate?.sum?.amount || 0,
        skills: skills || [],
        projectAnalytics: projectAnalytics || [],
        techSkills: techSkills || [],
        auditPerformance: auditPerformance || {},
        xpTimeline: xpTimeline || [],
        xpBreakdown: xpBreakdown || []
      };



      // Cache the result if successful - temporarily disabled
      /* if (errors.length === 0) {
        cacheManager.set(
          CacheUtils.config.KEYS.ANALYTICS_DATA,
          analyticsData,
          CacheUtils.config.ANALYTICS,
          userLogin
        );
      } */

      return [analyticsData, errors.length > 0 ? errors[0] : null];

    } catch (error) {
      return [null, error];
    }
  }
}

// Create and export default instance
export const graphqlService = new GraphQLService(null);
