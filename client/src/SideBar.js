import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StudentListBox from './StudentListBox';
import StudentFormBox from './StudentFormBox';
import StudentBox from './StudentBox';

const home = () => {
    return (
        <div>
            <h1>Express</h1>
            <h2>Welcome to Express School</h2>
        </div>
    )
};

const student_list = () => {
    return <StudentListBox />
}

class student_detail extends Component {
    render() {
        const { match: { params } } = this.props;
        return (
            <StudentBox studentId={params.studentId} />
        )
    }
}

const add_student = () => {
    return (
        <div>
            <h2>Add Student:</h2>
            <StudentFormBox />
        </div>
    )
}

class update_student extends Component {
    render() {
        const updateId = this.props.location.state.updateId;
        return (
            <div>
                <h2>Update Student:</h2>
                <StudentFormBox studentId={updateId} />
            </div>
        )
    }
}

const SidebarExample = () => (
    <Router>
        <div style={{ display: "flex" }}>
            <div
                style={{
                    padding: "10px",
                    width: "10%",
                    background: "#f0f0f0"
                }}
            >
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/student">Student List</Link>
                    </li>
                    <li>
                        <Link to="/add">Add Student</Link>
                    </li>
                </ul>
            </div>
            <div style={{ flex: 1, padding: "10px" }}>
                <Route path="/" exact component={home} />
                <Route path="/student" exact component={student_list} />
                <Route path="/student/:studentId" component={student_detail} />
                <Route path="/add" component={add_student} />
                <Route path="/update/:studentId" component={update_student} />
            </div>
        </div>
    </Router>
);

export default SidebarExample;