import { getTimestamp } from "../helpers/date.helper.js";
import { generateId } from "../helpers/id.helper.js";

export class Task {
    /** @type {string} */ id;
    /** @type {string} */ projectId;
    /** @type {string} */ title;
    /** @type {string} */ description;
    /** @type {"todo"|"in-progress"|"done"} */ status;
    /** @type {"low"|"medium"|"high"} */ priority;
    /** @type {number|null} */ dueDate;
    /** @type {number} */ createdAt;
    /** @type {number} */ updatedAt;

    constructor(data = {}) {
        this.id = data.id ?? generateId();
        this.projectId = data.projectId ?? "";
        this.title = data.title ?? "";
        this.description = data.description ?? "";
        this.status = data.status ?? "todo";
        this.priority = data.priority ?? "medium";
        this.dueDate = data.dueDate ?? null;
        this.createdAt = data.createdAt ?? getTimestamp();
        this.updatedAt = data.updatedAt ?? this.createdAt;
    }
}