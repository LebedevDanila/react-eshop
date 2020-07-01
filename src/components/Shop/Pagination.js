import React, {Component} from 'react';
import {connect} from 'react-redux';

import {choicePaginationIndex} from '../../store/actions/shop';

class Pagination extends Component {
  render() {
  	let items = [];
		const count = Math.ceil(this.props.amount / 6);

		for (let i = 1; i <= count; i++) {
		 items.push(
			<li
				key={i}
				className={i === this.props.paginationIndex ? 'active' : ''}
				onClick={(e) => this.props.choicePaginationIndex(i)}
			>
				<div>{i}</div>
			</li>
		 );
		}

		return this.props.amount > 6 && <ul className="pagination">{items}</ul>;
  }
}

const mapStateToProps = state => ({
	paginationIndex: state.shop.paginationIndex
});

const mapDispatchToProps = dispatch => ({
	choicePaginationIndex: idx => dispatch(choicePaginationIndex(idx))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);