import React from 'react'
import {withRouter} from 'react-router-dom'
import {Image} from 'semantic-ui-react'
import {isEmpty} from 'lodash'

const Serve = props => {
  return (
    <>
    {
      isEmpty(props.serveGroup)
      ?
      null
      :
      <Image
        className="serve-image"
        draggable={true}
        onDragStart={() => props.handleUpdateDraggedItemState(props.serveGroup[0])}
        src={props.serveGroup[0].image}
        style={{width: "120px", height: "120px", borderRadius: "4px"}}
      />
    }
    </>
  )
}

export default withRouter(Serve)
