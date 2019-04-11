import React, {Component} from 'react'
import Popup from 'reactjs-popup'
import {withRouter, Link} from 'react-router-dom'
import {Image, Icon, Button, List} from 'semantic-ui-react'

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
          <div className="header">{this.props.tips >= this.props.level.qualified_points ? "You Won!" : "You Lost!"}</div>
          <div className="content" id="endgame-content">
            <div className="item" id="endgame-useravatar">
              <Image alt="" src={this.props.user.avatar} style={{borderRadius: "8px", border: "3px solid teal"}}/>
            </div>
            <div id="endgame-gap1"></div>
            <div className="item" id="endgame-userstats">
              <List>
                <List.Item>
                  <List.Icon name='user' />
                  <List.Content>{this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1)}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='pencil alternate' />
                  <List.Content>{this.props.user.bio}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><strong>Game Level</strong> {this.props.level.id}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><strong>Tips Needed To Win</strong> ${this.props.level.qualified_points}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><strong>Your Tips</strong> ${this.props.tips}</List.Content>
                </List.Item>
              </List>
            </div>
            <div id="endgame-gap2"></div>
            <div className="item" id="endgame-master">
              <div className="item shake-master" id="endgame-master-image">
                <Image
                  alt=""
                  className="master-avatar"
                  src="https://i.ibb.co/2FkSrQx/male-cook.png"
                  style={{width: "100px", height: "100px", borderRadius: "4px"}}
                />
              </div>
              <div className="item" id="endgame-master-speech">
                {
                  this.props.tips >= this.props.level.qualified_points
                  ?
                  "Great Job!"
                  :
                  "You are fired!"
                }
              </div>
            </div>
          </div>
          <div className="actions">
            <Link to="/levels"><Button inverted className="button">Try Other Levels</Button></Link>
            <Link to="/profile"><Button inverted className="button">Back to Profile</Button></Link>
            <Button inverted onClick={this.logout}>Logout</Button>
          </div>
        </div>
      )}
      </Popup>
    )
  }
}

export default withRouter(EndGamePopUp)
