import {
  FETCH_USERREGISTER_FAILURE
} from './userRegisterTypes'

const initialState = {
  error: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERREGISTER_FAILURE:
      return {
        error: action.payload
      }
    default: return state
  }
}

export default reducer