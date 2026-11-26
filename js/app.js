import { Navbar } from "../components/navbar.component.js";
import { Sidebar } from "../components/sidebar.component.js";
import { initSidebar } from "../helpers/sidebar.helper.js";
import { initNavigation } from "../helpers/navigation.helper.js";
import { AppConfig } from "./app.config.js";

// RENDER LAYOUT
function renderLayout(){
    const app = document.getElementById("app");

    app.innerHTML = `
        ${Navbar()}

        <div id="app-layout" class="d-flex">
            ${Sidebar()}

            <main id="app-content" class="flex-grow-1 p-4"></main>
        </div>
    `
}


// INITIALIZE APP
async function init() {

    renderLayout();
    initSidebar();
    await initNavigation();
    console.log(`${AppConfig.name} v${AppConfig.version} initialized.`);
}

document.addEventListener("DOMContentLoaded", init);