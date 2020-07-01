import {SET_CATEGORIES, FETCH_PRODUCTS, SHOW_ACTIVE_PRODUCTS, CHOICE_PAGINATION_INDEX, CLEAR_PAGINATION_INDEX, GET_SINGLE_PRODUCT} from '../types';

const initalState = {
	categories: [],
	products: [],
	activeProducts: [],
	isLoadingProducts: true,
	paginationIndex: 1,
	singleProduct: {}
}

export default function shopReducer(state = initalState, action) {
	switch(action.type) {
		case SET_CATEGORIES:
			return {
				...state,
				categories: action.payload
			}
		case FETCH_PRODUCTS:
			return {
				...state,
				products: action.payload,
				isLoadingProducts: false
			}
		case SHOW_ACTIVE_PRODUCTS:
			return {
				...state,
				activeProducts: state.products.filter((product, idx) => (idx < (state.paginationIndex * 6)) && idx >= (state.paginationIndex * 6 - 6))
			}
		case CHOICE_PAGINATION_INDEX:
			return {
				...state,
				paginationIndex: action.payload
			}
		case CLEAR_PAGINATION_INDEX:
			return {
				...state,
				paginationIndex: 1
			}
		case GET_SINGLE_PRODUCT:
			return {
				...state,
				singleProduct: action.payload
			}
		default:
			return state
	}
}