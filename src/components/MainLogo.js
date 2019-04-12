import React from 'react'
import {withRouter} from 'react-router-dom'
import {Image} from 'semantic-ui-react'

const MainLogo = () => {
  return (
    <Image src="https://i.ibb.co/JB1JfYb/logo-main1.png" style={{height: "160px"}}/>
  )
}

export default withRouter(MainLogo)
