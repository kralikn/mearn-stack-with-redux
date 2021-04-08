import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken'

import {
  FETCH_USERLOGIN_REQUEST,
  FETCH_USERLOGIN_SUCCESS,
  FETCH_USERLOGIN_FAILURE,
  SET_LOGOUT_USER
} from './userLoginTypes'


export const setCurrentUser = (userData, history) => {
  // console.log(userData);
  return (dispatch) => {
    dispatch(fetchUserRequest())
    axios
      .post('/login', userData)
      .then(response => {
        console.log(response.data);
        const { token } = response.data;

        localStorage.setItem('jwtToken', token);

        setAuthToken(token);

        const decoded = jwt_decode(token);

        dispatch(fetchUserLoginSuccess(decoded))

        history.push('/dashboard/user')

      })
      .catch(error => {
        dispatch(fetchUserLoginFailure(error.response.data))
      })
  }
}

export const setCurrentAdmin = (userData, history) => {
  return (dispatch) => {
    dispatch(fetchUserRequest())
    axios
      .post('/admin', userData)
      .then(response => {
        const { token } = response.data;

        localStorage.setItem('jwtToken', token);

        setAuthToken(token);

        const decoded = jwt_decode(token);

        dispatch(fetchUserLoginSuccess(decoded))

        history.push('/dashboard/admin')
      
      })
      .catch(error => {
        dispatch(fetchUserLoginFailure(error.response.data))
      })
  }
}

// Log user out
export const logoutUser = () => {

  return(dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  }
};

// Set logged in user
export const setLogoutUser = () => {
  return {
    type: SET_LOGOUT_USER
    // payload: decoded
  };
};

export const fetchUserLoginSuccess = (decoded) => {
  return {
    type: FETCH_USERLOGIN_SUCCESS,
    payload: decoded
  }
}


export const fetchUserRequest = () => {
  return {
    type: FETCH_USERLOGIN_REQUEST
  }
}


export const fetchUserLoginFailure = (error) => {
  return {
    type: FETCH_USERLOGIN_FAILURE,
    payload: error
  }
}