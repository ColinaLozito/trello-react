import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import NewList from '../Forms/NewList'
import NewCard from '../Forms/NewCard'

import { createList, createCard } from '../../actions/lists';

export const Button = styled.button `
	background-color: transparent;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    width: 100%;
    font-family: monospace;
`

const Toggle = styled.div `
	.hiden {
		display: none;
	}
	.show {
		display:block;
	}
`

const Content = styled.div `
	nav{
	    position:fixed;
	    top:0;
	    left:0;
	    width:250px;
	    height:100%;
	    margin:0 0 0 -250px;
	    -moz-transition:all 200ms ease-in;
	    -webkit-transition:all 200ms ease-in;
	    -o-transition:all 200ms ease-in;
	    transition:all 200ms ease-in;
	    font-family: monospace;
	}
	nav ul{
	    width:250px;
	    height:100%;
	    padding:0;
	    margin:0;
	    list-style:none;
	    background:#222;
	    overflow:hidden;
	}
	nav li{
	    margin:0;
	}
	nav a{
	    color:#fff;
	    font-size:1em;
	    text-decoration:none;
	    display:block;
	    padding:12px 15px;
	    font-weight:300;
	    letter-spacing:2px;
	    border-bottom:1px solid #333;
	}
	nav a:hover{
	    background:#111;
	}
	label{
	    display:block;
	    font-weight:700;
	    background:#1ea1b8;
	    width:42px;
	    height:42px;
	    line-height:42px;
	    color:#fff;
	    text-align:center;
	    font-size:2em;
	    line-height:1.1em;
	    position:fixed;
	    top:10px;
	    left:10px;
	    -moz-transition:all 200ms ease-in;
	    -webkit-transition:all 200ms ease-in;
	    -o-transition:all 200ms ease-in;
	    transition:all 200ms ease-in;
	    z-index:500;
	}
	input[type="checkbox"]{
	    display:none;
	}
	input[type="checkbox"]:checked ~ nav{
	    margin:0;
	}
	input[type="checkbox"]:checked ~ label{
	    left:260px;
	}
	input[type="checkbox"]:checked ~ section{
	    -webkit-transform:translate3d(260px, 0, 0);
	    -moz-transform:translate3d(260px, 0, 0);
	    -o-transform:translate3d(260px, 0, 0);
	    transform:translate3d(260px, 0, 0);
}
`

class Header extends Component {

	constructor() {
	    super();
	    this.state = {
	      taskForm: false,
	      cardForm: false
	    };
	 }
	    

	toggleTaskForm() { // form toggle
		this.setState({
			taskForm: !this.state.taskForm,
			cardForm: false
		});
	}

	toggleCardForm() { // form toggle
		this.setState({
			cardForm: !this.state.cardForm,
			taskForm: false
		});
	}

	render() {
		return (
			<Content>
				<div className="Nav">
					<div className="wrapper">
					    <input type="checkbox" id="navigation" />
					    <label htmlFor="navigation">
					        +
					    </label>
					    <nav>
					        <ul>
					            <li>
					                <a >Home</a>
					            </li>
					            <li>
					                <Button onClick={this.toggleTaskForm.bind(this)}><p>Create List</p></Button>
					                <Toggle>
						                <div className={this.state.taskForm === false ? 'hiden' : 'show'}>
						                	<NewList {...this.props}/>
						                </div>
						            </Toggle>
					            </li>
					            <li>
						            <Button onClick={this.toggleCardForm.bind(this)}><p>Create List</p></Button>
						            <Toggle>
						                <div className={this.state.cardForm === false ? 'hiden' : 'show'}>
						                	<NewCard {...this.props}/>
						                </div>
						            </Toggle>
					            </li>
					        </ul>
					    </nav>
					</div>
				</div>
		  </Content>
		)
	}
}

// set the state in the component
const mapStateToProps = state => ({
  lists: state.lists.data
})

// map the dispatch actions
const mapDispatchToProps = dispatch => ({
 createList: (l) => dispatch(createList(l)),
 createCard: (c) => dispatch(createCard(c))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

