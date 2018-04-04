import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneSurvey } from '../../actions';
import { Doughnut } from 'react-chartjs-2';

class SurveyEach extends Component {
	componentDidMount() {
		this.props.fetchOneSurvey(this.props.match.params.surveyId);
	}

	renderData() {
		const data = {
			labels: ['vote1', 'vote2', 'vote3', 'vote4', 'vote5'],
			datasets: [
				{
					data: [
						this.props.surveyEach.one,
						this.props.surveyEach.two,
						this.props.surveyEach.three,
						this.props.surveyEach.four,
						this.props.surveyEach.five
					],
					backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
					hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
				}
			]
		};

		return data;
	}

	renderSurvey() {
		return (
			<div>
				<div>Survey Title: </div>
				<div>{this.props.surveyEach.title}</div>
				<div>Survey Question: </div>
				<div>{this.props.surveyEach.body}</div>
				<div>Surveyee Number: </div>

				{/*const Surveyees = Object.keys(this.props.surveyEach.recipients).length*/}

				<Doughnut data={this.renderData()} />
			</div>
		);
	}

	render() {
		return <div>{this.renderSurvey()}</div>;
	}
}

function mapStateToProps(state) {
	return { surveyEach: state.surveyEach };
}

export default connect(mapStateToProps, { fetchOneSurvey })(SurveyEach);
