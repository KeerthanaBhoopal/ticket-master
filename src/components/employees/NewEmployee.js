import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './EmployeeForm'

class NewEmployee extends React.Component {

    handleSubmit = (formData) => {
        axios.post('/employees/', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if (response.data.errors) {
                alert(response.data.message)
            } else { 
                this.props.history.push('/employees')
            }
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Add Employee</h1>
                <EmployeeForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default NewEmployee