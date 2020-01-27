import React from 'react'
import axios from '../../config/axios'
import TicketForm from './TicketForm'

class TicketEdit extends React.Component{
    constructor() {
        super()
        this.state = {
            ticket: {}
        }
    }

    componentDidMount() {
        axios.get(`tickets/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const ticket = response.data
            this.setState({ticket})
        })
        .catch(error => alert(error))
    }

    handleSubmit = (formData) => {
        axios.put(`tickets/${this.props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(() => {
            this.props.history.push('/tickets')
        })
    }

    render() {
        return (
            <div>
                <h1>Edit Ticket</h1>
                {this.state.ticket.code ? <TicketForm handleSubmit={this.handleSubmit} {...this.state.ticket}/> : ''}
            </div>
        )
    }
}

export default TicketEdit