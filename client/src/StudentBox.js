import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Student from './Student';

class StudentBox extends Component {
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
        fetch(`/api/students/${this.props.studentId}`)
            .then(res => res.json()).then(res => {
                this.setState({
                    name: res.student.name,
                    aMark: res.student.aMark,
                    mMark: res.student.mMark,
                    fMark: res.student.fMark
                });
            });
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

    onDeleteStudent = (id) => {
        fetch(`/api/students/${id}`, { method: 'DELETE' })
            .then(res => res.json()).then((res) => {
                if (!res.success) this.setState({ error: res.error });
                else this.setState({ redirect: true });
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
                {this.renderRedirect()}
                <Student
                    id={this.props.studentId}
                    name={this.state.name}
                    aMark={this.state.aMark}
                    mMark={this.state.mMark}
                    fMark={this.state.fMark}
                    handleDeleteStudent={this.onDeleteStudent}
                />
            </div>
        )
    }
}

export default StudentBox;