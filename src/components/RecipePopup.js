import React from 'react'
import Popup from 'reactjs-popup'
import {withRouter, Link} from 'react-router-dom'

const RecipePopup = props => {
  let instructionCards = props.level.recipes.map(recipe => <img key={recipe.id} className="instruction" alt="instruction" src={recipe.instruction}/>)
  return (
    <Popup trigger={<img className="level_logo" alt="level_logo" src={props.level.logo}/>} modal>
    {close => (
    <div className="modal">
      <div className="close" onClick={close}>
        &times;
      </div>
      <div className="header">Recipes for Level {props.level.id}</div>
      <div className="content">
        {' '}
        {instructionCards}
      </div>
      <div className="actions">
        <Link to="/game"><button className="button" onClick={() => props.handleUpdateLevelState(props.level)}>Ready!</button></Link>
      </div>
    </div>
  )}
    </Popup>
  )
}

export default withRouter(RecipePopup)
