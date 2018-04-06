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
			<div className="container">
				{/*const Surveyees = Object.keys(this.props.surveyEach.recipients).length*/}

				<div className="card">
					<div className="card-content">
						<div>Survey Title: </div>
						<div>{this.props.surveyEach.title}</div>
						<div>Survey Question: </div>
						<div>{this.props.surveyEach.body}</div>
						<div>Surveyee Number: </div>
					</div>
					<div className="card-tabs">
						<ul className="tabs tabs-fixed-width">
							<li className="tab">
								<a href="#test4">Test 1</a>
							</li>
							<li className="tab">
								<a className="" href="#test5">
									Test 2
								</a>
							</li>
							<li className="tab">
								<a href="#test6">Test 3</a>
							</li>
						</ul>
					</div>
					<div className="card-content grey lighten-4">
						<div id="test4">
							<Doughnut data={this.renderData()} />
						</div>
						<div id="">Test 2</div>
						<div id="">Test 3</div>
					</div>
				</div>

				<div class="row">
					<div class="col s12">
						<ul class="tabs">
							<li class="tab col s3">
								<a href="#test1">Test 1</a>
							</li>
							<li class="tab col s3">
								<a class="active" href="#test2">
									Test 2
								</a>
							</li>
							<li class="tab col s3 disabled">
								<a href="#test3">Disabled Tab</a>
							</li>
							<li class="tab col s3">
								<a href="#test4">Test 4</a>
							</li>
						</ul>
					</div>
					<div id="test1" class="col s12">
						Test 1
					</div>
					<div id="test2" class="col s12">
						Test 2
					</div>
					<div id="test3" class="col s12">
						Test 3
					</div>
					<div id="test4" class="col s12">
						Test 4
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
