import { TaskRow } from "../components/task.component.js";
import { KanbanCard } from "../components/kanban.component.js";
import { Task } from "../models/task.model.js";
import { Project } from "../models/project.model.js";
import { fromDateInput, toDateInput } from "../helpers/date.helper.js";
import { ModalUI } from "../ui/modal.ui.js";
import { ToastUI } from "../ui/toast.ui.js";

// TEMPORARY PREVIEW DATA
const projects = [
    new Project({ name: "Devnizer" }),
    new Project({ name: "Portfolio" })
];

const tasks = [
    new Task({
        projectId: projects[0].id,
        title: "Build application layout",
        description: "Create the responsive app shell.",
        status: "done",
        priority: "high",
        dueDate: fromDateInput("2026-12-15")
    }),
    new Task({
        projectId: projects[0].id,
        title: "Create data models",
        description: "Define project and task models.",
        status: "in-progress",
        priority: "medium",
        dueDate: fromDateInput("2026-12-20")
    }),
    new Task({
        projectId: projects[1].id,
        title: "Update documentation",
        description: "Update project requirements.",
        status: "todo",
        priority: "low"
    })
];

// RENDER TASK LIST
function renderTaskList() {
    const container = document.getElementById("taskList");

    container.replaceChildren(
        ...tasks.map(task => {
            const project = projects.find(
                item => item.id === task.projectId
            );

            return TaskRow(task, project?.name);
        })
    );

    document.getElementById("taskCount").textContent =
        `${tasks.length} tasks`;
}

// RENDER KANBAN BOARD
function renderKanbanBoard() {
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

    projects.forEach(project => {
        form.elements.projectId.add(
            new Option(project.name, project.id)
        );
    });

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

    // Prevent saving during UI development

    form.addEventListener("submit", event => {
        event.preventDefault();
        ToastUI.info("Task saving will be available in the logic phase.");
    });

    ModalUI.open(modal);
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
        const task = tasks.find(item => item.id === id);

        if (!task) return;

        switch (button.dataset.action) {
            case "view":
                await openTaskModal("view", task);
                break;

            case "edit":
                await openTaskModal("edit", task);
                break;

            case "delete":
                await ModalUI.confirm({
                    title: "Delete Task",
                    message: `Are you sure you want to delete "${task.title}"?`,
                    buttonText: "Delete"
                });
                break;
        }
    };
}

// INITIALIZE TASKS PAGE
export function initTasks() {
    renderTaskList();
    renderKanbanBoard();
    initTaskViews();
    initTaskActions();
}