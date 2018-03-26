// common js modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// run mongooseJs first then passportJs so the model is defined first and avoid error.
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// using function to run express
const app = express();

// middelewares.
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

// http://localhost:5000
// Heroku dynamit port or local machine 5000
const PORT = process.env.PORT || 5000;
// express tells node on 5000 port
app.listen(PORT);
