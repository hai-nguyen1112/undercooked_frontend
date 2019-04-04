import React, {Component} from 'react'
import {Card, Image} from 'semantic-ui-react'
import Nav from './Nav'

class Profile extends Component {
  render() {
    return (
      <div>
        <Nav user={this.props.user} handleUpdateUserState={this.props.handleUpdateUserState}/>
          <Image src={this.props.user.avatar}/>
          <Card>
          <Card.Content>
            <Card.Header>Chef: {this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1)}</Card.Header>
            <Card.Description>Bio: {this.props.user.bio}</Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default Profile
