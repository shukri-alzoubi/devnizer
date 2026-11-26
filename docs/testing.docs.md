# Devnizer — Testing Documentation

## 1. Testing Objective

Verify that all application features work correctly,
data remains consistent, and the interface is responsive.

## 2. Testing Method

- Manual functional testing.
- Browser developer tools.
- Responsive layout testing.
- Data persistence testing.
- Integration testing.

## 3. Test Cases

### 3.1 Application & Navigation

| ID | Test Case | Expected Result | Status |
| --- | --- | --- | --- |
| NAV-01 | Launch application | Dashboard loads by default | Pending |
| NAV-02 | Navigate to Projects | Projects page loads | Pending |
| NAV-03 | Navigate to Tasks | Tasks page loads | Pending |
| NAV-04 | Check active navigation | Current page is highlighted | Pending |
| NAV-05 | Reload current page | Current page remains active | Pending |
| NAV-06 | Use browser back and forward | Navigation works correctly | Pending |
| NAV-07 | Access invalid route | Dashboard loads as fallback | Pending |

### 3.2 Projects

| ID | Test Case | Expected Result | Status |
| --- | --- | --- | --- |
| PRJ-01 | Create project | Project is saved and displayed | Pending |
| PRJ-02 | View project | Project details appear in modal | Pending |
| PRJ-03 | Edit project | Updated information is displayed | Pending |
| PRJ-04 | Delete project | Project is removed | Pending |
| PRJ-05 | Delete project with tasks | Deletion is prevented | Pending |
| PRJ-06 | Submit empty project name | Validation message appears | Pending |
| PRJ-07 | Search projects | Matching projects are displayed | Pending |
| PRJ-08 | Filter by status | Matching projects are displayed | Pending |
| PRJ-09 | Empty project collection | Empty state is displayed | Pending |

### 3.3 Tasks

| ID | Test Case | Expected Result | Status |
| --- | --- | --- | --- |
| TSK-01 | Create task | Task is saved and displayed | Pending |
| TSK-02 | View task | Task details appear in modal | Pending |
| TSK-03 | Edit task | Updated information is displayed | Pending |
| TSK-04 | Delete task | Task is removed | Pending |
| TSK-05 | Assign project | Task references selected project | Pending |
| TSK-06 | Change status | Task status is updated | Pending |
| TSK-07 | Change priority | Task priority is updated | Pending |
| TSK-08 | Submit empty title | Validation message appears | Pending |
| TSK-09 | Submit without project | Validation message appears | Pending |
| TSK-10 | Search tasks | Matching tasks are displayed | Pending |
| TSK-11 | Filter by project | Matching tasks are displayed | Pending |
| TSK-12 | Filter by status | Matching tasks are displayed | Pending |
| TSK-13 | Filter by priority | Matching tasks are displayed | Pending |
| TSK-14 | Empty task collection | Empty state is displayed | Pending |
| TSK-15 | Submit invalid due date | Validation prevents saving | Pending |

### 3.4 Task Views

| ID | Test Case | Expected Result | Status |
| --- | --- | --- | --- |
| VIEW-01 | Open list view | Tasks appear in a list | Pending |
| VIEW-02 | Open Kanban view | Tasks appear in status columns | Pending |
| VIEW-03 | Switch between views | Selected view is displayed | Pending |
| VIEW-04 | Change task status | Task moves to correct column | Pending |
| VIEW-05 | Edit task in Kanban | List view reflects changes | Pending |
| VIEW-06 | Delete task in either view | Task disappears from both views | Pending |
| VIEW-07 | Apply filters | Both views use matching filters | Pending |

### 3.5 Dashboard

| ID | Test Case | Expected Result | Status |
| --- | --- | --- | --- |
| DSH-01 | Check project totals | Correct project count is displayed | Pending |
| DSH-02 | Check task totals | Correct task count is displayed | Pending |
| DSH-03 | Check task statuses | Correct status counts are displayed | Pending |
| DSH-04 | Check project progress | Correct percentage is displayed | Pending |
| DSH-05 | Check recent tasks | Recent tasks are displayed | Pending |
| DSH-06 | Check empty data | Statistics display zero | Pending |
| DSH-07 | Modify project or task | Dashboard reflects changes | Pending |

