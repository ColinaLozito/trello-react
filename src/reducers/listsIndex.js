import {
  GET_LISTS,
  GET_LISTS_START,
  NEW_LIST,
  CREATE_LIST,
  CREATE_CARD,
  DELETE_CARD,
  LOAD_LOCAL
} from '../actions/lists';

import { autoDueDate } from '../autoDate';

// eslint-disable new-cap 
const initialState = {
  lists: []
};

// function that save local storage on any DATA change
const localdata = (local) => {
  if (local.length !== 0){
      let myarr = JSON.stringify(local)
      localStorage.setItem('boardLocal', myarr);
    }
}

// switch of redux actions
export const lists = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTS_START: // case that retrive the original state
      return state;

    case LOAD_LOCAL: // case that retrive the local state
      console.log(action.payload)
      return Object.assign({}, state, {data: action.payload}) 

    case GET_LISTS: // get that retrive a new state
      localdata(action.payload)
      return Object.assign({}, state, {data: action.payload}) 

    case NEW_LIST:  // case that modify a list or column and retrive a new one
      const item = action.payload
      const current = state.data
      const newData = []
      current.splice(item.id, 1, item); //replace the current position of the column and replace it
      current.map((i)=>{ // create a new state object to be consumed
        newData.push(i)
        return i
      })
      localdata(newData) // save in the local storage the modified state
      return Object.assign({}, state, {data: newData}) // set the tate to be consumed
      
      case CREATE_LIST: // case that create a new list in the current state

        const myList = []
        const newListState = []
        myList.push({
          id: state.data.length,
          name: action.payload[0],
          cards: []
        })
        state.data.splice((state.data.length), 0, myList[0]) // insert the new list at the end of the state array
        state.data.map( (item)=> { // create a new state to be used
          newListState.push(item)
          return item
        })
        localdata(newListState) // save in the local storage the modified state
        return Object.assign({}, state, {data: newListState}) // set the tate to be consumed

      case CREATE_CARD: // case that create a new card in a existen list

        const myNewCard = []
        const myNewList = []
        const obj = state.data.find((obj) => {  // find the list where the card going to be added
          return obj.id === parseInt(action.payload.list, 10); 
        });
        const listIndex = state.data.indexOf(obj) // get the index of the current list
        myNewCard.push({  // inset the new data in a new array
          id:  new Date().getTime(),
          name: action.payload.name,
          title: action.payload.title,
          description : action.payload.description,
          startDate: (action.payload.startDate === '' ? new Date() : new Date(action.payload.startDate)),
          dueDate: (action.payload.dueDate === '' ? new Date(autoDueDate()) : new Date(action.payload.dueDate))
        })

        obj.cards.push(myNewCard[0]) // insert the new card in the list
        state.data.splice(listIndex, 1, obj) // edit and replace the list edited 
        state.data.map((item, i) => { // create a new state
          myNewList.push(item)
          return item
        })
        localdata(myNewList) // save in the local storage the modified state
        return Object.assign({}, state, {data: myNewList}) // set the tate to be consumed

      case DELETE_CARD: //  case that delete a card from a list 

        const itemToDelete = action.payload.card 
        const fromCol = action.payload.col
        const newColumns = []
        const column = state.data.find((column) => { // find the colum where the card is  
          return column.id === parseInt(fromCol, 10); 
        });

        const colIndex = state.data.indexOf(column) // get the list indez
        const deleteItem = column.cards.find((deleteItem) => { // find the card that going to be deleted
          return deleteItem.id === parseInt(itemToDelete, 10); 
        });
        const itemIndex  = column.cards.indexOf(deleteItem) // get the card index
        column.cards.splice(itemIndex, 1) // remove the card from the list
        state.data.splice(colIndex, 1, column) // relace the updated colum with the previous one
        state.data.map((item, i)=>{ // create a new state
          newColumns.push(item)
          return item
        })
        localdata(newColumns) // save in the local storage the modified state
        return Object.assign({}, state, {data: newColumns}) // set the tate to be consumed

    default:
      return state;
  }
}
