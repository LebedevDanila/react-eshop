import React, {Component} from 'react';
import {connect} from 'react-redux';

import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../store/actions/cart';

class Item extends Component {
  render() {
  	const { item, currentCurrency, removeFromCart, increaseQuantity, decreaseQuantity } = this.props;

    return (
			<tr>
				<td className="cart_product">
					<div><img src={item.image} alt={item.name} /></div>
				</td>
				<td className="cart_description">
					<h4><div>{item.name}</div></h4>
					<p>Web ID: {item.id}</p>
				</td>
				<td className="cart_price">
					<p>{'$' + item.price}</p>
				</td>
				<td className="cart_quantity">
					<div className="cart_quantity_button">
						<div
							className="cart_quantity_down"
							onClick={() => item.quantity !== 1 && decreaseQuantity(item.id)}
						> - </div>
						<input
							className="cart_quantity_input"
							type="text"
							name="quantity"
							size="2"
							value={item.quantity}
							onChange={(e) => console.log(e.target.value)}
						/>
						<div
							className="cart_quantity_up"
							onClick={() => increaseQuantity(item.id)}
						> + </div>
					</div>
				</td>
				<td className="cart_total">
					<p className="cart_total_price">
						{currentCurrency === 'RUB' ? (
							'₽' + item.price * item.quantity * 70
						) : (
							'$' + item.price * item.quantity
						)}
					</p>
				</td>
				<td className="cart_delete" onClick={() => removeFromCart(item.id)}>
					<div className="cart_quantity_delete"><i className="fa fa-times"></i></div>
				</td>
			</tr>
    );
  }
}

const mapStateToProps = state => ({
	currentCurrency: state.app.currentCurrency
});

const mapDispatchToProps = dispatch => ({
	removeFromCart: id => dispatch(removeFromCart(id)),
	increaseQuantity: id => dispatch(increaseQuantity(id)),
	decreaseQuantity: id => dispatch(decreaseQuantity(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);