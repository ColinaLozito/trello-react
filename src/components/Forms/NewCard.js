import React, { Component } from 'react';
import { Form } from './NewList';

// object that show the form to create new Card
class NewCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			title: '',
			description: '',
			list: '',
			startDate: '',
			dueDate: ''
		};
	}

	handleName(event) {
		this.setState({name: event.target.value});
	}

	handleTitle(event) {
		this.setState({title: event.target.value});
	}

	handleDescription(event) {
		this.setState({description: event.target.value});
	}

	handleLists(event) {
		this.setState({list: event.target.value});
	}

	handleStartDate(event) {
		this.setState({startDate: event.target.value});
	}

	handleDueDate(event) {
		this.setState({dueDate: event.target.value});
	}

	handleOption(){ // generate a correct list of the availables lists
		let options = [];
		if (this.props.lists !== undefined) {
			this.props.lists.map((list, i)=>{
				options.push(
					<option key={i} id={list.id} value={list.id}>{list.name}</option>
				)
				return list
			})
			return options;
		}
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.createCard(this.state)
	}


	render(){
		return(
			<div>
				<Form onSubmit={this.handleSubmit.bind(this)}>
    				<input type="text" name="lname" placeholder="Assigned to ..." required value={this.state.name} onChange={this.handleName.bind(this)} maxLength="20" />
    				<input type="text" name="lname" placeholder="Card title" required value={this.state.title} onChange={this.handleTitle.bind(this)} maxLength="20" />
    				<input type="text" name="lname" placeholder="Card Description" required value={this.state.description} onChange={this.handleDescription.bind(this)} maxLength="100" />
    				<p>List to asign</p>
				    <select onChange={this.handleLists.bind(this)} name="country" required>
				    	<option >Select a List</option>
				      {this.handleOption()}
				    </select>
				    <p>Start Date</p>
    				<input type="datetime-local" name="startdate" onChange={this.handleStartDate.bind(this)}/>
				    <p>Due Date</p>
    				<input type="datetime-local" name="duedate" onChange={this.handleDueDate.bind(this)}/>
    				<input type="submit" value="Submit" />
				</Form>
			</div>
		)
	}

}

export default NewCard