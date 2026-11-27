// ALLOWED VALUES

const PROJECT_STATUSES = ["active", "completed", "archived"];
const TASK_STATUSES = ["todo", "in-progress", "done"];
const TASK_PRIORITY = ["low", "medium", "high"];

// COMMON VALIDATION

export function isRequired(value) {
    return typeof value === "string" && value.trim().length > 0;
}

export function isValidDate(value) {
    return typeof value === "number" &&
        Number.isFinite(value) &&
        !Number.isNaN(new Date(value).getTime());
}

// PROJECT VALIDATION
export function validateProject(project){
    const errors = {};

    if(!isRequired(project.name))
        errors.name = "Project name is required."

    if(!PROJECT_STATUSES.includes(project.status))
        errors.status = "Invalid project status."

    return {
        valid : Object.keys(errors).length === 0,
        errors
    }
}

// TASK VALIDATION
export function validateTask(task, projects = []){
    const errors = {};

    if(!isRequired(task.title))
        errors.title = "Task title is required.";

    if(!isRequired(task.projectId))
        errors.projectId = "Project is required.";
    else if(!projects.some((project) => project.id === task.projectId))
        errors.projectId = "Selected project does not exist."

    if(!TASK_STATUSES.includes(task.status))
        errors.status = "Invalid task status."

    if(!TASK_PRIORITY.includes(task.priority))
        errors.priority = "Invalid task priority."

    if(task.dueDate !== null && !isValidDate(task.dueDate))
        errors.dueDate = "Invalid due date."

    return {
        valid: Object.keys(errors).length === 0,
        errors
    }
}
