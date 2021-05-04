import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import './App.scss'
import ChatPlatfrom from './Componant/ChatPlatfrom/ChatPlatfrom';
import Login from './Componant/Login/Login';
import PrivetRouter from './Componant/PrivetRouter/PrivetRouter';

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <PrivetRouter path='/home'>
            <ChatPlatfrom></ChatPlatfrom>
          </PrivetRouter>
          <Route path='/login'>
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;