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
import Master from '../components/Master'
import Wash from '../components/Wash'
import CookSpace from '../components/CookSpace'
import {Image, Button, Icon} from 'semantic-ui-react'
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
      popupRecipeOpen: false,
      masterSpeech: "Welcome to underCooked! kitchen. Remember, don't overcook!",
      itemToWash: {},
      timeWashed: 0,
      washing: false,
      cookGroup: [],
      timeCooked: 0,
      cooking: false,
      burnedDish: {image: props.level.burned_dish, kind: 'burntItem', name: 'burntItem'},
      ruinedDish: {image: props.level.ruined_dish, kind: 'burntItem', name: 'burntItem'},
      cookSpaceAvailable: true
    }
  }

  logout = () => {
    localStorage.removeItem('token')
    this.props.handleUpdateUserState({})
  }

  componentDidMount() {
    let ingredients = []
    let copyOfIngredient
    if (this.props.level.id === 1 || this.props.level.id === 2) {
      this.props.level.recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          ingredients.push(ingredient)
        })
      })
    } else {
      this.props.level.recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          copyOfIngredient = JSON.parse(JSON.stringify(ingredient))
          copyOfIngredient["kind"] = 'raw_ingredient'
          ingredients.push(copyOfIngredient)
        })
      })
    }
    this.setState({ingredients: this.unique(ingredients)})

    let tools = []
    let copyOfTool
    if (this.props.level.id === 1) {
      tools.push(this.props.level.plates.find(plate => plate.name === "clean_plate"))
    } else {
      tools.push(this.props.level.plates.find(plate => plate.name === "dirty_plate"))
    }
    this.props.level.recipes.forEach(recipe => {
      recipe.tools.forEach(tool => {
        copyOfTool = JSON.parse(JSON.stringify(tool))
        copyOfTool["kind"] = 'cooking_tool'
        tools.push(copyOfTool)
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

    this.addShakeClassMaster('.master-avatar')
    setTimeout(this.clearMasterSpeech, 1700)
  }

  handleCountdownClockState = () => {
    let clock = this.state.clock
    this.setState({clock: clock - 1})
    this.checkClockToEndGame()
  }

  checkClockToEndGame = () => {
    let patchData = {}
    if (this.state.clock === 0) {
      clearInterval(clockCountdownInterval)
      this.setState({popupOpen: true})
      if (this.state.tips >= this.props.level.qualified_points) {
        patchData["wins"] = this.props.user.wins + 1
        patchData["games_played"] = this.props.user.games_played + 1
      } else {
        patchData["losses"] = this.props.user.losses + 1
        patchData["games_played"] = this.props.user.games_played + 1
      }
      if (this.state.tips > this.props.user.highest_score) {
        patchData["highest_score"] = this.state.tips
      }
      this.patchUserData(patchData, this.props.user.id)
    }
  }

  patchUserData = (patchData, userId) => {
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(patchData)
    }).then(res => res.json())
      .then(updatedUser => {
        this.props.handleUpdateUserState(updatedUser)
      })
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
      setTimeout(() => {return this.updateIngredientsState(draggedItem, items)}, 500)
    } else if (draggedItem.kind === 'tool') {
      items = this.state.tools.filter(item => item.name !== draggedItem.name)
      this.setState({tools: items})
      setTimeout(() => {return this.updateToolsState(draggedItem, items)}, 500)
    } else if (draggedItem.kind === 'dirty_tool') {
      items = this.state.tools.filter(item => item.name !== draggedItem.name)
      this.setState({tools: items})
      setTimeout(() => {return this.updateToolsState(draggedItem, items)}, 500)
    } else if (draggedItem.kind === 'raw_ingredient') {
      items = this.state.ingredients.filter(item => item.name !== draggedItem.name)
      this.setState({ingredients: items})
      setTimeout(() => {return this.updateIngredientsState(draggedItem, items)}, 500)
    } else if (draggedItem.kind === 'cooking_tool') {
      items = this.state.tools.filter(item => item.name !== draggedItem.name)
      this.setState({tools: items})
      setTimeout(() => {return this.updateToolsState(draggedItem, items)}, 500)
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
    let serveGroup = JSON.parse(JSON.stringify(this.state.serveGroup))
    let draggedItem = JSON.parse(JSON.stringify(this.state.draggedItem))
    let copyOfCookedDish
    if (this.state.draggedItem.kind !== 'user' && this.state.draggedItem.kind !== 'level' && this.state.draggedItem.kind !== 'order' && this.state.draggedItem.kind !== 'dirty_tool' && this.state.draggedItem.kind !== 'broken_tool' && this.state.draggedItem.kind !== 'washing_tool') {
      if (isEmpty(serveGroup)) {
        if (this.state.draggedItem.kind === 'tool') {
          draggedItem.kind = 'serve_tool'
          serveGroup.push(draggedItem)
          this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
        } else if (this.state.draggedItem.kind === 'ingredient') {
          draggedItem.kind = 'serve_ingredient'
          serveGroup.push(draggedItem)
          this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
        } else if (this.state.draggedItem.kind === 'washed_tool') {
          draggedItem.kind = 'serve_tool'
          this.setState({itemToWash: {}})
          serveGroup.push(draggedItem)
        } else if (this.state.draggedItem.kind === 'wellDone') {
          draggedItem.kind = 'serve_ingredient'
          serveGroup.push(draggedItem)
          this.setState({cookGroup: []})
          this.setState({cooking: false})
          this.setState({cookSpaceAvailable: true})
        }
      } else if (serveGroup.length === 1 && serveGroup[0].kind !== 'recipe') {
        if (serveGroup[0].kind === 'serve_ingredient' && this.state.draggedItem.kind === 'tool') {
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
        } else if (serveGroup[0].kind === 'serve_tool' && this.state.draggedItem.kind === 'ingredient') {
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
        } else if (serveGroup[0].kind === 'serve_ingredient' && this.state.draggedItem.kind === 'washed_tool') {
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
          this.setState({itemToWash: {}})
        } else if (serveGroup[0].kind === 'serve_tool' && this.state.draggedItem.kind === 'wellDone') {
          serveGroup.push(this.state.draggedItem)
          dishName = serveGroup.filter(item => item.name !== 'clean_plate')[0].name
          cookedDish = this.state.recipes.filter(recipe => recipe.name === dishName)[0]
          copyOfCookedDish = JSON.parse(JSON.stringify(cookedDish))
          copyOfCookedDish.kind = 'serve_recipe'
          serveGroup = []
          serveGroup.push(copyOfCookedDish)
          this.setState({cookGroup: []})
          this.setState({cooking: false})
          this.setState({cookSpaceAvailable: true})
          console.log("copy cooked dish:", copyOfCookedDish)
          console.log("cooked dish:", cookedDish)
        }
      }
      this.setState({serveGroup: serveGroup})
    }
  }

  updateServeGroupState = () => {
    this.setState({serveGroup: []})
  }

  addFadeOutClass = selector => {
    document.querySelector(selector).classList.add('fadeOut')
    // setTimeout(() => document.querySelector(selector).classList.remove('shake'), 500)
  }

  clearNewOrderState = () => {
    this.setState({newOrder: {}})
    setTimeout(this.updateNewOrderState, 500)
  }

  handleClickOfServeButton = () => {
    if (!isEmpty(this.state.serveGroup)) {
      if (this.state.serveGroup[0].kind === 'serve_recipe') {
        if (this.state.serveGroup[0].name === this.state.newOrder.name) {
          this.addShakeClassMaster('.master-avatar')
          this.setState({masterSpeech: "Great job."})
          setTimeout(this.clearMasterSpeech, 1700)
          this.setState({tips: this.state.tips + 10})
          this.addFadeOutClass('.serve-image')
          setTimeout(this.updateServeGroupState, 500)
          this.addFadeOutClass('.order-image')
          setTimeout(this.clearNewOrderState, 500)
        } else {
          this.addShakeClassMaster('.master-avatar')
          this.setState({masterSpeech: "You cooked the wrong dish. Toss it."})
          setTimeout(this.clearMasterSpeech, 1700)
        }
      } else {
        if (this.state.serveGroup[0].kind === 'serve_tool') {
          this.addShakeClassMaster('.master-avatar')
          this.setState({masterSpeech: "You can't serve an empty plate. Put something on it."})
          setTimeout(this.clearMasterSpeech, 1700)
        } else if (this.state.serveGroup[0].kind === 'serve_ingredient') {
          if (this.state.serveGroup[0].name === this.state.newOrder.name) {
            this.addShakeClassMaster('.master-avatar')
            this.setState({masterSpeech: "You can't serve without a plate. Give it a plate."})
            setTimeout(this.clearMasterSpeech, 1700)
          } else {
            this.addShakeClassMaster('.master-avatar')
            this.setState({masterSpeech: "You cooked the wrong dish. Toss it."})
            setTimeout(this.clearMasterSpeech, 1700)
          }
        }
      }
    } else {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey, you have to cook a dish before serving."})
      setTimeout(this.clearMasterSpeech, 1700)
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
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey, don't throw usable tools away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'ingredient') {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey, don't throw fresh ingredients away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'dirty_tool') {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey don't throw usable tools away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'broken_tool') {
      this.setState({itemToWash: {}})
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'washing_tool' && this.state.washing !== true) {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey don't throw usable tools away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.setState({itemToWash: {}})
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'washed_tool') {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey don't throw usable tools away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.setState({itemToWash: {}})
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'raw_ingredient') {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey, don't throw fresh ingredients away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'cooking_tool') {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey, don't throw usable tools away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'being_used_tool') {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey, don't throw usable tools away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.setState({cookGroup: this.state.cookGroup.filter(item => item.name !== this.state.draggedItem.name)})
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'being_cooked_ingredient') {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey, don't throw fresh ingredients away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.setState({cookGroup: this.state.cookGroup.filter(item => item.name !== this.state.draggedItem.name)})
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'burntItem') {
      this.setState({cookGroup: []})
      this.setState({cooking: false})
      this.setState({cookSpaceAvailable: true})
      this.addShakeClass(".trash-image")
    }
    if (this.state.draggedItem.kind === 'wellDone') {
      this.addShakeClassMaster('.master-avatar')
      this.setState({masterSpeech: "Hey, don't throw perfectly cooked dish away."})
      setTimeout(this.clearMasterSpeech, 1700)
      this.setState({cookGroup: []})
      this.setState({cooking: false})
      this.setState({cookSpaceAvailable: true})
      this.addShakeClass(".trash-image")
    }
  }

  clearMasterSpeech = () => {
    this.setState({masterSpeech: ""})
  }

  addShakeClass = selector => {
    document.querySelector(selector).classList.add('shake')
    setTimeout(() => document.querySelector(selector).classList.remove('shake'), 500)
  }

  addShakeClassMaster = selector => {
    document.querySelector(selector).classList.add('shake-master')
    setTimeout(() => document.querySelector(selector).classList.remove('shake-master'), 2000)
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

  handleDropOnWasher = () => {
    let copyOfItemToWash
    if (isEmpty(this.state.itemToWash)) {
      if (this.state.draggedItem.kind === 'dirty_tool') {
        copyOfItemToWash = JSON.parse(JSON.stringify(this.state.draggedItem))
        copyOfItemToWash["kind"] = 'washing_tool'
        this.setState({itemToWash: copyOfItemToWash})
        this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      }
    }
  }

  handleClickOfWashButton = () => {
    if (!isEmpty(this.state.itemToWash)) {
      if (this.state.washing === false && this.state.itemToWash.kind === 'washing_tool') {
          this.startWashTimer()
          this.setState({washing: true})
          this.addBlinkClass('.wash-image')
      }
    }
  }

  addBlinkClass = selector => {
    document.querySelector(selector).classList.add('blink_me')
  }

  removeBlinkClass = selector => {
    document.querySelector(selector).classList.remove('blink_me')
  }

  startWashTimer = () => {
    this.interval = setInterval(this.updateWashTimer, 1000)
  }

  updateWashTimer = () => {
    this.setState({timeWashed: this.state.timeWashed + 1})
  }

  handleClickOfCookButton = () => {
    if (!isEmpty(this.state.cookGroup)) {
      if (this.state.cooking === false && this.state.cookGroup[0].kind === 'being_cooked_ingredient') {
          this.startCookTimer()
          this.setState({cooking: true})
          this.setState({cookSpaceAvailable: false})
          document.querySelectorAll('.cook-item-image').forEach(element => element.classList.add('blink_me'))
      } else if (this.state.cooking === false && this.state.cookGroup[0].kind === 'being_used_tool') {
        this.startCookTimer()
        this.setState({cooking: true})
        this.setState({cookSpaceAvailable: false})
        document.querySelectorAll('.cook-item-image').forEach(element => element.classList.add('blink_me'))
      }
    }
  }

  startCookTimer = () => {
    this.interval1 = setInterval(this.updateCookTimer, 1000)
  }

  updateCookTimer = () => {
    this.setState({timeCooked: this.state.timeCooked + 1})
  }


  handleClickOfDoneWashing = () => {
    let washedItem
    if (this.state.washing === true) {
      if (this.state.timeWashed === 3) {
        washedItem = JSON.parse(JSON.stringify(this.props.level.plates.find(plate => plate.name === "clean_plate")))
        washedItem["kind"] = 'washed_tool'
        this.setState({itemToWash: washedItem})
      } else {
        this.setState({itemToWash: this.props.level.plates.find(plate => plate.name === "broken_plate")})
        this.addShakeClassMaster('.master-avatar')
        this.setState({masterSpeech: "Oh no, you broke the plate. Toss it."})
        setTimeout(this.clearMasterSpeech, 1700)
      }
      this.removeBlinkClass('.wash-image')
      clearInterval(this.interval)
      this.setState({washing: false})
      this.setState({timeWashed: 0})
    }
  }

  handleClickOfDoneCooking = () => {
    let desiredCookGroup = []
    if (this.state.cooking === true) {
      this.state.newOrder.ingredients.forEach(ingredient => {
        desiredCookGroup.push(ingredient)
      })
      this.state.newOrder.tools.forEach(tool => {
        desiredCookGroup.push(tool)
      })
      desiredCookGroup.sort((a, b) => a.name.localeCompare(b.name))
      let cookGroup = JSON.parse(JSON.stringify(this.state.cookGroup))
      cookGroup.sort((a, b) => a.name.localeCompare(b.name))
      if (this.state.timeCooked === this.state.newOrder.cooktime) {
        if (cookGroup.length === desiredCookGroup.length) {
          let counter = 0
          for (var i=0; i<cookGroup.length; i++) {
            if (cookGroup[i].name === desiredCookGroup[i].name) {
              counter = counter + 1
            }
          }
          if (cookGroup.length === counter) {
            let wellDoneDish = JSON.parse(JSON.stringify(this.state.newOrder))
            wellDoneDish["kind"] = 'wellDone'
            wellDoneDish["image"] = this.state.newOrder.image_without_plate
            this.setState({cookGroup: [wellDoneDish]})
          } else {
            this.setState({cookGroup: [this.state.ruinedDish]})
            this.addShakeClassMaster('.master-avatar')
            this.setState({masterSpeech: "Oh no, you cooked a mess. Toss it."})
            setTimeout(this.clearMasterSpeech, 1700)
          }
        } else {
          this.setState({cookGroup: [this.state.ruinedDish]})
          this.addShakeClassMaster('.master-avatar')
          this.setState({masterSpeech: "Oh no, you cooked a mess. Toss it."})
          setTimeout(this.clearMasterSpeech, 1700)
        }
      } else if (this.state.timeCooked > this.state.newOrder.cooktime) {
        this.setState({cookGroup: [this.state.burnedDish]})
        this.addShakeClassMaster('.master-avatar')
        this.setState({masterSpeech: "Oh no, you overcooked it. Throw the burnt thing away."})
        setTimeout(this.clearMasterSpeech, 1700)
      }
      if (this.state.timeCooked >= this.state.newOrder.cooktime) {
        clearInterval(this.interval1)
        this.setState({cooking: false})
        this.setState({timeCooked: 0})
      }
    }
  }

  handleDropOnCookSpace = () => {
    let itemGroup
    let cookGroup
    let item
    if (this.state.cookSpaceAvailable === true) {
      if (this.state.draggedItem.kind === 'raw_ingredient' || this.state.draggedItem.kind === 'cooking_tool') {
        itemGroup = JSON.parse(JSON.stringify(this.state.cookGroup))
        item = JSON.parse(JSON.stringify(this.state.draggedItem))
        if (item.kind === 'raw_ingredient') {
          item["kind"] = 'being_cooked_ingredient'
        } else if (item.kind === 'cooking_tool') {
          item["kind"] = 'being_used_tool'
        }
        itemGroup.push(item)
        cookGroup = this.unique(itemGroup)
        this.setState({cookGroup: cookGroup})
        this.eliminateDraggedItemFromTheirOriginalState(this.state.draggedItem)
      }
    }
  }

  handleClickOnMaster = () => {
    this.addShakeClassMaster('.master-avatar')
    this.setState({masterSpeech: "Focus on cooking please. We don't have time to chat."})
    setTimeout(this.clearMasterSpeech, 1700)
  }

  render() {
    let ingredients = JSON.parse(JSON.stringify(this.state.ingredients))
    let counter = 12 - ingredients.length
    for (let i=0; i<counter; i++) {
      ingredients.push({name: `ingredient${i}`})
    }
    let ingredientCards = ingredients.map(ingredient => <ImageIngredient key={ingredient.name} ingredient={ingredient} handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}/>)
    let tools = JSON.parse(JSON.stringify(this.state.tools))
    let counterTool = 12 - tools.length
    for (let j=0; j<counterTool; j++) {
      tools.push({name: `tool${j}`})
    }
    let toolCards = tools.map(tool => <ImageTool key={tool.name} tool={tool} handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}/>)
    let washing = this.state.washing
    let cooking = this.state.cooking
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
      <div className="item" id="avatar-holder"><Image
                                                    draggable={true}
                                                    onDragStart={() => this.handleUpdateDraggedItemState(this.props.user)}
                                                    id="game-avatar"
                                                    alt="avatar"
                                                    style={{height: "100%", borderRadius: "6px"}}
                                                    src={this.props.user.avatar}
                                                  />
        </div>
        <div className="item" id="playername-holder">
            <Icon name='user'/>
            {this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1)}
        </div>
        <div className="item" id="orders-holder">
          <div id="orders-holder-inner" onClick={this.updatePopupRecipeOpenState}>
            <ImageOrder order={this.state.newOrder} handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}/>
          </div>
        </div>
        <div className="item" id="ordername-holder">
            <Icon name='bell'/>
            Order
        </div>
        <div className="item" id="trash-holder">
          <div id="trash-holder-inner"
            onDragOver={e => {e.preventDefault(); e.stopPropagation()}}
            onDrop={e => {e.preventDefault(); this.handleDropOnTrashCan()}}>
            <Trash
              level={this.props.level}
              handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}
            />
          </div>
        </div>
        <div className="item" id="trashname-holder">
            <Icon name='trash'/>
            Trash
        </div>
        <div className="item" id="serve-holder">
          <div id="serve-holder-inner"
            onDragOver={e => {e.preventDefault(); e.stopPropagation()}}
            onDrop={e => {e.preventDefault(); this.handleDropOfPlateAndCookedDishOnServe()}}
            onClick={this.handleClickOfServeButton}>
            <Serve
              handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}
              serveGroup={this.state.serveGroup}
            />
          </div>
        </div>
        <div className="item" id="servebutton-holder">
            <Icon name='utensils'/>
            Serve
        </div>
        <div className="item" id="washer-holder">
          <div id="washer-holder-inner"
            onDragOver={e => {e.preventDefault(); e.stopPropagation()}}
            onDrop={e => {e.preventDefault(); this.handleDropOnWasher()}}
            onClick={this.state.washing ? this.handleClickOfDoneWashing : this.handleClickOfWashButton}
          >
            <Wash
              handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}
              itemToWash={this.state.itemToWash}
            />
          </div>
        </div>
        <div className="item" id="washerbutton-holder">
          {
            !washing
            ?
            <>
              <Icon name='tint'/>
              Sink
            </>
            :
            <>
              <Icon name='clock'/>
              {this.state.timeWashed}
            </>
          }
        </div>
        <div className="item" id="tips-holder">
          <div id="tips-holder-inner">
            <Tips tips={this.state.tips}/>
          </div>
        </div>
        <div className="item" id="tipsname-holder">
            <Icon name='thumbs up'/>
            Tips
        </div>
        <div className="item" id="clock-holder">
          <div id="clock-holder-inner">
            <Clock clock={this.state.clock}/>
          </div>
        </div>
        <div className="item" id="clockname-holder">
            <Icon name='hourglass'/>
            Clock
        </div>
        <div className="item" id="ingredients-holder">{ingredientCards}</div>
        <div className="item" id="ingredientsname-holder">
            <Icon name='calculator'/>
            Fridge
        </div>
        <div className="item" id="masterchef-holder">
          <div id="masterchef-holder-inner">
            <Master
              masterSpeech={this.state.masterSpeech}
              handleClickOnMaster={this.handleClickOnMaster}
            />
          </div>
        </div>
        <div className="item" id="cookspace-holder">
          <div className="item" id="cookspace-id"
            onDragOver={e => {e.preventDefault(); e.stopPropagation()}}
            onDrop={e => {e.preventDefault(); this.handleDropOnCookSpace()}}
            onClick={cooking ? this.handleClickOfDoneCooking : this.handleClickOfCookButton}
          >
            <CookSpace
              handleUpdateDraggedItemState={this.handleUpdateDraggedItemState}
              cookGroup={this.state.cookGroup}
            />
          </div>
        </div>
        <div className="item" id="cook-button">
          {
            !cooking
            ?
            <>
              <Icon name='power off'/>
              Stove
            </>
            :
            <>
              <Icon name='clock'/>
              {this.state.timeCooked}
            </>
          }
        </div>
        <div className="item" id="cookspacename-holder"></div>
        <div className="item" id="tools-holder">{toolCards}</div>
        <div className="item" id="toolsname-holder">
            <Icon name='columns'/>
            Cabinet
        </div>
        <div className="item" id="controlpanel-holder">
          <Link to="/profile">
            <Button icon color='blue' style={{width: "110px"}} labelPosition='left'>
              <Icon name='external alternate'/>
              Quit
            </Button>
          </Link>
          </div>
        <div className="item" id="controlpanel-holder1">
          <Button icon color='orange' style={{width: "110px"}} labelPosition='left' onClick={this.logout}>
            <Icon name='log out'/>
            Logout
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(Game)
