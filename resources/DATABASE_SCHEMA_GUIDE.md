# Reboot01 Database Schema Structure and Relations

## Overview

The Reboot01 platform uses a comprehensive database schema designed to manage educational content, user progress, events, groups, audits, and various other aspects of a coding school platform. The database follows a relational model with well-defined entity relationships and is accessible through a GraphQL API.

## Database Schema Organization

The database is organized into several logical groups of related tables:

1. **Events System** - Managing time-based activities
2. **Objects System** - Content structure and curriculum
3. **Users System** - User management and roles
4. **Results System** - Progress tracking and assessments
5. **Supporting Tables** - Utility and configuration tables

---

## 1. Events System

### Tables Overview
- `event`
- `registration` 
- `registration_user`
- `event_user`

### event
**Purpose**: Anchors objects into time and manages the temporal aspects of the platform.

**Key Columns**:
- `id` - Primary key
- `createdAt` - Event creation timestamp
- `endAt` - Event end timestamp
- `registrationId` - Links to registration table (1:1)
- `objectId` - Links to object table (N:1)
- `parentId` - Self-referencing for event hierarchy
- `status` - Event completion status
- `path` - Relative URL path
- `campus` - Associated campus
- `code` - Unlock code for exams

**Relations**:
- **Self-referencing**: `parentId` → `event.id` (hierarchical events)
- **One-to-One**: `registrationId` → `registration.id`
- **Many-to-One**: `objectId` → `object.id`
- **Many-to-Many**: Through `event_user` table

### registration
**Purpose**: Manages registrations to events (exams, piscines, etc.).

**Key Columns**:
- `id` - Primary key
- `createdAt` - Registration creation time
- `startAt` - When registration opens
- `endAt` - When registration closes
- `eventStartAt` - When the actual event starts
- `objectId` - Object being registered for
- `parentId` - Parent object reference
- `attrs` - Additional attributes
- `path` - URL path
- `campus` - Associated campus

**Relations**:
- **One-to-One**: `id` → `event.registrationId`
- **Many-to-One**: `objectId` → `object.id`
- **Many-to-Many**: Through `registration_user` table

### registration_user
**Purpose**: Links users to event registrations (Many-to-Many relationship).

**Key Columns**:
- `id` - Primary key
- `registrationId` - Links to registration
- `userId` - Links to user
- `createdAt` - Registration timestamp

### event_user
**Purpose**: Links users to events (Many-to-Many relationship).

**Key Columns**:
- `id` - Primary key
- `userId` - Links to user
- `eventId` - Links to event
- `createdAt` - Association timestamp

---

## 2. Objects System

### Tables Overview
- `object`
- `object_child`

### object
**Purpose**: Generic representation of curriculum elements (exercises, quests, projects, etc.) arranged in hierarchical structure.

**Key Columns**:
- `id` - Primary key
- `name` - Object name
- `type` - Object type (onboarding, campus, exercise, quest, signup, exam, raid, project, piscine)
- `status` - Object status (should be 'online')
- `attrs` - Object attributes (see attributes.md)
- `childrenAttrs` - Attributes applied to child objects
- `createdAt`, `updatedAt` - Timestamps
- `campus` - Associated campus
- `referenceId` - Points to reference object for duplicates
- `referencedAt` - Duplication timestamp
- `authorId` - Object author

**Object Types**:
- `onboarding` - Initial user orientation
- `campus` - Campus-level container
- `exercise` - Individual coding exercises
- `quest` - Collection of related exercises
- `signup` - Registration processes
- `exam` - Timed assessments
- `raid` - Group challenges
- `project` - Major assignments
- `piscine` - Intensive training programs

**Relations**:
- **Self-referencing**: `referenceId` → `object.id` (for duplicates)
- **Many-to-One**: `authorId` → `user.id`
- **Hierarchical**: Through `object_child` table

### object_child
**Purpose**: Defines parent-child relationships between objects for encapsulation.

**Key Columns**:
- `id` - Primary key
- `parentId` - Parent object ID
- `childId` - Child object ID
- `attrs` - Child-specific attributes
- `key` - JavaScript object key (used in URLs)
- `index` - Position within parent

**Relations**:
- **Many-to-One**: `parentId` → `object.id`
- **Many-to-One**: `childId` → `object.id`

**Example Hierarchy**:
```
Campus Madeira (parent)
├── Piscine Go (child of campus, parent of quests)
│   ├── Quest 01 (child of piscine)
│   ├── Quest 02 (child of piscine)
│   └── Exam (child of piscine)
└── Raids (child of campus)
```

---

## 3. Users System

### Tables Overview
- `user`
- `role`
- `user_role`
- `group`
- `group_user`
- `token`
- `record`
- `transaction`

### user
**Purpose**: Core user information and profiles.

