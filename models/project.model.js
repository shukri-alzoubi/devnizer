import { getTimestamp } from "../helpers/date.helper.js";
import { generateId } from "../helpers/id.helper.js";

export class Project {
    /** @type {string} */ id;
    /** @type {string} */ name;
    /** @type {string} */ description;
    /** @type {"active"|"completed"|"archived"} */ status;
    /** @type {number} */ createdAt;
    /** @type {number} */ updatedAt;

    constructor(data = {}){
        this.id = data.id ?? generateId();
        this.name = data.name ?? "";
        this.description = data.description ?? "",
        this.status = data.status ?? "active";
        this.createdAt = data.createdAt ?? getTimestamp(),
        this.updatedAt = data.updatedAt ?? this.createdAt;
    }
}