import React from 'react'
import {withRouter} from 'react-router-dom'

const Clock = props => {
  return (
    <>
      {props.clock}
    </>
  )
}

export default withRouter(Clock)
