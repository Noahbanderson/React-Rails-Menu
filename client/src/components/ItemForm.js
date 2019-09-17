import React from 'react'
import {Form, Button} from 'semantic-ui-react'


class ItemForm extends React.Component {
  state={
    title: "",
    description: "", 
    price: 0,

  }

  componentDidMount() {
    if (this.props.item){
      const {title, description, price} = this.props.item
      this.setState({title, description, price})
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    if (this.props.editItem){
        this.props.editItem(this.props.item.id, this.state.title, this.state.description, this.state.price)
        this.props.toggleEdit()
    } else {
      this.props.addItem(this.state.title, this.state.description, this.state.price)
    }
    
    this.setState({title: "", description: "", price: 0})
  }


  render() {
    return (
      <Form onSubmit={() => this.handleSubmit()}>
        <Form.Group width="equal">
          <Form.Input 
            name="price" 
            title="Price"
            value={this.state.price}
            required
            type='number'
            onChange={this.handleChange}
          />

          <Form.Input
          name="title" 
          title="Title"
          value={this.state.title}
          required
          placeholder="New Menu Item Goes Here"
          onChange={this.handleChange}
          />

          <Form.Input
            name="description" 
            title="Description"
            value={this.state.description}
            required
            placeholder="New Menu Item DescriptionGoes Here"
            onChange={this.handleChange}
          />

           <Button type='submit'>Submit</Button>
        </Form.Group>
      </Form>
    )
  }
}
//number form!!

export default ItemForm 