import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import validate from '../../utils/validate';
import { register } from '../../store/actions/auth';
import { showAlert } from '../../store/actions/app';

class Register extends Component {
	state = {
		values: {
			name: '',
			email: '',
			password: ''
		},
		errors: {
			name: false,
			email: false,
			password: false
		}
	}

	registerHandler = e => {
		e.preventDefault();

		const newErrors = validate('register', this.state.values);

		if(Object.keys(newErrors).length) {
			this.setState(state => ({
	    	...state,
				errors: {
					...state.errors,
					...newErrors
				}
	    }));

	    return false;
		}

		axios
			.get(`${process.env.REACT_APP_API_KEY}/users`)
			.then(({data}) => {
				const {name, email, password} = this.state.values;
				
				const candidate = data.find(user => user.name === name && user.password === password);
				
				if(!candidate) {
					this.props.register({
						id: Date.now(),
						name,
						email,
						password
					});

					this.props.history.push('/');

					this.props.showAlert('Вы успешно зарегистрировались!', true);
				}
				else {
					this.props.showAlert('Такой пользователь уже есть!', false);
				}
			})
	}
	
	changeHandler = e => {
		const name = e.target.name;
    const value = e.target.value;

    const newValues = {
      ...this.state.values,
      [name]: value
    }

    const newErrors = {
      ...this.state.errors,
      [name]: false
    }

    this.setState(state => ({
    	...state,
			values: newValues,
			errors: newErrors
    }));
	}

  render() {
    return (
			<div className="col-sm-4">
				<div className="signup-form">
					<h2>New User Signup!</h2>
					<form onSubmit={this.registerHandler}>
						<input
							name="name"
							type="text"
							placeholder="Name"
							value={this.state.values.name}
							onChange={this.changeHandler}
						/>
						{this.state.errors.name && <span className="invalid">{this.state.errors.name}</span>}
						<input
							name="email"
							type="text"
							placeholder="Email Address"
							value={this.state.values.email}
							onChange={this.changeHandler}
						/>
						{this.state.errors.email && <span className="invalid">{this.state.errors.email}</span>}
						<input
							name="password"
							type="password"
							placeholder="Password"
							value={this.state.values.password}
							onChange={this.changeHandler}
						/>
						{this.state.errors.password && <span className="invalid">{this.state.errors.password}</span>}
						<button type="submit" className="btn btn-default">Signup</button>
					</form>
				</div>
			</div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
	register: user => dispatch(register(user)),
	showAlert: (text, status) => dispatch(showAlert(text, status))
});

export default withRouter( connect(null, mapDispatchToProps)(Register) );

/*
<input
  name="agreement"
	type="checkbox"
	className="checkbox"
	checked={this.state.fields.agreement}
	onChange={this.changeHandler}
/> 
*/