import { combineReducers } from 'redux';
import userLoginReducer from './userLogin/userLoginReducer';
import userRegisterReducer from './userRegister/userRegisterReducer';
import topicReducer from './topic/topicReducer';

const rootReducer = combineReducers({
  currentUser: userLoginReducer,
  registerUser: userRegisterReducer,
  topics: topicReducer
})

export default rootReducer