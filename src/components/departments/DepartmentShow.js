import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './DepartmentForm'

class DepartmentShow extends React.Component{
    constructor() {
        super()
        this.state = {
            department: {},
            edit: false
        }
    }

    componentDidMount() {
        axios.get(`/departments/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response)
            const department = response.data
            this.setState({department})
        })
    }

    handleEdit = () => {
        this.setState({edit: true})
    }

    handleSubmit = (formData) => {
        axios.put(`/departments/${this.props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            this.setState({department, edit: false})
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Name - {this.state.department.name}</h1>    
                <button onClick={this.handleEdit}>Edit</button>
                {this.state.edit ? <DepartmentForm handleSubmit = {this.handleSubmit} name = {this.state.department.name}/> : ''}
            </div>
        )
    }
}

export default DepartmentShow