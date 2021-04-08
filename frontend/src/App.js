import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navigation from './components/Navigation/Navigation';
import Landing from './components/Landing/Landing';
import UserLogin from './components/User/Login/UserLogin';
import UserRegister from './components/User/Register/UserRegister';
import UserDashboard from './components/User/Dashboard/UserDashboard';
import AdminLogin from './components/Admin/Login/AdminLogin';
import AdminRegister from './components/Admin/Register/AdminRegister';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
// import AdminTopics from './components/Admin/Dashboard/Topics/AdminTopics';
import AdminUsers from './components/Admin/Dashboard/Users/AdminUsers';

import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { fetchUserLoginSuccess, logoutUser } from './redux';

import { Provider } from 'react-redux';
import {store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import PrivateRouteUser from './components/Common/PrivateRouteUser';
import PrivateRouteAdmin from './components/Common/PrivateRouteAdmin';
import ExcerciseBook from './components/Admin/Dashboard/ExcerciseBook/ExcerciseBook';
import CreateTask from './components/Admin/Dashboard/ExcerciseBook/CreateTask/CreateTask';

// Check for token
if (localStorage.jwtToken) {

  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(fetchUserLoginSuccess(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    
    // Logout user
    store.dispatch(logoutUser({}));
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }

}

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router >
          <Navigation />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/login' component={UserLogin} />
            <Route path='/register' component={UserRegister} />
            <PrivateRouteUser path='/dashboard/user' component={UserDashboard} />
            <Route exact path='/admin' component={AdminLogin} />
            <Route path='/admin/register' component={AdminRegister} />
            <PrivateRouteAdmin exact path='/dashboard/admin' component={AdminDashboard} />
            <PrivateRouteAdmin exact path='/dashboard/admin/excercises' component={ExcerciseBook} />
            <PrivateRouteAdmin exact path='/dashboard/admin/task' component={CreateTask} />
            <PrivateRouteAdmin exact path='/dashboard/admin/users' component={AdminUsers} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
