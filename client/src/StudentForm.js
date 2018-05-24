import React from 'react';
import PropTypes from 'prop-types';

const StudentForm = props => (
    <div>
        <h2>Add Student:</h2>
        <form onSubmit={props.handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Student name"
                value={props.name}
                onChange={props.handleChangeText}
            />
            <br></br>
            <input
                type="text"
                name="aMark"
                placeholder="Assignment mark"
                value={props.aMark}
                onChange={props.handleChangeText}
            />
            <br></br>
            <input
                type="text"
                name="mMark"
                placeholder="Midterm exam mark"
                value={props.mMark}
                onChange={props.handleChangeText}
            />
            <br></br>
            <input
                type="text"
                name="fMark"
                placeholder="Final exam mark"
                value={props.fMark}
                onChange={props.handleChangeText}
            />
            <br></br>
            <button type="submit">Submit</button>
            {/* <Link to="/student" onClick={props.handleSubmit}>Submit</Link> */}
        </form>
    </div>
);

StudentForm.propTypes = {
    handleSubmit: PropTypes.func,      //.isRequired,
    handleChangeText: PropTypes.func,      //.isRequired,
    name: PropTypes.string,
    aMark: PropTypes.string,
    mMark: PropTypes.string,
    fMark: PropTypes.string
};

// StudentForm.defaultProps = {
//     name: '',
//     aMark: '',
//     mMark: '',
//     fMark: ''
// };

export default StudentForm;