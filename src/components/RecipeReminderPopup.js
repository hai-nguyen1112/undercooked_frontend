import React from 'react'
import {withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'

const RecipeReminderPopup = props => {
  let instructionCards = props.level.recipes.map(recipe => <img key={recipe.name} id={recipe.name} className="instruction" alt="instruction" src={recipe.instruction}/>)
  if (props.level.id !== 1) {
    instructionCards.unshift(<img key="imageinstruction" id="imageinstruction" className="instruction" alt="instruction" src="https://i.ibb.co/jb36yyC/instruction-plate.png"/>)
  }
  return (
    <Popup
      open={props.open}
      closeOnDocumentClick={false}
      modal
    >
    {close => (
    <div className="modal">
      <div className="close" onClick={props.updatePopupRecipeOpenState}>
        &times;
      </div>
      <div className="header">Recipes for Level {props.level.id}</div>
      <div className="content">
        {instructionCards}
      </div>
    </div>
  )}
    </Popup>
  )
}

export default withRouter(RecipeReminderPopup)