### 3.6 Modals & Feedback

| ID | Test Case | Expected Result | Status |
| --- | --- | --- | --- |
| MOD-01 | Open modal | Correct modal appears | Pending |
| MOD-02 | Close modal | Modal closes correctly | Pending |
| MOD-03 | Cancel operation | No data is modified | Pending |
| MOD-04 | Submit valid form | Data is saved | Pending |
| MOD-05 | Submit invalid form | Validation messages appear | Pending |
| MOD-06 | Confirm deletion | Record is removed | Pending |
| MOD-07 | Cancel deletion | Record remains unchanged | Pending |
| MOD-08 | Complete operation | Success notification appears | Pending |
| MOD-09 | Failed operation | Error notification appears | Pending |
| MOD-10 | Reopen modal | Previous form state is cleared | Pending |

### 3.7 Data Storage

| ID | Test Case | Expected Result | Status |
| --- | --- | --- | --- |
| STR-01 | Launch without stored data | Empty collections initialize | Pending |
| STR-02 | Reload after creation | Created records remain | Pending |
| STR-03 | Reload after editing | Updated records remain | Pending |
| STR-04 | Reload after deletion | Deleted records remain removed | Pending |
| STR-05 | Create multiple records | IDs remain unique | Pending |
| STR-06 | Edit record | updatedAt changes | Pending |
| STR-07 | Edit record | createdAt remains unchanged | Pending |
| STR-08 | Load invalid stored JSON | Error is handled safely | Pending |
| STR-09 | Storage unavailable | Error notification appears | Pending |
| STR-10 | Reference invalid project | Task saving is prevented | Pending |

### 3.8 Responsive Design

| ID | Test Case | Expected Result | Status |
| --- | --- | --- | --- |
| UI-01 | Desktop layout | Application displays correctly | Pending |
| UI-02 | Tablet layout | Layout adapts correctly | Pending |
| UI-03 | Mobile layout | Layout adapts correctly | Pending |
| UI-04 | Mobile navigation | Navigation remains accessible | Pending |
| UI-05 | Mobile modals | Modal controls remain accessible | Pending |
| UI-06 | Mobile Kanban | Columns remain accessible | Pending |
| UI-07 | Keyboard navigation | Controls are accessible | Pending |
| UI-08 | User-provided HTML input | Content is rendered safely | Pending |

### 3.9 Browser Compatibility

| ID | Browser | Status |
| --- | --- | --- |
| BRW-01 | Google Chrome | Pending |
| BRW-02 | Microsoft Edge | Pending |
| BRW-03 | Mozilla Firefox | Pending |
| BRW-04 | Safari | Pending |

### 3.10 Deployment

| ID | Test Case | Expected Result | Status |
| --- | --- | --- | --- |
| DEP-01 | Open deployed application | Application loads successfully | Pending |
| DEP-02 | Load dependencies | All libraries load correctly | Pending |
| DEP-03 | Navigate between pages | All routes work correctly | Pending |
| DEP-04 | Load assets | No missing resources | Pending |
| DEP-05 | Perform CRUD operations | All operations work correctly | Pending |
| DEP-06 | Reload application | Data persists correctly | Pending |
| DEP-07 | Check browser console | No uncaught errors | Pending |

## 4. Test Status Definitions

| Status | Description |
| --- | --- |
| Pending | Test has not been performed |
| Passed | Expected result was achieved |
| Failed | Expected result was not achieved |
| Blocked | Test cannot be performed |

## 5. Bug Tracking

| ID | Description | Severity | Status |
|---|---|---|---|

### Severity Levels

- Critical: Application cannot function.
- High: Major functionality is broken.
- Medium: Functionality is partially affected.
- Low: Minor visual or usability issue.

## 6. Final Testing Summary

| Metric | Count |
| --- | --- |
| Total Test Cases | 77 |
| Pending | 77 |
| Passed | 0 |
| Failed | 0 |
| Blocked | 0 |

## 7. Release Acceptance Criteria

- All required functional tests pass.
- No unresolved critical or high-severity bugs.
- Data persists correctly.
- List and Kanban views remain synchronized.
- Responsive layouts work correctly.
- No uncaught browser console errors.
- GitHub Pages deployment works correctly.
