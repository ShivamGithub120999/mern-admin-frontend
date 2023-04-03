import "./App.css";
import React from "react";
import Layout from "./components/layout/index"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './containers/Home/index'
import Signin from './containers/Signin/index'
import Signup from './containers/Signup/index'
import PrivateRoute from "./components/HOC/PrivateRoute.js"

function App() {
  return (
    <div className="App">
     <Router>
      <Switch>
        <PrivateRoute path="/" exact component={Home}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/signup" exact component={Signup}/>
      </Switch>
     </Router>
    </div>
  );
}

export default App;
