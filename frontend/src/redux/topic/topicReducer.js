import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE,
  POST_TOPICS_SUCCESS
} from './topicTypes'

const initialState = {
  loading: false,
  topicsArr: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPICS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_TOPICS_SUCCESS:
      return {
        loading: false,
        topicsArr: action.payload,
        error: ''
      }
    case POST_TOPICS_SUCCESS:
      return {
        loading: false,
        topicsArr: [...state.topicsArr, action.payload],
        error: ''
      }
    case FETCH_TOPICS_FAILURE:
      return {
        loading: false,
        topicsArr: null,
        error: action.payload
      }
    default: return state
  }
}

export default reducer