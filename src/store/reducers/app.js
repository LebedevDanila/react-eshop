import {SHOW_ALERT, HIDE_ALERT, TOGGLE_CURRENCY} from '../types';

const initalState = {
	alert: {
		text: '',
		isOpen: false,
		status: null
	},
	currencies: ['USD', 'RUB'],
	currentCurrency: 'USD'
}

export default function appReducer(state = initalState, action) {
	switch(action.type) {
		case SHOW_ALERT:
			return {
				...state,
				alert: {
					text: action.payload.text,
					isOpen: true,
					status: action.payload.status
				}
			}
		case HIDE_ALERT:
			return {
				...state,
				alert: {
					text: '',
					isOpen: false,
					status: null
				}
			}
		case TOGGLE_CURRENCY:
			return {
				...state,
				currentCurrency: action.payload
			}
		default:
			return state
	}
}