import React from 'react'
import {Menu} from 'semantic-ui-react'
import {NavLink, withRouter} from 'react-router-dom'

const Nav = ({location: {pathname}, user, handleUpdateUserState}) => {
  let logout = () => {
    //Clear localStorage
    localStorage.removeItem('token')
    //Update this.state.user = {}
    handleUpdateUserState({})
  }
  return (
    <Menu pointing secondary>
      <Menu.Item
        name={`Welcome, ${user.username}`}
      />
      <Menu.Item
        as={NavLink}
        to="/profile"
        name="Profile"
        active={pathname === "/profile"}
      />
      <Menu.Item
        as={NavLink}
        to="/rules"
        name="Game Rules"
        active={pathname === "/rules"}
      />
      <Menu.Item
        as={NavLink}
        to="/leaderboard"
        name="Leaderboard"
        active={pathname === "/leaderboard"}
      />
      <Menu.Item
        as={NavLink}
        to="/levels"
        name="Choose a Level to Play"
        active={pathname === "/levels"}
      />
      <Menu.Item
        to="/logout"
        name="Logout"
        onClick={logout}
      />
    </Menu>
  )
}

export default withRouter(Nav)
