import Login from "./Screen/Login";
import Home from "./Screen/Home";
import React, {useEffect} from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import CartPage from "./Screen/CartPage";
import Appbar from "./Components/Appbar";

function App() {
  useEffect(() => {
    if ("User" in localStorage) {
      console.log("User Object exists");
      console.log(localStorage.getItem("User"));
    } else {
      console.log("User not exists in Localstorage");
      localStorage.setItem("User", null);
    }
 
  }, []);
  return (
    <>
    <Router>
      <Switch>
        {
          localStorage.getItem("User")?
          <Route path="/Home">
            <Appbar/>
          <Home/>
        </Route>: <Route path="/Login">
        <Appbar/>
          <Login/>
        </Route>
        }
         <Route path="/Login">
        <Appbar/>
          <Login/>
        </Route>
        <Route path="/CartPage">
        <Appbar/>
          <CartPage/>
        </Route>
      </Switch>
    </Router>
      
    </>
  );
}

export default App;
