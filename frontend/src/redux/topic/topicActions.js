import axios from 'axios';
import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE,
  POST_TOPICS_SUCCESS,
  UPDATE_TOPICS,
  DELETE_ERRORS,
  EDIT_TOPICS_SUCCESS
} from './topicTypes'

export const fetchTopics = () => {
  return (dispatch) => {
    dispatch(fetchTopicsRequest())
    axios
      .get('/admin/topics')
      .then(response => {
        // response.data is the users
        const topics = response.data
        dispatch(fetchTopicsSuccess(topics))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchTopicsFailure(error.response.data))
      })
  }
}

export const postTopic = (newTopic) => {
  return (dispatch) => {
    dispatch(fetchTopicsRequest())
    axios
      .post('/admin/topic', newTopic)
      .then(response => {
        // response.data is the users
        const topic = response.data
        console.log(response.data)
        dispatch(postTopicsSuccess(topic))
      })
      .catch(error => {
        console.log(error);
        // error.message is the error message
        dispatch(fetchTopicsFailure(error.response.data))
      })
  }
}

export const editPostTopic = (editTopic) => {
  return (dispatch) => {
    dispatch(fetchTopicsRequest())
    axios
      .post('/admin/topic', editTopic)
      .then(response => {
        // response.data is the users
        const topic = response.data
        console.log(response.data)
        dispatch(editTopicsSuccess(topic))
      })
      .catch(error => {
        console.log(error);
        // error.message is the error message
        dispatch(fetchTopicsFailure(error.response.data))
      })
  }
}


//TODO: hibakezelés frontend oldalon (modalban megjeleníteni pl a már létező témakört és a validálás elkészítése utáni hibaüzenetet is)
export const deleteTopic = (topicId) => {
  return (dispatch) => {
    dispatch(fetchTopicsRequest())
    axios
      .delete('/admin/topic', {data: topicId} )
      .then(response => {
        console.log(response.data);
        // response.data is the users
        // const topic = response.data
        dispatch(updateTopics(topicId.id))
      })
      .catch(error => {
        console.log(error);
        // error.message is the error message
        // dispatch(fetchTopicsFailure(error.response.data))
      })
  }
}

export const fetchTopicsRequest = () => {
  return {
    type: FETCH_TOPICS_REQUEST
  }
}

export const fetchTopicsSuccess = topics => {
  return {
    type: FETCH_TOPICS_SUCCESS,
    payload: topics
  }
}

export const postTopicsSuccess = topic => {
  return {
    type: POST_TOPICS_SUCCESS,
    payload: topic
  }
}

export const editTopicsSuccess = topic => {
  return {
    type: EDIT_TOPICS_SUCCESS,
    payload: topic
  }
}

export const fetchTopicsFailure = error => {
  return {
    type: FETCH_TOPICS_FAILURE,
    payload: error
  }
}

export const updateTopics = topicId => {
  return {
    type: UPDATE_TOPICS,
    payload: topicId
  }
}

export const deleteErrors = () => {
  return {
    type: DELETE_ERRORS,
  }
}