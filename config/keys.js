// keys.js - credential selection
if (process.env.NODE_ENV === 'production') {
	// we are in production - return the prod set of keys.
	module.exports = require('./prod');
} else {
	// we are in development - return the dev set od keys.
	module.exports = require('./dev');
}
