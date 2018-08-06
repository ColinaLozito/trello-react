import faker from 'faker';
import { autoDueDate } from '../autoDate';


export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const NEW_LIST = 'NEW_LIST';
export const CREATE_LIST = 'CREATE_LIST';
export const CREATE_CARD = 'CREATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const LOAD_LOCAL = 'LOAD_LOCAL';

// this function fetch the first FAKE data
// the quantity is recived from the main component
export const getLists = (quantity) => {
  return dispatch => {
    dispatch({ 
      type: GET_LISTS_START, 
      payload: quantity 
    });

    setTimeout(() => {
      const lists = [];
      let count = 0;
      for (let i = 0; i < quantity; i++) {
        const cards = [];
        const randomQuantity = Math.floor(Math.random() * (5 - 1 + 1)) + 1; // this will generate a rand number between 1 and 5
        for (let ic = 0; ic < randomQuantity; ic++) { // this for create the FAKE data array
          cards.push({
            id: count,
            name: faker.name.firstName() + " " +faker.name.lastName(),
            title: faker.name.jobTitle(),
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit vehicula curae bibendum, justo facilisi torquent",
            startDate: new Date(),
            dueDate:  new Date(autoDueDate())
          });
          count = count + 1;
        }
        lists.push({ // then its pushed in a new array for the structure
          id: i,
          name: faker.commerce.productName(),
          cards
        });
      }
      dispatch({  // this will dispatch the result data ready to be consumend
        type: GET_LISTS,
        payload: lists, 
      });
    }, 1000); // fake delay
  };
};

// function that load the local data when exist
export const loadLocal = (local) =>{
  return dispatch => {
    dispatch({ 
      type: LOAD_LOCAL, 
      payload: local 
    });
  }

}

// function that recive the info of list or colum to be edited
export const newList = (newList) =>{
  return dispatch => {
    dispatch({ 
      type: NEW_LIST, 
      payload: newList 
    });
  }

}

// function that recive the infor of the new list to be created
export const createList = (list) =>{
  return dispatch => {
    dispatch({ 
      type: CREATE_LIST, 
      payload: list 
    });
  }

}

// funection that recive the infor to create a new Card in a new list
export const createCard = (card) =>{
  return dispatch => {
    dispatch({ 
      type: CREATE_CARD, 
      payload: card 
    });
  }

}

// functioj tuat recive the info of the existent card to be deleted
export const deleteCard = (card, col) =>{
  return dispatch => {
    dispatch({ 
      type: DELETE_CARD, 
      payload: {
        card: card,
        col: col
      } 
    });
  }

}
