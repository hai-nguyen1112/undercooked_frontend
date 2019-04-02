import React, {Component} from 'react'
import './App.css'
import {Route, Redirect, Switch, withRouter} from 'react-router-dom'
import LoginForm from './containers/LoginForm'
import Profile from './components/Profile'
import {isEmpty} from 'lodash'
import Rules from './components/Rules'
import Leaderboard from './containers/Leaderboard'
import Levels from './containers/Levels'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  handleUpdateUserState = user => {
    this.setState({user: user})
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      fetch(`http://localhost:3000/api/v1/profile`, {
        headers: {
          "Authentication": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(user => {
        this.setState({user: user})
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile"/>}/>
          <Route exact path="/profile" render={() => {
              return isEmpty(this.state.user) ? <Redirect to="/login"/> : <Profile user={this.state.user} handleUpdateUserState={this.handleUpdateUserState}/>
            }}/>
          <Route exact path="/login" render={() => {
              return isEmpty(this.state.user) ? <LoginForm handleUpdateUserState={this.handleUpdateUserState}/> : <Redirect to="/profile"/>
            }}/>
          <Route exact path="/rules" render={() => {
              return isEmpty(this.state.user) ? <Redirect to="/login"/> : <Rules user={this.state.user} handleUpdateUserState={this.handleUpdateUserState}/>
            }}/>
          <Route exact path="/leaderboard" render={() => {
              return isEmpty(this.state.user) ? <Redirect to="/login"/> : <Leaderboard user={this.state.user} handleUpdateUserState={this.handleUpdateUserState}/>
            }}/>
          <Route exact path="/levels" render={() => {
              return isEmpty(this.state.user) ? <Redirect to="/login"/> : <Levels user={this.state.user} handleUpdateUserState={this.handleUpdateUserState}/>
            }}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
