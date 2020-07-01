import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropdown from './Dropdown';

import {setCategories} from '../../../store/actions/shop';

class Sidebar extends Component {
	componentDidMount() {
		this.props.setCategories();
	}

  render() {
    return (
      <div className="col-sm-3">
				<div className="left-sidebar">
					<h2>Category</h2>
					<div className="panel-group category-products" id="accordian">
						{this.props.categories.map(category => (
							<Dropdown key={category.id} category={category} />
						))}
					</div>			
				</div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
	categories: state.shop.categories
});

const mapDispatchToProps = dispatch => ({
	setCategories: () => dispatch(setCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);