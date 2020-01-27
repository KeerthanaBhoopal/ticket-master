import React from 'react'
import axios from '../../config/axios'
import CustomerForm from './Form'

class CustomerEdit extends React.Component {

    constructor() {
        super()
        this.state = {
            customer: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const customer = response.data
            this.setState({customer})
        })
        .catch(err => alert(err))
    }

    
    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        axios.put(`/customers/${id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(() => {
            this.props.history.push('/customers')
        })
    }


    render() {
        return (
            <div>
                <h2>Edit Customer</h2>
                {this.state.customer.name && <CustomerForm handleSubmit = {this.handleSubmit} {...this.state.customer} /> }
            </div>
        )
    }
}

export default CustomerEdit