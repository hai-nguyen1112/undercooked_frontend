import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Nav from '../components/Nav'
import {Table, Image, Header, Menu, Input} from 'semantic-ui-react'
import MainLogo from '../components/MainLogo'

class Leaderboard extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      activeSort: 'bestScore',
      filter: ""
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/')
    .then(res => res.json())
    .then(users => {
      this.setState({users: users.sort((a, b) => b.highest_score - a.highest_score)})
    })
  }

  handleFilterInput = e => {
    this.setState({filter: e.target.value})
  }

  handleSortClick = e => {
    if (e.target.innerText === 'Best Score') {
      this.setState({activeSort: 'bestScore'})
      this.setState({users: this.state.users.sort((a, b) => b.highest_score - a.highest_score)})
    }
    if (e.target.innerText === 'Most Games') {
      this.setState({activeSort: 'mostGames'})
      this.setState({users: this.state.users.sort((a, b) => b.games_played - a.games_played)})
    }
    if (e.target.innerText === 'Most Wins') {
      this.setState({activeSort: 'mostWins'})
      this.setState({users: this.state.users.sort((a, b) => b.wins - a.wins)})
    }
    if (e.target.innerText === 'Most Losses') {
      this.setState({activeSort: 'mostLosses'})
      this.setState({users: this.state.users.sort((a, b) => b.losses - a.losses)})
    }
  }

  render() {
    let filteredUsers = this.state.users.filter(user => user.username.includes(this.state.filter))
    let rows = filteredUsers.map(user => (
      <Table.Row key={user.username}>
        <Table.Cell>{filteredUsers.indexOf(user) + 1}</Table.Cell>
        <Table.Cell>
          <Header as='h3' image>
            <Image src={user.avatar} rounded style={{width: "100px"}}/>
            <Header.Content>
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              <Header.Subheader>{user.bio}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        {
          this.state.activeSort === 'mostGames'
          ?
          <Table.Cell error>{user.games_played}</Table.Cell>
          :
          <Table.Cell>{user.games_played}</Table.Cell>
        }
        {
          this.state.activeSort === 'mostWins'
          ?
          <Table.Cell error>{user.wins}</Table.Cell>
          :
          <Table.Cell>{user.wins}</Table.Cell>
        }
        {
          this.state.activeSort === 'mostLosses'
          ?
          <Table.Cell error>{user.losses}</Table.Cell>
          :
          <Table.Cell>{user.losses}</Table.Cell>
        }
        {
          this.state.activeSort === 'bestScore'
          ?
          <Table.Cell error>{user.highest_score}</Table.Cell>
          :
          <Table.Cell>{user.highest_score}</Table.Cell>
        }
      </Table.Row>
    ))
    let activeSort = this.state.activeSort
    return (
      <div className="leaderboard" id="leaderboard">
        <div id="leaderboard-logo-holder">
          <MainLogo />
        </div>
        <div id="leaderboard-navbar-holder">
          <Nav user={this.props.user} handleUpdateUserState={this.props.handleUpdateUserState}/>
        </div>
        <div id="leaderboard-leaderboard-holder">
          Leaderboard
        </div>
        <div id="leaderboard-filter-sort-holder">
          <Menu inverted color={"olive"}>
            <Menu.Item>
              <Input
                icon='users'
                iconPosition='left'
                placeholder='Filter Players By Name...'
                onChange={this.handleFilterInput}
              />
            </Menu.Item>
            <Menu.Item>
              <Menu text>
                <Menu.Item header id="sort-by-name">Sort By</Menu.Item>
                <Menu.Item
                  name='bestScore'
                  active={activeSort === 'bestScore'}
                  onClick={this.handleSortClick}
                />
                <Menu.Item
                  name='mostGames'
                  active={activeSort === 'mostGames'}
                  onClick={this.handleSortClick}
                />
                <Menu.Item
                  name='mostWins'
                  active={activeSort === 'mostWins'}
                  onClick={this.handleSortClick}
                />
                <Menu.Item
                  name='mostLosses'
                  active={activeSort === 'mostLosses'}
                  onClick={this.handleSortClick}
                />
              </Menu>
            </Menu.Item>
          </Menu>
        </div>
        <div id="leaderboard-table-holder">
          <Table width={"60%"} color={"teal"}>
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
