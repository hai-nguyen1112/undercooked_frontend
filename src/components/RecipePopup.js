import React from 'react'
import Popup from 'reactjs-popup'
import {withRouter, Link} from 'react-router-dom'
import {Image, Button} from 'semantic-ui-react'

const RecipePopup = props => {
  let instructionCards = props.level.recipes.map(recipe => <Image key={recipe.id} id={recipe.name} className="instruction" alt="instruction" src={recipe.instruction}/>)
  if (props.level.id !== 1) {
    instructionCards.unshift(<Image key="imageinstruction" id="imageinstruction" className="instruction" alt="instruction" src="https://i.ibb.co/jb36yyC/instruction-plate.png"/>)
  }
  return (
    <Popup trigger={<Image className="level_logo" alt="level_logo" src={props.level.logo}/>} modal id="popup-window">
    {close => (
    <div className="modal">
      <div className="close" onClick={close}>
        &times;
      </div>
      <div className="header">Level {props.level.id} Recipes</div>
      <div className="content">
        {instructionCards}
      </div>
      <div className="actions">
        <Link to="/game"><Button inverted className="button" onClick={() => props.handleUpdateLevelState(props.level)}>Ready!</Button></Link>
      </div>
    </div>
  )}
    </Popup>
  )
}

export default withRouter(RecipePopup)
