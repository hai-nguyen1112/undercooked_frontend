import React from 'react'
import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'

const RecipePopup = props => {
  let instructionCards = props.level.recipes.map(recipe => <img className="instruction" src={recipe.instruction}/>)
  return (
    <Popup trigger={<img className="level_logo" src={props.level.logo}/>} modal>
    {close => (
    <div className="modal">
      <a className="close" onClick={close}>
        &times;
      </a>
      <div className="header">Recipes for Level {props.level.id}</div>
      <div className="content">
        {' '}
        {instructionCards}
      </div>
      <div className="actions">
        <button className="button">Start Game</button>
      </div>
    </div>
  )}
    </Popup>
  )
}

export default withRouter(RecipePopup)
