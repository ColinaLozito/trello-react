import React, { Component } from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div `
	border: 1px solid lightgrey;
	padding: 8px;
	margin-bottom: 8px;
	margin-left: 5px;
	margin-right: 5px;
	background: ${props=>(props.isDragging ?'lightgrey' : 'white')}

	.red {
		background: #ff3f3f;
		color: white
	}
	.green {
		background: #73d069;
	}
` 
const Start = styled.div `
	p {
		display: inline-block;
	}
`
const Delete = styled.div `
	border: 2px solid lightgrey;
	width: 15px;
	text-align: center
	display: inline-block;
	float:right;
`

class Task extends Component {

	componentWillMount(){
		this.dateFormater(this.props.task.startDate)
	}

	// method that format the date
	dateFormater(date){
		let tt = date;

	    let date2 = new Date(tt);
	    let newdate = new Date(date2);

	    newdate.setDate(newdate.getDate() + 3);
	    
	    let dd = newdate.getDate();
	    let mm = newdate.getMonth() + 1;
	    let y = newdate.getFullYear();
	    let hh = newdate.getHours();
	    let min = newdate.getMinutes();
	    let minutes = (9 > min ? '0'+min : min)
	    let someFormattedDate = mm+'/'+dd+'/'+y+' - '+hh+'H:'+minutes+' min';

	    return someFormattedDate

	}

	// method that check if the due date has passed or not
	dueDateCalculator(d){

		if (this.props.task.length !== 0 ) {
			let current = new Date().getTime();
			let due = new Date(d).getTime();
			let result = current > due ? 'red' : 'green';
			return result; 
		}
	}

	// mothod that delete a card
	deleteCard(e){
		e.preventDefault()
		this.props.deleteCard(this.props.task.id, this.props.column.id) // send the properties to the action 
		
	}

	render(){
		return(
			<Draggable draggableId={this.props.task.id} index={this.props.index} >
				{(provided, snapshot) => (
					<Container
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						innerRef={provided.innerRef}
						isDragging={snapshot.isDragging}
					>	
					<div>
						<Delete onClick={this.deleteCard.bind(this)}>
							X
						</Delete>
						<p><strong>Assigned to:</strong> {this.props.task.name}</p>
						<p><strong>Title:</strong> {this.props.task.title}</p>
						<p><strong>Description:</strong> {this.props.task.description}</p>
						<div className={this.dueDateCalculator(this.props.task.dueDate)}>
							<Start>
								<p><strong>Start Date:</strong></p>
								<p>{this.dateFormater(this.props.task.startDate)}</p>
							</Start>
							<Start>
								<p><strong>Due Date:</strong></p>
								<p>{this.dateFormater(this.props.task.dueDate)}</p>
							</Start>
						</div>
					</div>
					</Container>
				)}
			</Draggable>
		) 

	}

}

export default Task