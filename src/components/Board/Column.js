import React, { Component } from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';

import Task from './Task'

const Container = styled.div `
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
  	width: 300px;

  	display: flex;
  	flex-direction: column;
`
const Title = styled.h3 `
	padding: 8px;
`
const TaskList = styled.div `
	paddin: 8px;
	background-color: ${props=>(props.isDraggingOver ? 'lightblue' : 'white')}
	flex-grow: 1;
	ming-height: 100px;
`

class Column extends Component{

	deleteColumn(){
		// method that delete a list or column
	}

	render(){
		return(
			<Container>	
				<Title>{this.props.column.name}</Title>
				<Droppable droppableId={this.props.column.id.toString()}>
				{(provided, snapshot) => (
					<TaskList
						innerRef={provided.innerRef}
						{...provided.droppableProps}
						isDraggingOver={snapshot.isDraggingOver}
					>
						{this.props.tasks.map( (task, i) => (
							<Task {...this.props} key={task.id} task={task} index={i} />)
						)}
						{provided.placeholder}
					</TaskList>
				)}
				</Droppable>
			</Container>	
		)
	}

}

export default Column