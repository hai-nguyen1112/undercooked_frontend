import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import ImageIngredient from '../components/ImageIngredient'
import ImageTool from '../components/ImageTool'
import ImageOrder from '../components/ImageOrder'
import Serve from '../components/Serve'
import {isEmpty} from 'lodash'
// var _ = require('underscore')

class Game extends Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
      tools: [],
      newOrder: {},
      draggedItem: {},
      serveGroup: [],
      recipes: []
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
          ingredients.push(ingredient)
      })
    })
    this.setState({ingredients: this.unique(ingredients)})

    let tools = []
    if (this.props.level.id === 1) {
      tools.push(this.props.level.plates.find(plate => plate.name === "clean_plate"))
    } else {
      tools.push(this.props.level.plates.find(plate => plate.name === "dirty_plate"))
    }
    this.props.level.recipes.forEach(recipe => {
      recipe.tools.forEach(tool => {
          tools.push(tool)
      })
    })
    this.setState({tools: this.unique(tools)})

    let orders = []
    this.props.level.recipes.forEach(recipe => orders.push(recipe))
    let randomOrder = this.unique(orders)[Math.floor(Math.random() * this.unique(orders).length)]
    this.setState({newOrder: randomOrder})

    this.setState({recipes: this.props.level.recipes})
  }

  handleUpdateDraggedItemState = item => {
    console.log("Dragged Item:", item)
    this.setState({draggedItem: item})
  }

  handleDropOfPlateAndCookedDishOnServe = () => {
    console.log("I'm here")
    let cookedDish
    let dishName
    let serveGroup = this.state.serveGroup
    if (isEmpty(serveGroup)) {
      serveGroup.push(this.state.draggedItem)
    } else {
      serveGroup.push(this.state.draggedItem)
      dishName = serveGroup.filter(item => item.name !== 'clean_plate')[0].name
      cookedDish = this.state.recipes.filter(recipe => recipe.name === dishName)[0]
      serveGroup = []
      serveGroup.push(cookedDish)
    }
    this.setState({serveGroup: serveGroup})
  }

  unique = (array) => {
    let storage = []
    let newArray = []
    array.forEach(object => {
      if (!storage.includes(object.name)) {
        storage.push(object.name)
        newArray.push(object)}
      })
    return newArray
  }

  render() {
    let ingredientCards = this.state.ingredients.map(ingredient => <ImageIngredient key={ingredient.name} ingredient={ingredient} handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}/>)
    let toolCards = this.state.tools.map(tool => <ImageTool key={tool.name} tool={tool} handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}/>)
    return (
      <div className="container" id="game-container">
        <div className="item" id="avatar-holder"><img id="game-avatar" alt="avatar" style={{width: "120px", height: "120px", borderRadius: "4px"}} src={this.props.user.avatar}/></div>
        <div className="item" id="playername-holder">Chef: Hai</div>
        <div className="item" id="orders-holder"><ImageOrder order={this.state.newOrder}/></div>
        <div className="item" id="ordername-holder">New Order</div>
        <div className="item" id="trash-holder"></div>
        <div className="item" id="trashname-holder">Trash Can</div>
        <div className="item" id="serve-holder"
          onDragOver={e => {e.preventDefault(); e.stopPropagation()}}
          onDrop={e => {e.preventDefault(); this.handleDropOfPlateAndCookedDishOnServe()}}>
            <Serve
              serveGroup={this.state.serveGroup}
            />
        </div>
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
