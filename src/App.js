import "./App.css";
import React from "react";
import Layout from "./components/layout/index"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './containers/Home/index'
import Signin from './containers/Signin/index'
import Signup from './containers/Signup/index'
import PrivateRoute from "./components/HOC/PrivateRoute.js"
import { useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/auth.actions"
import {useDispatch} from "react-redux";
import { useEffect } from "react";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
    dispatch(isUserLoggedIn())
  }
  },[])
 
  return (
    <div className="App">  
      <Switch>
        <PrivateRoute path="/" exact component={Home}/>
        <PrivateRoute path="/category" component={Category}/>
        <PrivateRoute path="/products" component={Products}/>
        <PrivateRoute path="/orders" component={Orders}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/signup" exact component={Signup}/>
      </Switch>
    </div>
  );
}

export default App;
