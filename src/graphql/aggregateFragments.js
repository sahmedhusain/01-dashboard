import { gql } from '@apollo/client';

// ============================================================================
// AGGREGATE FRAGMENTS FOR STATISTICAL DATA
// ============================================================================

// Audit aggregate fragments
export const AUDIT_AGGREGATE_FRAGMENT = gql`
  fragment AuditAggregateInfo on audit_aggregate {
    aggregate {
      count
      avg {
        grade
      }
      max {
        grade
      }
      min {
        grade
      }
      sum {
        grade
      }
    }
  }
`;

// Transaction aggregate fragments
export const TRANSACTION_AGGREGATE_FRAGMENT = gql`
  fragment TransactionAggregateInfo on transaction_aggregate {
    aggregate {
      count
      avg {
        amount
      }
      max {
        amount
      }
      min {
        amount
      }
      sum {
        amount
      }
    }
  }
`;

// Progress aggregate fragments
export const PROGRESS_AGGREGATE_FRAGMENT = gql`
  fragment ProgressAggregateInfo on progress_aggregate {
    aggregate {
      count
      avg {
        grade
      }
      max {
        grade
      }
      min {
        grade
      }
    }
  }
`;

// Result aggregate fragments
export const RESULT_AGGREGATE_FRAGMENT = gql`
  fragment ResultAggregateInfo on result_aggregate {
    aggregate {
      count
      avg {
        grade
      }
      max {
        grade
      }
      min {
        grade
      }
      sum {
        grade
      }
    }
  }
`;

// Object aggregate fragments
export const OBJECT_AGGREGATE_FRAGMENT = gql`
  fragment ObjectAggregateInfo on object_aggregate {
    aggregate {
      count
    }
  }
`;

// Event user aggregate fragments
export const EVENT_USER_AGGREGATE_FRAGMENT = gql`
  fragment EventUserAggregateInfo on event_user_aggregate {
    aggregate {
      count
    }
  }
`;

// Group aggregate fragments
export const GROUP_AGGREGATE_FRAGMENT = gql`
  fragment GroupAggregateInfo on group_aggregate {
    aggregate {
      count
    }
  }
`;

export const GROUP_USER_AGGREGATE_FRAGMENT = gql`
  fragment GroupUserAggregateInfo on group_user_aggregate {
    aggregate {
      count
    }
  }
`;

// Label aggregate fragments
export const LABEL_USER_AGGREGATE_FRAGMENT = gql`
  fragment LabelUserAggregateInfo on label_user_aggregate {
    aggregate {
      count
    }
  }
`;

// Match aggregate fragments
export const MATCH_AGGREGATE_FRAGMENT = gql`
  fragment MatchAggregateInfo on match_aggregate {
    aggregate {
      count
    }
  }
`;

// Object availability aggregate fragments
export const OBJECT_AVAILABILITY_AGGREGATE_FRAGMENT = gql`
  fragment ObjectAvailabilityAggregateInfo on object_availability_aggregate {
    aggregate {
      count
    }
  }
`;

// Progress by path view aggregate fragments
export const PROGRESS_BY_PATH_VIEW_AGGREGATE_FRAGMENT = gql`
  fragment ProgressByPathViewAggregateInfo on progress_by_path_view_aggregate {
    aggregate {
      count
    }
  }
`;

// Registration user aggregate fragments
export const REGISTRATION_USER_AGGREGATE_FRAGMENT = gql`
  fragment RegistrationUserAggregateInfo on registration_user_aggregate {
    aggregate {
      count
    }
  }
`;

// User role aggregate fragments
export const USER_ROLE_AGGREGATE_FRAGMENT = gql`
  fragment UserRoleAggregateInfo on user_role_aggregate {
    aggregate {
      count
    }
  }
`;

export const USER_ROLES_VIEW_AGGREGATE_FRAGMENT = gql`
  fragment UserRolesViewAggregateInfo on user_roles_view_aggregate {
    aggregate {
      count
    }
  }
`;

// TOAD sessions aggregate fragments
export const TOAD_SESSIONS_AGGREGATE_FRAGMENT = gql`
  fragment ToadSessionsAggregateInfo on toad_sessions_aggregate {
    aggregate {
      count
    }
  }
`;

// ============================================================================
// SPECIALIZED AGGREGATE FRAGMENTS
// ============================================================================

// XP view aggregate fragments
export const XP_VIEW_AGGREGATE_FRAGMENT = gql`
  fragment XPViewAggregateInfo on xp_view_aggregate {
    aggregate {
      count
      sum {
        amount
      }
      avg {
        amount
      }
      max {
        amount
      }
      min {
        amount
      }
    }
  }
`;

// Record aggregate fragments
export const RECORD_AGGREGATE_FRAGMENT = gql`
  fragment RecordAggregateInfo on record_aggregate {
    aggregate {
      count
    }
  }
`;

// Path aggregate fragments
export const PATH_AGGREGATE_FRAGMENT = gql`
  fragment PathAggregateInfo on path_aggregate {
    aggregate {
      count
    }
  }
`;

// Path archive aggregate fragments
export const PATH_ARCHIVE_AGGREGATE_FRAGMENT = gql`
  fragment PathArchiveAggregateInfo on path_archive_aggregate {
    aggregate {
      count
    }
  }
`;

// ============================================================================
// COMPLEX AGGREGATE FRAGMENTS WITH BOOLEAN EXPRESSIONS
// ============================================================================

// Progress aggregate with boolean expressions
export const PROGRESS_AGGREGATE_BOOL_FRAGMENT = gql`
  fragment ProgressAggregateBoolInfo on progress_aggregate_bool_exp {
    _and
    _not
    _or
    count
    bool_and
    bool_or
  }
`;

// Result aggregate with boolean expressions
export const RESULT_AGGREGATE_BOOL_FRAGMENT = gql`
  fragment ResultAggregateBoolInfo on result_aggregate_bool_exp {
    _and
    _not
    _or
    count
    bool_and
    bool_or
  }
`;

// Transaction aggregate with boolean expressions
export const TRANSACTION_AGGREGATE_BOOL_FRAGMENT = gql`
  fragment TransactionAggregateBoolInfo on transaction_aggregate_bool_exp {
    _and
    _not
    _or
    count
    bool_and
    bool_or
  }
`;

// Group user aggregate with boolean expressions
export const GROUP_USER_AGGREGATE_BOOL_FRAGMENT = gql`
  fragment GroupUserAggregateBoolInfo on group_user_aggregate_bool_exp {
    _and
    _not
    _or
    count
    bool_and
    bool_or
  }
`;

// Match aggregate with boolean expressions
export const MATCH_AGGREGATE_BOOL_FRAGMENT = gql`
  fragment MatchAggregateBoolInfo on match_aggregate_bool_exp {
    _and
    _not
    _or
    count
    bool_and
    bool_or
  }
`;
