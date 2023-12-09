export function compareID (obj,value) {
    const compareFn = (data) => data.id === value;
    return obj.find(compareFn);
}

export function insertData (key,value) {

    return localStorage.setItem(key,JSON.stringify(value));
}

export function retrieveData (key) {
    return JSON.parse(localStorage.getItem(key));
}