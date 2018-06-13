import React from 'react';
import PropTypes from 'prop-types';

const loadTitle = (props) => {
    if (props.name === '') {
        return <h2>Add Student:</h2>
    } else {
        return <h2>Update Student:</h2>
    }
};

const StudentForm = props => (
    <div>
        {loadTitle(props)}
        <form onSubmit={props.handleSubmit} name="form">
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Student name"
                value={props.name}
                onChange={props.handleChangeText}
            />
            <br></br>
            <input
                type="text"
                id="aMark"
                name="aMark"
                placeholder="Assignment mark"
                value={props.aMark}
                onChange={props.handleChangeText}
            />
            <br></br>
            <input
                type="text"
                id="mMark"
                name="mMark"
                placeholder="Midterm exam mark"
                value={props.mMark}
                onChange={props.handleChangeText}
            />
            <br></br>
            <input
                type="text"
                id="fMark"
                name="fMark"
                placeholder="Final exam mark"
                value={props.fMark}
                onChange={props.handleChangeText}
            />
            <br></br>
            <button type="submit" name="button">Submit</button>
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