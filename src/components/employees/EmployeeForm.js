import React from 'react'
import axios from '../../config/axios'

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name? this.props.name : '',
            email: this.props.email? this.props.email : '',
            mobile: this.props.mobile ? this.props.mobile : '',
            department: this.props.department ? this.props.department._id : '',
            departments: []
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
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department,
        }
        this.props.handleSubmit(formData)
    }

    render() {
        console.log('props', this.props)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name </label>
                    <input type="text" name="name" value = {this.state.name} id="name" onChange = {this.handleChange}></input>
                    <br />

                    <label htmlFor="email">Email </label>
                    <input type="text" name="email" value = {this.state.email} id="email" onChange = {this.handleChange}></input>
                    <br />

                    <label htmlFor="mobile">mobile </label>
                    <input type="text" name="mobile" value = {this.state.mobile} id="mobile" onChange = {this.handleChange}></input>
                    <br />

                    <label>Department</label>
                    <select name="department" value={this.state.department} onChange={this.handleChange}>
                        <option></option>
                        {
                            this.state.departments.map(department => {
                                return (
                                    <option key={department._id} value={department._id}>{department.name}</option>
                                )
                            })
                        }
                    </select>

                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default EmployeeForm