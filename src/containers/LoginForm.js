import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {Button, Form, Message} from 'semantic-ui-react'
import MainLogo from '../components/MainLogo'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      failedLoginMessage: undefined
    }
  }

  handleChange = (e, {name, value}) => {
    this.setState({[name]: value})
  }

  handleLoginSubmit = () => {
    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          //Pass the logged in user to App through handleUpdateUserState
          this.props.handleUpdateUserState(data.user)
          //Store the token in localStorage
          localStorage.setItem("token", data.token)
        } else {
          this.setState({failedLoginMessage: "Wrong username and/or password."})
        }
      })
  }

  render() {
    return (
      <div className="login" id="login-page">
        <div id="login-page-mainlogo-holder">
          <MainLogo />
        </div>
        <div id="login-page-loginform-holder">
            <div id="login-form-login-form">
              <div id="login-page-login-name">
                Login
              </div>
              <Form size="tiny" onSubmit={this.handleLoginSubmit} error style={{width: "300px", textAlign: "left"}}>
                <Form.Input
                  type="text"
                  label="Username"
                  placeholder="Enter username..."
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                />
                <Form.Input
                  type="password"
                  label="Password"
                  placeholder="Enter password..."
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
                {this.state.failedLoginMessage === undefined
                  ?
                  null
                  :
                  <Message
                    error
                    header='Action Forbidden'
                    content={this.state.failedLoginMessage}
                  />
                }
                <Button size="tiny" type="submit">Submit</Button>
              </Form>
            </div>
        </div>
        <div id="login-page-signuplink-holder">
          <div id="login-page-signuplink-holder-inner">
            <Link to="/signup"><Button style={{color: "red"}}>Create New Account</Button></Link>
          </div>
        </div>
        <div id="login-page-botaccount-holder">
          <div id="login-page-botaccount-holder-inner">
            If you don't want to create a new account, use the Bot account to log in.
          <br />
            <strong>Username</strong> bot
          <br />
            <strong>Password</strong> 123456
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm)
