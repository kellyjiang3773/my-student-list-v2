import React, { Component } from 'react';
// import 'whatwg-fetch';
// import StudentList from './StudentList';
import StudentForm from './StudentForm';

class StudentFormBox extends Component {
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
    }

    onChangeText = (e) => {
        const newState = { ...this.state };
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    onUpdateStudent = (id) => {
        const oldStudent = this.state.data.find(c => c._id === id);
        if (!oldStudent) return;
        this.setState({
            name: oldStudent.name,
            aMark: oldStudent.aMark,
            mMark: oldStudent.mMark,
            fMark: oldStudent.fMark,
            updateId: id
        });
    }

    onDeleteStudent = (id) => {
        const i = this.state.data.findIndex(c => c._id === id);
        const data = [
            ...this.state.data.slice(0, i),
            ...this.state.data.slice(i + 1),
        ];
        this.setState({ data });
        fetch(`api/students/${id}`, { method: 'DELETE' })
            .then(res => res.json()).then((res) => {
                if (!res.success) this.setState({ error: res.error });
            });
    }

    submitStudent = (e) => {
        e.preventDefault();
        const { name, updateId } = this.state;
        if (!name) return;
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
            else this.setState({ name: '', aMark: '',mMark: '',fMark: '', error: null });
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
            else this.setState({ name: '', aMark: '',mMark: '',fMark: '', updateId: null });
        });
    }

    render() {
        return (
            <div>
                <div>
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