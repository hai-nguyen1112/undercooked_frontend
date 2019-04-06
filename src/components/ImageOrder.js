import React from 'react'
import {Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {isEmpty} from 'lodash'

const ImageOrder = props => {
  return (
    <>
    {
      isEmpty(props.order)
      ?
      null
      :
      <Image
        className="order-image"
        draggable={true}
        onDragStart={() => props.handleUpdateDraggedItemState(props.order)}
        src={props.order.image}
        style={{width: "120px", height: "120px", borderRadius: "4px"}}
      />
    }
    </>
  )
}

export default withRouter(ImageOrder)
