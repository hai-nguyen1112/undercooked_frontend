import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Game1 extends Component {
  render() {
    return (
      <div>
        {this.props.user.username}
        {this.props.level.logo}
      </div>
    )
  }
}

export default withRouter(Game1)
