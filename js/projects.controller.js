import { ProjectCard } from "../components/project.component.js";
import { Project } from "../models/project.model.js";
import { ModalUI } from "../ui/modal.ui.js";

// --- PROJECT MODAL ---

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

    // Prevent submission during UI development
    form.addEventListener("submit", event => {
        event.preventDefault();
    });

    ModalUI.open(modal);
}

// --- INITIALIZE PROJECTS PAGE ---

export function initProjects() {
    const container = document.getElementById("projectList");

    // --- TEMPORARY PREVIEW DATA ---

    const projects = [
        new Project({
            name: "Devnizer",
            description: "Developer task management application.",
            status: "active"
        }),
        new Project({
            name: "Portfolio",
            description: "Personal developer portfolio website.",
            status: "completed"
        }),
        new Project({
            name: "Notes App",
            description: "Simple note-taking application.",
            status: "archived"
        })
    ];

    container.replaceChildren(
        ProjectCard(projects[0], 10, 6),
        ProjectCard(projects[1], 8, 8),
        ProjectCard(projects[2], 5, 2)
    );

    // --- CREATE PROJECT ---

    document.getElementById("newProjectBtn").onclick = () =>
        openProjectModal("create");

    // --- PROJECT ACTIONS ---

    container.onclick = async event => {
        const button = event.target.closest("[data-action]");

        if (!button) return;

        const id = button.closest("[data-id]").dataset.id;
        const project = projects.find(item => item.id === id);

        if (!project) return;

        switch (button.dataset.action) {
            case "view":
                await openProjectModal("view", project);
                break;

            case "edit":
                await openProjectModal("edit", project);
                break;

            case "delete":
                await ModalUI.confirm({
                    title: "Delete Project",
                    message: `Are you sure you want to delete ${project.name}?`,
                    buttonText: "Delete"
                });
                break;
        }
    };
}