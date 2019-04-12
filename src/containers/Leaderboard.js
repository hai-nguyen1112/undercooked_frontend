import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Nav from '../components/Nav'
import {Table, Image, Header} from 'semantic-ui-react'

class Leaderboard extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/')
    .then(res => res.json())
    .then(users => {
      this.setState({users: users})
      console.log(this.state.users)
    })
  }

  render() {
    let users = this.state.users
    let rows = users.map(user => (
      <Table.Row>
        <Table.Cell>{users.indexOf(user) + 1}</Table.Cell>
        <Table.Cell>
          <Header as='h3' image>
            <Image src={user.avatar} rounded style={{width: "100px"}}/>
            <Header.Content>
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              <Header.Subheader>{user.bio}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{user.games_played}</Table.Cell>
        <Table.Cell>{user.wins}</Table.Cell>
        <Table.Cell>{user.losses}</Table.Cell>
        <Table.Cell>{user.highest_score}</Table.Cell>
      </Table.Row>
    ))
    return (
      <div className="leaderboard" id="leaderboard">
        <div id="leaderboard-logo-holder">
          <Image src="https://i.ibb.co/JB1JfYb/logo-main1.png" style={{height: "160px"}}/>
        </div>
        <div id="leaderboard-navbar-holder">
          <Nav user={this.props.user} handleUpdateUserState={this.props.handleUpdateUserState}/>
        </div>
        <div id="leaderboard-leaderboard-holder">
          Leaderboard
        </div>
        <div id="leaderboard-filter-sort-holder">
        </div>
        <div id="leaderboard-table-holder">
          <Table width={"60%"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>Rank</Table.HeaderCell>
                <Table.HeaderCell width={10}>Player</Table.HeaderCell>
                <Table.HeaderCell width={1}>Games</Table.HeaderCell>
                <Table.HeaderCell width={1}>Wins</Table.HeaderCell>
                <Table.HeaderCell width={1}>Losses</Table.HeaderCell>
                <Table.HeaderCell width={2}>Best Score</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {rows}
            </Table.Body>
          </Table>
        </div>

      </div>
    )
  }
}

export default withRouter(Leaderboard)
