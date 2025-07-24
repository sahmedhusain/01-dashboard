# Comprehensive Systems Analysis Report

This report provides a unified and in-depth analysis of the application's architecture, data models, and core progression systems. It is based on a thorough examination and cross-referencing of all available GraphQL query results.

### 1. High-Level Architecture: A Path-Based System

The application's content and user progression are organized around a hierarchical path system, primarily under the `/bahrain/` root. This structure creates a clear distinction between different phases of the user's journey.

-   **/bahrain/bh-onboarding**: The initial entry point for new users. It contains tasks related to `games`, `check-in`, and `administration` (e.g., submitting personal info).
-   **/bahrain/bh-piscine**: A foundational, intensive coding bootcamp. It is structured with `quest-` directories for exercises, `checkpoint-` for exams, and a `final-checkpoint`. This appears to be a prerequisite or standalone experience.
-   **/bahrain/bh-module**: The main, long-term curriculum. It contains a diverse range of projects (`go-reloaded`, `groupie-tracker`), specialized piscines (`piscine-js`, `piscine-rust`), and its own checkpoints. **Progression in this module is the primary driver of a user's main level.**

### 2. Core Data Entities & Relationships

The application's data is highly interconnected. The following are the central entities and their relationships:

-   **`user`**: The central entity for a student. It stores not only personal details (found in `attrs`) but also key calculated metrics like `auditRatio`, `totalUp`, and `totalDown`.
-   **`object`**: Represents any learnable unit, such as a `project`, `exercise`, `quest`, or `piscine`. Its `attrs` field acts as a configuration block, defining rules like group size (`groupMin`/`groupMax`), language, and validation methods.
-   **`event`**: Acts as a scheduler or container for `objects`, defining the timeframes (e.g., `createdAt`, `endAt`) during which a project or piscine is active.
-   **`transaction`**: The most critical entity for tracking progression. It's an event log that records every significant change to a user's status, including XP gains, audit results, skill points, and level-ups. It links `user`, `object`, and `event`.
-   **`progress`**: Tracks the status of a user's work on an `object`. It records the `grade`, whether the task `isDone`, and the specific `version` (commit hash) of the work submitted.
-   **`group`**: Forms the basis of collaboration, linking multiple users to a single project (`objectId`) under a designated `captainId`.
-   **`audit`**: The record of a peer-to-peer review. It links an `auditorId` to a `groupId` and contains the `grade` given. This record is the trigger for `up` and `down` transactions.
-   **`result`**: Appears to be a summary record created after a task is finalized (e.g., after audits are completed). It contains the final `grade`.

### 3. Deep Dive: Progression Systems

#### A. XP and Leveling System

-   **XP Source**: XP is awarded via `transaction` records of `type: "xp"`. The `amount` is a raw integer (e.g., `24500`).
-   **Leveling Mechanism**: The data strongly indicates that leveling is a **discrete, backend-triggered event**. It is not calculated on the frontend.
    -   A `level` transaction is created the moment a user levels up. The `amount` of this transaction is the **new level achieved**.
    -   Example: A user at level 23 receives `21800 XP` for a checkpoint, and the very next transaction is a `level` transaction with `amount: 24`. This shows a direct cause-and-effect.
-   **XP is Not Directly Proportional to Level**: While higher XP leads to higher levels, there is no simple formula evident in the raw data that directly converts total XP to a level. The backend likely has a level progression table or a more complex algorithm that accounts for project difficulty and other factors.

#### B. Audit System & Reputation

The audit system is a core mechanic for both progression and reputation.

-   **Transaction Types**:
    -   `up`: XP gained by the *auditor* for successfully completing an audit.
    -   `down`: XP deducted from the *auditee* if their project fails an audit.
-   **`auditRatio`**: This is the most important metric for an auditor's reputation. It is pre-calculated on the `user` object as `totalUp / totalDown`. A higher ratio indicates a more reliable and respected auditor.
-   **From `audit.grade` to `transaction.amount`**: The `grade` in an `audit` record (e.g., `1.269`) is used by the backend to determine the `amount` for the resulting `up` and `down` transactions. The exact formula is not visible in the data, but higher audit grades likely result in higher XP rewards for the auditor.

#### C. Skills System

-   **Granular Progression**: Skills are tracked independently of XP and levels. A single project can grant points in multiple skills.
-   **Transaction Type**: `skill_<skill_name>` (e.g., `skill_go`, `skill_css`, `skill_front-end`).
-   **Skill Points**: The `amount` for skill transactions is a small integer (e.g., `5`, `10`, `35`), representing points added to that skill's total. This allows for a more nuanced representation of a user's abilities beyond a single level number.

### 4. Revised Implementation Plan

Based on this deeper, data-only analysis, the implementation should focus on accurately reflecting the system's mechanics:

1.  **Data Aggregation is Key**: The frontend's primary role is to fetch the raw data (especially transactions) and aggregate it for display.
2.  **Display Pre-Calculated Values**: For metrics like `auditRatio` and `level`, the application should **directly display the values provided by the backend** (`user.auditRatio`, `transaction.amount` where `type: "level"`). It should not attempt to recalculate them.
3.  **Path-Based Filtering**: All data displays (XP, projects, etc.) must be filterable by the top-level paths (`bh-module`, `bh-piscine`) to provide contextually correct information. The main dashboard should focus on `bh-module` data.
4.  **Build a "Piscine View"**: A dedicated section of the UI should be created to display progress and stats for the `bh-piscine`, as its data is separate from the main curriculum progression.
5.  **Visualize Skills**: Create a component (e.g., radar chart, bar graph) that aggregates and displays the total points for each skill from the `skill_*` transactions.
6.  **Show Project Details**: When displaying a project, use the `object.attrs` data to show users the project's constraints, such as `language`, `allowedFunctions`, and `expectedFiles`.
