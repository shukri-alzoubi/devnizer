// TIMESTAMP
export function getTimestamp(){
    return Date.now()
}

// DDATE FORMATTING
export function formatDate(timestamp){
    if (timestamp == null) return "";

    return new Date(timestamp).toLocaleDateString();
}

export function formatDateTime(timestamp){
    if(timestamp == null) return "";

    return new Date(timestamp).toLocaleString();
}

// DATE INPUT
export function toDateInput(timestamp){
    if(timestamp == null) return "";

    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function fromDateInput(value){
    if(!value) return null;

    return new Date(`${value}T23:59:59.999`).getTime();
}

// DATE COMPARSION
export function isOverdue(timestamp){
    return timestamp != null && timestamp < Date.now();
}