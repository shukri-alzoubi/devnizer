import { Navbar } from "../components/navbar.component.js";
import { Sidebar } from "../components/sidebar.component.js";
import { initSidebar } from "../helpers/sidebar.helper.js";
import { initNavigation } from "../helpers/navigation.helper.js";
import { AppConfig } from "./app.config.js";
import { StorageService } from "../services/storage.service.js";

// RENDER LAYOUT
function renderLayout() {
    const app = document.getElementById("app");

    app.innerHTML = `
        ${Navbar()}

        <div id="app-layout" class="d-flex">
            ${Sidebar()}

            <main id="app-content" class="flex-grow-1 p-4"></main>
        </div>
    `
}


async function init() {
    renderLayout();

    try {
        StorageService.init();

        initSidebar();

        await initNavigation();

        console.log(`${AppConfig.name} v${AppConfig.version} initialized.`);
    } catch (error) {
        console.error("Application initialization failed:", error);

        document.getElementById("app-content").innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h5>Initialization Failed</h5>
                <p class="mb-0">
                    Unable to initialize the application.
                    Please check your browser storage.
                </p>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", init);