import React, {setState} from 'react';
import './Users.css'
import uuid from 'react-uuid';

import {User} from './User/User';
import {Modal} from '../Modal/Modal';

const url='https://face-app-7a95f-default-rtdb.firebaseio.com/data';

export class Users extends React.Component {
	constructor(props) {
	  super();

	  this.state = {
	      users:[],
	      modal: false,
	      user: {
	      	name:'',
	      	age:'',
	      	gender:''
	      },
	      layout: 'grid',
	      chencked: false,
	      checkedLayout: false,
	      moveUser: false
	    }
	}

	componentDidMount() {
		this.getUsers();
	}

	showUsers = () => {
		const users = this.props.searchUser ? this.filterUsers() : this.state.users;
		if(users.length!==0) {
			return (
				<section className="users clearfix">
				 	{users.map((user,index) => (
				    		<User key={uuid()} user={user} edit={this.editUser} clone={this.cloneUser} delete={this.deleteUser} layout={this.state.layout} moveUser={this.state.moveUser? this.state.moveUser:null} move={this.move}/>
				    		)
				    	)
					}
				</section>
			)
		} else {
			return <p>X Empty data</p>;
		}
	}

	move = (position,id) => {
		const userForMove = this.state.users.find(user => user.id===id);
		const index = this.state.users.indexOf(userForMove);
		if (position==="previous") {
			if(index !== 0) {
				this.state.users.splice(index,1)
				this.state.users.splice(index-1,0,userForMove)
				this.setState({users:this.state.users, chencked: false})
			}
		} else {
			if(index !== this.state.users.length-1) {
				this.state.users.splice(index,1)
				this.state.users.splice(index+1,0,userForMove)
				this.setState({users:this.state.users, chencked: false})
			}
		}
	}

	filterUsers = () => this.state.users.filter(user => (user.name.toLowerCase().indexOf(this.props.searchUser))>-1);

	editUser = (user) => {
		fetch(`${url}/${user.id}.json`, {
			method: 'PATCH',
			body: JSON.stringify(user)
		})
		.then(data => data.status===200 && this.getUsers())
	}

	cloneUser = (user) => this.addUser(user);

	deleteUser = (user) => { 
		fetch(`${url}/${user.id}.json`, {
			method:'DELETE',
		})
		.then(data => data.status===200 && this.getUsers())
	}

	addUser = (user) => {
		fetch(`${url}.json`, {
			method: 'POST',
			body: JSON.stringify(user)
		})
		.then(data => data.status===200 && this.getUsers())
	}

	getUsers = () => {
		fetch(`${url}.json`)
		.then(data => data.json())
		.then(results => {
			const newUsers = [];
			for(const result in results) {
				newUsers.unshift({
					...results[result], id:result
				})
			}
			console.log(newUsers)
			this.setState({users:newUsers})
		})
	}

	modal = (user) => {
		if (user) {
			this.setState({modal:!this.state.modal}, ()=>this.addUser(user));
		} else {
			this.setState({modal:!this.state.modal})
		}
	}

	showModal = (user) => this.state.modal ? <Modal close={this.modal} user={this.state.user}/> : null;

	sort = () => {
		const sortUsers = this.state.users.sort((a, b) => a.name.localeCompare(b.name));
		this.setState({...this.state, users: sortUsers, chencked:true})
	}

	changeLayout = (type) => type ? this.setState({layout: 'list', checkedLayout: true}) : this.setState({layout: 'grid', checkedLayout: false})

	render () {
		return (
			<main className="clearfix">
				<div className="wrapper">
					<div className="clearfix">
						<button id="create-new" onClick={()=>this.setState({modal:!this.state.modal})}>ADD NEW USER</button>
						<button id="sort" className={`${this.state.chencked ? 'chencked': ''}${this.state.users.length<=1?'hidden':''}`} onClick={this.sort}>SORT USERS BY NAME</button>
						<button id="move-item" className={`${this.state.moveUser ? 'chencked': ''}${this.state.users.length<=1?'hidden':''}`} onClick={()=> this.setState({moveUser: !this.state.moveUser})}>MOVE USER</button>
						<div className={`layout clearfix ${this.state.users.length?'':'hidden'}`}>
							<button id="list" className={`${this.state.checkedLayout ? 'chencked' : ''}`} onClick={() => this.changeLayout(true)}>LIST</button>
							<button id="grid" className={`${!this.state.checkedLayout ? 'chencked' : ''}`} onClick={() => this.changeLayout(false)}>GRID</button>
						</div>
					</div>
					{this.showUsers()}
					{this.showModal()}
				</div>
			</main>
		)
	}
}