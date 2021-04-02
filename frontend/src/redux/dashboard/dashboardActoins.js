import {
 ADD_EVENT,
 ADD_EVENT_VALUE
} from './dashboardTypes'

export const addEvent = event => {
  return {
    type: ADD_EVENT,
    payload: event
  }
}

export const addEventValue = data => {
  return {
    type: ADD_EVENT_VALUE,
    payload: data
  }
}