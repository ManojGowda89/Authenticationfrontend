import { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { encrypt} from "n-krypta";
import Loading from './Loading';
export default function Login() {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [res, setRes] = useState('');
    

   
  


 



   const Navigate = useNavigate();

  
  
    function handleLogin(e) {
        e.preventDefault();
        setLoading(true);

        axios.post("https://authentication-lisz.onrender.com/login", { email, password })
            .then((result) => {
             
                if (result.data === "success") {

                  
                    const uuid = crypto.randomUUID();
                    Antentication(uuid);
                 
                    
                }
               
                setTimeout(()=>{
                    setLoading(false)
                setRes(result.data);
                },1000)
            })
            .catch((err)=>console.error(err));
    }
    function Antentication(x){
       
        sessionStorage.setItem("1",encrypt(email,x));
        sessionStorage.setItem("2",encrypt(x,"manoj"))
        axios.put("https://authentication-lisz.onrender.com/token",{email,jwt:x}).catch((error) => {console.log(error)})
         
        setTimeout(() => {
            setLoading(false)
            Navigate("/dashboard")
        }, 1000);
                          
                   

    }

   

    if (loading) {
      return <Loading/>
      }
        return (
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-50 bg-white rounded p-3">
                <h1>{res ? res :"Login"}</h1>
                   <form onSubmit={handleLogin} >
                   <div className="mb-3">
                   <label htmlFor="email" className="form-label">Email</label>
                   <input
                       type="email"
                       className="form-control"
                       id="email"
                       placeholder="Enter your Email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                   />
                   <div id="emailHelp" className="form-text">
                       Well never share your email with anyone else.
                   </div>
               </div>
               <div className="mb-3">
                   <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                   <input
                       type="password"
                       className="form-control"
                       placeholder="**************"
                       id="exampleInputPassword1"
                  
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                   />
                 
               </div>
               <button type="submit" className="btn btn-primary">Login</button> <br/><br/>
             
                    </form>
                    <div className="card-footer">
                    
                    <Link to="/createuser" className="float-right">Sign up</Link>   {" "}
                    <Link to="/forgot" className="float-left">forgotpassword</Link> 
                  </div>
                </div>
            </div>
        );
    }

