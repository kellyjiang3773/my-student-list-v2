import React from 'react';
import PropTypes from 'prop-types';

const Student = (props) => (
    <div>
        <h2>{props.name}:</h2>
        <p>Assignment mark: {(props.aMark.length === 0 ? 'N/A' : props.aMark)}</p>
        <p>Midterm exam mark: {(props.mMark.length === 0 ? 'N/A' : props.mMark)}</p>
        <p>Final exam mark: {(props.fMark.length === 0 ? 'N/A' : props.fMark)}</p>
        <hr></hr>
        <div>
            <button onClick={() => { props.handleUpdateStudent(props.id); }}>
                Update</button>
            <button onClick={() => { props.handleDeleteStudent(props.id); }}>
                Delete</button>
        </div>
    </div>
);

Student.propTypes = {
    name: PropTypes.string,      //.isRequired,
    aMark: PropTypes.string,
    mMark: PropTypes.string,
    fMark: PropTypes.string,
    id: PropTypes.string,
    handleDeleteStudent: PropTypes.func,
    handleUpdateStudent: PropTypes.func
};

export default Student;