

export const temp_students = {
    1: {
        name: "John Doe",
        aMark: "100",
        mMark: "10",
        fMark: "0"
    },
    2: {
        name: "Jane Lee",
        aMark: "90",
        mMark: "90",
        fMark: "90"
    }
};

export default function request(id, method, body) {
    // console.log('inside MOCK request');

    if (method.get) {
        if (id) {       // need to GET student
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    if (temp_students[id]) {
                        // console.log('resolving mock promise');
                        resolve({
                            success: true,
                            student: temp_students[id]
                        });
                    } else {
                        // console.log('rejecting mock promise');
                        reject({
                            success: false,
                            error: 'Student with ID [' + id + '] not found'
                        });
                    }
                });
            });
        } else {        // need to GET list
            return new Promise((resolve, reject) => {
                process.nextTick( () => {
                    resolve({
                        success: true,
                        data: temp_students
                    });
                });
            });
        }
    } else if (method.post) {
        // console.log('post request MOCK');
        return new Promise((resolve, reject) => {
            process.nextTick(() => {
                // console.log(body);
                if (!body.name == '') {
                    // console.log('resolving mock promise');
                    resolve({ success: true });
                } else {
                    // console.log('rejecting mock promise');
                    reject({
                        success: false,
                        error: 'Error adding student ' + JSON.stringify(body)
                    });
                }
            });
        });
    } else if (method.put) {
        // console.log('put request MOCK');
        return new Promise((resolve, reject) => {
            process.nextTick(() => {
                // console.log(body);
                if (!temp_students[id]) {
                    reject({
                        success: false,
                        error: 'Student with ID [' + id + '] not found'
                    })
                }
                if (!body.name == '') {
                    // console.log('resolving mock promise');
                    resolve({ success: true });
                } else {
                    // console.log('rejecting mock promise');
                    reject({
                        success: false,
                        error: 'Error updating student ' + JSON.stringify(body)
                    });
                }
            });
        });
    } else if (method.delete) {
        // console.log('delete request MOCK');
        return new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (temp_students[id]) {
                    // console.log('resolving mock promise');
                    resolve({ success: true });
                } else {
                    // console.log('rejecting mock promise');
                    reject({
                        success: false,
                        error: 'Error deleting student with ID [' + id + ']'
                    });
                }
            });
        });
    } else {
        console.log('invalid request MOCK');
    }
}