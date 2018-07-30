import 'whatwg-fetch';

export default function request(id, method, body) {
    // console.log('inside request');

    if (method.get) {
        if (id) {
            // need to GET student
            return fetch(`/student_list/${id}`);
        }
        // need to GET list
        return fetch(`/student_list/students`);

    }
    else if (method.post) {
        // console.log('post request');
        return fetch('/student_list/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    }
    else if (method.put) {
        // console.log('put request');
        return fetch(`/student_list/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    }
    else if (method.delete) {
        // console.log('delete request');
        return fetch(`/student_list/${id}`, { method: 'DELETE' });
    }
    else {
        console.log('invalid request');
        return;
    }
}