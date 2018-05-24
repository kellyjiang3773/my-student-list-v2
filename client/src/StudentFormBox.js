import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import StudentForm from './StudentForm';

class StudentFormBox extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            data: [],
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

    // onUpdateStudent = (id) => {
    //     const oldStudent = this.state.data.find(c => c._id === id);
    //     if (!oldStudent) return;
    //     this.setState({
    //         name: oldStudent.name,
    //         aMark: oldStudent.aMark,
    //         mMark: oldStudent.mMark,
    //         fMark: oldStudent.fMark,
    //         updateId: id
    //     });
    // }

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
/////////////////////////////// REDIRECT
    submitNewStudent = () => {
        const { name, aMark, mMark, fMark } = this.state;
        this.setState({ 
            data: [...this.state.data, {name}],
        });
        fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, aMark, mMark, fMark }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error.message || res.error });
            else this.setState({ name: '', aMark: '',mMark: '',fMark: '', error: null, redirect: true });
        });
    }

    submitUpdatedStudent = () => {
        const { name, aMark, mMark, fMark, updateId } = this.state;
        fetch(`/api/students/${updateId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, aMark, mMark, fMark }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error.message || res.error });
            else this.setState({ name: '', aMark: '',mMark: '',fMark: '', updateId: null, redirect: true });
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/student/' />
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