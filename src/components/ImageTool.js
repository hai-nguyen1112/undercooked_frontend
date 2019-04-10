import React from 'react'
import {Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

const ImageTool = props => {
  return (
    <>
      {
        props.tool.name.includes('tool')
        ?
        <div className="image-tool-cell">
          <div className="image-tool-cell-inner">
          </div>
        </div>
        :
        <div className="image-tool-cell">
          <div className="image-tool-cell-inner">
            <Image
              className="image-tool"
              draggable={true}
              onDragStart={() => props.handleUpdateDraggedItemState(props.tool)}
              src={props.tool.image}
              style={{width: "70px", height: "70px", borderRadius: "4px"}}
            />
          </div>
        </div>
      }
    </>
  )
}

export default withRouter(ImageTool)
