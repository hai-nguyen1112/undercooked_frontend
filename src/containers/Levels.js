import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Nav from '../components/Nav'
import RecipePopup from '../components/RecipePopup'
import MainLogo from '../components/MainLogo'

class Levels extends Component {
  constructor() {
    super()
    this.state = {
      levels: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/levels')
    .then(res => res.json())
    .then(levels => {
      this.setState({levels: levels})
    })
  }
  render() {
    let recipePopupCards = this.state.levels.map(level => <RecipePopup key={level.id} user={this.props.user} level={level} handleUpdateLevelState={this.props.handleUpdateLevelState}/>)
    return (
      <div className="levels" id="levels-page">
        <div id="levels-page-mainlogo-holder">
          <MainLogo />
        </div>
        <div id="levels-page-navbar-holder">
          <Nav user={this.props.user} handleUpdateUserState={this.props.handleUpdateUserState}/>
        </div>
        <div id="levels-page-title-holder">
          Game Levels
        </div>
        <div id="levels-page-levelcards-holder">
          {recipePopupCards}
        </div>
      </div>
    )
  }
}

export default withRouter(Levels)
