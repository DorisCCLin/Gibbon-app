const mongoose = require('mongoose');
// const schema = mongoose.Schema;
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	one: { type: Number, default: 0 },
	two: { type: Number, default: 0 },
	three: { type: Number, default: 0 },
	four: { type: Number, default: 0 },
	five: { type: Number, default: 0 },
	// relationship field using _
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	dateSent: Date,
	lastResponded: Date,
	draft: { type: Boolean, default: true }
});

mongoose.model('surveys', surveySchema);
