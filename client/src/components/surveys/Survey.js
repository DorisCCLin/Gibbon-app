import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneSurvey } from '../../actions';
// import { Link } from 'react-router-dom';

class SurveyEach extends Component {
	componentDidMount() {
		this.props.fetchOneSurvey();
	}

	render() {
		return <div>{this.props.title}</div>;
	}
}

function mapStateToProps({ surveyEach }) {
	return { surveyEach };
}

export default connect(mapStateToProps, { fetchOneSurvey })(SurveyEach);


