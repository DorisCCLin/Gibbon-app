import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneSurvey } from '../../actions';
import { Doughnut } from 'react-chartjs-2';
import '../../style/survey.css';

class SurveyEach extends Component {
	componentDidMount() {
		this.props.fetchOneSurvey(this.props.match.params.surveyId);
	}

	renderData() {
		const data = {
			labels: ['Very Good', 'Good', 'Okay', 'Bad', 'Very Bad'],
			datasets: [
				{
					data: [
						this.props.surveyEach.five,
						this.props.surveyEach.four,
						this.props.surveyEach.three,
						this.props.surveyEach.two,
						this.props.surveyEach.one
					],
					backgroundColor: [
						'#7BDFF2',
						'#FF70A6',
						'#FE621D',
						'#FFC15E',
						'#7678ED'
					],
					hoverBackgroundColor: [
						'#7BDFF2',
						'#FF70A6',
						'#FE621D',
						'#FFC15E',
						'#7678ED'
					]
				}
			]
		};

		return data;
	}

	renderSurvey() {
		return (
			<div className="container">
				{/*const Surveyees = Object.keys(this.props.surveyEach.recipients).length*/}

				<div className="card">
					<div className="card-content">
						<div className="row">
							<div className="col s2">
								<div>Survey Title: </div>
							</div>
							<div className="col s10">
								<div>{this.props.surveyEach.title}</div>
							</div>
						</div>
						<div className="row surveyTitle">
							<div className="col s2">
								<div>Average Rate: </div>
							</div>
							<div className="col s2">
								<div>
									{(
										(this.props.surveyEach.one * 1 +
											this.props.surveyEach.two * 2 +
											this.props.surveyEach.three * 3 +
											this.props.surveyEach.four * 4 +
											this.props.surveyEach.five * 5) /
										((this.props.surveyEach.one +
											this.props.surveyEach.two +
											this.props.surveyEach.three +
											this.props.surveyEach.four +
											this.props.surveyEach.five) *
											5) *
										100
									).toFixed(2)}
									{' %'}
								</div>
							</div>

							<div className="col s2">
								<div>Total Votes: </div>
							</div>
							<div className="col s1">
								<div>
									{this.props.surveyEach.one +
										this.props.surveyEach.two +
										this.props.surveyEach.three +
										this.props.surveyEach.four +
										this.props.surveyEach.five}
								</div>
							</div>
						</div>
						<div className="row surveyDate">
							<div className="col s12 right">
								<div className="right">
									Last Responded on:{' '}
									{new Date(
										this.props.surveyEach.lastResponded
									).toLocaleDateString()}
								</div>
							</div>
						</div>
					</div>
					<div className="card-tabs">
						<ul className="tabs tabs-fixed-width">
							<li className="tab">
								<a href="#test4">SURVEY RESULT</a>
							</li>
						</ul>
					</div>
					<div className="card-content grey lighten-4">
						<div id="test4">
							<div className="center surveyQuestion">
								{this.props.surveyEach.body}
							</div>
							<Doughnut data={this.renderData()} />
						</div>
					</div>
				</div>
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
