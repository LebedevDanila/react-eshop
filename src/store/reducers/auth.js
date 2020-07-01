import {LOGIN, LOGOUT} from '../types';

const initalState = {
	isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
	username: localStorage.getItem('username') || ''
}

export default function authReducer(state = initalState, action) {
	switch(action.type) {
		case LOGIN:
			return {
				...state,
				isAuth: true,
				username: action.payload
			}
		case LOGOUT:
			return {
				...state,
				isAuth: false,
				username: ''
			}
		default:
			return state
	}
}