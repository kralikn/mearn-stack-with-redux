import isEmpty from '../../validation/is-empty'

import {
  FETCH_USERLOGIN_REQUEST,
  FETCH_USERLOGIN_SUCCESS,
  FETCH_USERLOGIN_FAILURE
} from './userLoginTypes'

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  error: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERLOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERLOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        error: {}
      }
    case FETCH_USERLOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload
      }
    default: return state
  }
}

export default reducer