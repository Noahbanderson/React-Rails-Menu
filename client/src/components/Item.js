import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import ItemForm from './ItemForm'

class Item extends React.Component {
  state={
    editItemToggle: false
  }

  toggleEdit = () => {
    this.setState({editItemToggle: !this.state.editItemToggle})
  }

  render() {
    return (
      <div>
        {this.state.editItemToggle ? 
        <ItemForm item={this.props.item} editItem={this.props.editItem} toggleEdit={this.toggleEdit}/> 
          :
        <div> 
          <Header style={{margin: "0px"}} as="h3">${this.props.item.price}: {this.props.item.title}</Header>
          <p>{this.props.item.description}</p> 
        </div>
        }
        
        <div>
          <Button size="mini" onClick={this.toggleEdit} color="blue">Edit</Button>
          <Button size="mini" onClick={() => this.props.deleteItem(this.props.item.id)} color="red">Delete</Button>
        </div>
          <br />
      </div>
    )
  }
}

export default Item