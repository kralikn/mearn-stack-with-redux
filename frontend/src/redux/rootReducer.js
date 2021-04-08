import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import userLoginReducer from './userLogin/userLoginReducer';
import userRegisterReducer from './userRegister/userRegisterReducer';
import topicReducer from './topic/topicReducer';
// import dashboardReducer from './dashboard/dashboardReducer';
// import taskReducer from './task/taksReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['topics']
}

const rootReducer = combineReducers({
  currentUser: userLoginReducer,
  registerUser: userRegisterReducer,
  topics: topicReducer
})

export default persistReducer(persistConfig, rootReducer)