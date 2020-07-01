import axios from 'axios';
import {SET_CATEGORIES, FETCH_PRODUCTS, SHOW_ACTIVE_PRODUCTS, CHOICE_PAGINATION_INDEX, CLEAR_PAGINATION_INDEX, GET_SINGLE_PRODUCT} from '../types';

export function setCategories() {
	return dispatch => {
		axios
			.get(`${process.env.REACT_APP_API_KEY}/category`)
			.then(({data}) => {
				dispatch({
					type: SET_CATEGORIES,
					payload: data
				});
			})
	}
}

export function fetchProducts(category) {
	return dispatch => {
		axios
			.get(`${process.env.REACT_APP_API_KEY}/products`)
			.then(({data}) => {
				const products = category ? data.filter(product => product.category.toLowerCase() === category) : data;

				dispatch({
					type: FETCH_PRODUCTS,
					payload: products
				});

				dispatch({
					type: CLEAR_PAGINATION_INDEX
				});

				dispatch({
					type: SHOW_ACTIVE_PRODUCTS
				});
			})
	}
}

export function choicePaginationIndex(idx) {
	return dispatch => {
		dispatch({
			type: CHOICE_PAGINATION_INDEX,
			payload: idx
		});

		dispatch({
			type: SHOW_ACTIVE_PRODUCTS
		});
	}
}

export const clearPaginationIndex = () => ({
	type: CLEAR_PAGINATION_INDEX
});

export function getSingleProduct(id) {
	return dispatch => {
		axios
			.get(`${process.env.REACT_APP_API_KEY}/products`)
			.then(({data}) => {
				const product = data.find(product => product.id === id);
				
				dispatch({
					type: GET_SINGLE_PRODUCT,
					payload: product
				});
			})
	}
} 


