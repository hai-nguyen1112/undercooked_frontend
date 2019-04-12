import React, {Component} from 'react'
import {Card, Image} from 'semantic-ui-react'
import Nav from './Nav'
import MainLogo from './MainLogo'

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
          Welcome blah blah blah
        </div>
        <div id="profile-page-user-holder">
          <Image src={this.props.user.avatar}/>
          <Card>
            <Card.Content>
              <Card.Header>Chef: {this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1)}</Card.Header>
              <Card.Description>Bio: {this.props.user.bio}</Card.Description>
            </Card.Content>
          </Card>
        </div>
      </div>
    )
  }
}

export default Profile
