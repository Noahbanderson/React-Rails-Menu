import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import MenuForm from './MenuForm'
import axios from 'axios'
import ItemList from './ItemList.js'
import ItemForm from './ItemForm.js'


class Menu extends React.Component {
    state = {
      items: [],
      editMenuToggle: false,
      showItems: false
    }

    componentDidMount() {
      axios.get(`/api/menus/${this.props.menu.id}/items`)
        .then(res => {
            this.setState({items: res.data})
        })
        .catch(err => {
            console.log(err)
        })   
    }

    addItem = (title, description, price) => {        
      axios.post(`/api/menus/${this.props.menu.id}/items`, {title, description, price})
      .then(res => {
        this.setState({items: [res.data, ...this.state.items]})
      })
      .catch(err => {
          console.log(err)
      })  

    }

    editItem = (id, title, description, price) => {
        debugger
        axios.put(`/api/menus/${this.props.menu.id}/items/${id}`, {id, title, description, price})
        .then(res => {
            this.setState({items: this.state.items.map(item => {
                if (item.id === res.data.id){
                  return res.data
                }
                return item
              })})
        })
        .catch(err => {
            console.log(err)
        })  
    }

    deleteItem = (id) => { 
      axios.delete(`/api/menus/${this.props.menu.id}/items/${id}`)
        .then(res => {
          this.setState({items: this.state.items.filter(item => item.id !== id)})
        })
        .catch(err => {
          console.log(err)
        })  
    }

    toggleMenu = () => {
      this.setState({ editMenuToggle: !this.state.editMenuToggle })
    }

    toggleItems = () => {
      this.setState({ showItems: !this.state.showItems })
      
    }

    render() {
      return (
        <div>
          {this.state.editMenuToggle ?
            <MenuForm menu={this.props.menu} editMenu={this.props.editMenu} toggleMenu={this.toggleMenu} />
            :
            <Header as="h3">
              {this.props.menu.title}
            </Header>
          }


          {this.state.showItems ?
            <>
              <ItemForm addItem={this.addItem}/>
              <ItemList items={this.state.items} editItem={this.editItem} deleteItem={this.deleteItem}/>
            </>
            :
             ""
          }
          <br />
          <div>
             <Button color="green" size="tiny" onClick={this.toggleItems}>View Items</Button>
             <Button color="blue" size="tiny" onClick={this.toggleMenu}>Edit</Button>
             <Button color="red" size="tiny" onClick={() => this.props.deleteMenu(this.props.menu.id)}>Delete</Button>
        </div>
        <br />
        <br />
        </div>
      )
    }
}

export default Menu