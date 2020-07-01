import axios from 'axios';

import {LOGIN, LOGOUT} from '../types';
import {showAlert} from './app';

export function login(username) {
	return dispatch => {
		dispatch({
			type: LOGIN,
			payload: username
		});
		
		localStorage.setItem('isAuth', true);
		localStorage.setItem('username', username);
	}
}

export function logout() {
	return dispatch => {
		dispatch({
			type: LOGOUT
		});

		dispatch(showAlert('Вы вышли из аккаунта!', false));

		localStorage.setItem('isAuth', false);
		localStorage.setItem('username', '');
	}
}

export function register(user) {
	return dispatch => {
		axios.post(`${process.env.REACT_APP_API_KEY}/users`, user)

		dispatch(login(user.name));
	}
}