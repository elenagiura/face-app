import React from 'react';
import './App.css';

import { Header } from './components/Header/Header';
import { Users } from './components/Users/Users';

export class App extends React.Component {

	constructor() {
		super();

		this.state = {
			value:''
		}
	}

	search = (value) => this.setState({value:value});

	render() {
	  return (
	    <>
	      <Header search={this.search}/>
	      <Users searchUser={this.state.value.toLowerCase()}/>
	    </>
	  )
	}
}
