import axios from 'axios';
import {
  GET_TOPICS_REQUEST,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE,
  POST_TOPICS_SUCCESS,
  UPDATE_TOPICS,
  DELETE_ERRORS,
  DELETE_CURRENT_TOPICS,
  DELETE_CURRENT_TASK,
  EDIT_TOPICS_SUCCESS,
  EDIT_TOPIC,
  SET_CURRENT_TOPIC,
  SET_CURRENT_TASK,
  UPDATE_CURRENT_TASK
} from './topicTypes'


//get all topics (getAllTopics)
export const fetchTopics = () => {
  return (dispatch) => {
    dispatch(fetchTopicsRequest())
    axios
      .get('/admin/topics')
      .then(response => {
        const topics = response.data
        dispatch(fetchTopicsSuccess(topics))
      })
      .catch(error => {
        dispatch(fetchTopicsFailure(error.response.data))
      })
  }
}

//create topic
export const postTopic = (topic) => {
  return (dispatch) => {
    //loading
    // dispatch(fetchTopicsRequest())
    axios
      .post('/admin/topic', topic)
      .then(response => {
        const topic = response.data
        dispatch(postTopicsSuccess(topic))
      })
      .catch(error => {
        dispatch(fetchTopicsFailure(error.response.data))
      })
  }
}

// post task
export const postTask = (task) => {
  return (dispatch) => {
    // loading
    // dispatch(fetchTopicsRequest())
    axios
      .post('/admin/task', task)
      .then(response => {
        const topic = response.data
        // console.log(topic.topic.tasks)
        //megkeresi id alapján és kicseréli a válaszban kapott topicra (amiben már benne lesz a feladat)
        dispatch(editTopicsSuccess(topic))
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchTopicsFailure(error.response.data))
      })
  }
}

// edit topic (editTopic)
export const editPostTopic = (topic) => {
  return (dispatch) => {
    // loading
    // dispatch(fetchTopicsRequest())
    axios
      .post('/admin/topic', topic)
      .then(response => {
        const topic = response.data
        console.log(response)
        dispatch(editTopicsSuccess(topic))
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchTopicsFailure(error.response.data))
      })
  }
}

// delete topic
export const deleteTopic = (topic) => {
  return (dispatch) => {
    // loading
    // dispatch(fetchTopicsRequest())
    axios
      .delete('/admin/topic', {data: topic} )
      .then(response => {
        const topic = response.data
        console.log(topic)
        dispatch(updateTopics(topic.id))
        dispatch(deleteCurrentTopic())

      })
      .catch(error => {
        console.log(error)
        dispatch(fetchTopicsFailure(error.response))
      })
  }
}

// edit task 
export const editPostTask = (taskData) => {
  return (dispatch) => {
    // loading
    // dispatch(fetchTopicsRequest())
    axios
      .post('/admin/task', taskData)
      .then(response => {
        const data = response.data
        console.log(data)
        dispatch(editTopicsSuccess(data))
        // dispatch(updateCurrentTask(data.task))
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchTopicsFailure(error.response))
      })
  }
}

// delete task
export const deleteTask = (topicAndTaskId) => {
  return (dispatch) => {
    // loading
    // dispatch(fetchTopicsRequest())
    axios
      .delete('/admin/task', {data: topicAndTaskId} )
      .then(response => {
        const topic = response.data
        console.log(response)
        dispatch(editTopicsSuccess(topic))
        dispatch(deleteCurrentTopic())

      })
      .catch(error => {
        console.log(error.response)
        // dispatch(fetchTopicsFailure(error.response))
      })
  }
}


// loading
export const fetchTopicsRequest = () => {
  return {
    type: GET_TOPICS_REQUEST
  }
}

//sikeres letöltés
export const fetchTopicsSuccess = topics => {
  return {
    type: GET_TOPICS_SUCCESS,
    payload: topics
  }
}

//error
export const fetchTopicsFailure = error => {
  return {
    type: GET_TOPICS_FAILURE,
    payload: error
  }
}

// success post
export const postTopicsSuccess = topic => {
  return {
    type: POST_TOPICS_SUCCESS,
    payload: topic
  }
}

// success edit
export const editTopicsSuccess = topic => {
  return {
    type: EDIT_TOPICS_SUCCESS,
    payload: topic
  }
}

// update topicArr after delete topic 
export const updateTopics = topic => {
  return {
    type: UPDATE_TOPICS,
    payload: topic
  }
}


export const deleteCurrentTopic = () => {
  return {
    type: DELETE_CURRENT_TOPICS
  }
}

// update topicArr after delete topic 
export const deleteCurrentTask = () => {
  return {
    type: DELETE_CURRENT_TASK
  }
}


//---------------------------------------------------
// a témakör melletti szerkesztésre kattintás
export const editTopic = topic => {
  return {
    type: EDIT_TOPIC,
    payload: topic
  }
}

// a témakör mellett 3 pontra kattintás
export const setCurrentTopic = topic => {
  return {
    type: SET_CURRENT_TOPIC,
    payload: topic
  }
}

// set current task
export const setCurrentTask = task => {
  return {
    type: SET_CURRENT_TASK,
    payload: task
  }
}
export const updateCurrentTask = task => {
  return {
    type: UPDATE_CURRENT_TASK,
    payload: task
  }
}

export const deleteErrors = () => {
  return {
    type: DELETE_ERRORS,
  }
}