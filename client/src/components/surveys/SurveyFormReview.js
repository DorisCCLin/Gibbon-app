// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
// import { submitSurveyDraft, submitSurvey } from '../../actions';

const SurveyFormReview = ({
	onCancel,
	formValues,
	submitSurvey,
	submitSurveyDraft,
	history
}) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div className="container">
			<div
				className="card"
				style={{ backgroundColor: 'white', padding: '40px' }}
			>
				<h5>Please confirm your entries </h5>
				{reviewFields}
				<div style={{ marginBottom: '40px' }} />
				<button
					className="yellow darken-3 white-text btn-flat"
					onClick={onCancel}
				>
					Back
				</button>
				<button
					onClick={() => submitSurveyDraft(formValues, history)}
					className="blue btn-flat right white-text"
					style={{ marginLeft: '10px' }}
				>
					Save
					<i className="material-icons right">save</i>
				</button>
				<button
					onClick={() => submitSurvey(formValues, history)}
					className="green btn-flat right white-text"
				>
					Send Survey
					<i className="material-icons right">email</i>
				</button>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	console.log(state);
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
