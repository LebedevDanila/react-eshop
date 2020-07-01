import {ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY} from '../types';

const initalState = {
	items: JSON.parse(localStorage.getItem('cart')) || []
}

export default function cartReducer(state = initalState, action) {
	switch(action.type) {
		case ADD_TO_CART:
			return {
				items: [...state.items, action.payload]
			}
		case REMOVE_FROM_CART:
			return {
				items: state.items.filter(item => item.id !== action.payload)
			}
		case INCREASE_QUANTITY:
			return {
				items: state.items.map(item => item.id === action.payload ? {...item, quantity: item.quantity+1} : item)
			}
		case DECREASE_QUANTITY:
			return {
				items: state.items.map(item => item.id === action.payload ? {...item, quantity: item.quantity-1} : item)
			}
		default:
			return state
	}
}