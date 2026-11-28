import { formatDate } from "../helpers/date.helper.js";

export function TaskRow(task, projectName = "") {
    const statuses = {
        "todo": { label: "To Do", color: "secondary" },
        "in-progress": { label: "In Progress", color: "primary" },
        "done": { label: "Done", color: "success" }
    };

    const priorities = {
        low: { label: "Low", color: "secondary" },
        medium: { label: "Medium", color: "warning" },
        high: { label: "High", color: "danger" }
    };

    const status = statuses[task.status] ?? statuses.todo;
    const priority = priorities[task.priority] ?? priorities.medium;

    const element = document.createElement("tr");

    element.dataset.id = task.id;

    element.innerHTML = `
        <td>
            <div class="task-title fw-semibold"></div>
            <small class="task-description text-body-secondary"></small>
        </td>

        <td class="task-project"></td>

        <td>
            <span class="badge text-bg-${priority.color}">
                ${priority.label}
            </span>
        </td>

        <td>
            <span class="badge text-bg-${status.color}">
                ${status.label}
            </span>
        </td>

        <td class="task-due-date text-nowrap"></td>

        <td>
            <div class="d-flex justify-content-end gap-2">

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
        </td>
    `;

    element.querySelector(".task-title").textContent = task.title;

    element.querySelector(".task-description").textContent =
        task.description || "No description provided.";

    element.querySelector(".task-project").textContent =
        projectName || "Unknown Project";

    element.querySelector(".task-due-date").textContent =
        task.dueDate != null ? formatDate(task.dueDate) : "—";

    return element;
}