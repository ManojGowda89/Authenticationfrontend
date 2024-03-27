import React, { useEffect } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";
import Loading from './Loading';
let otpvalue = "";
export default function Createuser() {
  const [showemail, setsemail] = React.useState(true);
  const [showotp, setOtp] = React.useState(false);
  const [showuser, setuser] = React.useState(false);
  const [email, setemail] = React.useState("");
  const [res, setres] = React.useState();
  const [conditon, setconditon] = React.useState(true);
  const [loading, setLoading] =React.useState(false);
  const Navigate = useNavigate()

  const [password, setpassword] = React.useState("");
  const [username, setusername] = React.useState("");
  


  useEffect(() => {
    setTimeout(() => {
      setsemail(true);
      setOtp(false);
      setuser(false);
    }, 5 * 60 * 1000); 

   
  }, [showotp, showuser]);

  // email
  function handelemail(e) {
    e.preventDefault();
    setLoading(true);
    const otp = Math.round(Math.random() * 10000);
    axios.post("https://authentication-lisz.onrender.com/create",{email,otp})  
      .then((result) => {
        if (result.data === "otp") {
          
         
          OtpAtantiction(otp);
        } else {
         setTimeout(() => {
          setLoading(false);
           setres(result.data);
         }, 500);
        }
      })
      .catch((error) => console.log(error));
  }

  function OtpAtantiction(x) {
    
    otpvalue = x;
    
    setsemail(false);
    setOtp(true);
    setTimeout(() => {
      setLoading(false);
      alert("Enter otp");
    }, 500);
  }


  // otp  verification

  function getuserotp(e){

    if(otpvalue== e.target.value){
        setconditon(false);
    }
    else{
        setconditon(true);
    }

  }
  function handleOtp(e) {
    e.preventDefault();
    setLoading(true)
     setsemail(false);
      setOtp(false);
     
      setconditon(true);
      setTimeout(() => {
      setLoading(false)
        setuser(true);
      }, 500);
  }



  // user verification

 function checkpassword(e){
      
    if(password == e.target.value){
        setres("Password Matched");

       setconditon(false);
           
        
    }else{
    setconditon(true);
        setres("password do not match!");
    }

 }

function handleUserRegistration(e){
 e.preventDefault();

 axios.post("https://authentication-lisz.onrender.com/createuser",{username,email,password,jwt:otpvalue}).then((result)=>{
   setLoading(true);
   setTimeout(() => {
     setLoading(false);
     alert(result.data);
     Navigate("/")
   }, 500);

 }).catch((err)=>alert(err.message));

}
if(loading){
  return <Loading/>
}

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        {showemail && (
          <div>
            <h1>{res ? res : "Sign up"}</h1>
            <form onSubmit={handelemail}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
                <div id="emailHelp" className="form-text">
                  Well never share your email with anyone else.
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Verify your email
              </button>{" "}
              {"  "}
              <Link className="btn btn-primary" to="/">
                Login
              </Link>
            </form>
          </div>
        )}
        
        {showotp && (
          <div>
            <form onSubmit={handleOtp}>
              <h1>{res ? res : "OTP Verification"}</h1>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername"
                  onChange={getuserotp}
                  placeholder="Enter 4 digit OTP"
                  required
                />
              </div>
              <button type="submit" disabled={conditon} className="btn btn-success">
                Verify OTP
              </button>{" "}
              <button
                type="button"
                onClick={handelemail}
                className="btn btn-danger"
              >
                Resend OTP
              </button>
            </form>
          </div>

       
          
          
          )
          
      }

        {showuser && (
          <div>
            <h1>Email Verification Completed</h1>
            <form onSubmit={handleUserRegistration}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={(e)=>setusername(e.target.value)}
                  placeholder="Enter your name"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Create password"
                  aria-describedby="emailHelp"
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
                {res ? res : <br />}
                <input
                  type="text"
                  className="form-control"
                  id="password2"
                  placeholder="Conform password"
                  aria-describedby="emailHelp"
                  onChange={checkpassword}
                  required
                />
              </div>

              <button type="submit" disabled={conditon} className="btn btn-primary">

                Create New Account
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
