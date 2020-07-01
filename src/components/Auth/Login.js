import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import validate from '../../utils/validate';
import { login } from '../../store/actions/auth';
import { showAlert } from '../../store/actions/app';

class Login extends Component {
	state = {
		values: {
			name: '',
			password: ''
		},
		errors: {
			name: false,
			password: false
		}
	}

	loginHandler = e => {
		e.preventDefault();

		const newErrors = validate('login', this.state.values);

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
				const {name, password} = this.state.values;
				
				const candidate = data.find(user => user.name === name && user.password === password);
				
				if(candidate) {
					this.props.login(this.state.values.name);
					
					this.props.history.push('/');

					this.props.showAlert('Вы успешно вошли в аккаунт!', true);
				}
				else {
					this.props.showAlert('Такого пользователя нету!', false);
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
			<div className="col-sm-4 col-sm-offset-1">
				<div className="login-form">
					<h2>Login to your account</h2>
					<form onSubmit={this.loginHandler}>
						<input
							name="name"
							type="text"
							placeholder="Name"
							value={this.state.values.name}
							onChange={this.changeHandler}
						/>
						{this.state.errors.name && <span className="invalid">{this.state.errors.name}</span>}
						<input
							name="password"
							type="password"
							placeholder="Password"
							value={this.state.values.password}
							onChange={this.changeHandler}
						/>
						{this.state.errors.password && <span className="invalid">{this.state.errors.password}</span>}
						<button type="submit" className="btn btn-default">Login</button>
					</form>
				</div>
			</div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
	login: username => dispatch(login(username)),
	showAlert: (text, status) => dispatch(showAlert(text, status))
});

export default withRouter( connect(null, mapDispatchToProps)(Login) );