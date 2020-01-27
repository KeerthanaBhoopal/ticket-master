import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './DepartmentForm'
import {Link} from 'react-router-dom'

class DepartmentList extends React.Component {
    constructor() {
        super()
        this.state = {
            departments: [],
            // deptName: ''
        }
    }

    componentDidMount() {
        axios.get('/departments/', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const departments = response.data
            this.setState({departments})
        })
    }

    handleChange = (e) => {
        this.setState({deptName: e.target.value})
    }

    handleSubmit = (formData) => {
        // e.preventDefault()
        // const formData = {
        //     name: this.state.deptName
        // }
        // console.log(formData)
        axios.post('/departments', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response)
            // window.location.reload()
            this.setState(prevState => {
                const departments = [...prevState.departments, response.data]
                // return {departments, deptName: ''}
                return {departments}
            })
        })
    }

    handleRemove = (dept) => {
        axios.delete(`/departments/${dept}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if (response.data.errors) {
                alert(response.data.message)
            } else {
                // window.location.reload()
                this.setState(prevState => {
                    const departments = prevState.departments.filter(department => department._id !== response.data._id)  
                    return ({departments, deptName: ''})
                })
            }
        })
    }

    handleSubmit = (formData) => {
        axios.post('/departments/', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            this.setState(prevState => ({
                departments: prevState.departments.concat(department)
            }))
        })
        .catch(error => alert(error))
    }


    render() {
        return (
            <div>
                <h1>Departments - {this.state.departments.length}</h1>
                <ul>
                    {
                        this.state.departments.map(department => {
                            return (
                                <li key={department._id}>
                                    <Link to={`/departments/${department._id}`}>{department.name} - </Link>
                                    <button onClick={() => {this.handleRemove(department._id)}}>Remove</button>
                                </li>
                            )                    
                        })
                    }
                </ul>
                <h1>Add Department</h1>
                {/* should I add this to a seperate component? Since it's not reusable and it's a tiny bit of code, should be ok? maybe?*/}
                {/* <form onSubmit={this.handleSubmit}>
                    <input type = "text" value = {this.state.deptName} onChange={this.handleChange}/>
                    <button> Add </button>
                </form> */}
                <DepartmentForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default DepartmentList