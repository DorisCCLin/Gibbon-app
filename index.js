// common js modules
const express = require('express');
// using function to run express
const app = express();

// http://localhost:5000/

// route handler
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

// Heroku dynamit port or local machine 5000
const PORT = process.env.PORT || 5000;
// express tells node on 5000 port
app.listen(PORT);
