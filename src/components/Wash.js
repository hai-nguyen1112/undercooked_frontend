import React from 'react'
import {withRouter} from 'react-router-dom'
import {Image} from 'semantic-ui-react'
import {isEmpty} from 'lodash'

const Wash = props => {
  return (
    <>
      {
        isEmpty(props.itemToWash)
        ?
        null
        :
        <Image
          className="wash-image"
          draggable={true}
          onDragStart={() => props.handleUpdateDraggedItemState(props.itemToWash)}
          src={props.itemToWash.image}
          style={{width: "110px", height: "110px", borderRadius: "4px"}}
        />
      }
    </>
  )
}

export default withRouter(Wash)
