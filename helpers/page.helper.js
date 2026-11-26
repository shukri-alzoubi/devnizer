export async function loadPage(path) {
    const content = document.getElementById("app-content");

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load page: ${response.status}`);
        }

        content.innerHTML = await response.text();

        return true;
    } catch (error) {
        console.error(error);

        content.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Unable to load the requested page.
            </div>
        `;

        return false;
    }
}