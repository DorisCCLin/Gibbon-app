import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import '../style/dashboard.css';
import Footer from './Footer';
const Dashboard = () => {
	return (
		<div className="container">
			<div className="dashboardWrapper">
				<SurveyList />
				<div className="fixed-action-btn">
					<Link
						to="/surveys/new"
						className="btn-floating btn-large red"
					>
						<i className=" material-icons">add</i>
					</Link>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Dashboard;
