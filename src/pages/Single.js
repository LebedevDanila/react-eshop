import React, {Component} from 'react';
import {connect} from 'react-redux';

import Sidebar from '../components/Shop/Sidebar';

import {getSingleProduct} from '../store/actions/shop';
import {addToCart, increaseQuantity} from '../store/actions/cart';
import {showAlert} from '../store/actions/app';

class Single extends Component {
	state = {
		mainImage: '',
		images: [],
		indexScroll: 0,
		scrolledImages: 0,
		distanceScroll: 0
	}

	componentDidMount() {
		this.props.getSingleProduct(this.props.match.params.id);
	}

	componentDidUpdate(prevProps) {
	  if (this.props.singleProduct !== prevProps.singleProduct) {
	  	this.setState(state => ({
				...state,
				mainImage: this.props.singleProduct.images[0],
				images: this.props.singleProduct.images
			}));
	  }
	}

	changeImage = src => {
		this.setState(state => ({
			...state,
			mainImage: src
		}));
	}

	leftScrollImages = () => {
		if(this.state.indexScroll !== 0) {
			this.setState(state => ({
				...state,
				indexScroll: state.indexScroll - 1,
				distanceScroll: state.distanceScroll + 99
			}));
		}
	}

	rightScrollImages = () => {
		if((3 + this.state.indexScroll) < this.state.images.length) {
			this.setState(state => ({
				...state,
				indexScroll: state.indexScroll + 1,
				distanceScroll: state.distanceScroll - 99
			}));
		}
	} 

	handlerAddToCart(product) {
		const { singleProduct, itemsInCart, addToCart, increaseQuantity, showAlert } = this.props;
		
		const foundItem = itemsInCart.find(el => el.id === product.id);

    if(!foundItem) {
      addToCart({
				id: singleProduct.id,
				name: singleProduct.name,
				image: singleProduct.images[0],
				price: singleProduct.price,
				quantity: 1
			});
    } else {
      increaseQuantity(singleProduct.id);

			showAlert('Товар снова добавлен в корзину!', true);
    }
	}

	render() {
		const {singleProduct, currentCurrency} = this.props;
		const {mainImage, images, distanceScroll} = this.state;

		const carouselCss = {
			transform: `translateX(${distanceScroll}px)`
		}

		return (
			<section>
				<div className="container">
					<div className="row">
						<Sidebar />
						<div className="col-sm-9 padding-right">
							<div className="product-details">
								<div className="col-sm-5">
									<div className="view-product">
										<img src={mainImage ? mainImage : 'https://clck.ru/PJKmp'} alt="" />
										<h3>{singleProduct.category}</h3>
									</div>
									<div id="similar-product" className="carousel slide" data-ride="carousel">
									  <div className="carousel-inner">
											<div className="item active" style={carouselCss}>
												{images.map((src, idx) => (
													<img
														key={idx}
														src={src}
														alt={src}
														onClick={e => this.changeImage(src)}
														className={src === mainImage ? 'active' : ''}
													/>
												))}
											</div>
										</div>

									  <div className="left item-control" onClick={this.leftScrollImages}>
											<i className="fa fa-angle-left"></i>
									  </div>
									  <div className="right item-control" onClick={this.rightScrollImages}>
											<i className="fa fa-angle-right"></i>
									  </div>
									</div>
								</div>
								<div className="col-sm-7">
									<div className="product-information">
										<h2>{singleProduct.name}</h2>
										<p>Web ID: {singleProduct.id}</p>
										<span>
											<span>
												{singleProduct.price ? (currentCurrency === 'RUB' ? (
													'₽' + singleProduct.price * 70
												) : (
													'$' + singleProduct.price
												)) : 'Loading...'}
											</span>
											<button
													type="button"
													className="btn btn-fefault cart"
													onClick={(e) => this.handlerAddToCart(singleProduct)}
												>
												<i className="fa fa-shopping-cart"></i> Add to cart
											</button>
										</span>
										<p><b>Availability:</b> {singleProduct.availability}</p>
										<p><b>Condition:</b> {singleProduct.condition}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => ({
	singleProduct: state.shop.singleProduct,
	itemsInCart: state.cart.items,
	currentCurrency: state.app.currentCurrency
});

const mapDispatchToProps = dispatch => ({ 
	getSingleProduct: id => dispatch(getSingleProduct(id)),
	addToCart: item => dispatch(addToCart(item)),
	increaseQuantity: id => dispatch(increaseQuantity(id)),
	showAlert: (text, status) => dispatch(showAlert(text, status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Single);