import React from 'react';
import './Header.css'

export class Header extends React.Component {

	constructor (props) {
		super();

		this.state = {
			inputValue: ''
		}
	}

	onChange = (e) => this.setState({inputValue: e.target.value}); 

	render () {
		return (
			<header>
				<div className="wrapper clearfix">
					<div id="logo"><span>FACE</span>App</div>
					<section id="search-section">
						<input type='text' onChange={this.onChange} name='search' placeholder='Search for user' value={this.state.inputValue}/>
						<button onClick={()=>this.props.search(this.state.inputValue)}>SEARCH</button>
					</section>
				</div>
			</header>
		)
	}
}