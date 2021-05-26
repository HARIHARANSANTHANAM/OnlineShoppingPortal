import React from "react";
import product from "../product.json";
import { Link } from "react-router-dom";

function Home() {
  React.useEffect(() => {
    if ("Product" in localStorage) {
      console.log("Cart is Empty");
    } else {
      localStorage.setItem("Product", null);
    }
  }, []);

  const handleAddtoCart = (product) => {
    if ("Product" in localStorage) {
      product["user"] = JSON.parse(localStorage.getItem("User"));
      if (JSON.parse(localStorage.getItem("Product")) != null) {
        const cart = JSON.parse(localStorage.getItem("Product"));
        console.log(cart);
        cart.push(product);
        localStorage.setItem("Product", JSON.stringify(cart));
      } else {
        const newcart = [];
        newcart.push(product);
        localStorage.setItem("Product", JSON.stringify(newcart));
      }
    } else {
      localStorage.setItem("Product", null);
    }
  };

  return (
    <>
      <div class="container">
        <table class="table table-striped ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Id</th>
              {
                product[0] && Object.keys(product[0]).map(keys => {
                  return (
                    <th scope="col">{keys}</th>
                  );
                })
              }
              <th>Cart</th>
            </tr>
          </thead>
          <tbody>
            {
              product.filter(p => delete p._id).map((p, i) => {
                return <tr><th scope="row">{i + 1}</th>{Object.entries(p).map(value => { 
                  if (value[0] === "imgUrl") { 
                  return (<td><img src={value[1]} width="50" height="50" alt="" style={{borderRadius:"50%"}}></img></td>) } 
                  else { 
                      return (<td>{value[1]}</td>)
                  } })}
                  <th><button className="btn btn-warning" style={{ color: "white" }} onClick={() => handleAddtoCart(p)}>Add </button></th></tr>
              })
            }

          </tbody>
        </table>
      </div>
            <center>
      <button className="btn btn-primary"><Link to="/CartPage" style={{ color: "white", textDecoration: "none" }}>Go to Cart Page</Link></button>
      </center>
    </>
  );
}

export default Home;
