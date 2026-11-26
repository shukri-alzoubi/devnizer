# Devnizer — Application Requirements

## 1. Application Overview

Devnizer is a developer task management application that
helps developers organize projects, manage tasks, and
track development progress.

## 2. Functional Requirements

### 2.1 Dashboard

- Display total projects.
- Display total tasks.
- Display tasks by status.
- Display project completion progress.
- Display recent tasks.

### 2.2 Projects

- Display projects in a card layout.
- Create a project.
- View project details.
- Edit a project.
- Delete a project.
- Search projects.
- Filter projects by status.
- Prevent deletion of projects with associated tasks.

### 2.3 Tasks

- Display all tasks.
- Create a task.
- View task details.
- Edit a task.
- Delete a task.
- Associate tasks with projects.
- Manage task status and priority.
- Search tasks.
- Filter tasks by project, status, and priority.

### 2.4 Task Views

#### List View

- Display tasks in a structured list.
- Display task information and available actions.
- Support search and filtering.

#### Kanban View

- Display tasks grouped by status.
- Include To Do, In Progress, and Done columns.
- Allow tasks to move between columns using status controls.
- Synchronize changes with the list view.

### 2.5 Modals

- Project creation modal.
- Project editing modal.
- Project details modal.
- Task creation modal.
- Task editing modal.
- Task details modal.
- Delete confirmation modal.

Creation, editing, and viewing may reuse the same modal.

### 2.6 Data Management

- Store projects and tasks using localStorage.
- Preserve data after page reload.
- Generate unique IDs.
- Validate data before saving.
- Maintain project and task relationships.
- Handle missing or invalid stored data.

### 2.7 Navigation

- Dashboard as the default page.
- Hash-based page navigation.
- Active navigation indicators.
- Responsive sidebar and navbar.

### 2.8 Application Feedback

- Success notifications.
- Error notifications.
- Validation messages.
- Empty states.
- Loading states.
- Confirmation messages.

## 3. Non-Functional Requirements

### 3.1 User Interface

- Clean and consistent design.
- Responsive desktop and mobile layout.
- Modal-based interactions.
- Bootstrap UI components.
- Bootstrap Icons.
- Accessible forms and controls.

### 3.2 Performance

- Minimize unnecessary DOM updates.
- Avoid unnecessary dependencies.
- Load application resources efficiently.

### 3.3 Maintainability

- Use modular JavaScript.
- Separate UI, models, services, and application logic.
- Use reusable components.
- Use consistent file naming.
- Avoid duplicated logic.

### 3.4 Security

- Validate user input.
- Safely render user-provided content.
- Do not store sensitive information in localStorage.

### 3.5 Compatibility

- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.
- Safari.

## 4. Technical Requirements

| Technology | Purpose |
| --- | --- |
| HTML5 | Application structure |
| CSS3 | Custom styling |
| Vanilla JavaScript | Application logic |
| Bootstrap | Layout and UI components |
| Bootstrap Icons | Application icons |
| localStorage | Data persistence |
| Git | Version control |
| GitHub | Repository management |
| GitHub Pages | Deployment |

## 5. Development Standards

- Use ES6 JavaScript modules.
- Separate application logic from UI.
- Use feature-specific Git branches.
- Use conventional commit messages.
- Push and merge completed branches into main.
- Test functionality before deployment.
- Style elements only after they are built.

### File Naming Convention

{name}.{purpose}.{extension}

Examples:

- dashboard.page.html
- project.model.js
- storage.service.js
- date.helper.js
- navbar.component.js
- project.modal.html
- projects.style.css
- requirements.docs.md

Entry files such as index.html, app.js, main.css,
and README.md are exceptions.

## 6. Application Constraints

- No backend server.
- No external database.
- No authentication.
- No JavaScript frameworks.
- No package manager required.
- No build process required.
- Data remains local to the browser.

## 7. Deployment Requirements

- Host the application on GitHub Pages.
- Use relative resource paths.
- Deploy from the main branch.
- Verify all pages and functionality after deployment.

## 8. Acceptance Criteria

- All application pages load correctly.
- Project CRUD operations work correctly.
- Task CRUD operations work correctly.
- List and Kanban views remain synchronized.
- Dashboard statistics reflect stored data.
- Data persists after page reload.
- Modals function correctly.
- Search and filtering work correctly.
- Application is responsive.
- No uncaught browser console errors.
- Application is accessible through GitHub Pages.

## 9. Data Requirements

### 9.1 Project Model

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| id | string | Yes | UUID | Unique project identifier |
| name | string | Yes | — | Project name |
| description | string | No | "" | Project description |
| status | string | Yes | active | Project status |
| createdAt | string | Yes | Current date | Creation timestamp |
| updatedAt | string | Yes | Current date | Last update timestamp |

#### Project Statuses

| Value | Label |
| --- | --- |
| active | Active |
| completed | Completed |
| archived | Archived |

### 9.2 Task Model

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| id | string | Yes | UUID | Unique task identifier |
| projectId | string | Yes | — | Associated project ID |
| title | string | Yes | — | Task title |
| description | string | No | "" | Task description |
| status | string | Yes | todo | Task status |
| priority | string | Yes | medium | Task priority |
| dueDate | string | No | null | Task deadline |
| createdAt | string | Yes | Current date | Creation timestamp |
| updatedAt | string | Yes | Current date | Last update timestamp |

#### Task Statuses

| Value | Label |
| --- | --- |
| todo | To Do |
| in-progress | In Progress |
| done | Done |

#### Task Priorities

| Value | Label |
| --- | --- |
| low | Low |
| medium | Medium |
| high | High |

### 9.3 Data Relationships

- One project can contain multiple tasks.
- Each task belongs to one project.
- Tasks reference projects using projectId.
- Projects with associated tasks cannot be deleted.
- Project progress is calculated from completed tasks.

### 9.4 Storage Requirements

| Storage Key | Type | Default |
| --- | --- | --- |
| devnizer_projects | Array | [] |
| devnizer_tasks | Array | [] |

- Use localStorage for persistent data storage.
- Store collections as JSON arrays.
- Initialize missing collections.
- Generate IDs using crypto.randomUUID().
- Store timestamps in ISO 8601 format.
- Update updatedAt whenever a record changes.
- Handle invalid or unavailable storage safely.

### 9.5 Validation Rules

#### Projects

- Project name is required.
- Project name cannot contain only whitespace.
- Project status must match an allowed value.

#### Tasks

- Task title is required.
- Task title cannot contain only whitespace.
- Associated project must exist.
- Task status must match an allowed value.
- Task priority must match an allowed value.
- Due date must be valid when provided.

### 9.6 Calculated Data

The following values are calculated dynamically
and are not stored in localStorage:

- Total projects.
- Active projects.
- Completed projects.
- Total tasks.
- Tasks by status.
- Tasks by priority.
- Project task count.
- Project completion percentage.
- Overall task completion percentage.

Completion Percentage:

(completed tasks / total tasks) * 100

Return 0% when no tasks exist.

### 9.7 Data Integrity

- Record IDs must be unique.
- Record IDs cannot be modified.
- Creation timestamps cannot be modified.
- Tasks cannot reference nonexistent projects.
- List and Kanban views use the same task collection.
- Dashboard statistics reflect the current stored data.
