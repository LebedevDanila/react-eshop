import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import { addToCart, increaseQuantity } from '../../../store/actions/cart';
import { showAlert } from '../../../store/actions/app';

class Item extends Component {
	handlerAddToCart(product) {
		const { itemsInCart, addToCart, showAlert, increaseQuantity } = this.props;
		
		const foundItem = itemsInCart.find(el => el.id === product.id);

    if(!foundItem) {
      addToCart({
				id: product.id,
				name: product.name,
				image: product.images[0],
				price: product.price,
				quantity: 1
			});
    } else {
      increaseQuantity(product.id);

			showAlert('Товар снова добавлен в корзину!', true);
    }
	} 

  render() {
		const {product, currentCurrency} = this.props;

    return (
      <div className="col-sm-4">
				<div className="product-image-wrapper">
					<div className="single-products">
							<div className="productinfo text-center">
								<img src={product.images[0]} alt="" />
								<h2>
									{currentCurrency === 'RUB' ? (
										'₽' + product.price * 70
									) : (
										'$' + product.price
									)}
								</h2>
								<p>{product.name}</p>
								<div className="btn btn-default add-to-cart" onClick={() => this.handlerAddToCart(product)}>
									<i className="fa fa-shopping-cart"></i> Add to cart
								</div>
							</div>
							<div className="product-overlay">
								<div className="overlay-content">
									<h2>
										{currentCurrency === 'RUB' ? (
											'₽' + product.price * 70
										) : (
											'$' + product.price
										)}
									</h2>
									<p>{product.name}</p>
									<Link className="btn btn-default details" to={`/category/${product.category.toLowerCase()}/${product.id}`}>
										<i className="fa fa-arrow-left"></i> Details
									</Link>
									<div className="btn btn-default add-to-cart" onClick={() => this.handlerAddToCart(product)}>
										<i className="fa fa-shopping-cart"></i> Add to cart
									</div>
								</div>
							</div>
					</div>
				</div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
	currentCurrency: state.app.currentCurrency,
	itemsInCart: state.cart.items
});

const mapDispatchToProps = dispatch => ({ 
	addToCart: item => dispatch(addToCart(item)),
	increaseQuantity: id => dispatch(increaseQuantity(id)),
	showAlert: (text, status) => dispatch(showAlert(text, status))
});


export default connect(mapStateToProps, mapDispatchToProps)(Item);
