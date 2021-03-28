import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE,
  POST_TOPICS_SUCCESS,
  UPDATE_TOPICS,
  DELETE_ERRORS,
  EDIT_TOPICS_SUCCESS
} from './topicTypes'

const initialState = {
  loading: false,
  topicsArr: [],
  error: null
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
        error: null
      }
    case POST_TOPICS_SUCCESS:
      return {
        loading: false,
        topicsArr: [...state.topicsArr, action.payload],
        error: null
      }
    case EDIT_TOPICS_SUCCESS:

      let newArray = [...state.topicsArr]
     
      newArray[newArray.findIndex((topic) => topic._id === action.payload._id)] = action.payload

      return {
        ...state,
        loading: false,
        topicsArr: newArray,
        error: null
      }
    case UPDATE_TOPICS:
      return {
        ...state,
        loading: false,
        topicsArr: state.topicsArr.filter(topic => topic._id !== action.payload),
        error: null
      }
    case FETCH_TOPICS_FAILURE:
      return {
        ...state,
        loading: false,
        // topicsArr: state.topicsArr,
        error: action.payload
      }
    case DELETE_ERRORS:
      return {
        ...state,
        error: null
      }
    default: return state
  }
}

export default reducer