export class ToastUI {

    // TOAST CONTAINER
    static getContainer() {
        let container = document.getElementById("toast-container");

        if (!container) {
            container = document.createElement("div");
            container.id = "toast-container";
            container.className = "toast-container position-fixed bottom-0 end-0 p-3";
            document.body.appendChild(container);
        }

        return container;
    }

    // SHOW TOAST
    static show(message, type = "info") {
        const types = {
            success: "success",
            error: "danger",
            warning: "warning",
            info: "primary",
        };

        const toast = document.createElement("div");
        toast.className = `toast align-items-center text-bg-${types[type] ?? "primary"} border-0`;
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "assertive");
        toast.setAttribute("aria-atomic", "true");

        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body"></div>
                <button type="button"
                    class="btn-close me-2 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close">
                </button>
            </div>
        `;

        toast.querySelector(".toast-body").textContent = message;
        this.getContainer().appendChild(toast);

        const instance = new bootstrap.Toast(toast, {
            delay: 3000,
            autoHide: true
        });

        toast.addEventListener("hidden.bs.toast", () => {
            instance.dispose();
            toast.remove();
        });

        instance.show();
    }

    // NOTIFICATION METHODS

    static success(message) {
        this.show(message, "success");
    }

    static error(message) {
        this.show(message, "error");
    }

    static warning(message) {
        this.show(message, "warning");
    }

    static info(message) {
        this.show(message, "info");
    }
}