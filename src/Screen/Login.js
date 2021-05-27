import React,{useState} from 'react'
import login from '../login.json';
import useStyles from '../CSS/login.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const [username, setusername] = useState("");    
    const [password, setpassword] = useState("");
    const [pwdtype,setpwdtype]=useState("password");
    const [pwdicon,setpwdicon]=useState("fa fa-eye-slash");

        React.useEffect(() => {
            
            if(JSON.parse(localStorage.getItem("User"))!=null)
            {
                    window.location='/Home';
                }
        
        }, [])

 const handlepwdtype=()=>{
     if(pwdtype==="password")
     {
         setpwdtype("text");
         setpwdicon("fa fa-eye");
     }
     else{
        setpwdtype("password");
        setpwdicon("fa fa-eye-slash");
     }

 }
    const handleUsername=(e)=>{
        console.log(e.target.value);
        setusername(e.target.value);
    }

    
    const handlePassword=(e)=>{
        console.log(e.target.value);
        setpassword(e.target.value);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        var user=null;
        for(const f of login)
        {
            if(f.username === username && f.password === password)
            {
                 user=f;
            }
        }
       
        if(user)
        {
            localStorage.setItem("User",JSON.stringify(user));
            window.location='/Home';
        }
        else{
            toast.error("Incorrect username or password",{});
            console.log("incorrect")
        }
        
    
    }
    return (
        <div className={useStyles.container}>
            
        <ToastContainer/>
            <center>
                <h4>ConnectedH</h4>
                <i className="fa fa-user" style={{fontSize:"30px",border:"2px solid black",borderRadius:"60px",padding:"20px"}}></i>
            </center>
            <br></br>
        <form >
        <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">U</span>
  </div>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={username} onChange={handleUsername}/>
            </div>
            <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1" >P</span>
  </div>
  <input type={pwdtype} class="form-control"  aria-label="Username" aria-describedby="basic-addon1" placeholder="Password" value={password} onChange={handlePassword}/>
  <div class="input-group-prepend" onClick={()=>handlepwdtype()} style={{cursor:"pointer"}}>
    <span class="input-group-text" id="basic-addon1" ><i className={pwdicon}></i></span>
  </div>
            </div>
            <div style={{width:"100%"}}>
           <button onClick={handleSubmit} className="btn btn-success" style={{width:"100%"}}><i className="fa fa-sign-in"></i> Signin</button>
           </div>
        </form>
        <center>
        <a href="#">Don't have an Account? please contact Admin</a>
        </center>
        <br></br>
        </div>
    )
}

export default Login
