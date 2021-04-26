import React, {setState} from 'react';
import './Modal.css'

export class Modal extends React.Component {
	constructor (props) {
		super();

		this.state={
			name: props.user.name,
			age: props.user.age,
			gender:props.user.gender,
			id:props.user.id,
			errorMessage:false,
		}
	}

	storeData = (data, stateProp) => this.setState({[stateProp]:data});

	displayError = () => this.state.errorMessage ? <div className="error-message">You didn't enter all datas!<button onClick={this.validator} >X</button></div> : null;

	validator = () => {
		if (this.state.name==='' || this.state.age==='' || this.state.gender==='') {
			this.storeData(!this.state.errorMessage, "errorMessage");
		} else {
			this.props.close(this.state);
		}
	}

	render() {
		return (
			<section className="modal">
				<div className="container">
					<p>Create New User</p>
					<label className="name  clearfix">Name:
						<input type="text" onChange={e => this.storeData(e.target.value, 'name')} name="name" value={this.state.name}/>
					</label>
					<label className="age  clearfix">Age:
					<input type="number" onChange={e => this.storeData(e.target.value, 'age')} name="age" min="0" value={this.state.age}/>
					</label>
					<div className="gender  clearfix">Gender:
						<span><input className="radio" onChange={e => this.storeData(e.target.value, 'gender')} type="radio" name="gender" value="Male"/>Male</span>
						<span><input className="radio" onChange={e => this.storeData(e.target.value, 'gender')} type="radio" name="gender" value="Female"/>Female</span>
					</div>
					{this.displayError()}
					<button onClick={()=>this.props.close(null)}>CLOSE</button>
					<button onClick={this.validator}>SAVE</button>
				</div>
			</section>
		)
	}
}