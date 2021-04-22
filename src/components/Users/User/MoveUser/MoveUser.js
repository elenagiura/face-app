import React from 'react';
import './MoveUser.css';

export class MoveUser extends React.Component {
	constructor(props) {
		super();
	}

	render() {
		return (
			<div className="move-user">
				<button onClick={()=>this.props.move('previous', this.props.id)}>{`${this.props.layout==="grid" ? '<' : 'Move up'}`}</button>
				<button onClick={()=>this.props.move('next', this.props.id)}>{`${this.props.layout==="grid" ? '>' : 'Move down'}`}</button>
			</div>
		)
	}
}