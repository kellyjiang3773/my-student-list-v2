import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import StudentForm from './StudentForm';
import { GETstudent, POSTstudent, PUTstudent } from '../api/user';

class StudentFormBox extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            error: null,
            name: '',
            aMark: '',
            mMark: '',
            fMark: '',
            tempId: ''
        };
    }

    onChangeText = (e) => {
        const newState = { ...this.state };
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    submitStudent = (e) => {
        e.preventDefault();
        const { name, /*fMark,*/ updateId } = this.state;
        if (!name) return;
        if (updateId) {
            this.submitUpdatedStudent();
        } else {
            this.submitNewStudent();
        }
    }

    submitNewStudent = () => {
        this.noBlanks();
        const { name, aMark, mMark, fMark } = this.state;
        // fetch('/api/students', {
        // fetch('/student_list/students', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, aMark, mMark, fMark }),
        // })
        POSTstudent({ name, aMark, mMark, fMark })
            .then(res => res.json()).then((res) => {
                if (!res.success) this.setState({ error: res.error.message || res.error });
                else {
                    this.setState({
                        name: '',
                        aMark: '',
                        mMark: '',
                        fMark: '',
                        error: null,
                        redirect: true,
                        tempId: res.tempId
                    });
                }
            });
    }

    noBlanks = () => {
        if (this.state.aMark === '') {
            this.state.aMark = 'N/A';
        }
        if (this.state.mMark === '') {
            this.state.mMark = 'N/A';
        }
        if (this.state.fMark === '') {
            this.state.fMark = 'N/A';
        }
        // this.setState({
        //     aMark: (this.state.aMark === '' ? 'N/A' : this.state.aMark),
        //     mMark: (this.state.mMark === '' ? 'N/A' : this.state.mMark),
        //     fMark: (this.state.fMark === '' ? 'N/A' : this.state.fMark)
        // });
    }

    submitUpdatedStudent = () => {
        this.noBlanks();
        const { name, aMark, mMark, fMark, updateId } = this.state;
        // fetch(`/api/students/${updateId}`, {
        // fetch(`/student_list/${updateId}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, aMark, mMark, fMark }),
        // })
        PUTstudent(updateId, { name, aMark, mMark, fMark })
            .then(res => res.json()).then((res) => {
                if (!res.success) this.setState({ error: res.error.message || res.error });
                else {
                    const tempId = updateId;
                    this.setState({
                        name: '',
                        aMark: '',
                        mMark: '',
                        fMark: '',
                        updateId: null,
                        redirect: true,
                        tempId: tempId
                    });
                }
            });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={'/student/' + this.state.tempId} />
        }
    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    // load info if this is an update
    componentDidMount() {
        if (!this.isEmpty(this.props)) {
            // GET student's info
            // fetch(`/api/students/${this.props.studentId}`, { method: 'GET' })
            // fetch(`/student_list/${this.props.studentId}`)
            GETstudent(this.props.studentId)
                .then(res => res.json()).then((res) => {
                    if (!res.success) this.setState({ error: res.error });
                    else this.setState({
                        name: res.student.name,
                        aMark: (res.student.aMark === 'N/A' ? '' : res.student.aMark),
                        mMark: (res.student.mMark === 'N/A' ? '' : res.student.mMark),
                        fMark: (res.student.fMark === 'N/A' ? '' : res.student.fMark),
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