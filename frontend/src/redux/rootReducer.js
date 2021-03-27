import { combineReducers } from 'redux';
import userLoginReducer from './userLogin/userLoginReducer';
import userRegisterReducer from './userRegister/userRegisterReducer';

const rootReducer = combineReducers({
  currentUser: userLoginReducer,
  registerUser: userRegisterReducer
})

export default rootReducer