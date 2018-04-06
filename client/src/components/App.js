// App.js Rendering layer control --React Router

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../style/style.css';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Survey from './surveys/Survey';
import SurveyEdit from './surveys/SurveyEdit';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div className="wrapper">
					{/*only one child allowed here*/}
					<div>
						{/*matching path, root should be using inerpolation or use exact*/}
						<Switch>
							<Route exact path="/" component={Landing} />
							<Header />
						</Switch>
						<Route exact path="/surveys" component={Dashboard} />
						<Switch>
							<Route
								exact
								path="/surveys/new"
								component={SurveyNew}
							/>
							<Route
								exact
								path="/surveys/:surveyId"
								component={Survey}
							/>
						</Switch>

						<Route
							path="/surveys/:surveyId/edit"
							component={SurveyEdit}
						/>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
