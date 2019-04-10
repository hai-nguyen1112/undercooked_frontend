import React from 'react'
import {withRouter} from 'react-router-dom'
import {Image} from 'semantic-ui-react'

const Master = props => {
  return (
    <>
      <div className="item" id="master-image">
        <Image
          alt=""
          className="master-avatar"
          src="https://i.ibb.co/2FkSrQx/male-cook.png"
          style={{width: "85px", height: "85px", borderRadius: "4px"}}
          onClick={props.handleClickOnMaster}
        />
      </div>
      <div className="item" id="master-gap"></div>
      <div className="item" id="master-speech">
        {props.masterSpeech}
      </div>
    </>
  )
}

export default withRouter(Master)
