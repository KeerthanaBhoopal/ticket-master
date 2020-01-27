import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class EmployeeShow extends React.Component {
    constructor() {
        super()
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
            this.setState({employee})
        })
        .catch(err => alert(err))
    }

    render() {
        return (
            <div>
                <h1>Employee - {this.state.employee.name}</h1>
                {this.state.employee.department? this.state.employee.department.name : ''}
                <br/>
                <Link to={`/employees/edit/${this.state.employee._id}`}>Edit</Link>
            </div>
        )
    }
}

export default EmployeeShow