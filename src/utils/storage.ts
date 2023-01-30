export function setLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

export function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

export function removeLocalStorage(name) {
    return localStorage.removeItem(name);
}

export function clearLocalStorage() {
    return localStorage.clear();
}