**Key Columns**:
- `id` - Primary key
- `githubId` - (deprecated)
- `githubLogin` - GitHub login (alias: login)
- `discordId`, `discordLogin` - (deprecated)
- `profile` - User profile information
- `attrs` - Extended user attributes (email, address, etc.)
- `createdAt`, `updatedAt` - Timestamps
- `campus` - Associated campus

### role
**Purpose**: Defines permission roles for users.

**Key Columns**:
- `id` - Primary key
- `slug` - Role identifier
- `name` - Role name
- `description` - Role description
- `createdAt`, `updatedAt` - Timestamps

### user_role
**Purpose**: Links users to roles (Many-to-Many relationship).

**Key Columns**:
- `id` - Primary key
- `userId` - Links to user
- `roleId` - Links to role

### group
**Purpose**: Manages student groups for projects and raids.

**Key Columns**:
- `id` - Primary key
- `objectId` - Object being worked on
- `eventId` - Associated event
- `captainId` - Group captain user ID
- `createdAt`, `updatedAt` - Timestamps
- `status` - Group status (setup, working, audit, finished)
- `path` - URL path
- `campus` - Associated campus

**Group Statuses**:
- `setup` - Group formation phase
- `working` - Active development
- `audit` - Under review
- `finished` - Completed

**Relations**:
- **Many-to-One**: `objectId` → `object.id`
- **Many-to-One**: `eventId` → `event.id`
- **Many-to-One**: `captainId` → `user.id`

### group_user
**Purpose**: Links users to groups (Many-to-Many relationship).

**Key Columns**:
- `id` - Primary key
- `userId` - Links to user
- `groupId` - Links to group
- `confirmed` - User confirmation status (boolean)
- `createdAt`, `updatedAt` - Timestamps

### token
**Purpose**: Stores Hasura authorization tokens for users.

**Key Columns**:
- `id` - Primary key
- `status` - Token status
- `createdAt`, `updatedAt` - Timestamps

### record
**Purpose**: Tracks user records including bans and disciplinary actions.

**Key Columns**:
- `id` - Primary key
- `userId` - User being recorded
- `authorId` - User creating the record
- `message` - Record description
- `banEndAt` - Ban expiration date
- `createdAt` - Record creation time

### transaction
**Purpose**: Tracks user rewards and point transactions.

**Key Columns**:
- `id` - Primary key
- `type` - Transaction type (xp, up, down)
- `amount` - Transaction amount/percentage
- `userId` - User receiving transaction
- `attrs` - Additional attributes
- `createdAt` - Transaction timestamp
- `path` - Associated path
- `objectId` - Associated object
- `eventId` - Associated event
- `campus` - Associated campus

**Transaction Types**:
- `xp` - Experience points for completing objects
- `up` - Points for conducting reviews/audits
- `down` - Points for receiving reviews/audits

---

## 4. Results System

### Tables Overview
- `audit`
- `match`
- `progress`
- `result`

### audit
**Purpose**: Manages peer review system where students audit each other's work.

**Key Columns**:
- `id` - Primary key
- `groupId` - Group being audited
- `auditorId` - User conducting audit
- `attrs` - Audit feedback and attributes
- `grade` - Audit score (ratio of passed/required questions)
- `createdAt`, `updatedAt` - Timestamps
- `code` - Audit access code (nullified after expiration)
- `resultId` - Final audit result
- `version` - Git commit SHA being audited
- `endAt` - Audit expiration date
- `private` - Access control flag

**Grading System**:
- `< 1.0` - Failed
- `>= 1.0` - Passed  
- `> 1.0` - Passed with bonus points

**Relations**:
- **Many-to-One**: `groupId` → `group.id`
- **Many-to-One**: `auditorId` → `user.id`
- **One-to-One**: `resultId` → `result.id` (when finalized)

### match
**Purpose**: Manages betting system for bonus exercises and student matching.

**Key Columns**:
- `id` - Primary key
- `createdAt`, `updatedAt` - Timestamps
- `objectId` - Object requiring match
- `userId` - User requesting match
- `matchId` - Matched user ID
- `confirmed` - Match confirmation status
- `bet` - Betting prediction (boolean)
- `result` - Betting outcome (boolean)
- `path` - URL path
- `campus` - Associated campus
- `eventId` - Associated event

**Relations**:
- **Many-to-One**: `objectId` → `object.id`
- **Many-to-One**: `userId` → `user.id`
- **Self-referencing**: `matchId` → `user.id`
- **Many-to-One**: `eventId` → `event.id`

### progress
**Purpose**: Tracks user progression through exercises and projects.

**Key Columns**:
- `id` - Primary key
- `createdAt`, `updatedAt` - Timestamps
- `userId` - User making progress
- `groupId` - Associated group (if applicable)
- `eventId` - Associated event
- `version` - Git commit SHA
- `grade` - Average grade from related results
- `isDone` - Completion flag
- `path` - URL path
- `campus` - Associated campus
- `objectId` - Associated object

