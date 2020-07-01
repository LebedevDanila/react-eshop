import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Sidebar from './Sidebar';
import List from './Products/List';
import Pagination from './Pagination';

import {fetchProducts} from '../../store/actions/shop';

class Shop extends Component {
	componentDidMount() {
		this.props.fetchProducts(this.props.category);
	}

	componentDidUpdate(prevProps) {
	  // Обновляет комопонент при изменение url адреса
	  if (this.props.category !== prevProps.category) {
	    this.props.fetchProducts(this.props.category);
	  }
	}

  render() {
    return (
      <section>
				<div className="container">
					<div className="row">
						<Sidebar />
						<div className="col-sm-9 padding-right">
							{this.props.products.length ? (
								<Fragment>
									<List products={this.props.activeProducts} title={this.props.title} />
									<Pagination amount={this.props.products.length} />
								</Fragment>
							) : (
								!this.props.isLoadingProducts && <Redirect to='/404' />
							)}
						</div>
					</div>
				</div>
			</section>
    );
  }
}

const mapStateToProps = state => ({
	products: state.shop.products,
	activeProducts: state.shop.activeProducts,
	isLoadingProducts: state.shop.isLoadingProducts
});

const mapDispatchToProps = dispatch => ({
	fetchProducts: category => dispatch(fetchProducts(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);