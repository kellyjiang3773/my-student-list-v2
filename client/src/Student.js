import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Student = (props) => (
    <div>
        <h2>{props.name}:</h2>
        <p>Assignment mark: {props.aMark}</p>
        <p>Midterm exam mark: {props.mMark}</p>
        <p>Final exam mark: {props.fMark}</p>
        <p>ID: {props.id}</p>
        <hr></hr>
        <div>
            {/* <a onClick={() => { props.handleUpdateStudent(props.id); }}>
                Update</a> */}
            <a onClick={() => { props.handleDeleteStudent(props.id); }}>
                Delete</a>
        </div>
    </div>
);

Student.propTypes = {
    name: PropTypes.string,      //.isRequired,
    children: PropTypes.string,      //.isRequired,
    aMark: PropTypes.string,
    mMark: PropTypes.string,
    fMark: PropTypes.string,
    id: PropTypes.string,
    handleDeleteStudent: PropTypes.func,
    handleUpdateStudent: PropTypes.func
};

export default Student;