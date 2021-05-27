import Login from "./Screen/Login";
import Home from "./Screen/Home";
import React, {useEffect} from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import CartPage from "./Screen/CartPage";
import Appbar from "./Components/Appbar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Product from "./Screen/Product";

function App() {

  const [cartlength, setcartlength] = React.useState("")
  useEffect(() => {
    if ("User" in localStorage) {
      console.log("User Object exists");
      const user=JSON.parse(localStorage.getItem("User"));
      if(user)
      {
      const product=JSON.parse(localStorage.getItem("Product"));
      if(product){
      const cartproduct=product.filter(p=>{
        if(p.user.username === user.username)
        {
          return p;
        }
      })
      console.log(cartproduct)
      setcartlength(cartproduct.length);
    }
    else{
      setcartlength(0);
    }
      }
      else{
        toast.error("You must be Logged In",{})
      }
    } else {
      console.log("User not exists in Localstorage");
      localStorage.setItem("User", null);
    }
 
  }, []);
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact>
          {JSON.parse(localStorage.getItem("User"))?
         <> <Appbar cartlength={cartlength}/>
          <Home  setcartlength={setcartlength}/></>:<>
          <Appbar cartlength={cartlength}/>
          <Login /></>}
        </Route>
        <Route path="/Home">
            <Appbar cartlength={cartlength}/>
          <Home  setcartlength={setcartlength}/>
        </Route>
         <Route path="/Login">
        <Appbar/>
          <Login/>
        </Route>
        <Route path="/CartPage">
        <Appbar cartlength={cartlength}/>
          <CartPage setcartlength={setcartlength}/>
        </Route>

        <Route path="/Product/:id" render={(props)=><Product {...props} cartlength={cartlength} setcartlength={setcartlength}/>}/>

      </Switch>
    </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
