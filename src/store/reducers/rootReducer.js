import {combineReducers} from 'redux';

import app from './app';
import shop from './shop';
import auth from './auth';
import cart from './cart';

export default combineReducers({
	app, shop, auth, cart
})