import React from 'react'


class CustomerForm extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            email: this.props.email? this.props.email : '',
            name: this.props.name? this.props.name : '',
            mobile: this.props.mobile? this.props.mobile : ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            name: this.state.name,
            mobile: this.state.mobile
        }

        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" value={this.state.name} onChange={this.handleChange} id="name" />
                    <br/>
                    <label htmlFor="email">Email</label>
                    <input type="text" value={this.state.email} onChange={this.handleChange} id="email" />
                    <br/>
                    <label htmlFor="mobile">mobile</label>
                    <input type="text" value={this.state.mobile} onChange={this.handleChange} id="mobile" />
                    <br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default CustomerForm