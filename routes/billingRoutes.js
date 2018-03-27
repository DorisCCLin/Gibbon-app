const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	// can add many middlewares, but last one need to process req and response res
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id,
			description: 'Charge for {# req.body.email}'
		});

		// 'req.user' set up by passport.js
		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};
