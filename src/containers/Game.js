import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Game extends Component {
  render() {
    return (
      <div className="container" id="game-container">
        <div className="item" id="avatar-holder"><img id="game-avatar" alt="avatar" style={{width: "100px", height: "100px", "border-radius": "4px"}} src={this.props.user.avatar}/></div>
        <div className="item" id="orders-holder"><img alt="order" src={this.props.level.recipes[0].image}/></div>
        <div className="item" id="trash-holder">Trash can</div>
        <div className="item" id="serve-holder"><button>Serve Button</button></div>
        <div className="item" id="washer-holder">Dish washer</div>
        <div className="item" id="tips-holder">Tips: $100</div>
        <div className="item" id="clock-holder">Clock countdown: 90 seconds</div>
        <div className="item" id="ingredients-holder">List of ingredients</div>
        <div className="item" id="cookspace-holder">Cook space</div>
        <div className="item" id="tools-holder">List of tools</div>
        <div className="item" id="controlpanel-holder">User control panel</div>
      </div>
    )
  }
}

export default withRouter(Game)
