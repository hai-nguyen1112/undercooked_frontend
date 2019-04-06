import React from 'react'
import {withRouter} from 'react-router-dom'
import {Image} from 'semantic-ui-react'

const Trash = props => {
  return (
    <Image
      className="trash-image"
      draggable={true}
      onDragStart={() => props.handleUpdateDraggedItemState(props.level)}
      src={props.level.trash_can}
      style={{width: "120px", height: "120px", borderRadius: "4px"}}
    />
  )
}

export default withRouter(Trash)
