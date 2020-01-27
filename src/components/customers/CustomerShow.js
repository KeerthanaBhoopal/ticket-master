import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class CustomerShow extends React.Component {
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
    }

    render() {
        return (
            <div>
                <h1>Customer</h1>
                {this.state.customer.name} - {this.state.customer.email} - {this.state.customer.mobile}
                <Link to={`customers/edit/${this.props.match.params.id}`}>Edit</Link>
                <br/>
                <Link to="">Back</Link>
            </div>
        )
    }
}

export default CustomerShow