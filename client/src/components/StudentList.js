import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const StudentList = (props) => {
    const studentNodes = props.data.map(student => (
        <li key={student._id}>
            <Link to={student.url}>{student.name}</Link>
        </li>
    ));
    if (studentNodes.length === 0) {
        return (
            <ul>
                <li>There are no students</li>
            </ul>
        );
    }
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
        }
    )),
};

StudentList.defaultProps = {
    data: [],
};

export default StudentList;