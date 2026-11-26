import { Navbar } from "../components/navbar.component.js";
import { Sidebar } from "../components/sidebar.component.js";
import { initSidebar } from "../helpers/sidebar.helper.js";

// --- APPLICATION INITIALIZATION ---

function init() {
    const app = document.getElementById("app");

    app.innerHTML = `
        ${Navbar()}

        <div id="app-layout" class="d-flex">
            ${Sidebar()}

            <main id="app-content" class="flex-grow-1 p-4">
                <h1>Dashboard</h1>
            </main>
        </div>
    `;

    initSidebar();

    console.log("Devnizer initialized successfully.");
}

document.addEventListener("DOMContentLoaded", init);