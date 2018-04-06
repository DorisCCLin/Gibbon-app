// SurveryForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import { fetchOneSurvey } from '../../actions';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyEditForm extends Component {
	componentDidMount() {
		const id = window.location.pathname.split('/')[2];
		this.props.fetchOneSurvey(id);
	}

	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		return (
			<div className="container">
				<div className="card">
					{/*.handleSubmit is from reduxForm method*/}
					<form
						onSubmit={this.props.handleSubmit(
							this.props.onSurveySubmit
						)}
						style={{ padding: '40px' }}
					>
						{this.renderFields()}

						<Link to="/surveys" className="red btn-flat white-text">
							Cancel
						</Link>

						<button
							type="submit"
							className="teal btn-flat right white-text"
						>
							Next
							<i className="material-icons right">done</i>
						</button>
					</form>
				</div>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
	errors.recipients = validateEmails(values.recipients || '');
	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});
	return errors;
}

function mapStateToProps(state) {
	return {
		surveyEdit: state.surveyEdit,
		title: state.surveyEdit.title
	};
}

SurveyEditForm = connect(mapStateToProps, { fetchOneSurvey })(SurveyEditForm);
SurveyEditForm = connect(state => ({
	initialValues: {
		// title: this.props.surveyEdit.title
	}
}))(SurveyEditForm);

export default reduxForm({
	validate,
	form: 'surveyEditForm',
	destroyOnUnmount: false,
	enableReinitialize: true
})(SurveyEditForm);
