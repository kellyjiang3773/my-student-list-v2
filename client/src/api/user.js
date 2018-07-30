import request from './request';

// all functions return promises

export function GETstudent(id) {
    return request(id, { get: true });
}

export function GETlist() {
    return request(null, { get: true });
}

export function POSTstudent(body) {
    return request(null, { post: true }, body);
}

export function PUTstudent(id, body) {
    return request(id, { put: true }, body);
}

export function DELETEstudent(id) {
    return request(id, { delete: true });
}
