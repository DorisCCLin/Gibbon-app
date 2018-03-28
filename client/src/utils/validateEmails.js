const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// you can use html version on http://emailregex.com/ to make the warning message go away.

export default emails => {
	emails = emails.replace(/,\s*$/, '');
	const invalidEmails = emails
		.split(',')
		.map(email => email.trim())
		.filter(email => re.test(email) === false);

	if (invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`;
	}

	return null;
};
