const mongoose = require('mongoose');
// const schema = mongoose.Schema;
const { Schema } = mongoose;

const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
