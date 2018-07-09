import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {GET_ERRORS, SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(() => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            const {token} = res.data;
            localStorage.setItem('jwt', token);

            setAuthToken(token);
            const decodedToken = jwtDecode(token);
            dispatch(setCurrentUser(decodedToken));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};


export const setCurrentUser = decodedToken => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedToken
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwt');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};