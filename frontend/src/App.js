import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Landing from './components/Landing/Landing';
import UserLogin from './components/User/Login/UserLogin';
import UserRegister from './components/User/Register/UserRegister';

import { Provider } from 'react-redux'
import store from './redux/store'


function App() {
  return (
    <Provider store={store}>
      <Router >
        <Navigation />
        <Route exact path='/' component={Landing} />
        <Route path='/login' component={UserLogin} />
        <Route path='/register' component={UserRegister} />
        {/* <Route path='/dashboard' component={Dashboard} /> */}
        {/* <Route exact path='/admin' component={AdminLogin} />
        <Route path='/admin/register' component={AdminRegister} /> */}
      </Router>
    </Provider>
  );
}

export default App;
