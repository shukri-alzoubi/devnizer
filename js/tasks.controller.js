import { TaskRow } from "../components/task.component.js";
import { KanbanCard } from "../components/kanban.component.js";
import { fromDateInput, toDateInput } from "../helpers/date.helper.js";
import { ModalUI } from "../ui/modal.ui.js";
import { ToastUI } from "../ui/toast.ui.js";
import { ProjectService } from "../services/project.service.js";
import { TaskService } from "../services/task.service.js";
import { EmptyStateUI } from "../ui/empty-state.ui.js";

// FILTER TASKS
function filterTasks(tasks) {
    const search = document.getElementById("taskSearch")
        .value.trim().toLowerCase();

    const projectId = document.getElementById("taskProjectFilter").value;
    const status = document.getElementById("taskStatusFilter").value;
    const priority = document.getElementById("taskPriorityFilter").value;

    return tasks.filter(task => {
        const matchesSearch =
            task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search);

        const matchesProject =
            projectId === "all" || task.projectId === projectId;

        const matchesStatus =
            status === "all" || task.status === status;

        const matchesPriority =
            priority === "all" || task.priority === priority;

        return matchesSearch &&
            matchesProject &&
            matchesStatus &&
            matchesPriority;
    });
}

// RENDER TASK LIST
function renderTaskList(tasks, projects, hasTasks) {
    const container = document.getElementById("taskList");

    container.replaceChildren();

    // --- EMPTY STATE ---

    if (tasks.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 6;

        cell.appendChild(
            EmptyStateUI.render({
                icon: hasTasks ? "bi-search" : "bi-list-task",

                title: hasTasks
                    ? "No tasks found"
                    : "No tasks yet",

                description: hasTasks
                    ? "Try adjusting your search or filters."
                    : "Create your first task to get started."
            })
        );

        row.appendChild(cell);
        container.appendChild(row);

        return;
    }

    // --- RENDER TASK ROWS ---

    tasks.forEach(task => {
        const project = projects.find(
            item => item.id === task.projectId
        );

        container.appendChild(
            TaskRow(task, project?.name)
        );
    });
}

// RENDER KANBAN BOARD
function renderKanbanBoard(tasks, projects) {
    const columns = [
        {
            status: "todo",
            containerId: "kanbanTodo",
            countId: "kanbanTodoCount"
        },
        {
            status: "in-progress",
            containerId: "kanbanProgress",
            countId: "kanbanProgressCount"
        },
        {
            status: "done",
            containerId: "kanbanDone",
            countId: "kanbanDoneCount"
        }
    ];

    columns.forEach(column => {
        const container = document.getElementById(column.containerId);

        const filteredTasks = tasks.filter(
            task => task.status === column.status
        );

        container.replaceChildren(
            ...filteredTasks.map(task => {
                const project = projects.find(
                    item => item.id === task.projectId
                );

                return KanbanCard(task, project?.name);
            })
        );

        document.getElementById(column.countId).textContent =
            filteredTasks.length;
    });
}

// TASK VIEW SWITCHING
function initTaskViews() {
    const listView = document.getElementById("taskListView");
    const kanbanView = document.getElementById("taskKanbanView");

    const listBtn = document.getElementById("listViewBtn");
    const kanbanBtn = document.getElementById("kanbanViewBtn");

    function switchView(view) {
        const isList = view === "list";

        listView.classList.toggle("d-none", !isList);
        kanbanView.classList.toggle("d-none", isList);

        listBtn.classList.toggle("active", isList);
        kanbanBtn.classList.toggle("active", !isList);

        listBtn.setAttribute("aria-pressed", String(isList));
        kanbanBtn.setAttribute("aria-pressed", String(!isList));
    }

    listBtn.onclick = () => switchView("list");
    kanbanBtn.onclick = () => switchView("kanban");
}

// PROJECT OPTIONS
function loadProjectOptions(select, defaultValue = "", defaultLabel = "Select project") {
    const projects = ProjectService.getAll();

    select.replaceChildren(
        new Option(defaultLabel, defaultValue)
    );

    projects.forEach(project => {
        select.add(new Option(project.name, project.id));
    });
}

// PROJECT FILTER OPTIONS
function loadProjectFilter() {
    const select = document.getElementById("taskProjectFilter");

    loadProjectOptions(select, "all", "All Projects");
}

// FORM VALIDATION
function clearFormErrors(form) {
    form.querySelectorAll(".is-invalid").forEach(field => {
        field.classList.remove("is-invalid");
    });

    form.querySelectorAll(".invalid-feedback").forEach(element => {
        element.textContent = "";
    });
}

