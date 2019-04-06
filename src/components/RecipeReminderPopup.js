import React from 'react'
import {withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'

const RecipeReminderPopup = props => {
  let instructionCards = props.level.recipes.map(recipe => <img key={recipe.name} className="instruction" alt="instruction" src={recipe.instruction}/>)
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
