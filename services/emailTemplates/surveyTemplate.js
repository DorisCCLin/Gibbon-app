const keys = require('../../config/keys');

module.exports = survey => {
	return `
	<html>
	<body>
	<div style = 'text-align: center; background-color: #00bcd4; color: white; padding: 20px;'>
	<h1>We would like to hear from you</h1>

	<p style='font-size: 20px;'>Please answer the following question:</p>
		<div style=
			'font-size: 30px;'>${survey.body}</div>
		<br/>	
		<div style=
			'font-size: 18px;'>
         <a href='${keys.redirectDomain}/api/surveys/${
		survey.id
	}/five'>Very Good</a> 
	    <div /> 
           <a href='${keys.redirectDomain}/api/surveys/${
		survey.id
	}/four'>Good</a>
	<div />          
           <a href='${keys.redirectDomain}/api/surveys/${
		survey.id
	}/three'>Okay</a>
	    <div /> 
           <a href='${keys.redirectDomain}/api/surveys/${survey.id}/two'>Bad</a>
	    <div />          
           <a href="${keys.redirectDomain}/api/surveys/${
		survey.id
	}/one">Very Bad</a>
		</div>
		<br/>
		<br/>
		<div style=
			'color: grey; font-size: 13px;'><p>this survey was made with love from <a href='https://gibbonproject.herokuapp.com/'>Gibbon</a></p></div>
    </div>
	</body>
	</html>

  `;
};
