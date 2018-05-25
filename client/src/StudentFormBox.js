import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import StudentForm from './StudentForm';

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
        // console.log(newState[e.target.name]);
        this.setState(newState);
    }

    submitStudent = (e) => {
        e.preventDefault();
        const { name, /*fMark,*/ updateId } = this.state;
        // console.log(fMark);
        if (!name) return;
        if (updateId) {
            this.submitUpdatedStudent();
        } else {
            this.submitNewStudent();
        }
    }

    submitNewStudent = () => {
        const { name, aMark, mMark, fMark } = this.state;
        fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, aMark, mMark, fMark }),
        }).then(res => res.json()).then((res) => {
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

    // noBlanks = (mark) => {
    //     if (mark==='') {
    //         mark = 'N/A';
    //     }
    // }

    submitUpdatedStudent = () => {
        
        if (this.state.aMark==='') {
            this.state.aMark = 'N/A';
        }
        if (this.state.mMark==='') {
            this.state.mMark = 'N/A';
        }
        if (this.state.fMark==='') {
            this.state.fMark = 'N/A';
        }

        const { name, aMark, mMark, fMark, updateId } = this.state;
        console.log(fMark);
        
        fetch(`/api/students/${updateId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                // 'Content-Length': 0 
            },
            body: JSON.stringify({ name, aMark, mMark, fMark }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error.message || res.error });
            else {
                console.log(fMark);
                // console.log(JSON.stringify(fMark));
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
            return <Redirect to={'/student/'+this.state.tempId} />
        }
    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentDidMount() {
        if (!this.isEmpty(this.props)) {
            // GET student's info
            fetch(`/api/students/${this.props.studentId}`, { method: 'GET' })
                .then(res => res.json()).then((res) => {
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
                    {console.log(this.state.fMark)}
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