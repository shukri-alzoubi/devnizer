export function Navbar() {
    return `
        <nav class="navbar navbar-expand bg-body border-bottom" id="navbar">
            <div class="container-fluid">

                <div class="d-flex align-items-center gap-3">
                    <button class="btn btn-outline-secondary d-lg-none"
                        id="sidebarToggle" type="button"
                        aria-label="Toggle sidebar">
                        <i class="bi bi-list"></i>
                    </button>

                    <a class="navbar-brand fw-bold m-0" href="#dashboard">
                        <i class="bi bi-kanban me-2"></i>Devnizer
                    </a>
                </div>

            </div>
        </nav>
    `;
}