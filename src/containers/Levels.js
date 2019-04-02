import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Nav from '../components/Nav'

class Levels extends Component {
  render() {
    return (
      <div className="levels">
        <Nav user={this.props.user} handleUpdateUserState={this.props.handleUpdateUserState}/>
        <h1>Please choose a level to play</h1>
      </div>
    )
  }
}

export default withRouter(Levels)
