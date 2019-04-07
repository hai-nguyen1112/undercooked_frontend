import React from 'react'
import {Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

const ImageIngredient = props => {
  return (
    <Image
      className="ingredient-image"
      draggable={true}
      onDragStart={() => props.handleUpdateDraggedItemState(props.ingredient)}
      src={props.ingredient.image}
      style={{width: "120px", height: "120px", borderRadius: "4px"}}
    />
  )
}

export default withRouter(ImageIngredient)
