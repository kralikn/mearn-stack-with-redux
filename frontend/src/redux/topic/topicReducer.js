import {

//get all topics
  GET_TOPICS_REQUEST,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE,

  POST_TOPICS_SUCCESS,

  EDIT_TOPICS_SUCCESS,

  UPDATE_TOPICS,

  DELETE_ERRORS,
  EDIT_TOPIC,
  SET_CURRENT_TOPIC
} from './topicTypes'

// const initialState = {
//   loading: false,
//   topics: [],
//   current: null,
//   edit: null,
//   error: null
// }

const initialState = {
  loading: false,
  topicsArr: [],
  currentTopic: null,
  editTopic: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //get all topics
    case GET_TOPICS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        topicsArr: action.payload,
        error: null
      }
    case GET_TOPICS_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    }

    // create succes response handle
    case POST_TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        topicsArr: [...state.topicsArr, action.payload],
        error: null
      }

    // edit topic
    case EDIT_TOPICS_SUCCESS:

      let newArray = [...state.topicsArr]
      let current = state.currentTopic;
      newArray[newArray.findIndex((topic) => topic._id === action.payload._id)] = action.payload

      if(state.currentTopic && state.currentTopic._id === action.payload._id){
        current = action.payload
      }

      return {
        ...state,
        loading: false,
        topicsArr: newArray,
        currentTopic: current,
        editTopic: null,
        error: null
      }

      // update topicArr after delete topic 
      case UPDATE_TOPICS:

      let currentTop = state.currentTopic

      if(currentTop && currentTop._id === action.payload){
        currentTop = null
      }

      return {
        ...state,
        loading: false,
        topicsArr: state.topicsArr.filter(topic => topic._id !== action.payload),
        currentTopic: currentTop,
        error: null
      }
    // a témakör melletti szerkesztésre kattintás
    case EDIT_TOPIC:

      let editTop;
      // let curr = state.currentTopic;
      if(!action.payload){
        editTop = null
      }else{
        let editArray = [...state.topicsArr]
        editTop = editArray[editArray.findIndex((topic) => topic._id === action.payload)]
      }
      // if(state.currentTopic._id === action.payload){
      //   curr = editTop
      //   console.log("egyenlőség")
      // }

      // let editArray = [...state.topicsArr]
      // editTop = editArray[editArray.findIndex((topic) => topic._id === action.payload)]
      
      return {
        ...state,
        editTopic: editTop,
        // currentTopic: curr,
      }
    case DELETE_ERRORS:
      return {
        ...state,
        error: null
      }

    // a témakör mellett 3 pontra kattintás
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