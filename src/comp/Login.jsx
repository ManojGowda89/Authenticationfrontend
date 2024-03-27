import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { encrypt } from "n-krypta";
import Loading from "./Loading";

let otpvalue =""
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");
  const [login,setLogin] = useState(true);
  const [showotp,getotp] = useState(false);
  const [condion,setcondition] = useState(true);

  const Navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const otp = Math.round(Math.random() * (9999 - 1000) + 1000).toString();
    
    otpvalue = otp;
    
    axios
      .post("https://authentication-lisz.onrender.com/login", {
        email,
        password,
        otp
      })
      .then((result) => {
        if (result.data === "success") {
            axios.get("https://authentication-lisz.onrender.com/generatetoken").then((result)=>Antentication(result.data)).catch((error)=>{console.log(error)})
            console.clear()
          
        }

        setTimeout(() => {
          setLoading(false);
          setRes(result.data);
        }, 1000);
      })
      .catch((err) => {
        console.error(err)
        console.clear()
      });
  }
  async function Antentication(x) { 
    sessionStorage.setItem("1", encrypt(email, x));
    sessionStorage.setItem("2", encrypt(x, "manoj"));
    axios
      .put("https://authentication-lisz.onrender.com/token", { email, jwt: x })
      .catch((error) => {
        alert("Token not generated"+error)
        console.clear()
        window.location.reload()
      });

    setTimeout(() => {
      setLoading(false);
       setLogin(false)
      getotp(true)
    }, 1000);
  } 
  
  function getuserotp(e){

    if(otpvalue== e.target.value){
      setcondition(false);
    }
    else{
      setcondition(true);
    }

  }
  function handleOtp(e){
    e.preventDefault();
    Navigate("/dashboard");
    console.clear()
  }
  if (loading) {
    return <Loading />;
  }
  return (

    

    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
      { login && (
      <div>
        <h1>{res ? res : "Login"}</h1>
        <form onSubmit={handleLogin}>
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
            <div id="emailHelp" className="form-text">
              Well never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>{" "}
          <br />
          <br />
        </form>
        <div className="card-footer">
          <Link to="/createuser" className="float-right">
            Sign up
          </Link>{" "}
          <Link to="/forgot" className="float-left">
            forgotpassword
          </Link>
        </div>
        </div>
      )
      }
        { 
          showotp && (
            <div>

            <div>
            <form onSubmit={handleOtp}>
              <h1>OTP Verification</h1>
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
              <button type="submit" disabled={condion} className="btn btn-success">
                Verify OTP
              </button>{" "}
              <button
                type="button"
                onClick={handleLogin}
                className="btn btn-danger"
              >
                Resend OTP
              </button>
            </form>
          </div>

            </div>
          )

        }
      </div>
    </div>
  );
}
