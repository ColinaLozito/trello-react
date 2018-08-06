import React, { Component } from 'react';
import styled from 'styled-components';

// 
export const Form = styled.form `
	margin: 10px;

	input[type=text], select {
	    width: 100%;
	    padding: 12px 20px;
	    margin: 8px 0;
	    display: inline-block;
	    border: 1px solid #ccc;
	    border-radius: 4px;
	    box-sizing: border-box;
	}
	
	input[type=submit] {
	    width: 100%;
	    background-color: #4c95af;
	    color: white;
	    padding: 14px 20px;
	    margin: 8px 0;
	    border: none;
	    border-radius: 4px;
	    cursor: pointer;
	}

	input[type=submit]:hover {
	    background-color: #4c9500;
	}

	p {
		color: white
	}
	
`

// object that create a new list form
class NewList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handdleSubmit(e){
		e.preventDefault();
		const myList = []
		myList.push(this.state.value)
		this.props.createList(myList);
	}

	render(){
		return(
			<div>
				<Form onSubmit={this.handdleSubmit.bind(this)}>
    				<input type="text" name="lname" placeholder="List Name" required value={this.state.value} onChange={this.handleChange.bind(this)} maxLength="20" />
    				<input type="submit" value="Submit" />
				</Form>
			</div>
		)
	}
}

export default NewList