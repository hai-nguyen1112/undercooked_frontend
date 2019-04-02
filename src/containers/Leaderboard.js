import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Nav from '../components/Nav'

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard">
        <Nav user={this.props.user} handleUpdateUserState={this.props.handleUpdateUserState}/>
        <h1>This is the leaderboard</h1>
      </div>
    )
  }
}

export default withRouter(Leaderboard)
