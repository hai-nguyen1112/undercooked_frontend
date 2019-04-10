import React from 'react'
import {Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

const ImageIngredient = props => {
  return (
    <>
    {
      props.ingredient.name.includes('ingredient')
      ?
      <div className="ingredient-image-cell">
        <div className="ingredient-image-cell-inner">
        </div>
      </div>
      :
      <div className="ingredient-image-cell">
        <div className="ingredient-image-cell-inner">
            <Image
              className="ingredient-image"
              draggable={true}
              onDragStart={() => props.handleUpdateDraggedItemState(props.ingredient)}
              src={props.ingredient.image}
              style={{width: "70px", height: "70px", borderRadius: "4px"}}
            />
        </div>
      </div>
    }
    </>
  )
}

export default withRouter(ImageIngredient)
