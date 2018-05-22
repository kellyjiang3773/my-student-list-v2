const secrets = {
    dbUri: 'mongodb://localhost/student_list_db'
};

export const getSecret = key => secrets[key];