**Relations**:
- **Many-to-One**: `userId` → `user.id`
- **Many-to-One**: `groupId` → `group.id` (optional)
- **Many-to-One**: `eventId` → `event.id`
- **Many-to-One**: `objectId` → `object.id`

### result
**Purpose**: Stores results from exercises, projects, and assessments.

**Key Columns**:
- `id` - Primary key
- `createdAt`, `updatedAt` - Timestamps
- `grade` - Result grade
- `attrs` - Result attributes
- `type` - Result type (tester, user_audit, admit_audit, admin_selection, status)
- `userId` - User achieving result
- `groupId` - Associated group
- `objectId` - Associated object
- `path` - URL path
- `version` - Git commit SHA
- `eventId` - Associated event
- `isLast` - Finality flag
- `campus` - Associated campus

**Result Types**:
- `tester` - Automated test results
- `user_audit` - Peer review results
- `admit_audit` - Admission audit results
- `admin_selection` - Administrative selection
- `status` - Status updates

**Relations**:
- **Many-to-One**: `userId` → `user.id`
- **Many-to-One**: `groupId` → `group.id`
- **Many-to-One**: `objectId` → `object.id`
- **Many-to-One**: `eventId` → `event.id`

---

## 5. Supporting Tables

### group_status
**Purpose**: Defines possible group status values.

**Values**:
- `setup` - Initial group formation
- `working` - Active development phase  
- `audit` - Under review/audit
- `finished` - Completed work

### discordToken
**Purpose**: (TODO: remove) - Discord integration tokens.

**Key Columns**:
- `id` - Primary key
- `accessToken` - Discord access token
- `refreshToken` - Discord refresh token  
- `expiresAt` - Token expiration

---

## Entity Relationship Summary

### Core Relationships

1. **Hierarchical Structures**:
   - Objects can have parent-child relationships through `object_child`
   - Events can have parent events through `parentId`

2. **User Associations**:
   - Users belong to groups through `group_user`
   - Users have roles through `user_role`  
   - Users register for events through `registration_user`
   - Users participate in events through `event_user`

3. **Progress Tracking**:
   - Progress links users to objects, events, and optionally groups
   - Results provide detailed outcomes for progress
   - Audits generate results through peer review
   - Matches can generate results through betting system

4. **Time Management**:
   - Events anchor objects in time
   - Registrations control event access
   - Progress tracks temporal user advancement

### Cardinality Patterns

- **One-to-One**: `event` ↔ `registration`
- **One-to-Many**: `user` → `progress`, `object` → `event`
- **Many-to-Many**: `user` ↔ `group`, `user` ↔ `event`, `user` ↔ `registration`
- **Self-Referencing**: `event.parentId`, `object.referenceId`, `match.matchId`

---

## GraphQL API Integration

The database is accessible through a GraphQL endpoint at:
- **Endpoint**: `https://learn.reboot01.com/api/graphql-engine/v1/graphql`
- **GraphiQL Interface**: `https://learn.reboot01.com/graphiql/`

### GraphQL Schema Features

The GraphQL schema provides:
- **Queries**: Read access to all entities with filtering and pagination
- **Mutations**: Write operations for data modification
- **Subscriptions**: Real-time updates for dynamic content
- **Introspection**: Schema discovery and documentation

### Key GraphQL Types

Based on the database schema, the GraphQL API likely exposes types such as:
- `User`, `Group`, `Event`, `Object`
- `Progress`, `Result`, `Audit`, `Match`
- `Registration`, `Transaction`, `Record`

### Common Query Patterns

```graphql
# Get user progress
query UserProgress($userId: Int!) {
  progress(where: {userId: {_eq: $userId}}) {
    id
    grade
    isDone
    object {
      name
      type
    }
    event {
      path
    }
  }
}

# Get group information
query GroupDetails($groupId: Int!) {
  group(where: {id: {_eq: $groupId}}) {
    id
    status
    captain {
      githubLogin
    }
    users {
      user {
        githubLogin
      }
      confirmed
    }
    object {
      name
      type
    }
  }
}
```

---

## Data Flow and Business Logic

### User Journey
1. **Registration**: User registers for events through `registration_user`
2. **Group Formation**: Users form groups via `group_user` for collaborative work
3. **Progress Tracking**: System tracks advancement through `progress` table
4. **Assessment**: Results generated via `audit`, `match`, or automated testing
5. **Rewards**: Transactions record XP and recognition points

### Audit System Flow
1. Group completes work and requests audit
2. Audit code generated and distributed to auditors
3. Auditors review work and provide grades/feedback
4. System aggregates audit results
5. Final result created when sufficient audits collected

### Content Management
1. Objects define curriculum structure
2. Object hierarchy established through `object_child`
3. Events instantiate objects in time
4. Users progress through object hierarchy
5. Results track completion and mastery

This database schema provides a robust foundation for managing a comprehensive coding education platform with sophisticated progress tracking, peer review systems, and flexible content organization.