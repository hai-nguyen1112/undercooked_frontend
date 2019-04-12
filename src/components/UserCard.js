import React from 'react'
import {withRouter} from 'react-router-dom'
import {Card, Image, List, Icon} from 'semantic-ui-react'

const UserCard = props => {
  return (
    <Card>
      <Image src={props.user.avatar}/>
      <Card.Content>
        <Card.Header><Icon name="user"/> {props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}</Card.Header>
        <Card.Meta>
          <span className='date'><Icon name='pencil alternate'/> {props.user.bio}</span>
        </Card.Meta>
        <Card.Description>
          <List>
            <List.Item><strong>Games</strong> {props.user.games_played}</List.Item>
            <List.Item><strong>Wins</strong> {props.user.wins}</List.Item>
            <List.Item><strong>Losses</strong> {props.user.losses}</List.Item>
            <List.Item><strong>Highest Score</strong> {props.user.highest_score}</List.Item>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default withRouter(UserCard)
