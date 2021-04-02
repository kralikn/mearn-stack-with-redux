import {
  ADD_EVENT,
  ADD_EVENT_VALUE
} from './dashboardTypes'

const initialState = {
  events: []
}

const reducer = (state = initialState, action) => {

  let newArray;

  switch (action.type) {
     case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      }
     case ADD_EVENT_VALUE:

      // newArray = [...state.events]
      // newArray[newArray.findIndex((event) => event.id === action.payload.id)].value = action.payload.value
      // console.log(newArray)
      return {
        ...state,
        events: state.events.findIndex((event) => event.id === action.payload.id).value = action.payload.value
      }
    default: return state
  }
}

export default reducer