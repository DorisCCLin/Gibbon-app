// SurveryNew contains SurveyForm and SurveyReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyEditForm from './SurveyEditForm';
import SurveyEditFormReview from './SurveyEditFormReview';

class SurveyEdit extends Component {
	state = { SurveyEditFormReview: false };

	renderContent() {
		if (this.state.SurveyEditFormReview) {
			return (
				<SurveyEditFormReview
					onCancel={() =>
						this.setState({ SurveyEditFormReview: false })
					}
				/>
			);
		}

		return (
			<SurveyEditForm
				onSurveySubmit={() =>
					this.setState({ SurveyEditFormReview: true })
				}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: 'surveyEditForm'
})(SurveyEdit);
