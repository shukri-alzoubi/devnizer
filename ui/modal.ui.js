export class ModalUI {

    // LOAD MODAL

    static async load(path) {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load modal: ${path}`);
        }

        const container = document.createElement("div");
        container.innerHTML = await response.text();

        const modal = container.querySelector(".modal");

        if (!modal) {
            throw new Error("Invalid modal template.");
        }

        document.body.appendChild(modal);

        return modal;
    }

    // OPEN MODAL

    static open(modal) {
        const instance = bootstrap.Modal.getOrCreateInstance(modal);

        modal.addEventListener("hidden.bs.modal", () => {
            instance.dispose();
            modal.remove();
        }, { once: true });

        instance.show();

        return instance;
    }

    // CLOSE MODAL

    static close(modal) {
        bootstrap.Modal.getInstance(modal)?.hide();
    }

    // CONFIRM MODAL

    static async confirm({
        title = "Confirm Action",
        message = "Are you sure you want to continue?",
        buttonText = "Confirm"
    } = {}) {
        const modal = await this.load("./modals/confirm.modal.html");

        modal.querySelector("#confirmModalTitle").textContent = title;
        modal.querySelector("#confirmModalMessage").textContent = message;

        const button = modal.querySelector("#confirmModalButton");
        button.textContent = buttonText;

        return new Promise(resolve => {
            let confirmed = false;

            button.addEventListener("click", () => {
                confirmed = true;
                this.close(modal);
            });

            modal.addEventListener("hidden.bs.modal", () => {
                resolve(confirmed);
            }, { once: true });

            this.open(modal);
        });
    }
}