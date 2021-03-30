import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE,
  POST_TOPICS_SUCCESS,
  UPDATE_TOPICS,
  DELETE_ERRORS,
  EDIT_TOPICS_SUCCESS,
  EDIT_TOPIC,
  SET_CURRENT_TOPIC
} from './topicTypes'

const initialState = {
  loading: false,
  topicsArr: [],
  currentTopic: null,
  editTopic: null,
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
        ...state,
        loading: false,
        topicsArr: action.payload,
        error: null
      }
    case POST_TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        topicsArr: [...state.topicsArr, action.payload],
        error: null
      }
    case EDIT_TOPICS_SUCCESS:
      console.log(action.payload)
      let newArray = [...state.topicsArr]
     
      newArray[newArray.findIndex((topic) => topic._id === action.payload._id)] = action.payload

      // let safeCurrTop =state.currentTopic;
      // if(state.currentTopic._id === action.payload._id){
      //   safeCurrTop = action.payload
      // }

      return {
        ...state,
        loading: false,
        topicsArr: newArray,
        // currentTopic: safeCurrTop,
        editTopic: null,
        error: null
      }
    case EDIT_TOPIC:

      let editTop;

      if(!action.payload){
        editTop = null
      }else{
        let editArray = [...state.topicsArr]
        editTop = editArray[editArray.findIndex((topic) => topic._id === action.payload)]
      }
      return {
        ...state,
        editTopic: editTop
      }
    case UPDATE_TOPICS:

    // let currTopUdpate = state.currentTopic
    // console.log(currTopUdpate._id === action.payload)
    // // console.log(currTopUdpate)
    // console.log(action.payload)

      // if(currTopUdpate._id === action.payload){
      //   console.log("egyezünk")
      //   currTopUdpate = null
      // }

      return {
        ...state,
        loading: false,
        topicsArr: state.topicsArr.filter(topic => topic._id !== action.payload),
        // currentTopic: currTopUdpate,
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
    case SET_CURRENT_TOPIC:
      
      // let currentTopic = [...state.topicsArr].filter(topic => topic._id === action.payload)
      // console.log(action.payload)
      let topArray = [...state.topicsArr]
     
      let currTop = topArray[topArray.findIndex((topic) => topic._id === action.payload)]
      // currentTopic.filter(topic => topic._id === action.payload)

      return {
        ...state,
        currentTopic: currTop
      }
    default: return state
  }
}

export default reducer