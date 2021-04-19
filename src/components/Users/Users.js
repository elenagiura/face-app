import React, {setState} from 'react';
import './Users.css'
import uuid from 'react-uuid';

import {User} from './User/User';
import {Modal} from '../Modal/Modal';

export class Users extends React.Component {
	constructor(props) {
	  super();

	  this.state = {
	      users:[],
	      filterUsers:[],
	      modal: false,
	      user: {
	      	name:'',
	      	age:'',
	      	gender:''
	      },
	      change: false,
	      searching: ''
	    }
	}

	static getDerivedStateFromProps(props, state) {
		if(props.searchUser !== state.searching) {
			return {...state, searching: props.searchUser}
		}
		return null;
	}

	showUsers = () => {
		const filterUsers = this.filterUsers();
		const users = filterUsers!==null ? filterUsers : this.state.users;
		if(users.length!==0) {
			return (
				<section className="users clearfix">
				 	{users.map((user,index) => (
				    		<User key={uuid()} user={user} edit={this.editUser} clone={this.cloneUser} delete={this.deleteUser}/>
				    		)
				    	)
					}
				</section>
			)
		} else {
			return <p>X Empty data</p>;
		}
	}

	filterUsers = () => {
		if(this.state.searching !== '') {
			const filterUsers = this.state.users.filter(user => (user.name.toLowerCase().indexOf(this.state.searching))>-1);
			return filterUsers;
		} else {
			return null
		}
	}

	editUser = (changedUser, prevId) => {
		const users = this.state.users.map(user => user.id === prevId ? changedUser : user)
		this.setState({...this.state, users: users});
	}

	cloneUser = (id) => {
		const users = this.state.users
		const userForClone = users.filter(user => user.id === id)
		const index = users.indexOf(userForClone[0]);
		users.splice(index,0,{name:userForClone[0].name,age:userForClone[0].age,gender:userForClone[0].gender, errorMessage: false, id:uuid()});
		this.setState({...this.state, users: users})
	}

	deleteUser = (id) => { 
		const removedUser = this.state.users.filter(user => user.id !== id);
		this.setState({...this.state, users: removedUser});
	}

	addUser = (user) => {
		const newUsers = [user,...this.state.users];
		this.setState({...this.state, users: newUsers});
	}

	modal = (user) => {
		if (user) {
			this.setState({...this.state, modal:!this.state.modal}, ()=>this.addUser(user));
		} else {
			this.setState({...this.state, modal:!this.state.modal})
		}
	}

	showModal = (user) => this.state.modal ? <Modal close={this.modal} user={this.state.user}/> : null;

	sort = () => {
		const sortUsers = this.state.users.sort((a, b) => a.name.localeCompare(b.name));
		this.setState({...this.state, users: sortUsers})
	}

	render () {
		return (
			<main>
				<div className="wrapper">
					<div className="clearfix">
						<button id="create-new" onClick={()=>this.setState({...this.state, modal:!this.state.modal})}>ADD NEW USER</button>
						<button id="sort" onClick={this.sort}>SORT USERS BY NAME</button>
					</div>
					{this.showUsers()}
					{this.showModal()}
				</div>
			</main>
		)
	}
}