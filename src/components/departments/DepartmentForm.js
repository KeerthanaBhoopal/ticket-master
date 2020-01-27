import React from 'react'

class DepartmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name? this.props.name : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                    <input type = "text" name="name" value = {this.state.name} onChange={this.handleChange}/>
                    <input type="submit" />
            </form>
        )
    }
}

export default DepartmentForm