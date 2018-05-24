import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import StudentForm from './StudentForm';

class StudentFormBox extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            // data: [],
            error: null,
            name: '',
            aMark: '',
            mMark: '',
            fMark: '',
        };
    }

    onChangeText = (e) => {
        const newState = { ...this.state };
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    submitStudent = (e) => {
        e.preventDefault();
        const { name, updateId } = this.state;
        if (!name) return;
        // this.state.redirect = true;
        if (updateId) {
            this.submitUpdatedStudent();
        } else {
            this.submitNewStudent();
        }
    }

    submitNewStudent = () => {
        const { name, aMark, mMark, fMark } = this.state;
        // this.setState({ 
        //     data: [...this.state.data, {name}],
        // });
        fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, aMark, mMark, fMark }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error.message || res.error });
            else this.setState({ name: '', aMark: '', mMark: '', fMark: '', error: null, redirect: true });
        });
    }

    submitUpdatedStudent = () => {
        const { name, aMark, mMark, fMark, updateId } = this.state;
        // const studentId = this.props.studentId;
        fetch(`/api/students/${updateId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, aMark, mMark, fMark }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error.message || res.error });
            else this.setState({ name: '', aMark: '', mMark: '', fMark: '', updateId: null, redirect: true });
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/student/' />
        }
    }

    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentDidMount() {
        if (!this.isEmpty(this.props)) {
            // console.log(this.isEmpty(this.props));
            // GET student's info
            fetch(`/api/students/${this.props.studentId}`, { method: 'GET' })
                .then(res => res.json()).then((res) => {
                    // console.log(this.props);
                    if (!res.success) this.setState({ error: res.error });
                    else this.setState({ 
                        name: res.student.name,
                        aMark: res.student.aMark,
                        mMark: res.student.mMark,
                        fMark: res.student.fMark,
                        updateId: this.props.studentId
                    });
                });
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.renderRedirect()}
                    {/* {this.loadInfo()} */}
                    <StudentForm
                        name={this.state.name}
                        aMark={this.state.aMark}
                        mMark={this.state.mMark}
                        fMark={this.state.fMark}
                        handleChangeText={this.onChangeText}
                        handleSubmit={this.submitStudent}
                    />
                </div>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

export default StudentFormBox;