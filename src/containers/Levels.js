import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Nav from '../components/Nav'
import RecipePopup from '../components/RecipePopup'

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
    let recipePopupCards = this.state.levels.map(level => <RecipePopup key={level.id} level={level}/>)
    return (
      <div className="levels">
        <Nav user={this.props.user} handleUpdateUserState={this.props.handleUpdateUserState}/>
        <h1>Please choose a level to play</h1>
        {recipePopupCards}
      </div>
    )
  }
}

export default withRouter(Levels)
