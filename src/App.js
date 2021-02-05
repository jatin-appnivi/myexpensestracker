import React, { Component } from 'react'
import BaseComponent from './components/BaseComponent'
import LoginComponent from "./components/LoginComponent";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login = ()=>{
    this.setState({
      isLoggedIn: true
    })
  }

  logout = ()=>{
    console.log("logout")
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    return (
      <>
        {this.state.isLoggedIn 
          ?
          <BaseComponent logout={this.logout}></BaseComponent>
          :
          <LoginComponent login={this.login}></LoginComponent>
        }
      </>
    )
  }
}

export default App