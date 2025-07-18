# Reboot01 Database Schema Guide

## Overview

This guide provides comprehensive documentation for the Reboot01 GraphQL database schema, including entity relationships, field structures, query patterns, and best practices for accessing the API.

## Authentication

All queries require JWT authentication:
```
Authorization: Bearer <JWT_TOKEN>
```

The user role has read-only access to most entities with some restrictions based on user permissions and campus associations.

## Core Entities

### 1. User Entity

**Table**: `user`

**Key Fields**:
- `id` (Int): Unique user identifier
- `login` (String): User login name (e.g., "sayehusain")
- `firstName` (String): User's first name
- `lastName` (String): User's last name
- `auditRatio` (Float): User's audit performance ratio
- `totalUp` (Int): Total up votes received
- `totalDown` (Int): Total down votes received
- `attrs` (JSONB): Additional user attributes
- `campus` (String): Campus association
- `profile` (JSONB): User profile information
- `createdAt` (Timestamp): Account creation date
- `updatedAt` (Timestamp): Last update date

**Relationships**:
- One-to-many with `transaction` (user transactions)
- One-to-many with `progress` (user progress)
- One-to-many with `result` (user results)
- Many-to-many with `group` via `group_user`
- Many-to-many with `event` via `event_user`
- Many-to-many with `registration` via `registration_user`
- Many-to-many with `role` via `user_role`

### 2. Transaction Entity

**Table**: `transaction`

**Key Fields**:
- `id` (Int): Unique transaction identifier
- `type` (String): Transaction type ("xp", "up", "down")
- `amount` (Float): Transaction amount
- `userId` (Int): User who received the transaction
- `objectId` (Int): Related object/project
- `eventId` (Int): Related event
- `path` (String): Project/exercise path
- `campus` (String): Campus association
- `attrs` (JSONB): Additional transaction attributes
- `createdAt` (Timestamp): Transaction date

**Transaction Types**:
- `xp`: Experience points from completing projects
- `up`: Positive audit feedback (skill increase)
- `down`: Negative audit feedback (skill decrease)

### 3. Event Entity

**Table**: `event`

**Key Fields**:
- `id` (Int): Unique event identifier
- `createdAt` (Timestamp): Event creation date
- `endAt` (Timestamp): Event end date (nullable)
- `objectId` (Int): Related object/activity
- `parentId` (Int): Parent event (self-referential)
- `path` (String): Event path (e.g., "/bahrain/bh-module")
- `campus` (String): Campus association

**Relationships**:
- Many-to-many with `user` via `event_user`
- One-to-many with `group` (groups in event)
- Belongs-to `object` (event activity)
- Self-referential parent-child relationship

### 4. Object Entity

**Table**: `object`

**Key Fields**:
- `id` (Int): Unique object identifier
- `name` (String): Object name
- `type` (String): Object type ("project", "exercise", "quest", "exam", "raid", "piscine", "campus", "onboarding")
- `attrs` (JSONB): Object attributes and configuration
- `authorId` (Int): Object author
- `campus` (String): Campus association
- `createdAt` (Timestamp): Creation date
- `updatedAt` (Timestamp): Last update date

**Hierarchical Structure**:
Objects form a tree structure via `object_child` table:
- Campus → Piscine → Quest → Exercise
- Campus → Module → Project

### 5. Progress Entity

**Table**: `progress`

**Key Fields**:
- `id` (Int): Unique progress identifier
- `userId` (Int): User making progress
- `groupId` (Int): Group (if applicable)
- `eventId` (Int): Related event
- `objectId` (Int): Object being progressed on
- `version` (String): Git commit hash
- `grade` (Float): Current grade
- `isDone` (Boolean): Completion status
- `path` (String): Progress path
- `campus` (String): Campus association
- `createdAt` (Timestamp): Progress start date
- `updatedAt` (Timestamp): Last update date

### 6. Result Entity

**Table**: `result`

**Key Fields**:
- `id` (Int): Unique result identifier
- `userId` (Int): User who achieved the result
- `groupId` (Int): Group (if applicable)
- `objectId` (Int): Object the result is for
- `eventId` (Int): Related event
- `grade` (Float): Result grade
- `type` (String): Result type ("tester", "user_audit", "admit_audit", "admin_selection", "status")
- `version` (String): Git commit hash
- `isLast` (Boolean): Whether this is the final result
- `attrs` (JSONB): Additional result data
- `path` (String): Result path
- `campus` (String): Campus association
- `createdAt` (Timestamp): Result date
- `updatedAt` (Timestamp): Last update date

### 7. Audit Entity

**Table**: `audit`

**Key Fields**:
- `id` (Int): Unique audit identifier
- `groupId` (Int): Group being audited
- `auditorId` (Int): User performing the audit
- `resultId` (Int): Related result (nullable until completed)
- `grade` (Float): Audit grade (nullable until completed)
- `version` (String): Git commit hash being audited
- `attrs` (JSONB): Audit feedback and details
- `endAt` (Timestamp): Audit expiration date
- `createdAt` (Timestamp): Audit creation date
- `updatedAt` (Timestamp): Last update date

