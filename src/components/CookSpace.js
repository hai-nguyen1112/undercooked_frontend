import React from 'react'
import {withRouter} from 'react-router-dom'
import {isEmpty} from 'lodash'

const CookSpace = props => {
  let cookItemCards = props.cookGroup.map(cookItem => <div className="cookspace-cell">
                                                        <div className="cookspace-cell-inner">
                                                          <img
                                                            key={cookItem.name}
                                                            alt={cookItem.name}
                                                            src={cookItem.image}
                                                            className="cook-item-image"
                                                            draggable={true}
                                                            onDragStart={() => props.handleUpdateDraggedItemState(cookItem)}
                                                            style={{width: "70px", height: "70px", borderRadius: "4px"}}
                                                          />
                                                        </div>
                                                      </div>
                                                      )
  return (
    <>
      {
        isEmpty(props.cookGroup)
        ?
        null
        :
        cookItemCards
      }
    </>
  )
}

export default withRouter(CookSpace)
