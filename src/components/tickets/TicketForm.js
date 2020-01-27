import React from 'react'
import axios from 'axios'
// import axios from '../../config/axios'

class TicketForm extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            code: this.props.code ? this.props.code : '',
            customers: [],
            departments: [],
            employees: [],
            customer: this.props.customer? this.props.customer: '',
            department: this.props.department? this.props.department: '',
            employee: [],
            message: this.props.message? this.props.message: '',
            priority: this.props.priority ? this.props.priority : ''
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('http://dct-ticket-master.herokuapp.com/customers', {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            }),
            axios.get('http://dct-ticket-master.herokuapp.com/departments', {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
        ])
        .then(axios.spread((customer, dept) => {
            this.setState({customers: customer.data, departments: dept.data})
        }))
        .catch(err => alert(err))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        // const selectoptions = [...event.target.options].filter(o => o.selected).map(o => o.value)
    }

    handleDeptChange = (e) => {
        const department = e.target.value
        this.setState({department})
        axios.get('http://dct-ticket-master.herokuapp.com/employees?', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const employees = response.data.filter(emp => emp.department._id === department)
            this.setState({employees})
        })
    }

    handleMultiSelect = (e) => {
        const employee=[]
        for (let val of e.target.selectedOptions) {
            employee.push({_id: val.value})
        }
        console.log(employee)
        this.setState({employee})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData={
            code: this.state.code,
            message: this.state.message,
            priority: this.state.priority,
            department: this.state.department,
            employees: this.state.employee,
            customer: this.state.customer
        }
        // console.log(formData)
        this.props.handleSubmit(formData)
    }

    render() {
        console.log(this.props.priority)
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="code">Code</label>
                <input type="text" name="code" id="code" value={this.state.code} onChange={this.handleChange} />
                
                
                <br/>
                <label htmlFor="customer">Customer </label>
                <select name="customer" id="customer" value={this.state.customer} onChange={this.handleChange}>
                    <option>select</option>
                    {
                        this.state.customers.map(customer => {
                            return <option key={customer._id} value={customer._id}>{customer.name}</option>
                        })
                    }

                </select>
                
                
                <br/>
                <label htmlFor="department">Department</label>
                <select name="department" id="department" value={this.state.department} onChange={this.handleDeptChange}>
                    <option>select</option>
                    {
                        this.state.departments.map(department => {
                            return <option key={department._id} value={department._id}>{department.name}</option>
                        })
                    }

                </select>
                <br/>
                

                <label htmlFor="employee">Employee </label>
                <select multiple={true} name="employee" id="employee" onChange={this.handleMultiSelect}>
                    <option>select</option>
                    {
                        this.state.employees.map(employee => {
                            return <option key={employee._id} value={employee._id}>{employee.name}</option>
                        })
                    }
                </select>
                
                <br/>
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" value={this.state.message} onChange={this.handleChange} />
                
                
                <br/>
                Priority: <br/>
                <input type="radio" name="priority" id="high" value="high" checked={this.state.priority === "high"? true : false} onChange={this.handleChange} />
                <label htmlFor="high">High</label><br/>
                
                <input type="radio" name="priority" id="medium" value="medium" checked={this.state.priority === "medium"? true : false} onChange={this.handleChange} />
                <label htmlFor="medium">Medium</label><br/>
                
                <input type="radio" name="priority" id="low" value="low" checked={this.state.priority === "low"? true : false} onChange={this.handleChange} />
                <label htmlFor="low">Low</label><br/>

                
                <input type="submit" value="add ticket" />
            </form>
        )
    }
}

export default TicketForm