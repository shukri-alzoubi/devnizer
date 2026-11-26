export function Sidebar() {
    return `
        <aside id="sidebar" class="bg-body border-end">
            <div class="p-3">
                <small class="text-body-secondary fw-semibold text-uppercase">
                    Workspace
                </small>

                <nav class="nav nav-pills flex-column gap-1 mt-3">
                    <a class="nav-link active" href="#dashboard">
                        <i class="bi bi-grid me-2"></i>
                        Dashboard
                    </a>

                    <a class="nav-link" href="#projects">
                        <i class="bi bi-folder me-2"></i>
                        Projects
                    </a>

                    <a class="nav-link" href="#tasks">
                        <i class="bi bi-list-task me-2"></i>
                        Tasks
                    </a>
                </nav>
            </div>
        </aside>
    `;
}