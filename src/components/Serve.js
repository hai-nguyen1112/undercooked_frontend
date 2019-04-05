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
      <Image src={props.serveGroup[0].image}/>
    }
    </>
  )
}

export default withRouter(Serve)
