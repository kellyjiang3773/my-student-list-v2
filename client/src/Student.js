import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Student = (props) => (

    <div>
        <h2>{props.name}:</h2>
        <p>Assignment mark: {props.aMark}</p>
        <p>Midterm exam mark: {props.mMark}</p>
        <p>Final exam mark: {props.fMark}</p>
    </div>

    // <div className="singleStudent">
    //     <div className="studentInfo">
    //         <h3>{props.name}</h3>
    //         <ReactMarkdown source={props.children}/>
    //     </div>
    //     {/* <div className="buttons">
    //         <a onClick={() => { props.handleUpdateStudent(props.id); }}>
    //             update</a>
    //         <a onClick={() => { props.handleDeleteStudent(props.id); }}>
    //             delete</a>
    //     </div> */}
    // </div>
);

Student.propTypes = {
    name: PropTypes.string,      //.isRequired,
    children: PropTypes.string,      //.isRequired,
    aMark: PropTypes.string,
    mMark: PropTypes.string,
    fMark: PropTypes.string
    // id: PropTypes.string,
    // handleDeleteStudent: PropTypes.func,
    // handleUpdateStudent: PropTypes.func
};

export default Student;