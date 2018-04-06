import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveyReducer from './surveysReducer';
import surveyEachReducer from './surveyEachReducer';

export default combineReducers({
	auth: authReducer,
	// form is a key from redux-form
	form: reduxForm,
	surveys: surveyReducer,
	surveyEach: surveyEachReducer,
	surveyEdit: surveyEachReducer
});
