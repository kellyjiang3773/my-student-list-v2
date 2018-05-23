import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Student from './Student';

const StudentList = (props) => {
    const studentNodes = props.data.map(student => (
        <li>
            {/* <Student
                key={student._id}
                id={student._id}
                // handleDeleteStudent={props.handleDeleteStudent}
                // handleUpdateStudent={props.handleUpdateStudent}
            >
                {student.name}
            </Student> */}
            <Link to={student.url}>{student.name}</Link>
            {/* <a href={student.url}>{student.name}</a> */}
        </li>
    ));
    return (
        <ul>
            {studentNodes}
        </ul>
    );
};

StudentList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(
        {
            name: PropTypes.string,
            // id: PropTypes.string,
            // aMark: PropTypes.string,
            // mMark: PropTypes.string,
            // fMark: PropTypes.string
        }
    )),
    // handleDeleteStudent: PropTypes.func,
    // handleUpdateStudent: PropTypes.func,
};

StudentList.defaultProps = {
    data: [],
};

export default StudentList;