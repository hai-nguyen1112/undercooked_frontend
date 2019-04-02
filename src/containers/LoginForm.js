import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Button, Form, Segment, Message} from 'semantic-ui-react'

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
      <Segment>
        <Form onSubmit={this.handleLoginSubmit}>
          {this.state.failedLoginMessage === undefined ? null : <Message header={this.state.failedLoginMessage}/>}
          <Form.Group widths='equal'>
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
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Segment>
    )
  }
}

export default withRouter(LoginForm)
