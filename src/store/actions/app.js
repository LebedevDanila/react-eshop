import {TOGGLE_CURRENCY, SHOW_ALERT, HIDE_ALERT} from '../types';

export function toggleCurrency(currencyName) {
	return dispatch => {
		dispatch({
			type: TOGGLE_CURRENCY,
			payload: currencyName
		});
		
		const alertText = currencyName === 'RUB' ? 'Валюта успешна изменена!' : 'The currency is changed successfully!';

		dispatch(showAlert(alertText, true));
	}
}

export function showAlert(text, status) {
	return dispatch => {
		dispatch({ 
			type: SHOW_ALERT, 
			payload: { text, status } 
		});

		setTimeout(() => { 
			dispatch(hideAlert()); 
		}, 2500);	
	}
}

export function hideAlert() {
	return {
		type: HIDE_ALERT
	}
}