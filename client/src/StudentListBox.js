import React, { Component } from 'react';
import 'whatwg-fetch';
import StudentList from './StudentList';

class StudentListBox extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            error: null,
            name: '',
            aMark: '',
            mMark: '',
            fMark: '',
        };
        this.pollInterval = null;
    }

    componentDidMount() {
        this.loadStudentsFromServer();
        if (!this.pollInterval) {
            this.pollInterval = setInterval(this.loadStudentsFromServer, 2000);
        }
    }

    componentWillUnmount() {
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
        }
        this.pollInterval = null;
    }

    loadStudentsFromServer = () => {
        fetch('/api/students/')
            .then(data => data.json())
            .then((res) => {
                if (!res.success) {
                    this.setState({ error: res.error });
                } else {
                    this.setState({ data: res.data });
                }
            });
    }

    onChangeText = (e) => {
        const newState = { ...this.state };
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    render() {
        return (
            <div className="container">
                <div className="students">
                    <h2>Student List:</h2>
                    <StudentList 
                        data={this.state.data}
                    />
                </div>
            </div>
        );
    }
}

export default StudentListBox;