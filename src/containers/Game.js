import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import ImageIngredient from '../components/ImageIngredient'
import ImageTool from '../components/ImageTool'
import ImageOrder from '../components/ImageOrder'
import Serve from '../components/Serve'
import {isEmpty} from 'lodash'
import Tips from '../components/Tips'
import Trash from '../components/Trash'
import Clock from '../components/Clock'
import EndGamePopUp from '../components/EndGamePopUp'
import RecipeReminderPopup from '../components/RecipeReminderPopup'
var clockCountdownInterval
// var _ = require('underscore')

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: [],
      tools: [],
      newOrder: {},
      draggedItem: {},
      serveGroup: [],
      recipes: [],
      tips: 0,
      clock: props.level.clock,
      popupOpen: false,
      popupRecipeOpen: false
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
    let copyOfRandomOrder = JSON.parse(JSON.stringify(randomOrder))
    copyOfRandomOrder.kind = 'order'
    this.setState({newOrder: copyOfRandomOrder})

    this.setState({recipes: this.props.level.recipes})

    clockCountdownInterval = setInterval(this.handleCountdownClockState, 1000)
  }

  handleCountdownClockState = () => {
    let clock = this.state.clock
    this.setState({clock: clock - 1})
    this.checkClockToEndGame()
  }

  checkClockToEndGame = () => {
    if (this.state.clock === 0) {
      clearInterval(clockCountdownInterval)
      this.setState({popupOpen: true})
    }
  }

  handleUpdateDraggedItemState = item => {
    console.log("Dragged Item:", item)
    this.setState({draggedItem: item})
  }

  eliminateDraggedItemFromTheirOriginalState = draggedItem => {
    let items
    if (draggedItem.kind === 'ingredient') {
      items = this.state.ingredients.filter(item => item.name !== draggedItem.name)
      this.setState({ingredients: items})
      setTimeout(() => {return this.updateIngredientsState(draggedItem, items)}, 1000)
    } else if (draggedItem.kind === 'tool') {
      items = this.state.tools.filter(item => item.name !== draggedItem.name)
      this.setState({tools: items})
      setTimeout(() => {return this.updateToolsState(draggedItem, items)}, 1000)
    }
  }

  updateIngredientsState = (draggedItem, items) => {
    items.push(draggedItem)
    this.setState({ingredients: items})
  }

  updateToolsState = (draggedItem, items) => {
    items.push(draggedItem)
    this.setState({tools: items})
  }

  handleDropOfPlateAndCookedDishOnServe = () => {
    let cookedDish
    let dishName
    let serveGroup = this.state.serveGroup
    let draggedItem = JSON.parse(JSON.stringify(this.state.draggedItem))
    let copyOfCookedDish
    if (this.state.draggedItem.kind !== 'user' && this.state.draggedItem.kind !== 'level' && this.state.draggedItem.kind !== 'order') {
      if (isEmpty(serveGroup)) {
        if (this.state.draggedItem.kind === 'tool') {
          draggedItem.kind = 'serve_tool'
        } else if (this.state.draggedItem.kind === 'ingredient') {
          draggedItem.kind = 'serve_ingredient'
        }
        serveGroup.push(draggedItem)
        console.log(serveGroup)
        this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      } else if (serveGroup.length === 1 && serveGroup[0].kind !== 'recipe') {
        if (serveGroup[0].kind !== this.state.draggedItem.kind) {
          serveGroup.push(this.state.draggedItem)
          dishName = serveGroup.filter(item => item.name !== 'clean_plate')[0].name
          cookedDish = this.state.recipes.filter(recipe => recipe.name === dishName)[0]
          copyOfCookedDish = JSON.parse(JSON.stringify(cookedDish))
          copyOfCookedDish.kind = 'serve_recipe'
          serveGroup = []
          serveGroup.push(copyOfCookedDish)
          this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
          console.log("copy cooked dish:", copyOfCookedDish)
          console.log("cooked dish:", cookedDish)
        }
      }
      this.setState({serveGroup: serveGroup})
    }
  }

  handleClickOfServeButton = () => {
    if (!isEmpty(this.state.serveGroup)) {
      if (this.state.serveGroup[0].kind === 'serve_recipe') {
        if (this.state.serveGroup[0].name === this.state.newOrder.name) {
          this.setState({tips: this.state.tips + 10})
          this.setState({serveGroup: []})
          this.setState({newOrder: {}})
          setTimeout(this.updateNewOrderState, 1500)
        } else {
          this.addShakeClass('.serve-image')
        }
      } else {
        this.addShakeClass('.serve-image')
      }
    }
  }

  handleDropOnTrashCan = () => {
    if (this.state.draggedItem.kind === 'serve_recipe') {
      this.setState({serveGroup: []})
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'serve_tool') {
      this.setState({serveGroup: []})
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'serve_ingredient') {
      this.setState({serveGroup: []})
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'tool') {
      this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'ingredient') {
      this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      this.addShakeClass(".trash-image")
    }
  }

  addShakeClass = selector => {
    document.querySelector(selector).classList.add('shake')
    setTimeout(() => document.querySelector(selector).classList.remove('shake'), 500)
  }

  updateNewOrderState = () => {
    let orders = []
    this.props.level.recipes.forEach(recipe => orders.push(recipe))
    let randomOrder = this.unique(orders)[Math.floor(Math.random() * this.unique(orders).length)]
    let copyOfRandomOrder = JSON.parse(JSON.stringify(randomOrder))
    copyOfRandomOrder.kind = 'order'
    this.setState({newOrder: copyOfRandomOrder})
  }

  updatePopupRecipeOpenState = () => {
    this.setState({popupRecipeOpen: !this.state.popupRecipeOpen})
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
        <RecipeReminderPopup
          open={this.state.popupRecipeOpen}
          level={this.props.level}
          updatePopupRecipeOpenState={this.updatePopupRecipeOpenState}
        />
        <EndGamePopUp
          open={this.state.popupOpen}
          handleUpdateUserState={this.props.handleUpdateUserState}
          tips={this.state.tips}
          user={this.props.user}
          level={this.props.level}
        />
        <div className="item" id="avatar-holder"><img
                                                    draggable={true}
                                                    onDragStart={() => this.handleUpdateDraggedItemState(this.props.user)}
                                                    id="game-avatar"
                                                    alt="avatar"
                                                    style={{width: "120px", height: "120px", borderRadius: "4px"}}
                                                    src={this.props.user.avatar}
                                                  />
        </div>
        <div className="item" id="playername-holder">Chef: {this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1)}</div>
        <div className="item" id="orders-holder" onClick={this.updatePopupRecipeOpenState}><ImageOrder order={this.state.newOrder} handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}/></div>
        <div className="item" id="ordername-holder">New Order</div>
        <div className="item" id="trash-holder"
          onDragOver={e => {e.preventDefault(); e.stopPropagation()}}
          onDrop={e => {e.preventDefault(); this.handleDropOnTrashCan()}}>
          <Trash
            level={this.props.level}
            handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}
          />
        </div>
        <div className="item" id="trashname-holder">Trash Can</div>
        <div className="item" id="serve-holder"
          onDragOver={e => {e.preventDefault(); e.stopPropagation()}}
          onDrop={e => {e.preventDefault(); this.handleDropOfPlateAndCookedDishOnServe()}}>
          <Serve
            handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}
            serveGroup={this.state.serveGroup}
          />
        </div>
        <div className="item" id="servebutton-holder"><button onClick={this.handleClickOfServeButton}>Serve Button</button></div>
        <div className="item" id="washer-holder"></div>
        <div className="item" id="washerbutton-holder"><button>Wash Button</button></div>
        <div className="item" id="tips-holder"><Tips tips={this.state.tips}/></div>
        <div className="item" id="tipsname-holder">Tips</div>
        <div className="item" id="clock-holder"><Clock clock={this.state.clock}/></div>
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
