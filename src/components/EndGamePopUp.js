import React, {Component} from 'react'
import Popup from 'reactjs-popup'
import {withRouter, Link} from 'react-router-dom'

class EndGamePopUp extends Component {
  logout = () => {
    localStorage.removeItem('token')
    this.props.handleUpdateUserState({})
  }

  render() {
    return (
      <Popup
        open={this.props.open}
        closeOnDocumentClick={false}
        modal
      >
        {close => (
        <div className="modal">
          <div className="header">{this.props.tips >= this.props.level.qualified_points ? "You Won" : "You Lost"}</div>
          <div className="content">
            Chef: {this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1)}
            <br />
            Bio: {this.props.user.bio}
            <br />
            Game level: {this.props.level.id}
            <br />
            Tips needed to win: ${this.props.level.qualified_points}
            <br />
            Your tips: ${this.props.tips}
          </div>
          <div className="actions">
            <Link to="/levels"><button className="button">Try Other Levels</button></Link>
            <Link to="/profile"><button className="button">Back to Profile</button></Link>
            <button onClick={this.logout}>Logout</button>
          </div>
        </div>
      )}
      </Popup>
    )
  }
}

export default withRouter(EndGamePopUp)
