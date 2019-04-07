import React from 'react'
import {withRouter} from 'react-router-dom'

const Master = props => {
  return (
    <>
      <div className="item" id="master-image">
        <img
          alt=""
          className="master-avatar"
          src="https://i.ibb.co/2FkSrQx/male-cook.png"
          style={{width: "85px", height: "85px", borderRadius: "4px"}}
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
