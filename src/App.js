import React, { Component } from 'react'
import BaseComponent from './components/BaseComponent'
import LoginComponent from "./components/LoginComponent";
import ResetPasswordComponent from './ResetPasswordComponent'

import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      resetPassword: true
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.goToLogin = this.goToLogin.bind(this)
    this.loadContent = this.loadContent(this)
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: "true"
    }, this.loadContent)
  }

  loadContent(){
    console.log("----------------")
    console.log(this.state.isLoggedIn)
    if (this.state.isLoggedIn == "true"){
      window.location = "/home"
    }
  }

  login = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  logout = () => {
    console.log("logout")
    this.setState({
      isLoggedIn: false
    })
  }

  goToLogin() {
    this.setState({
      resetPassword: false
    })
  }

  render() {
    return (
      <>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" exact component={LoginComponent}></Route>
              <Route path="/resetPassword" exact component={ResetPasswordComponent}></Route>
              <Route path="/home" exact component={BaseComponent}></Route>
            </Switch>
          </Layout>
        </Router>
      </>
    )
  }
}

// {!this.state.resetPassword ?
//   this.state.isLoggedIn
//     ?
//     <BaseComponent logout={this.logout}></BaseComponent>
//     :
//     <LoginComponent login={this.login}></LoginComponent>
//   :
//   <ResetPasswordComponent></ResetPasswordComponent>
// }

export default App