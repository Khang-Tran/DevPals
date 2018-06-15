import axios from 'axios';
import {CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILE, PROFILE_LOADING} from './types';

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
}