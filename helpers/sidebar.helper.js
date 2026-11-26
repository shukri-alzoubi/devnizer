export function initSidebar(){

    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("sidebarToggle");

    // CLOSE SIDEBAR
    function close(){
        sidebar.classList.remove("show");
        document.getElementById("sidebar-backdrop")?.remove();
        toggle.setAttribute("aria-expanded", "false");
    }

    // OPEN SIDEBAR
    function open(){
        sidebar.classList.add("show");
        
        const backdrop = document.createElement("div");
        backdrop.id = "sidebar-backdrop";
        backdrop.addEventListener("click", close);

        document.body.appendChild(backdrop);
        toggle.setAttribute("aria-expanded", "true");
    }

    // SET TOGGLE ARIA 
    toggle.setAttribute("aria-controls", "sidebar");
    toggle.setAttribute("aria-expanded", "false");

    function toggleSidebar(){
        sidebar.classList.contains("show") ? close() : open()
    }

    // TOGGLE CLICK
    toggle.addEventListener("click", toggleSidebar)

    // CLOSE SIDEBAR ON LINK CLICK
    sidebar.querySelectorAll(".nav-link").forEach((link)=> {
        link.addEventListener("click", close);
    })

    // CLOSE ON Large Screens
    window.matchMedia("(min-width:992px)").addEventListener("change", close);

    // Keyboard accessibillities
    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape") close();

        if(e.altKey && e.key === "t") {
            e.preventDefault();
            toggleSidebar()
        }
    })
}