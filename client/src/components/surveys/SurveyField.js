// SurveyField contains logic to render a single lebel and text input

import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>

			{/*{...input} tells input to have all properties fron input above*/}
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
