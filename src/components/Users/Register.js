import React from 'react'
import axios from 'axios'


class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://dct-ticket-master.herokuapp.com/users/register', formData)
            .then(response => {
                if(response.data.errors) {
                    console.log(response.data.message)
                } else {
                    this.props.history.push('/account/login')
                }
            })
            .catch(err => alert(err))
    }

    render() {
        return (
            <div>
                <h2> Register with us </h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">username</label>
                    <input type="text" value={this.state.username} onChange={this.handleChange} id="username" />
                    <br/>
                    <label htmlFor="email">email</label>
                    <input type="text" value={this.state.email} onChange={this.handleChange} id="email" />
                    <br/>
                    <label htmlFor="password">password</label>
                    <input type="password" value={this.state.password} onChange={this.handleChange} id="password" />
                    <br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}


export default Register