const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
//to pull out user model from mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	// every time to return a model, have to call as an asychornous promise.
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		// add done to tell passpost its completion)
		(accessToken, refreshToken, profile, done) => {
			// use a promise to return a user model
			User.findOne({ googleId: profile.id }).then(existingUser => {
				done(null, profile);
				// check if the user exsisting.
				if (existingUser) {
					// null means no errors.
					done(null, existingUser);
				} else {
					// can't find the google id, add a new user.
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
