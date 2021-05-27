import React from 'react'
import Appbar from '../Components/Appbar';
import p from '../product.json';
import useStyles from '../CSS/product.module.css';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product(props) {
    const {cartlength,setcartlength}=props;
    const {id}=props.match.params;
    const [productdetail, setproductdetail] = React.useState({})
    const classes=useStyles;

    React.useEffect(() => {
       for(let pro of p)
       {
           console.log(pro.id+" "+id)
           if(pro.id === id)
           {      
               
             console.log(pro)
             setproductdetail(pro);
             break;
           }
       }
    }, [])

    
  const handleAddtoCart = (e,pro) => {
      e.preventDefault();
    let Product_EXIST_In_Cart=false;
    console.log(pro)
    if ("Product" in localStorage) {
      pro["user"] = JSON.parse(localStorage.getItem("User"));
      if (JSON.parse(localStorage.getItem("Product")) != null) {
        const cart = JSON.parse(localStorage.getItem("Product"));
        console.log(cart);
         for(const c of cart)
         {
           if(pro.imgUrl===c.imgUrl && pro.user.username === c.user.username)
           {
             Product_EXIST_In_Cart=true;
             break;
           }
         }
         console.log(Product_EXIST_In_Cart);
        if(Product_EXIST_In_Cart)
        {
          toast.warning("Product is Already Added to Cart...",{
          });
          console.log("Product is Already Added to Cart...")
        }
        else{
        cart.push(pro);
        localStorage.setItem("Product", JSON.stringify(cart));
        let localstorage_product=JSON.parse(localStorage.getItem("Product"));
         let cartl=localstorage_product.filter(c=> pro.user.username === c.user.username);
         setcartlength(cartl.length);
         toast.success("Product is Added to Cart...",{
        });
        }
      } else {
        const newcart = [];
        newcart.push(pro);
        setcartlength(newcart.length);
        localStorage.setItem("Product", JSON.stringify(newcart));
        toast.success("Product is Added to Cart...",{
        });
      }
    } else {
      localStorage.setItem("Product", null);
    }
  };

    return (
        <div>
                   <Appbar cartlength={cartlength}/>
                   <div className="jumbotron d-flex flex-wrap">
                   <img src={productdetail.imgUrl} alt="" className={classes.image}/>
                   <div className="container"> 
                    <h3>{productdetail.name}</h3>
                   <h5>Rs {productdetail.price}</h5>
                   <button className="btn btn-warning" style={{ color: "white" }} onClick={(e) => handleAddtoCart(e,productdetail)}>Add to Cart</button>
                   </div>
                   </div>
                        <ToastContainer/>
        </div>
    )
}

export default Product
