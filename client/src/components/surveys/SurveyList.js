import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, fetchOneSurvey, deleteSurvey } from '../../actions';
import { Link } from 'react-router-dom';
import '../../style/surveyList.css';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div className="each">
					<div className="card" key={survey._id}>
						<div
							className="card-content"
							style={{
								backgroundColor: 'rgba(225, 225, 225, 0.1)'
							}}
						>
							{survey.draft ? (
								<div>
									<span className="card-title grey-text">
										<span
											className="new badge grey"
											data-badge-caption="draft"
										/>
										{survey.title}
									</span>
									<p className="grey-text">{survey.body}</p>
									<p className="right grey-text" />
								</div>
							) : (
								<div>
									<span className="card-title">
										{survey.title}
									</span>
									<div>{survey.body}</div>
									<div className="light-grey-text right">
										Survey sent on:{' '}
										{new Date(
											survey.dateSent
										).toLocaleDateString()}
									</div>
								</div>
							)}
						</div>
						<div className="card-action row">
							{survey.draft ? (
								<div
									className="left grey-text col s5 left"
									style={{ marginLeft: '0px' }}
								>
									draft mode
								</div>
							) : (
								<div className="left amber-text accent-4 col s5 left">
									Avg. Satisfaction:{' '}
									{(survey.one * 1 +
										survey.two * 2 +
										survey.three * 3 +
										survey.four * 4 +
										survey.five * 5) /
										((survey.one +
											survey.two +
											survey.three +
											survey.four +
											survey.five) *
											5) *
										100}
									{' %'}
								</div>
							)}

							{survey.draft ? (
								<div className="right">
									<Link
										to={'/surveys/' + survey._id + '/edit'}
										className="btn waves-effect waves-light blue"
									>
										<i className="material-icons">edit</i>
									</Link>

									<button className="btn waves-effect waves-light grey">
										<i className=" material-icons">
											assessment
										</i>
									</button>
									<button
										onClick={() => deleteSurvey(survey._id)}
										className="btn waves-effect waves-light red"
									>
										<i className="material-icons">delete</i>
									</button>
								</div>
							) : (
								<div className="right">
									<button className="btn waves-effect waves-light disable grey">
										<i className="material-icons">edit</i>
									</button>
									<Link
										to={'/surveys/' + survey._id}
										className="btn waves-effect waves-light green"
									>
										<i className=" material-icons">
											assessment
										</i>
									</Link>
									<button
										onClick={() => deleteSurvey(survey._id)}
										className="btn waves-effect waves-light red"
									>
										<i className="material-icons">delete</i>
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<div>
					<h1 className="titleLine">
						Welcome back! Here are your surveys:
					</h1>
				</div>
				{this.renderSurveys()}
			</div>
		);
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, {
	fetchSurveys,
	fetchOneSurvey,
	deleteSurvey
})(SurveyList);
