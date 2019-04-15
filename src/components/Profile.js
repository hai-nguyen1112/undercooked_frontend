import React, {Component} from 'react'
import {Image, List} from 'semantic-ui-react'
import Nav from './Nav'
import MainLogo from './MainLogo'
import {withRouter, Link} from 'react-router-dom'

class Profile extends Component {
  render() {
    return (
      <div className="profile" id="profile-page">
        <div id="profile-page-logo-holder">
          <MainLogo />
        </div>
        <div id="profile-page-navbar-holder">
          <Nav user={this.props.user} handleUpdateUserState={this.props.handleUpdateUserState}/>
        </div>
        <div id="profile-page-welcome-holder">
          <div id="profile-page-welcome-masterchef-avatar">
            <Image
              alt=""
              className="master-avatar shake-master"
              src="https://i.ibb.co/2FkSrQx/male-cook.png"
              style={{width: "100px", height: "100px", borderRadius: "4px"}}
            />
          </div>
          <div id="profile-page-welcome-message-holder">
            <div id="profile-page-welcome-message">
              <div id="welcome-message">Welcome {this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1)}! I am the owner of the <strong>underCooked!</strong> kitchen.
              If this is your first time here, please take a look at <Link to="/rules" style={{fontWeight: "700", color: 'red', textDecoration: 'underline red'}}> game instructions</Link> before playing.
              </div>
            </div>
          </div>
        </div>
        <div id="profile-page-user-holder">
          <div id="profile-page-user-holder-inner">
            <div className="item" id="profile-useravatar">
              <Image alt="" src={this.props.user.avatar} style={{width: "150px", borderRadius: "6px"}}/>
            </div>
            <div className="item" id="profile-userstats">
              <List>
                <List.Item>
                  <List.Icon name='user' color='red'/>
                  <List.Content>{this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1)}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='pencil alternate' color="red"/>
                  <List.Content>{this.props.user.bio}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><strong style={{color: "red"}}>Games Played</strong> {this.props.user.games_played}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><strong style={{color: "red"}}>Best Score</strong> {this.props.user.highest_score}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><strong style={{color: "red"}}>Wins</strong> {this.props.user.wins}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><strong style={{color: "red"}}>Losses</strong> {this.props.user.losses}</List.Content>
                </List.Item>
              </List>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Profile)
