import { Task } from "../models/task.model.js";
import { StorageService } from "./storage.service.js";
import { ProjectService } from "./project.service.js";
import { validateTask } from "../helpers/validation.helper.js";
import { getTimestamp } from "../helpers/date.helper.js";

export class TaskService {

    // STORAGE KEY
    static key = "tasks";

    // GET ALL TASKS
    static getAll() {
        return StorageService.get(this.key, [])
            .map(data => new Task(data));
    }

    // GET TASK BY ID
    static getById(id) {
        return this.getAll().find(task => task.id === id) ?? null;
    }

    // GET TASKS BY PROJECT
    static getByProjectId(projectId) {
        return this.getAll().filter(
            task => task.projectId === projectId
        );
    }

    // CREATE TASK
    static create(data) {
        const tasks = this.getAll();
        const projects = ProjectService.getAll();

        const task = new Task({
            projectId: data.projectId,
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate
        });

        const validation = validateTask(task, projects);

        if (!validation.valid) {
            return {
                success: false,
                errors: validation.errors
            };
        }

        tasks.push(task);

        StorageService.set(this.key, tasks);

        return {
            success: true,
            data: task
        };
    }

    // UPDATE TASK
    static update(id, data) {
        const tasks = this.getAll();
        const projects = ProjectService.getAll();

        const index = tasks.findIndex(task => task.id === id);

        if (index === -1) {
            throw new Error("Task not found.");
        }

        const existing = tasks[index];

        const task = new Task({
            ...existing,
            projectId: data.projectId ?? existing.projectId,
            title: data.title ?? existing.title,
            description: data.description ?? existing.description,
            status: data.status ?? existing.status,
            priority: data.priority ?? existing.priority,
            dueDate: data.dueDate !== undefined
                ? data.dueDate
                : existing.dueDate,
            updatedAt: getTimestamp()
        });

        const validation = validateTask(task, projects);

        if (!validation.valid) {
            return {
                success: false,
                errors: validation.errors
            };
        }

        tasks[index] = task;

        StorageService.set(this.key, tasks);

        return {
            success: true,
            data: task
        };
    }

    // DELETE TASK
    static delete(id) {
        const tasks = this.getAll();

        if (!tasks.some(task => task.id === id)) {
            throw new Error("Task not found.");
        }

        const filtered = tasks.filter(task => task.id !== id);

        StorageService.set(this.key, filtered);

        return {
            success: true
        };
    }
}