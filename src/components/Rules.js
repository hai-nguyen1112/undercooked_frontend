import React from 'react'
import {withRouter} from 'react-router-dom'
import Nav from './Nav'
import MainLogo from './MainLogo'

const Rules = props => {
  return (
    <div className="instructions" id="instructions-page">
      <div id="instructions-page-mainlogo-holder">
        <MainLogo />
      </div>
      <div id="instructions-page-navbar-holder">
        <Nav user={props.user} handleUpdateUserState={props.handleUpdateUserState}/>
      </div>
      <div id="instructions-page-content-holder">
        This is the game rules
      </div>
    </div>
  )
}

export default withRouter(Rules)
