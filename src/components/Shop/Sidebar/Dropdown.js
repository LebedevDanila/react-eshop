import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Dropdown extends Component {
	state = {
		isOpen: false
	}

	dropdownHandler = (e) => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

  render() {
    return (
      <div className="panel panel-default" onClick={this.dropdownHandler}>
				<div className="panel-heading">
					<h4 className="panel-title">
						{this.props.category.subcategories.length ? (
							<div>
								<span className="badge pull-right">
									<i className={`fa fa-plus ${this.state.isOpen ? 'rotate' : ''}`}></i>
								</span>
								{this.props.category.name}
							</div>
						) : (
							<Link to={'/category/' + this.props.category.name.toLowerCase()}>
								{this.props.category.name}
							</Link>
						)}
					</h4>
				</div>
				{this.props.category.subcategories.length > 0 && (
					<div
						id={this.props.category.name}
						className={`panel-collapse ${!this.state.isOpen ? 'collapse' : ''}`}
						data-open={this.state.isOpen}
					>
						<div className="panel-body">
							<ul>
								{this.props.category.subcategories.map((subcategory, idx) => (
									<li key={idx}>
										<Link to={'/category/' + subcategory.toLowerCase()}>{subcategory}</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
    );
  }
}

export default Dropdown;