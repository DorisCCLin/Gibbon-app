const keys = require('../../config/keys');

module.exports = survey => {
	return `
	<html>
	<body>
	<div style = 'text-align: center;'>
	<h3>I'd like your input!</h3>

	<p>Please answer the following question:</p>
		<p>${survey.body}</p>
		<div>
           <a href="${keys.redirectDomain}/api/surveys/${survey.id}/one">1</a>
		</div>
		<div>
           <a href='${keys.redirectDomain}/api/surveys/${survey.id}/two'>2</a>
		</div>
		<div>
           <a href='${keys.redirectDomain}/api/surveys/${survey.id}/three'>3</a>
		</div>
		<div>
           <a href='${keys.redirectDomain}/api/surveys/${survey.id}/four'>4</a>
		</div>
		<div>
           <a href='${keys.redirectDomain}/api/surveys/${survey.id}/five'>5</a>
		</div>
    </div>
	</body>
	</html>

  `;
};
