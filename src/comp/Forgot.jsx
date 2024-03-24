import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from './Loading';
let otpValue="";

export default function Forgot() {
  const [vemail,getvemail] =useState(true);
  const [email, setEmail] = useState("");
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [loading, setLoading] =useState(false);
  const [condition,setCondition] = useState(true)
  const [changepassword, setChangePassword] = useState(false)
  const [password, getpassword] = useState('')
  const[res,setres]=useState();
     const Navigate = useNavigate();

     
     useEffect(() => {
       setTimeout(() => {
     window.location.reload()
      }, 5 * 60 * 1000); // 5 minutes
  

    }, [otpEnabled, changepassword]);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

      const otp = Math.round(Math.random() *10000)
    
    axios.post("https://authentication-lisz.onrender.com/forgot", { email,otp})
      .then((result) => {
       
        if (result.data === "Email-Found") {
        
          otpValue = otp.toString()
          getvemail(false)
          setTimeout(() => {
            setLoading(false);
            setOtpEnabled(true); 
          }, 1500);
          
        
        }

      
          setTimeout(() => {
            setLoading(false);
            setres(result.data)
          }, 1000);
       
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("some thing went wrong")
      });
  }


  function setOtp(e){

    if(otpValue ==e.target.value ){
      setCondition(false);
    }else{
      setCondition(true);
    }

  }
  function otphandel(x){

    x.preventDefault()
       setLoading(true);
      setOtpEnabled(false); 
      setTimeout(() => {
        setLoading(false);
        setChangePassword(true)
        
      }, 500);

  }
 function changePasswordHandler(e){
    e.preventDefault()
 setLoading(true);
    axios.put("https://authentication-lisz.onrender.com/forgotpassword",{email,password}).then((result)=>{
        if(result.data.password){
          sessionStorage.clear()
          
          setTimeout(() => {
            setLoading(false)
            alert("password changed successfully")
            Navigate("/")
              
            }, 500);
        }else{
          setLoading(false);
            alert("error occurred")
            window.location.reload()

        }
    }
    

    ).catch((err)=>console.log(err) )
 }

  if(loading){
    return <Loading/>
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">

    {
        vemail &&( 
          <div>
          <h1> {res ? res: "Enter your Email"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your Email"
            value={email}
          
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
     
          Send OTP
        </button> {"      "}
        <Link to="/" className="btn btn-primary" >Login</Link>
       
      </form>
      </div>)

    }

        
        {otpEnabled && (
          <div>
          <h1>Enter otp</h1>
            <form onSubmit={otphandel}>
          
          <div>
        
            <input
              className="form-control"
              type="text"
              name="otp"
              required
              placeholder="Enter 4 digit OTP"
              onChange={setOtp}
            />
          </div>
          <br/>
       
         
     
          <button type="submit" disabled={condition} className="btn btn-success">Change Password</button>     {"  "}
          <Link className="btn btn-danger" onClick={handleSubmit}> Resend OTP</Link>
          </form>
          <br/>
        
          </div>
        )}
        {
            changepassword && (
              <div>
              <h1>Change Password</h1>
                <form onSubmit={changePasswordHandler}>
                <div>
               <label className="form-label" htmlFor="password">
                    Enter password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="otp"
                    required
                    onChange={(e)=>getpassword(e.target.value)}
                  />
                </div><br/>
                <button type="submit" className="btn btn-primary">submit</button>
                </form>

                </div>



            )


        }
      </div>
    </div>
  );
}
