import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext } from  'react-beautiful-dnd';


import { getLists, newList, deleteCard, loadLocal } from '../../actions/lists';

import Column from './Column';

const Container = styled.div `
  font-family: monospace;
  display: flex;
  margin-top: 50px; 
`

// rincipal component
class Board extends Component {

  componentDidMount() {

    // check if local storage exist. if not load the get list function
    if (localStorage.getItem('boardLocal') !== null) { 
      const mydata = JSON.parse(localStorage.getItem('boardLocal'));
      this.props.loadLocal(mydata)
    }else{
      console.log('get list')
      this.props.getLists(3); // generete 3 fakes datas
    }
  

  }

  // method  that render the list or colum component
  getData(){
    if (this.props.lists !== undefined) {
      return this.props.lists.map((item)=>{
        const column = this.props.lists[item.id]
        const tasks = column.cards;

        return <Column {...this.props} key={column.id} column={column} tasks={tasks} />
      })
    }
  }

  // method of the react-beautiful-dnd library that ondrag action change the background color
  onDragStart = () => {
    document.body.style.color = 'blue'
  }

  // method of the react-beautiful-dnd that do something while the drag actions is executin
  onDragUpdate = update => {
    const {destination} = update;
    const opacity = destination ? (destination.index / Object.keys(this.props.lists[destination.droppableId].cards).length) : 0;
      document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})}`;

  }

  // method of the react-beautiful-where you can make the operations when the drag actions ir over
  onDragEnd = result => {

    document.body.style.color = 'inherit' // restore the background color
    const { destination, source, draggableId } = result;
    if (!destination){ // validate if the card is dragged in the same list
      return;
    }
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index
    ){
      return;
    }

    const start = this.props.lists[source.droppableId]
    const finish = this.props.lists[destination.droppableId]
    
    if (start === finish) {  // validate if a card whas dragged in the same list
      const newTaskIds = Array.from(start.cards)

      newTaskIds.splice(source.index, 1); // remove the card from the current position
      newTaskIds.splice(destination.index, 0, start.cards[source.index]) // insert the card on the destination

      const newColumn = { // create a new object state
        ...start,
        cards: newTaskIds,
      }
      
      this.props.newList(newColumn) // send the object to the redux state handler to update the sate
    } else {
      // check if the card whas dragged to another other list
      const startTaskIds = Array.from(start.cards)
      const startTaskIds2 = Array.from(start.cards)
      startTaskIds.splice(source.index, 1) //delete the card from the list
      const newStart = { // create a new object without the card
        ...start,
        cards: startTaskIds,
      }
      
      this.props.newList(newStart) // update the list in the redux action

      const finishTaskIds = Array.from(finish.cards);
      const obj = startTaskIds2.find((obj) => { // find the column of the card destination
        return obj.id === draggableId; 
      });

      finishTaskIds.splice(destination.index, 0, obj) // incert the card in the destination position
      const newFinish = { // create a new object
        ...finish,
        cards: finishTaskIds,
      }
      this.props.newList(newFinish) // update the list in the redux action
    }
  }

  boardWidth(){
    if (this.props.lists !== undefined) {
      let boardWidth = {width: ""+this.props.lists.length*320+'px'}
      return boardWidth
    }
  }

  render() {
    return (
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
      <div style={this.boardWidth()}>

        <Container>
          {this.getData()}
        </Container>
      </div>
      </DragDropContext>
    )
  }
}


const mapStateToProps = state => ({
  lists: state.lists.data
})

const mapDispatchToProps = dispatch => ({
 getLists: (q) => dispatch(getLists(q)),
 newList: (nl) => dispatch(newList(nl)),
 deleteCard: (card, col) => dispatch(deleteCard(card, col)),
 loadLocal: (local) => dispatch(loadLocal(local))

})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
