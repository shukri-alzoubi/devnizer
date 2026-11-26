import { AppConfig } from "../js/app.config.js";

export class StorageService {

    // STORAGE KEY
    static getKey(key) {
        return `${AppConfig.id}_${key}`;
    }

    // READ
    static get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(this.getKey(key));

            return data === null ? defaultValue : JSON.parse(data);
        } catch (error) {
            console.error(`Failed to read storage: ${key}`, error)
            throw error;
        }
    }

    // WRITE
    static set(key, value) {
        try {
            localStorage.setItem(
                this.getKey(key),
                JSON.stringify(value)
            );
        } catch (error) {
            console.error(`Failed to write storage: ${key}`, error);
            throw error;
        }
    }

    // REMOVE
    static remove(key) {
        try {
            localStorage.removeItem(this.getKey(key));
        } catch (error) {
            console.error(`Failed to remove storage: ${key}`, error);
            throw error;
        }
    }

    // EXISTS
    static exists(key) {
        try {
            return localStorage.getItem(this.getKey(key)) !== null;
        } catch (error) {
            console.error(`Failed to access storage: ${key}`, error);
            throw error;
        }
    }

    // INITIALIZATION
    static init() {
        const collections = ["projects", "tasks"];

        for (const key of collections) {
            if (!this.exists(key)) {
                this.set(key, []);
                continue;
            }

            if (!Array.isArray(this.get(key))) {
                throw new Error(`Invalid storage collection: ${key}`);
            }
        }
    }
}