export function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("sidebarToggle");

    function close() {
        sidebar.classList.remove("show");
        document.getElementById("sidebar-backdrop")?.remove();
        toggle.setAttribute("aria-expanded", "false");
    }

    function open() {
        sidebar.classList.add("show");

        const backdrop = document.createElement("div");
        backdrop.id = "sidebar-backdrop";
        backdrop.addEventListener("click", close);

        document.body.appendChild(backdrop);
        toggle.setAttribute("aria-expanded", "true");
    }

    toggle.setAttribute("aria-controls", "sidebar");
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
        sidebar.classList.contains("show") ? close() : open();
    });

    sidebar.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", close);
    });

    window.matchMedia("(min-width: 992px)")
        .addEventListener("change", close);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") close();
    });
}