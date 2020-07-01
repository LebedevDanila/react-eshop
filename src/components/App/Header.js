import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';

import logo from '../../assets/images/home/logo.png';

import {toggleCurrency} from '../../store/actions/app';
import {logout} from '../../store/actions/auth';

class Header extends Component {
	state = {
		isOpenChoiceCurrency: false
	}

  render() {
    return (
      <header id="header">
				<div className="header_top">
					<div className="container">
						<div className="row">
							<div className="col-sm-6">
								<div className="contactinfo">
									<ul className="nav nav-pills">
										<li><Link to="/"><i className="fa fa-phone"></i> +2 95 01 88 821</Link></li>
										<li><Link to="/"><i className="fa fa-envelope"></i> info@domain.com</Link></li>
									</ul>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="social-icons pull-right">
									<ul className="nav navbar-nav">
										<li><Link to="/"><i className="fa fa-facebook"></i></Link></li>
										<li><Link to="/"><i className="fa fa-twitter"></i></Link></li>
										<li><Link to="/"><i className="fa fa-linkedin"></i></Link></li>
										<li><Link to="/"><i className="fa fa-dribbble"></i></Link></li>
										<li><Link to="/"><i className="fa fa-google-plus"></i></Link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div className="header-middle">
					<div className="container">
						<div className="row">
							<div className="col-sm-2">
								<div className="logo pull-left">
									<Link to="/"><img src={logo} alt="" /></Link>
								</div>
							</div>
							<div className="col-sm-2">
								<div className="btn-group pull-left">
									<div className="btn-group">
										<button
											type="button"
											className="btn btn-default dropdown-toggle usa"
											data-toggle="dropdown"
											onClick={() => this.setState({isOpenChoiceCurrency: !this.state.isOpenChoiceCurrency})}
										>
											{this.props.currentCurrency}
											<span className="caret"></span>
										</button>
										<ul className={`dropdown-menu currency ${!this.state.isOpenChoiceCurrency ? 'collapse' : ''}`}>
											{this.props.currencies.map((currency, idx) => (
												<li
													key={idx}
													onClick={() => {
														this.props.toggleCurrency(currency);
														this.setState({isOpenChoiceCurrency: !this.state.isOpenChoiceCurrency})
													}}
												>
													{currency}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className="col-sm-8">
								<div className="shop-menu pull-right">
									<ul className="nav navbar-nav">
										<li><NavLink exact to="/"><i className="fa fa-home"></i>Home</NavLink></li>
										<li><NavLink to="/cart"><i className="fa fa-shopping-cart"></i>Cart</NavLink></li>
										{this.props.isAuth ? (
											<Fragment>
												<li><div><i className="fa fa-user"></i>{this.props.username}</div></li>
												<li onClick={this.props.logout}><div><i className="fa fa-sign-in"></i>Logout</div></li>
											</Fragment>
										) : (
											<li><NavLink to="/auth"><i className="fa fa-sign-in"></i>Login</NavLink></li>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
    );
  }
}

const mapStateToProps = state => ({
	currencies: state.app.currencies,
	currentCurrency: state.app.currentCurrency,
	isAuth: state.auth.isAuth,
	username: state.auth.username
});

const mapDispatchToProps = dispatch => ({
	toggleCurrency: currencyName => dispatch(toggleCurrency(currencyName)),
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

