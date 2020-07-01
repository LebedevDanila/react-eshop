import {ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY} from '../types';
import {showAlert} from './app';

export const addToCart = item => {
	return (dispatch, getState) => {
		dispatch({
			type: ADD_TO_CART,
			payload: item
		});
		
		dispatch(showAlert('Товар добавлен в корзину!', true));

		localStorage.setItem('cart', JSON.stringify(getState().cart.items));
	}
};

export const removeFromCart = id => {
	return (dispatch, getState) => {
		dispatch({
			type: REMOVE_FROM_CART,
			payload: id
		});

		localStorage.setItem('cart', JSON.stringify(getState().cart.items));
	}
};

export const increaseQuantity = id => {
	return (dispatch, getState) => {
		dispatch({
			type: INCREASE_QUANTITY,
			payload: id
		});

		localStorage.setItem('cart', JSON.stringify(getState().cart.items));
	}
};

export const decreaseQuantity = id => {
	return (dispatch, getState) => {
		dispatch({
			type: DECREASE_QUANTITY,
			payload: id
		});

		localStorage.setItem('cart', JSON.stringify(getState().cart.items));
	}
};