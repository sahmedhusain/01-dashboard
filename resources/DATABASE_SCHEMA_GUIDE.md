# Reboot01 Database Schema Documentation

## Overview

This document provides a comprehensive analysis of the Reboot01 GraphQL database schema based on the provided documentation and database structure diagram. The schema implements a sophisticated educational platform with user management, project tracking, audit systems, and hierarchical content organization.

## Core Architecture

The Reboot01 database follows a multi-tenant architecture with campus-based segregation and implements a graph-based learning system with the following key characteristics:

- **User-Centric Design**: All activities revolve around user interactions and progress tracking
- **Hierarchical Content Structure**: Objects form a tree structure (Campus → Module → Project → Exercise)
- **Event-Driven Learning**: Activities are organized within events (cohorts, modules, bootcamps)
- **Peer Review System**: Comprehensive audit mechanism for project evaluation
- **Group Collaboration**: Support for team-based projects and activities
- **Transaction-Based Scoring**: XP, audit scores, and skill progression tracking

## Entity Relationships Analysis

### Primary Entities and Their Roles

#### 1. User Entity (Central Hub)
- **Purpose**: Represents learners, mentors, and administrators
- **Key Metrics**: XP accumulation, audit ratio, skill progression
- **Relationships**: Connected to all major entities through participation, creation, or evaluation

#### 2. Transaction Entity (Scoring System)
- **Types**: 
  - `xp`: Experience points from project completion
  - `up`: Positive peer evaluation (skill increase)
  - `down`: Negative peer evaluation (skill decrease)
- **Purpose**: Tracks all score changes and skill progression

#### 3. Object Entity (Content Structure)
- **Types**: `project`, `exercise`, `quest`, `exam`, `raid`, `piscine`, `campus`, `onboarding`
- **Hierarchy**: Forms a tree structure via `object_child` relationships
- **Purpose**: Defines the curriculum and learning materials

#### 4. Event Entity (Context Provider)
- **Purpose**: Groups activities into cohorts, modules, or time-based sessions
- **Structure**: Hierarchical (parent-child relationships)
- **Function**: Provides temporal and organizational context

#### 5. Group Entity (Collaboration)
- **Purpose**: Manages team-based project work
- **States**: `setup`, `working`, `audit`, `finished`
- **Leadership**: Captain-based management system

#### 6. Progress Entity (Learning Tracking)
- **Purpose**: Tracks individual advancement through curriculum
- **Status**: `isDone` flag indicates completion
- **Versioning**: Git integration for code submission tracking

#### 7. Result Entity (Evaluation System)
- **Types**: `tester`, `user_audit`, `admit_audit`, `admin_selection`, `status`
- **Purpose**: Records formal evaluations and grades
- **Finality**: `isLast` flag indicates final assessment

#### 8. Audit Entity (Peer Review)
- **Purpose**: Implements peer-to-peer project evaluation
- **Workflow**: Links auditor to group work for evaluation
- **Timing**: `endAt` provides deadline management

## Data Flow Patterns

### Learning Progression Flow
1. **Registration**: User registers for events/objects
2. **Group Formation**: Users join/create groups for collaborative projects
3. **Progress Tracking**: Individual advancement recorded in `progress` table
4. **Code Submission**: Git versioning tracked with each progress update
5. **Peer Evaluation**: Other users audit submitted work
6. **Result Recording**: Final grades and feedback stored in `results`
7. **Transaction Creation**: XP and skill adjustments recorded as transactions

### Audit Workflow
1. **Group Completion**: Group finishes project work
2. **Audit Assignment**: System assigns auditors to groups
3. **Evaluation Process**: Auditors review work and provide grades
4. **Result Generation**: Audit creates result entry
5. **Transaction Update**: Up/down transactions update user skills
6. **Ratio Calculation**: User audit ratio updated based on performance

## Key Metrics and Calculations

### User Performance Indicators
- **Total XP**: Sum of all `xp` type transactions
- **Audit Ratio**: Calculated from up/down transaction balance
- **Completion Rate**: Percentage of `isDone` progress entries
- **Average Grade**: Mean of all result grades
- **Peer Rating**: Balance of audit scores given and received

### Campus Analytics
- **Enrollment Numbers**: User count per campus
- **Activity Level**: Event and group participation rates
- **Success Metrics**: Completion and grade statistics
- **XP Distribution**: Total and average XP per campus

## Schema Design Patterns

### 1. Multi-Tenancy via Campus Field
Almost every entity includes a `campus` field for data segregation, enabling:
- Institution-specific deployments
- Isolated analytics and reporting
- Campus-based leaderboards and comparisons

### 2. JSONB Attributes Pattern
Entities use `attrs` JSONB fields for:
- Flexible configuration storage
- Custom metadata without schema changes
- Feature flags and behavioral settings

### 3. Temporal Tracking
Comprehensive timestamp management:
- `createdAt`: Entity creation time
- `updatedAt`: Last modification time
- `endAt`: Expiration or deadline times (events, audits)

### 4. Hierarchical Relationships
Multiple hierarchy patterns implemented:
- **Object Hierarchy**: Via `object_child` junction table
- **Event Hierarchy**: Self-referential parent-child relationships
- **User Roles**: Many-to-many role assignments

