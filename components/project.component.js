export function ProjectCard(project, totalTasks = 0, completedTasks = 0) {
    const progress = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    const statuses = {
        active: { label: "Active", color: "primary" },
        completed: { label: "Completed", color: "success" },
        archived: { label: "Archived", color: "secondary" }
    };

    const status = statuses[project.status] ?? statuses.active;

    const element = document.createElement("div");

    element.className = "col-12 col-md-6 col-xl-4";
    element.dataset.id = project.id;

    element.innerHTML = `
        <div class="card project-card h-100">

            <div class="card-body">

                <!-- PROJECT HEADER -->
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <i class="bi bi-folder fs-3 text-primary"></i>
                    <span class="badge text-bg-${status.color}">
                        ${status.label}
                    </span>
                </div>

                <!-- PROJECT INFORMATION -->
                <h5 class="project-name fw-semibold"></h5>
                <p class="project-description text-body-secondary"></p>

                <!-- PROJECT PROGRESS -->
                <div class="d-flex justify-content-between mb-2">
                    <small>Progress</small>
                    <small class="fw-semibold">${progress}%</small>
                </div>

                <div class="progress"
                    role="progressbar"
                    aria-label="Project progress"
                    aria-valuenow="${progress}"
                    aria-valuemin="0"
                    aria-valuemax="100">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>

                <small class="text-body-secondary d-block mt-2">
                    ${completedTasks} of ${totalTasks} tasks completed
                </small>

            </div>

            <!-- PROJECT ACTIONS -->
            <div class="card-footer bg-body d-flex justify-content-end gap-2">

                <button type="button" class="btn btn-sm btn-outline-primary"
                    data-action="view" title="View project" aria-label="View project">
                    <i class="bi bi-eye"></i>
                </button>

                <button type="button" class="btn btn-sm btn-outline-secondary"
                    data-action="edit" title="Edit project" aria-label="Edit project">
                    <i class="bi bi-pencil"></i>
                </button>

                <button type="button" class="btn btn-sm btn-outline-danger"
                    data-action="delete" title="Delete project" aria-label="Delete project">
                    <i class="bi bi-trash"></i>
                </button>

            </div>

        </div>
    `;

    element.querySelector(".project-name").textContent = project.name;

    element.querySelector(".project-description").textContent =
        project.description || "No description provided.";

    return element;
}