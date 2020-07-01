import React, {Component} from 'react';
import {connect} from 'react-redux';

import Item from '../components/Cart/Item';

class Cart extends Component {
  render() {
    return (
			<section id="cart_items">
				<div className="container">
					<div className="table-responsive cart_info">
						<table className="table table-condensed">
							<thead>
								<tr className="cart_menu">
									<td className="image">Item</td>
									<td className="description">Description</td>
									<td className="price">Price</td>
									<td className="quantity">Quantity</td>
									<td className="total">Total</td>
									<td></td>
								</tr>
							</thead>
							<tbody>
								{this.props.items.length ? (
									this.props.items.map((item, idx) => <Item key={idx} item={item} />)
								) : (
									<tr><td className="cart_empty" colSpan="12"><h2>Корзина Пуста!</h2></td></tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</section>
    );
  }
}

const mapStateToProps = state => ({
	items: state.cart.items
});

export default connect(mapStateToProps)(Cart);