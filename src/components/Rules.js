import React from 'react'
import {withRouter} from 'react-router-dom'
import Nav from './Nav'

const Rules = props => {
  return (
    <div className="rules">
      <Nav user={props.user} handleUpdateUserState={props.handleUpdateUserState}/>
      <h1>This is the game rules</h1>
    </div>
  )
}

export default withRouter(Rules)
