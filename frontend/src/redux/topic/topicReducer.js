import {
  GET_TOPICS_REQUEST,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE,
  POST_TOPICS_SUCCESS,
  EDIT_TOPICS_SUCCESS,
  UPDATE_TOPICS,
  DELETE_CURRENT_TOPICS,
  DELETE_CURRENT_TASK,
  DELETE_ERRORS,
  SET_CURRENT_TOPIC,
  SET_CURRENT_TASK,
  UPDATE_CURRENT_TASK
} from './topicTypes'

const initialState = {
  loading: false,
  topicsArr: [],
  currentTopic: null,
  currentTask: null,
  error: null
}

const reducer = (state = initialState, action) => {

  let newArray;
  let newCurrentTopic;
  let newCurrentTask;

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
      newArray = [...state.topicsArr]
      newArray[newArray.findIndex((topic) => topic._id === action.payload._id)] = action.payload

      // if(state.currentTopic && state.currentTopic._id === action.payload._id){
      //   current = action.payload
      // }

      return {
        ...state,
        loading: false,
        topicsArr: newArray,
        error: null
      }

      // update topicArr after delete topic (ellenőrizve / kell e később a currentTopic?)
      case UPDATE_TOPICS:
        
      // if(currentTop && currentTop._id === action.payload){
      //   currentTop = null
      // }

      return {
        ...state,
        loading: false,
        topicsArr: state.topicsArr.filter(topic => topic._id !== action.payload),
        error: null
      }
      case DELETE_CURRENT_TOPICS:

      return {
        ...state,
        currentTopic: null,
      }
      case DELETE_CURRENT_TASK:

      return {
        ...state,
        currentTask: null,
      }
    case DELETE_ERRORS:
      return {
        ...state,
        error: null
      }

    // a témakör mellett 3 pontra kattintás
    case SET_CURRENT_TOPIC:

      newArray = [...state.topicsArr]
      newCurrentTopic = newArray[newArray.findIndex((topic) => topic._id === action.payload.id)]
      console.log(newCurrentTopic)
      return {
        ...state,
        currentTopic: newCurrentTopic
      }
      // a témakör mellett 3 pontra kattintás
      case SET_CURRENT_TASK:
        
        newArray = [...state.topicsArr]
        newCurrentTopic = newArray[newArray.findIndex((topic) => topic._id === action.payload.topicid)]
        newCurrentTask = newCurrentTopic.tasks[newCurrentTopic.tasks.findIndex((task) => task._id === action.payload.taskid)]

      return {
        ...state,
        currentTask: newCurrentTask
      }
      case UPDATE_CURRENT_TASK:
        return {
          ...state,
          currentTask: action.payload
        }
    default: return state
  }
}

export default reducer