### 8. Group Entity

**Table**: `group`

**Key Fields**:
- `id` (Int): Unique group identifier
- `objectId` (Int): Project/object the group is working on
- `eventId` (Int): Related event
- `captainId` (Int): Group captain user ID
- `status` (String): Group status ("setup", "working", "audit", "finished")
- `path` (String): Group path
- `campus` (String): Campus association
- `createdAt` (Timestamp): Group creation date
- `updatedAt` (Timestamp): Last update date

**Relationships**:
- Many-to-many with `user` via `group_user`
- Belongs-to `user` (captain)
- Belongs-to `object` (project)
- Belongs-to `event`

## Entity Relationship Diagram

```
USER ──┬── TRANSACTION (1:N)
       ├── PROGRESS (1:N)
       ├── RESULT (1:N)
       ├── AUDIT (1:N) [as auditor]
       ├── GROUP_USER (1:N) ── GROUP (N:1)
       ├── EVENT_USER (1:N) ── EVENT (N:1)
       ├── REGISTRATION_USER (1:N) ── REGISTRATION (N:1)
       └── USER_ROLE (1:N) ── ROLE (N:1)

OBJECT ──┬── OBJECT_CHILD (1:N) [hierarchical]
         ├── EVENT (1:N)
         ├── GROUP (1:N)
         ├── PROGRESS (1:N)
         ├── RESULT (1:N)
         ├── TRANSACTION (1:N)
         └── REGISTRATION (1:N)

EVENT ──┬── EVENT_USER (1:N)
        ├── GROUP (1:N)
        ├── PROGRESS (1:N)
        ├── RESULT (1:N)
        ├── TRANSACTION (1:N)
        └── MATCH (1:N)

GROUP ──┬── GROUP_USER (1:N)
        ├── AUDIT (1:N)
        ├── PROGRESS (1:N)
        └── RESULT (1:N)
```

## Common Query Patterns

### 1. User Information Queries

```graphql
# Basic user info
query GetUserInfo($userLogin: String!) {
  user(where: { login: { _eq: $userLogin } }) {
    id
    login
    firstName
    lastName
    auditRatio
    totalUp
    totalDown
    campus
    profile
  }
}
```

### 2. XP and Transaction Queries

```graphql
# User total XP
query GetUserTotalXP($userLogin: String!) {
  transaction_aggregate(
    where: {
      type: { _eq: "xp" }
      user: { login: { _eq: $userLogin } }
    }
  ) {
    aggregate {
      sum {
        amount
      }
      count
    }
  }
}
```

### 3. Progress Tracking Queries

```graphql
# User progress
query GetUserProgress($userLogin: String!) {
  progress(
    where: { user: { login: { _eq: $userLogin } } }
    order_by: { createdAt: desc }
    limit: 20
  ) {
    id
    grade
    isDone
    path
    createdAt
    object {
      name
      type
    }
  }
}
```

## Permission Model

### User Role Permissions

The `user` role has the following access patterns:

**✅ Full Read Access**:
- Own user information
- Own transactions, progress, results
- Own group memberships
- Own event participations
- Own audit history (as auditor)
- Public object information
- Public event information

**⚠️ Limited Read Access**:
- Other users' basic information (login, name, campus, audit ratio)
- Aggregate statistics
- Group member information (when in same group)
- Event participant information (when in same event)

**❌ No Access**:
- Other users' detailed profile information
- Other users' private attributes
- Administrative functions
- Write operations (mutations)

### Campus Restrictions

Some queries may be filtered by campus association, limiting users to see data primarily from their own campus.

## Best Practices

### 1. Query Optimization

- Always use `limit` to prevent large result sets
- Use `order_by` for consistent pagination
- Leverage aggregate queries for statistics
- Use `distinct_on` when appropriate

### 2. Error Handling

- Check for `errors` array in GraphQL responses
- Handle permission denied errors gracefully
- Implement retry logic for network failures

### 3. Caching Strategy

- Cache user profile information
- Cache aggregate statistics with appropriate TTL
- Invalidate cache on user actions

### 4. Rate Limiting

- Implement client-side rate limiting
- Use batch queries when possible
- Avoid polling; prefer event-driven updates

## Query Library Structure

The query library is organized into folders by entity:

```
src/graphql/queries/
├── user/
│   ├── basic.graphql
│   ├── relationships.graphql
│   └── aggregates.graphql
├── transaction/
│   ├── basic.graphql
│   └── aggregates.graphql
├── event/
│   └── basic.graphql
├── audit/
│   └── basic.graphql
├── object/
│   └── basic.graphql
├── progress/
│   └── basic.graphql
├── result/
│   └── basic.graphql
├── group/
│   └── basic.graphql
├── registration/
│   └── basic.graphql
└── misc/
    ├── roles.graphql
    ├── records.graphql
    └── matches.graphql
```

Each file contains focused queries for specific use cases, with proper variable definitions and comprehensive field selections.
