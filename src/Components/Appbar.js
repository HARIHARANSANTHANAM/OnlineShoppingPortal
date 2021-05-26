import React from 'react'
import {NavLink, useHistory} from 'react-router-dom';

function Appbar() {

    const history=useHistory();
    const handlelogout=()=>{
        localStorage.setItem("User",null);
        history.push('/Login');
    }

    return (
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01" style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
      
      <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
    <NavLink className="navbar-brand" to="/Home">ConnctedhBrand</NavLink>
    {
         JSON.parse(localStorage.getItem("User"))!=null?
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
      <li className="nav-item active">
        <NavLink className="nav-link" to="/Home">Home </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link"  to="/CartPage">Cart</NavLink>
      </li>
      <li className="nav-item">
            {
                JSON.parse(localStorage.getItem("User"))!=null ?<p style={{marginTop:"6px"}}>{JSON.parse(localStorage.getItem("User")).username}</p>:<></>
            }
      </li>
    </ul>:<></>
        }
    </div>
    {
        JSON.parse(localStorage.getItem("User"))!=null?
    <form className="form-inline my-2 my-lg-0" style={{display:"flex"}}>
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{marginRight:"10px"}}/>
      <button className="btn btn-outline-success my-2 my-sm-0 mr-2" type="submit">Search</button>
      <button className="btn btn-outline-danger" onClick={handlelogout}>Logout</button>
    </form>:<></>
        }
  </div>
</nav>
        </>
    )
}

export default Appbar
