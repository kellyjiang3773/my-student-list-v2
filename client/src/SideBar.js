import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StudentListBox from './StudentListBox';
import StudentFormBox from './StudentFormBox';
import Student from './Student';

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
    constructor() {
        super();
        this.state = {
            name: '',
            aMark: '',
            mMark: '',
            fMark: ''
        }
        // buttons and handlers
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        fetch(`api/students/${params.studentId}`)
            .then(res => res.json()).then((res) => {
                // if (!res.success) this.setState({ error: res.error });
                this.setState({
                    name: res.name,
                    aMark: res.aMark,
                    mMark: res.mMark,
                    fMark: res.fMark
                });
            });

        // fetch(`/api/students/${params.studentId}`, {
        //     method: 'GET'
        // }).then(({ data: user }) => {
        //     this.setState({ user });
        // });
    }

    render() {
        // const { match: { params } } = this.props;
        return (
            // <h2>{params.studentId}:</h2>
            <Student
                name={this.state.name}
                aMark={this.state.aMark}
                mMark={this.state.mMark}
                fMark={this.state.fMark}
            />
        )
    }
}

const add_student = () => {
    return (<StudentFormBox />)
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
            </div>
        </div>
    </Router>
);

export default SidebarExample;