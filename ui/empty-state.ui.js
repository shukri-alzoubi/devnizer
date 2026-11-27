export class EmptyStateUI {

    // --- RENDER EMPTY STATE ---

    static render({
        icon = "bi-inbox",
        title = "No data available",
        description = "There is nothing to display."
    } = {}) {
        const element = document.createElement("div");

        element.className = "empty-state text-center py-5";

        element.innerHTML = `
            <i class="empty-state-icon bi fs-1 text-body-secondary"></i>
            <h5 class="empty-state-title mt-3"></h5>
            <p class="empty-state-description text-body-secondary mb-0"></p>
        `;

        element.querySelector(".empty-state-icon").classList.add(icon);
        element.querySelector(".empty-state-title").textContent = title;
        element.querySelector(".empty-state-description").textContent = description;

        return element;
    }
}