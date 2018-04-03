import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import { Link } from 'react-router-dom';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div className="card darken-1" key={survey._id}>
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">
							sent On:{' '}
							{new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<a>1 Stars: {survey.one}</a>
						<a>2 Stars: {survey.two}</a>
						<a>3 Stars: {survey.three}</a>
						<a>4 Stars: {survey.four}</a>
						<a>5 Stars: {survey.five}</a>

						<Link
							to={'surveys/' + survey._id}
							className="btn waves-effect waves-light right indigo lighten-4"
						>
							<i className="Large material-icons blue-text text-darken-2 ">
								timeline
							</i>
						</Link>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
