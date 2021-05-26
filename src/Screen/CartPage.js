import React from "react";
import {useHistory} from 'react-router-dom';

function CartPage() {
  const [product, setproduct] = React.useState([]);
  const history=useHistory();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if(user!==null && user!=="")
    {
    if (localStorage.getItem("Product") != null) {
      
      console.log(user._id);
      console.log(JSON.parse(localStorage.getItem("Product")));
      const cart = JSON.parse(localStorage.getItem("Product")).filter(
        (p) => user._id.$oid === p.user._id.$oid
      );
      console.log("Cart:"+cart)
      setproduct(cart);
    }}
    else{
        history.push('/');
    }
  }, []);
  const handleRemoveFromCart=()=>{

  }
  return (
    <div className="container">
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
            </tr>
          </thead>
          <tbody>
            {
              product.filter(p => delete p.user).map((p, i) => {
                return <tr><th scope="row">{i + 1}</th>{Object.entries(p).map(value => { 
                  if (value[0] === "imgUrl") { 
                  return (<td><img src={value[1]} width="50" height="50" alt="" style={{borderRadius:"50%"}}></img></td>) } 
                  else { 
                      return (<td>{value[1]}</td>)
                  } })}
               </tr>
              })
            }

          </tbody>
        </table>
      </div>
      
  );
}

export default CartPage;
