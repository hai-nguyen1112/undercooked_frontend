import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
var _ = require('underscore')

class Game extends Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
      tools: []
    }
  }

  logout = () => {
    localStorage.removeItem('token')
    this.props.handleUpdateUserState({})
  }

  componentDidMount() {
    let ingredients = []
    this.props.level.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (!ingredients.includes(ingredient)) {
          ingredients.push(ingredient)
        }
      })
    })
    this.setState({ingredients: ingredients})

    let tools = []
    this.props.level.recipes.forEach(recipe => {
      recipe.tools.forEach(tool => {
        if (!tools.includes(tool)) {
          tools.push(tool)
        }
      })
    })
    this.setState({tools: tools})
  }

  render() {
    let ingredientCards = this.state.ingredients.map(ingredient => <img key={ingredient.id} alt="" src={ingredient.image} style={{width: "120px", height: "120px", borderRadius: "4px"}}/>)
    let toolCards = this.state.tools.map(tool => <img key={tool.id} alt="" src={tool.image} style={{width: "120px", height: "120px", borderRadius: "4px"}}/>)
    return (
      <div className="container" id="game-container">
        <div className="item" id="avatar-holder"><img id="game-avatar" alt="avatar" style={{width: "120px", height: "120px", borderRadius: "4px"}} src={this.props.user.avatar}/></div>
        <div className="item" id="playername-holder">Chef: Hai</div>
        <div className="item" id="orders-holder"><img alt="order" style={{width: "120px", height: "120px", borderRadius: "4px"}} src={this.props.level.recipes[0].image}/></div>
        <div className="item" id="ordername-holder">New Order</div>
        <div className="item" id="trash-holder"></div>
        <div className="item" id="trashname-holder">Trash Can</div>
        <div className="item" id="serve-holder"></div>
        <div className="item" id="servebutton-holder"><button>Serve Button</button></div>
        <div className="item" id="washer-holder"></div>
        <div className="item" id="washerbutton-holder"><button>Wash Button</button></div>
        <div className="item" id="tips-holder">$100</div>
        <div className="item" id="tipsname-holder">Tips</div>
        <div className="item" id="clock-holder">Counting down: 90 seconds</div>
        <div className="item" id="clockname-holder">Clock</div>
        <div className="item" id="ingredients-holder">{ingredientCards}</div>
        <div className="item" id="ingredientsname-holder">List of ingredients</div>
        <div className="item" id="cookspace-holder"></div>
        <div className="item" id="cookspacename-holder">Cook space</div>
        <div className="item" id="tools-holder">{toolCards}</div>
        <div className="item" id="toolsname-holder">List of tools</div>
        <div className="item" id="controlpanel-holder">
          <Link to="/profile"><button>Quit Game</button></Link>
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Game)
