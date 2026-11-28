import { formatDate } from "../helpers/date.helper.js";

export function KanbanCard(task, projectName = "") {
    const priorities = {
        low: { label: "Low", color: "secondary" },
        medium: { label: "Medium", color: "warning" },
        high: { label: "High", color: "danger" }
    };

    const priority = priorities[task.priority] ?? priorities.medium;

    const element = document.createElement("div");

    element.className = "card kanban-card";
    element.dataset.id = task.id;

    element.innerHTML = `
        <div class="card-body">

            <!-- TASK INFORMATION -->
            <h6 class="kanban-task-title fw-semibold"></h6>
            <small class="kanban-task-project text-body-secondary"></small>

            <p class="kanban-task-description text-body-secondary my-3"></p>

            <!-- TASK DETAILS -->
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="badge text-bg-${priority.color}">
                    ${priority.label}
                </span>

                <small class="kanban-task-date text-body-secondary"></small>
            </div>

        </div>

        <!-- TASK ACTIONS -->
        <div class="card-footer bg-body d-flex justify-content-end gap-2">

            <button type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="view" title="View task"
                aria-label="View task">
                <i class="bi bi-eye"></i>
            </button>

            <button type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="edit" title="Edit task"
                aria-label="Edit task">
                <i class="bi bi-pencil"></i>
            </button>

            <button type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete" title="Delete task"
                aria-label="Delete task">
                <i class="bi bi-trash"></i>
            </button>

        </div>
    `;

    element.querySelector(".kanban-task-title").textContent = task.title;

    element.querySelector(".kanban-task-project").textContent =
        projectName || "Unknown Project";

    element.querySelector(".kanban-task-description").textContent =
        task.description || "No description provided.";

    element.querySelector(".kanban-task-date").textContent =
        task.dueDate != null ? formatDate(task.dueDate) : "No due date";

    return element;
}