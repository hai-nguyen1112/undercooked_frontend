import React from 'react'
import {withRouter} from 'react-router-dom'

const Tips = props => {
  return (
    <>${props.tips}</>
  )
}

export default withRouter(Tips)
