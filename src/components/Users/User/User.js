import React, {setState} from 'react';
import './User.css';
import {Modal} from '../../Modal/Modal'

export class User extends React.Component {
	constructor(props) {
		super();
		this.state = {
			user: {
				name: props.user.name,
				age: props.user.age,
				gender: props.user.gender,
				id: props.user.id,
			},
			prevId:props.user.id,
			modal:false,
		}
	}

	modal = (user) => {
		if (user) {
			this.setState({user:user, modal:!this.state.modal}, this.props.edit(user, this.state.prevId));
		} else {
			this.setState({...this.state, modal:!this.state.modal})
		}
	}

	showModal = () => this.state.modal ? <Modal close={this.modal} user={this.state.user}/> : null;

	render() {
		return (
			<article>
				<img src="http://placehold.jp/150x150.png" alt="User picture"/>
				<p>Name: <span>{this.state.user.name}</span></p>
				<p>Age: {this.state.user.age}</p>
				<p>Gender: {this.state.user.gender}</p>
				<div className="buttons">
					<button onClick={()=>this.setState({...this.state, modal:!this.state.modal})}>EDIT</button>
					<button onClick={()=>this.props.clone(this.state.user.id)}>CLONE</button>
					<button onClick={()=>this.props.delete(this.state.user.id)}>DELETE</button>
				</div>
				{this.showModal()}
			</article>
		)
	}
}