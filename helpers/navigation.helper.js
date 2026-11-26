import { AppConfig } from "../js/app.config.js";
import { AppRoutes } from "../js/app.routes.js";
import { loadPage } from "./page.helper.js";

// GET CURRENT ROUTE
export function getCurrentRoute() {

    const hash = window.location.hash.slice(1);

    return Object.hasOwn(AppRoutes, hash) ? hash : AppConfig.defaultPage
}

// UPDATE ACTIVE LINKS
export function updateActiveLinks(page) {
    document.querySelectorAll("#sidebar .nav-link").forEach(link => {
        const isActive = link.getAttribute("href") === `#${page}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// UPDATE PAGE TITLE
function updatePageTitle(route){
    document.title = `${route.title} | ${AppConfig.name}`
}

// HANDLE NAVIGATION
export async function navigate() {
    const page = getCurrentRoute();
    const route = AppRoutes[page];

    updateActiveLinks(page);
    updatePageTitle(route);

    await loadPage(route.path);
}

// INITIALIZE NAVIGATION
export function initNavigation() {
    window.addEventListener("hashchange", navigate);

    return navigate();
}