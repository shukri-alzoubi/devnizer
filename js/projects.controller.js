import { ProjectCard } from "../components/project.component.js";
import { ModalUI } from "../ui/modal.ui.js";
import { ProjectService } from "../services/project.service.js";
import { StorageService } from "../services/storage.service.js";
import { EmptyStateUI } from "../ui/empty-state.ui.js";
import { ToastUI } from "../ui/toast.ui.js";

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

// PROJECT MODAL
async function openProjectModal(mode = "create", project = null) {
    const modal = await ModalUI.load("./modals/project.modal.html");

    const title = modal.querySelector("#projectModalTitle");
    const form = modal.querySelector("#projectForm");
    const saveBtn = modal.querySelector("#projectSaveBtn");
    const cancelBtn = modal.querySelector("#projectCancelBtn");

    const titles = {
        create: "New Project",
        edit: "Edit Project",
        view: "Project Details"
    };

    title.textContent = titles[mode];

    if (project) {
        form.elements.name.value = project.name;
        form.elements.description.value = project.description;
        form.elements.status.value = project.status;
    }

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
            name: form.elements.name.value.trim(),
            description: form.elements.description.value.trim(),
            status: form.elements.status.value
        };

        try {
            let result;

            switch (mode) {
                case "create":
                    result = ProjectService.create(data);
                    break;

                case "edit":
                    result = ProjectService.update(project.id, data);
                    break;

                default:
                    return;
            }

            if (!result.success) {
                showFormErrors(form, result.errors);
                return;
            }

            ModalUI.close(modal);
            renderProjects();

            ToastUI.success(
                mode === "create"
                    ? "Project created successfully."
                    : "Project updated successfully."
            );

        } catch (error) {
            console.error(error);
            ToastUI.error(error.message || "Failed to save project.");
        }
    });

    ModalUI.open(modal);
}

// FILTER PROJECTS
function filterProjects(projects) {
    const search = document.getElementById("projectSearch")
        .value.trim().toLowerCase();

    const status = document.getElementById("projectStatusFilter").value;

    return projects.filter(project => {
        const matchesSearch =
            project.name.toLowerCase().includes(search) ||
            project.description.toLowerCase().includes(search);

        const matchesStatus =
            status === "all" || project.status === status;

        return matchesSearch && matchesStatus;
    });
}

// RENDER PROJECTS
function renderProjects() {
    const container = document.getElementById("projectList");

    const projects = ProjectService.getAll();
    const filteredProjects = filterProjects(projects);
    const tasks = StorageService.get("tasks", []);

    container.replaceChildren();

    // Empty state

    if (filteredProjects.length === 0) {
        const wrapper = document.createElement("div");

        wrapper.className = "col-12";

        wrapper.appendChild(
            EmptyStateUI.render({
                icon: projects.length === 0
                    ? "bi-folder2-open"
                    : "bi-search",

                title: projects.length === 0
                    ? "No projects yet"
                    : "No projects found",

                description: projects.length === 0
                    ? "Create your first project to get started."
                    : "Try adjusting your search or filters."
            })
        );

        container.appendChild(wrapper);

        return;
    }

    // Render project cards
    filteredProjects.forEach(project => {
        const projectTasks = tasks.filter(
            task => task.projectId === project.id
        );

        const completedTasks = projectTasks.filter(
            task => task.status === "done"
        ).length;

        container.appendChild(
            ProjectCard(
                project,
                projectTasks.length,
                completedTasks
            )
        );
    });
}

// DELETE PROJECT
async function deleteProject(project) {
    try {
        const confirmed = await ModalUI.confirm({
            title: "Delete Project",
            message: `Are you sure you want to delete "${project.name}"?`,
            buttonText: "Delete"
        });

        if (!confirmed) return;

        ProjectService.delete(project.id);

        renderProjects();

        ToastUI.success("Project deleted successfully.");

    } catch (error) {
        console.error(error);

        ToastUI.error(
            error.message || "Failed to delete project."
        );
    }
}

// INITIALIZE PROJECT FILTERS
function initProjectFilters() {
    const search = document.getElementById("projectSearch");
    const status = document.getElementById("projectStatusFilter");

    search.addEventListener("input", renderProjects);
    status.addEventListener("change", renderProjects);
}

// INITIALIZE PROJECTS PAGE
export function initProjects() {
    const container = document.getElementById("projectList");

    renderProjects();
    initProjectFilters();

    document.getElementById("newProjectBtn").onclick = () =>
        openProjectModal("create");

    container.onclick = async event => {
        const button = event.target.closest("[data-action]");

        if (!button) return;

        const id = button.closest("[data-id]")?.dataset.id;
        const project = ProjectService.getById(id);

        if (!project) {
            ToastUI.error("Project not found.");
            return;
        }

        switch (button.dataset.action) {
            case "view":
                await openProjectModal("view", project);
                break;

            case "edit":
                await openProjectModal("edit", project);
                break;

            case "delete":
                await deleteProject(project);
                break;
        }
    };
}