export class LoadingUI {

    // --- RENDER LOADING ---

    static render(message = "Loading...") {
        const element = document.createElement("div");

        element.className = "loading-state d-flex flex-column align-items-center justify-content-center text-center h-100";
        element.setAttribute("role", "status");

        element.innerHTML = `
            <div class="spinner-border text-primary"
                aria-hidden="true">
            </div>
            <p class="loading-message text-body-secondary mt-3 mb-0"></p>
        `;

        element.querySelector(".loading-message").textContent = message;

        return element;
    }
}