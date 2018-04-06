import React from 'react';
import '../style/landing.css';

const Landing = () => {
	return (
		<div className="landingPage">
			<br />
			<br />

			<div className="row">
				<div className="col s7">
					<img src="/images/gibbon.png" width="650px" />
				</div>

				<div className="col s5">
					<div className="logo">Gibbon</div>
					<div className="tagLine">
						Collect Feedback INSTANTLY <br />
						from Your
						<div className="slidingVertical">
							<span>Users</span>
							<span>Clients</span>
							<span>Audience</span>
							<span>Students</span>
							<span>Viewers</span>
						</div>
						<div>
							<a href="/auth/google">
								<img
									className="login"
									src="/images/google.png"
									width="200px"
								/>
							</a>
						</div>
						<div className="note">
							(It's like MailChimp + SurveyMonkey :)
						</div>
					</div>
				</div>
				<div className="col s1" />
			</div>
		</div>
	);
};

export default Landing;
