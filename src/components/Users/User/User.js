import React, {setState} from 'react';
import './User.css';
import {Modal} from '../../Modal/Modal';
import {MoveUser} from './MoveUser/MoveUser';

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
			modal:false,
			layout: props.layout
		}
	}

	modal = (user) => {
		if (user) {
			this.setState({user:user, modal:!this.state.modal}, this.props.edit(user));
		} else {
			this.setState({modal:!this.state.modal})
		}
	}

	showModal = () => this.state.modal ? <Modal close={this.modal} user={this.state.user}/> : null;

	render() {
		return (
			<article className={`clearfix ${this.props.layout}`}>
				<img src="http://placehold.jp/150x150.png" alt="User picture"/>
				<div className='infos'>
					<p>Name: <span>{this.state.user.name}</span></p>
					<p>Age: {this.state.user.age}</p>
					<p>Gender: {this.state.user.gender}</p>
				</div>
				{this.props.moveUser ? <MoveUser move={this.props.move} id={this.state.user.id} layout={this.props.layout}/> : null}
				<div className="buttons">
					<button onClick={()=>this.setState({modal:!this.state.modal})}>EDIT</button>
					<button onClick={()=>this.props.clone(this.state.user)}>CLONE</button>
					<button onClick={()=>this.props.delete(this.state.user)}>DELETE</button>
				</div>
				{this.showModal()}
			</article>
		)
	}
}