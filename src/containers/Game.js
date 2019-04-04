import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Game extends Component {
  render() {
    return (
      <div className="container" id="game-container">
        <div className="item" id="avatar-holder"></div>
        <div className="item" id="orders-holder"></div>
        <div className="item" id="serve-holder"></div>
        <div className="item" id="trash-holder"></div>
        <div className="item" id="washer-holder"></div>
        <div className="item" id="tips-holder"></div>
        <div className="item" id="clock-holder"></div>
        <div className="item" id="ingredients-holder"></div>
        <div className="item" id="cookspace-holder"></div>
        <div className="item" id="tools-holder"></div>
        <div className="item" id="controlpanel-holder">Hi there!</div>
      </div>
    )
  }
}

export default withRouter(Game)
