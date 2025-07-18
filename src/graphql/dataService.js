import {
  GET_USER_STATISTICS,
  GET_USERS_WITH_PAGINATION,
  GET_ACTIVE_GROUPS,
  GET_PENDING_AUDITS,
  GET_COMPLETED_AUDITS,
  GET_TOP_XP_EARNERS,
  GET_TOTAL_XP,
  GET_USER_LEVEL,
  GET_XP_BY_PROJECT,
  GET_USER_SKILLS,
  GET_AUDIT_RATIO,
  GET_USER_PROGRESS,
  GET_USER_RESULTS,
  GET_USER_GROUPS,
  GET_USERS_ABOVE_LEVEL,
  GET_USERS_ABOVE_LEVEL_IN_COHORT,
  GET_DASHBOARD_DATA,
  GET_XP_TIMELINE,
  GET_AUDIT_TIMELINE,
  GET_PROJECT_RESULTS,
  GET_USER_INFO,
  GET_USER_BY_ID,
  GET_USERS_BY_CAMPUS,
  GET_TRANSACTIONS_BY_TYPE,
  GET_ALL_ROLES,
  GET_ROLE_STATISTICS,
  GET_ROOT_OBJECTS,
  GET_LEAF_OBJECTS,
  GET_COMPLETED_PROGRESS,
  GET_IN_PROGRESS,
  GET_LATEST_RESULTS,
} from './coreQueries.js';

// ============================================================================
// GRAPHQL DATA SERVICE - FOLLOWING REFERENCE PATTERN
// Simplified service class for GraphQL operations similar to graphqlexample1
// ============================================================================

export class GraphQLService {
  constructor(client) {
    this.client = client;
    this.apiUrl = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";
  }

  // Get JWT token from localStorage
  #getJWT() {
    return localStorage.getItem("reboot01_jwt_token");
  }

  // Generic fetch method with error handling
  async #fetchData(query, variables = {}) {
    const jwt = this.#getJWT();
    if (!jwt || jwt.split(".").length !== 3) {
      return [null, new Error('Invalid Token')];
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error("GraphQL Errors: " + result.errors.map((error) => error.message).join(", "));
      }

      return [result.data, null];
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return [null, error];
    }
  }

  // ============================================================================
  // USER INFORMATION METHODS - UPDATED FOR CORRECTED SCHEMA
  // ============================================================================

  async getUserInfo(userLogin) {
    const [data, error] = await this.#fetchData(GET_USER_INFO, { userLogin });
    if (error !== null) {
      return [null, error];
    }
    if ('user' in data && Array.isArray(data.user)) {
      return [data.user[0] || null, null];
    }
    return [null, new Error("'user' key not in response")];
  }

  async getUserById(userId) {
    const [data, error] = await this.#fetchData(GET_USER_BY_ID, { userId });
    if (error !== null) {
      return [null, error];
    }
    if ('user_by_pk' in data) {
      return [data.user_by_pk, null];
    }
    return [null, new Error("'user_by_pk' key not in response")];
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
    const [data, error] = await this.#fetchData(GET_USERS_BY_CAMPUS, { campus });
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

  async getTotalXP() {
    const [data, error] = await this.#fetchData(GET_TOTAL_XP);
    if (error !== null) {
      return [null, error];
    }
    if ('transaction_aggregate' in data) {
      return [data.transaction_aggregate, null];
    }
    return [null, new Error("'transaction_aggregate' key not in response")];
  }

  async getUserLevel(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_USER_LEVEL,
      { userLogin }
    );
    if (error !== null) {
      return [null, error];
    }
    if ('event_user' in data && Array.isArray(data.event_user)) {
      return [data.event_user[0] || null, null];
    }
    return [null, new Error("'event_user' key not in response")];
  }

  async getXPByProject(userLogin) {
    const [data, error] = await this.#fetchData(
      GET_XP_BY_PROJECT,
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

  async getUserSkills() {
    const [data, error] = await this.#fetchData(GET_USER_SKILLS);
    if (error !== null) {
      return [null, error];
    }
    if ('transaction' in data) {
      return [data.transaction, null];
    }
    return [null, new Error("'transaction' key not in response")];
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
    const [data, error] = await this.#fetchData(GET_COMPLETED_AUDITS);
    if (error !== null) {
      return [null, error];
    }
    if ('audit' in data) {
      return [data.audit, null];
    }
    return [null, new Error("'audit' key not in response")];
  }

  async getAuditRatio() {
    const [data, error] = await this.#fetchData(GET_AUDIT_RATIO);
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

  async getUserResults(userId) {
    const [data, error] = await this.#fetchData(
      GET_USER_RESULTS,
      { userId }
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
  // GROUP AND COLLABORATION METHODS - UPDATED
  // ============================================================================

  async getActiveGroups() {
    const [data, error] = await this.#fetchData(GET_ACTIVE_GROUPS);
    if (error !== null) {
      return [null, error];
    }
    if ('group' in data) {
      return [data.group, null];
    }
    return [null, new Error("'group' key not in response")];
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
}

// Create and export default instance
export const graphqlService = new GraphQLService();
