import React, { Component } from 'react';
import { Header } from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Login } from './views/login';
import { Users } from './views/users';
import { Home } from './views/home';
import { UserDetail } from './views/userDetail';
import {UserContext} from './context';
import { Profile } from './views/profile';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {
        email: null,
        token: null
      },
      setUser: this.setUser
    }
  }

  setUser = ({email, token}) => {
    this.setState({user: {email: email, token: token}});
  }

  render = () => {

    return (
      <UserContext.Provider value={this.state}>
      <Router>
        <div>
          <Header />
          <div className="container mx-auto p-5">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route path="/users/:id" component={UserDetail} />
              <Route path="/users" component={Users} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
      </UserContext.Provider>
    );
  }
  
}

export default App;
