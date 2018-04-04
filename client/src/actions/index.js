import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, FETCH_ONE_SURVEY } from './types';

// only one express, we can remove function {} and return syntax
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchOneSurvey = value => async dispatch => {
	const res = await axios.get(`/api/surveys/${value}`);
	dispatch({ type: FETCH_ONE_SURVEY, payload: res.data });
};

export const deleteSurvey = value => {
	console.log(value);
	axios.delete(`/api/surveys/${value}`);
	console.log('this survey have been deleted ');
	window.location.reload();
};