### 5. Junction Table Pattern
Many-to-many relationships managed through junction tables:
- `group_user`: Group memberships
- `event_user`: Event participation
- `registration_user`: Course registrations
- `user_role`: Role assignments
- `object_child`: Object hierarchies

## Data Types and Constraints

### Common Field Types
- **IDs**: Integer primary keys with auto-increment
- **Foreign Keys**: Integer references to related entities
- **Timestamps**: ISO 8601 datetime strings
- **Grades**: Float values (typically 0-100 scale)
- **Flags**: Boolean values for status indicators
- **Paths**: String representations of hierarchical locations
- **Versions**: Git commit hashes as strings
- **JSONB**: Flexible attribute storage

### Business Logic Constraints
- **Audit Deadlines**: `endAt` timestamp enforcement
- **Group Capacity**: Implicit limits via business logic
- **Grade Ranges**: Typically 0-100 float values
- **Campus Isolation**: Data segregation by campus field
- **Version Tracking**: Git integration requirements

## Query Optimization Strategies

### Indexing Recommendations
Based on common query patterns:
- **User Lookups**: Index on `login`, `campus`
- **Temporal Queries**: Index on `createdAt`, `updatedAt`, `endAt`
- **Relationship Joins**: Index foreign key fields
- **Type Filtering**: Index on `type` fields across entities
- **Status Queries**: Index on `isDone`, `isLast`, `status` fields

### Performance Considerations
- **Aggregation Queries**: Use `_aggregate` fields for statistics
- **Pagination**: Always implement `limit` and `offset`
- **Relationship Loading**: Selective field inclusion to reduce payload
- **Campus Filtering**: Include campus constraints for data isolation

## Security and Permissions Model

### Role-Based Access Control
The system implements role-based permissions through:
- `user_role` junction table for role assignments
- Campus-based data segregation
- Query-level permission filtering

### Data Access Patterns
- **Own Data**: Users can access their complete profile and activity
- **Peer Data**: Limited access to basic user information and audit-related data
- **Campus Data**: Access to campus-wide statistics and leaderboards
- **Administrative Data**: Full access for admin roles

### Privacy Protection
- **Profile Information**: JSONB attrs may contain sensitive data
- **Audit Details**: Feedback stored in attrs with controlled access
- **Version Information**: Git hashes may contain sensitive commit info

## Common Use Cases and Query Patterns

### Student Dashboard Queries
1. **Profile Summary**: User basic info + aggregated statistics
2. **Recent Activity**: Latest transactions, progress updates
3. **Current Projects**: Active group memberships and progress
4. **Audit Queue**: Pending audits to perform
5. **Leaderboard Position**: Rank comparison with peers

### Instructor Analytics
1. **Cohort Progress**: Event-based student advancement tracking
2. **Project Statistics**: Completion rates and average grades
3. **Audit Quality**: Evaluation of peer review effectiveness
4. **Engagement Metrics**: Participation and activity levels

### Administrative Reports
1. **Campus Overview**: Enrollment and activity statistics
2. **Curriculum Analytics**: Object usage and success rates
3. **User Management**: Registration and role administration
4. **System Health**: Transaction volumes and error rates

## Integration Points

### Git Integration
- **Version Tracking**: Progress entries include git commit hashes
- **Code Review**: Audit process references specific commits
- **Submission Validation**: Automated testing via version references

### External Systems
- **Authentication**: JWT token-based auth integration
- **Notification Systems**: Event-driven alerts for deadlines, audits
- **Analytics Platforms**: Data export for advanced reporting
- **Learning Management**: Integration with external course platforms

## Scalability Considerations

### Database Performance
- **Sharding Strategy**: Campus-based horizontal partitioning
- **Read Replicas**: Separate analytics from transactional queries
- **Caching**: Redis layer for frequently accessed user data
- **Archive Strategy**: Historical data management for old events

### Query Optimization
- **Batch Operations**: Aggregate queries for statistics
- **Connection Pooling**: Manage database connection limits
- **Query Complexity**: Limit nested relationship depth
- **Real-time Updates**: WebSocket subscriptions for live data

## Development Best Practices

### Query Writing Guidelines
1. **Always Use Limits**: Prevent runaway queries
2. **Include Campus Filters**: Respect multi-tenancy
3. **Selective Field Loading**: Request only needed data
4. **Error Handling**: Check for permission and data errors
5. **Caching Strategy**: Implement appropriate TTL for different data types

### Schema Evolution
1. **Backward Compatibility**: Maintain existing field contracts
2. **Migration Strategy**: Plan for schema changes in production
3. **Version Management**: Track schema versions across deployments
4. **Testing**: Comprehensive query testing across user roles

## Monitoring and Observability

### Key Metrics to Track
- **Query Performance**: Execution times and complexity
- **Error Rates**: Permission denials and data errors
- **User Activity**: Login frequency and feature usage
- **System Load**: Database connection usage and query volume
- **Data Growth**: Table size and growth rate tracking

### Alerting Thresholds
- **Slow Queries**: >1 second execution time
- **High Error Rates**: >5% error rate on key operations
- **Connection Limits**: >80% of connection pool usage
- **Audit Backlogs**: Expired audits without completion

This documentation provides a foundation for understanding and working with the Reboot01 database schema. Regular updates should be made as the system evolves and new features are added.