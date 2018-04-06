import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import '../style/header.css';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li key="2" style={{ margin: '0 20px' }}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key="4" style={{ margin: '0 10px' }}>
						<Link to="/surveys">
							<i class="material-icons">dehaze</i>
						</Link>
					</li>,
					<li key="3" style={{ margin: '0 10px' }}>
						<a href="/api/logout">
							<i class="material-icons">power_settings_new</i>
						</a>
					</li>,
					<li key="1" style={{ margin: '0 10px' }}>
						<Payments />
					</li>
				];
		}
	}

	render() {
		return (
			<nav className="header">
				<div class="nav-wrapper">
					<div>
						<div className="left">
							<Link
								to={this.props.auth ? '/surveys' : '/'}
								className="headerLogo"
							>
								Gibbon
							</Link>.beta
						</div>

						<ul className="right">
							<div className="row">{this.renderContent()}</div>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
