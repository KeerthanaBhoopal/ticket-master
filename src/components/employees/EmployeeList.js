import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class EmployeeList extends React.Component{
    constructor() {
        super()
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get('/employees/', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const employees = response.data
            this.setState({employees})
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Employees - {this.state.employees.length}</h1>
                <ul>
                    {
                        this.state.employees.map(employee => {
                            return <li key={employee._id}>{employee.name} - {employee.department.name} - <Link to={`/employees/${employee._id}`}>Show</Link></li>
                        })
                    }
                </ul>
                <Link to="/employees/new">Add an Employee</Link>
            </div>
        )
    }
}

export default EmployeeList