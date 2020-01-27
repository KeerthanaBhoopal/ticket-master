import React from 'react'
import axios from '../../config/axios'

class TicketShow extends React.Component {
    constructor() {
        super()
        this.state = {
            ticket: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const ticket = response.data
            this.setState({ticket})
        })
    }

    render() {
        return (
            <div>
                <h1>Ticket</h1>
                {this.state.ticket.code} - {this.state.ticket.message}<br/>
                <strong>employee IDS</strong><br/>
                {this.state.ticket.employees? this.state.ticket.employees.map((emp, i) => <span key={emp._id}>{i + 1}. {emp._id} <br/></span>) : ''}
            </div>
        )
    }
    
}

export default TicketShow