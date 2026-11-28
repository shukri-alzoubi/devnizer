import { Project } from "../models/project.model.js";
import { StorageService } from "./storage.service.js";
import { validateProject } from "../helpers/validation.helper.js";
import { getTimestamp } from "../helpers/date.helper.js";

export class ProjectService {

    // STORAGE KEY
    static key = "projects";

    // GET ALL PROJECTS
    static getAll() {
        return StorageService.get(this.key, [])
            .map(data => new Project(data));
    }

    // GET PROJECT BY ID
    static getById(id) {
        return this.getAll().find(project => project.id === id) ?? null;
    }

    // CREATE PROJECT
    static create(data) {
        const projects = this.getAll();

        const project = new Project({
            name: data.name,
            description: data.description,
            status: data.status
        });

        const validation = validateProject(project);

        if (!validation.valid) {
            return {
                success: false,
                errors: validation.errors
            };
        }

        projects.push(project);

        StorageService.set(this.key, projects);

        return {
            success: true,
            data: project
        };
    }

    // UPDATE PROJECT
    static update(id, data) {
        const projects = this.getAll();

        const index = projects.findIndex(project => project.id === id);

        if (index === -1) {
            throw new Error("Project not found.");
        }

        const existing = projects[index];

        const project = new Project({
            ...existing,
            name: data.name ?? existing.name,
            description: data.description ?? existing.description,
            status: data.status ?? existing.status,
            updatedAt: getTimestamp()
        });

        const validation = validateProject(project);

        if (!validation.valid) {
            return {
                success: false,
                errors: validation.errors
            };
        }

        projects[index] = project;

        StorageService.set(this.key, projects);

        return {
            success: true,
            data: project
        };
    }

    // DELETE PROJECT
    static delete(id) {
        const projects = this.getAll();

        if (!projects.some(project => project.id === id)) {
            throw new Error("Project not found.");
        }

        const tasks = StorageService.get("tasks", []);

        if (tasks.some(task => task.projectId === id)) {
            throw new Error("Cannot delete a project with linked tasks.");
        }

        const filtered = projects.filter(project => project.id !== id);

        StorageService.set(this.key, filtered);

        return {
            success: true
        };
    }
}