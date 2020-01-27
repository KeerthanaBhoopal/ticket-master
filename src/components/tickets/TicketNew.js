import React from 'react'
import axios from '../../config/axios'
import TicketForm from './TicketForm'

class TicketNew extends React.Component{
   
    handleSubmit = (formData) => {
        axios.post('/tickets/', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response)
            this.props.history.push('/tickets')
        })
        .catch(err => alert(err))
    }

    render() {
        return (
            <div>
                <h1>Add a ticket</h1>
                <TicketForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default TicketNew