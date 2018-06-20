import axios from 'axios';
import {CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILE, PROFILE_LOADING, SET_CURRENT_USER} from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profiles')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: {}
        }));
};

export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profiles', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};

export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure to delete this account?')) {
        axios.delete('/api/profiles')
            .then(res => dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
    }
};

export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profiles/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const addEducation = (eduData, history) => dispatch => {
    axios.post('/api/profiles/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const deleteExperience = id => dispatch => {
    if (window.confirm('Are you sure to delete this experience?')) {
        axios.delete(`/api/profiles/experience/${id}`)
            .then(res => dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
    }
};

export const deleteEducation = id => dispatch => {
    if (window.confirm('Are you sure to delete this education?')) {
        axios.delete(`/api/profiles/education/${id}`)
            .then(res => dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
    }
};