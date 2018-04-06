const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false
		});

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('thanks for voting');
	});

	app.get('/api/surveys/:surveyId', requireLogin, async (req, res) => {
		try {
			const survey = await Survey.findById(req.params.surveyId);
			res.send(survey);
		} catch (err) {
			res.status(422).send(err);
		}
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		console.log(req.body);
		// res.send({});
		const p = new Path('/api/surveys/:surveyId/:choice');

		const test = _.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						// have to add _ to keys as mongoDB rule, mongoose doensn't need.
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
				).exec();
			})
			.value();

		console.log(test);

		res.send({});
	});

	// create new survey in draft mode
	app.post('/api/surveys/draft', requireLogin, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		console.log(req.body);
		const survey = new Survey({
			title,
			body,
			subject,
			recipients: recipients
				.split(',')
				.map(email => ({ email: email.trim() })),
			_user: req.user.id
		});

		try {
			await survey.save();
			const user = await req.user.save();
			console.log('the survey has been added');
			return res.redirect('/api/surveys');
		} catch (err) {
			res.status(422).send(err);
		}
	});

	// save the draft again
	app.put('/api/surveys/:surveyId', requireLogin, (req, res) => {
		const edit = {
			title: req.body.title,
			subject: req.body.subject,
			body: req.body.body,
			recipients: req.body.recipients
				.split(',')
				.map(email => ({ email: email.trim() }))
		};

		Survey.update({ _id: req.params.surveyId }, edit, function(err, raw) {
			if (err) {
				res.send(err);
			}
			res.send(raw);
		});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			// map(email => ({ email }) === map(email =>{ return {email: email}})
			title,
			body,
			subject,
			recipients: recipients
				.split(',')
				.map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
			draft: false
		});

		// send an email
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});

	// send edited survey out
	app.post(
		'/api/surveys/:surveyId',
		requireLogin,
		requireCredits,
		async (req, res) => {
			const edit = {
				title: req.body.title,
				subject: req.body.subject,
				body: req.body.body,
				recipients: req.body.recipients
					.split(',')
					.map(email => ({ email: email.trim() })),
				dateSent: Date.now(),
				draft: false
			};

			Survey.update({ _id: req.params.surveyId }, edit, function(
				err,
				raw
			) {
				if (err) {
					res.send(err);
				}

				res.send(raw);
			});

			// const mailer = new Mailer(
			// 	editedSurvey,
			// 	surveyTemplate(editedSurvey)
			// );

			// send an email

			// try {
			// 	// await editedSurvey.save();
			// 	// await mailer.send();
			// 	req.user.credits -= 1;
			// 	const user = await req.user.save();

			// 	res.send(user);
			// } catch (err) {
			// 	res.status(422).send(err);
			// }
		}
	);

	app.delete('/api/surveys/:surveyId', (req, res) => {
		Survey.remove({ _id: req.params.surveyId }, function(err, surveys) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'survey has been deleted' });
		});
	});
};
