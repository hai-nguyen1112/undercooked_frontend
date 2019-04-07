import React from 'react'
import {Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

const ImageTool = props => {
  return (
    <Image
      className="image-tool"
      draggable={true}
      onDragStart={() => props.handleUpdateDraggedItemState(props.tool)}
      src={props.tool.image}
      style={{width: "120px", height: "120px", borderRadius: "4px"}}
    />
  )
}

export default withRouter(ImageTool)
