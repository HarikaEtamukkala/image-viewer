import React ,{Component}from 'react';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import { Router, Route } from 'react-router-dom';
import history from './history';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../screens/profile/Profile'
class Routes  extends Component {
 

  constructor() {
    super();
    this.baseUrl = "http://localhost:3000/";
  }
  state = {
    loggedIn:  sessionStorage.getItem("access-token") == null ? false : true,
  };
  render() {
    console.log(this.state.loggedIn);
    return (
      <Router history={history}>
        <div className="main-container">
          <Route exact path='/' component={Login} />
         
          <ProtectedRoute path="/home" loggedIn={this.state.loggedIn} component={Home} />
          <Route exact path='/profile' component={Profile} />
        </div>
      </Router>
    )
  }
}

export default Routes;
