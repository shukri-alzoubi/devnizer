# Devnizer

A developer task management application built using HTML5, CSS3,
and vanilla JavaScript.

Devnizer helps developers organize projects, manage tasks,
and track development progress through a modal-based interface.

## Project Information

- App Name: Devnizer
- App ID: devnizer
- Version: 1.0.0 (planned)

## Features

- Dashboard with project and task statistics.
- Project management.
- Task management.
- Task list view.
- Task Kanban view.
- Search and filtering.
- Modal-based interactions.
- Responsive interface.
- Persistent local storage.

## Pages

| Page | Description |
| --- | --- |
| Dashboard | Overview of projects, tasks, and progress. |
| Projects | Create and manage development projects. |
| Tasks | Manage tasks using list and Kanban views. |

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap
- Bootstrap Icons
- localStorage
- Git
- GitHub
- GitHub Pages

## Dependencies

- Bootstrap CSS
- Bootstrap JavaScript Bundle
- Bootstrap Icons

All libraries are loaded through CDN links.

## Planned Project Structure

```text
devnizer/
├── index.html
├── pages/
│   ├── dashboard.page.html
│   ├── projects.page.html
│   └── tasks.page.html
├── js/
│   ├── app.js
│   ├── app.config.js
│   └── app.routes.js
├── components/
├── models/
├── services/
├── helpers/
├── ui/
├── css/
│   ├── main.css
│   ├── layout.style.css
│   ├── dashboard.style.css
│   ├── projects.style.css
│   └── tasks.style.css
├── modals/
├── assets/
├── docs/
│   ├── requirements.docs.md
│   └── testing.docs.md
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Git
- Modern web browser
- Code editor
- Local development server

### Installation

Clone the repository after it is published:

```bash
git clone https://github.com/shukri-alzoubi/devnizer.git
cd devnizer
```

### Launch Application

1. Open the project in Visual Studio Code.
2. Install the Live Server extension.
3. Open index.html using Live Server.
4. Access the application in your browser.

No package installation or build process is required.

## Data Storage

Application data is stored in the browser using localStorage.
No backend or database server is required.

## Documentation

- [Requirements](docs/requirements.docs.md)
- [Testing](docs/testing.docs.md)

## Deployment

The application will be deployed using GitHub Pages
from the main branch.

## Development Status

Under development.
