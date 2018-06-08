import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Student from './Student';
import { GETstudent, DELETEstudent } from '../api/user';
import 'whatwg-fetch';

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

    componentWillMount() {
        // fetch(`/api/students/${this.props.studentId}`)
        // fetch(`/student_list/${this.props.studentId}`)
        GETstudent(this.props.studentId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    name: res.student.name,
                    aMark: res.student.aMark,
                    mMark: res.student.mMark,
                    fMark: res.student.fMark
                });
            });
    }

    onUpdateStudent = (id) => {
        this.setState({ updateId: id });
    }

    onDeleteStudent = (id) => {
        // fetch(`/api/students/${id}`, { method: 'DELETE' })
        // fetch(`/student_list/${id}`, { method: 'DELETE' })
        DELETEstudent(id)
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

    renderUpdate = () => {
        if (this.state.updateId) {
            return <Redirect to={{
                // go to update page, send id
                pathname: '/update/:studentId',
                state: { updateId: this.state.updateId }
            }} />
        }
    }

    render() {
        return (
            <div>
                {this.renderUpdate()}
                {this.renderRedirect()}
                <Student
                    id={this.props.studentId}
                    name={this.state.name}
                    aMark={this.state.aMark}
                    mMark={this.state.mMark}
                    fMark={this.state.fMark}
                    handleDeleteStudent={this.onDeleteStudent}
                    handleUpdateStudent={this.onUpdateStudent}
                />
            </div>
        )
    }
}

export default StudentBox;