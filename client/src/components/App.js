// App.js Rendering layer control --React Router

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Survey from './surveys/Survey';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					{/*only one child allowed here*/}
					<div>
						{/*matching path, root should be using inerpolation or use exact*/}
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />

						<Route path="/surveys/:surveyId" component={Survey} />
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
