import React from 'react'
import {withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {Image} from 'semantic-ui-react'

const RecipeReminderPopup = props => {
  let instructionCards = props.level.recipes.map(recipe => <Image key={recipe.name} id={recipe.name} className="instruction" alt="instruction" src={recipe.instruction}/>)
  if (props.level.id !== 1) {
    instructionCards.unshift(<Image key="imageinstruction" id="imageinstruction" className="instruction" alt="instruction" src="https://i.ibb.co/dj7C8YM/new-instruction-plate.png"/>)
  }
  let actions
  if (props.level.id === 1) {
    actions = "Serve"
  } else if (props.level.id === 2) {
    actions = "Wash, Serve"
  } else {
    actions = "Wash, Cook, Serve"
  }
  return (
    <Popup
      open={props.open}
      modal
    >
    {close => (
    <div className="modal">
      <div className="close" onClick={props.updatePopupRecipeOpenState}>
        &times;
      </div>
      <div className="header">Level {props.level.id} Instructions</div>
      <div className="content">
        You have {props.level.clock} seconds to make minimum ${props.level.qualified_points} in tips.
        <br />
        <br />
        Actions required: {actions}
        <br />
        <br />
        {instructionCards}
      </div>
    </div>
  )}
    </Popup>
  )
}

export default withRouter(RecipeReminderPopup)
