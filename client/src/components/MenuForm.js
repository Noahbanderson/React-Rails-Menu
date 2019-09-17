import React from 'react'
import { Form } from 'semantic-ui-react'

class MenuForm extends React.Component {
    state = {
        title: ""
    }

    componentDidMount() {
        if (this.props.menu){    
            this.setState({title: this.props.menu.title})
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.props.editMenu ){
            this.props.editMenu(this.state.title, this.props.menu.id)
            this.props.toggleMenu()
        } else {
            this.props.addMenu(this.state.title)
            this.setState({ title: "" })
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    name="title"
                    title="Menu Title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder={"New Menu Title Goes Here"}
                    required
                />
            </Form>
        )
    }
}


export default MenuForm