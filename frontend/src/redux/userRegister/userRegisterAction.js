import axios from 'axios';

import {
  FETCH_USERREGISTER_FAILURE
} from './userRegisterTypes'


export const setRegisterUser = (userData, history) => {
  return (dispatch) => {
    axios
      .post('/register', userData)
      .then(response => {
        dispatch(fetchUserRegisterFailure({}))
        history.push('/login')
      })
      .catch(error => {
        // console.log(error);
        dispatch(fetchUserRegisterFailure(error.response.data))
      })
  }
}

export const setRegisterAdmin = (userData, history) => {
  return (dispatch) => {
    axios
      .post('/admin/register', userData)
      .then(response => {
        dispatch(fetchUserRegisterFailure({}))
        history.push('/admin')
      })
      .catch(error => {
        // console.log(error);
        dispatch(fetchUserRegisterFailure(error.response.data))
      })
  }
}

export const fetchUserRegisterFailure = (error) => {
  return {
    type: FETCH_USERREGISTER_FAILURE,
    payload: error
  }
}