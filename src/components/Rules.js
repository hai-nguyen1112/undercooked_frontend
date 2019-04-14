import React from 'react'
import {withRouter} from 'react-router-dom'
import Nav from './Nav'
import MainLogo from './MainLogo'
import {Image} from 'semantic-ui-react'

const Rules = props => {
  return (
    <div className="instructions" id="instructions-page">
      <div id="instructions-page-mainlogo-holder">
        <MainLogo />
      </div>
      <div id="instructions-page-navbar-holder">
        <Nav user={props.user} handleUpdateUserState={props.handleUpdateUserState}/>
      </div>
      <div id="instructions-page-title-holder">
        Game Instructions
      </div>
      <div id="instructions-page-content-holder">
        <div id="instructions-page-game-interface-name">
          1. Game Interface
        </div>
        <div id="instructions-page-game-interface-photo">
          <Image src="https://i.ibb.co/jkfgPSn/new-game-interface.png" style={{width: "70%", border: "2px solid gray", borderRadius: "6px"}}/>
        </div>
        <div id="instructions-page-actions-header">
          2. Game Actions
        </div>
        <div id="instructions-page-actions-photos">
          <div id="instructions-page-actions-header-serve">
            2.1. Action - Serve
          </div>
          <div id="instructions-page-actions-header-serve-photo">
            <Image src="https://i.ibb.co/k4Sc53Y/new-serve-action.png" style={{width: "95%", border: "2px solid gray", borderRadius: "6px"}}/>
          </div>
          <div id="instructions-page-actions-header-wash">
            2.2. Action - Wash
          </div>
          <div id="instructions-page-actions-header-wash-photo">
            <Image src="https://i.ibb.co/qDqDh0y/new-wash-action.png" style={{width: "95%", border: "2px solid gray", borderRadius: "6px"}}/>
          </div>
          <div id="instructions-page-actions-header-cook">
            2.3. Action - Cook
          </div>
          <div id="instructions-page-actions-header-cook-photo">
            <Image src="https://i.ibb.co/S0VDMCd/new-cook-action.png" style={{width: "95%", border: "2px solid gray", borderRadius: "6px"}}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Rules)
