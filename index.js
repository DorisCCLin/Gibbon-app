// common js modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// run mongooseJs first then passportJs so the model is defined first and avoid error.
require('./models/User');
require('./services/passport');

// mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// using function to run express
const app = express();

// middelewares.
app.use(bodyParser.json());
app.use(
	// provide a configuration objection
	cookieSession({
		// expiration 30 days
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// make sure it's an array, so we can add more keys later.
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// setting express production routes
if (process.env.NODE_ENV === 'production') {
	// Express will serve up production asset
	// like our main.js file, or main.css file!
	app.use(express.static('client/build'));

	// Express will serve up the index.html file if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// http://localhost:5000
// Heroku dynamit port or local machine 5000
const PORT = process.env.PORT || 5000;
// express tells node on 5000 port
app.listen(PORT);