function showFormErrors(form, errors) {
    Object.entries(errors).forEach(([name, message]) => {
        const field = form.elements.namedItem(name);

        if (!field) return;

        field.classList.add("is-invalid");

        const feedback = field.parentElement.querySelector(".invalid-feedback");

        if (feedback) {
            feedback.textContent = message;
        }
    });
}

// TASK MODAL
async function openTaskModal(mode = "create", task = null) {
    const modal = await ModalUI.load("./modals/task.modal.html");

    const title = modal.querySelector("#taskModalTitle");
    const form = modal.querySelector("#taskForm");
    const saveBtn = modal.querySelector("#taskSaveBtn");
    const cancelBtn = modal.querySelector("#taskCancelBtn");

    const titles = {
        create: "New Task",
        edit: "Edit Task",
        view: "Task Details"
    };

    title.textContent = titles[mode];

    loadProjectOptions(form.elements.projectId);

    if (task) {
        form.elements.title.value = task.title;
        form.elements.projectId.value = task.projectId;
        form.elements.description.value = task.description;
        form.elements.status.value = task.status;
        form.elements.priority.value = task.priority;
        form.elements.dueDate.value = toDateInput(task.dueDate);
    } else {
        form.elements.description.value = "";
    }

    // View mode

    if (mode === "view") {
        form.querySelectorAll("input, textarea, select")
            .forEach(field => field.disabled = true);

        saveBtn.classList.add("d-none");
        cancelBtn.textContent = "Close";
    }

    // FORM SUBMISSION
    form.addEventListener("submit", event => {
        event.preventDefault();

        if (mode === "view") return;

        clearFormErrors(form);

        const data = {
            title: form.elements.title.value.trim(),
            projectId: form.elements.projectId.value,
            description: form.elements.description.value.trim(),
            status: form.elements.status.value,
            priority: form.elements.priority.value,
            dueDate: fromDateInput(form.elements.dueDate.value)
        };

        try {
            let result;

            switch (mode) {
                case "create":
                    result = TaskService.create(data);
                    break;

                case "edit":
                    result = TaskService.update(task.id, data);
                    break;

                default:
                    return;
            }

            if (!result.success) {
                showFormErrors(form, result.errors);
                return;
            }

            ModalUI.close(modal);
            renderTasks();

            ToastUI.success(
                mode === "create"
                    ? "Task created successfully."
                    : "Task updated successfully."
            );

        } catch (error) {
            console.error(error);
            ToastUI.error(error.message || "Failed to save task.");
        }
    });

    ModalUI.open(modal);
}

// DELETE TASK
async function deleteTask(task) {
    try {
        const confirmed = await ModalUI.confirm({
            title: "Delete Task",
            message: `Are you sure you want to delete "${task.title}"?`,
            buttonText: "Delete"
        });

        if (!confirmed) return;

        TaskService.delete(task.id);

        renderTasks();

        ToastUI.success("Task deleted successfully.");

    } catch (error) {
        console.error(error);
        ToastUI.error(error.message || "Failed to delete task.");
    }
}

// TASK ACTIONS
function initTaskActions() {
    const page = document.getElementById("tasks-page");

    document.getElementById("newTaskBtn").onclick = () =>
        openTaskModal("create");

    page.onclick = async event => {
        const button = event.target.closest("[data-action]");

        if (!button) return;

        const id = button.closest("[data-id]")?.dataset.id;
        const task = TaskService.getById(id);

        if (!task) {
            ToastUI.error("Task not found.");
            return;
        }

        switch (button.dataset.action) {
            case "view":
                await openTaskModal("view", task);
                break;

            case "edit":
                await openTaskModal("edit", task);
                break;

            case "delete":
                await deleteTask(task);
                break;
        }
    };
}

// REFRESH TASK VIEWS
function renderTasks() {
    const tasks = TaskService.getAll();
    const projects = ProjectService.getAll();

    const filteredTasks = filterTasks(tasks);

    document.getElementById("taskCount").textContent =
        `${filteredTasks.length} ${filteredTasks.length === 1 ? "task" : "tasks"}`;

    renderTaskList(filteredTasks, projects, tasks.length > 0);
    renderKanbanBoard(filteredTasks, projects);
}

// INITIALIZE TASK FILTERS
function initTaskFilters() {
    const search = document.getElementById("taskSearch");
    const project = document.getElementById("taskProjectFilter");
    const status = document.getElementById("taskStatusFilter");
    const priority = document.getElementById("taskPriorityFilter");

    search.addEventListener("input", renderTasks);
    project.addEventListener("change", renderTasks);
    status.addEventListener("change", renderTasks);
    priority.addEventListener("change", renderTasks);
}

// INITIALIZE TASKS PAGE
export function initTasks() {
    loadProjectFilter();
    renderTasks();
    initTaskViews();
    initTaskActions();
    initTaskFilters();
}