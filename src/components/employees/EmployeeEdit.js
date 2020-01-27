import React from 'react'
import EmployeeForm from './EmployeeForm'
import axios from '../../config/axios'

class EmployeeEdit extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            employee: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`employees/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const employee = response.data
            console.log(employee)
            this.setState({employee})
        })
        .catch(err => alert(err))
    }

    handleSubmit = (formData) => {
        axios.put(`/employees/${this.state.employee._id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(() => {
            this.props.history.push(`employees/${this.state.employee.id}`)
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                {this.state.employee.name? <EmployeeForm handleSubmit={this.handleSubmit} {...this.state.employee} /> : ''}
            </div>
        )
    }
}

export default EmployeeEdit