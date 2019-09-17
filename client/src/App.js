import React from 'react';
import { Container, Header } from 'semantic-ui-react'
import MenuList from './components/MenuList'
import axios from 'axios'
import MenuForm from './components/MenuForm'

class App extends React.Component {
  state={menus: [] }

  componentDidMount() {
    axios.get("/api/menus")
      .then(res => {
        this.setState({menus: res.data})
      })
      .catch(err => {
        console.log(err)
      })   
  }

  addMenu = (title) => {
    axios.post("/api/menus", {title})
      .then( res => {
        this.setState({menus: [res.data, ...this.state.menus]})
      })
      .catch( err => {
        console.log(err)
      })
  }

  editMenu = (title, id) => {
    
    axios.put(`/api/menus/${id}`, {id, title})
      .then( res => {
        this.setState({menus: this.state.menus.map(menu => {
          if (menu.id === res.data.id){
            return res.data
          }
          return menu
        })})
      })
      .catch( err => {
        console.log(err)
      })
  }

  deleteMenu = (id) => {
    axios.delete(`/api/menus/${id}`)
      .then( res => {
        this.setState({menus: this.state.menus.filter(menu => menu.id !== id)})
      })
      .catch( err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Container>
        <Header as="h1" style={{margin: "35px"}}>List of Menus and Their Items</Header>
        <hr />
        <br />
        <MenuForm addMenu={this.addMenu}/>
        <br />
        <MenuList menus={this.state.menus} editMenu={this.editMenu} deleteMenu={this.deleteMenu}/>
      </Container>
    )
  }
}

export default App;
