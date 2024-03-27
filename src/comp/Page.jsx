import  { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const [time, setTime] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      setTime(true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }, 5000);

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);


  
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#0D6EFD",
    color: "white",
    fontSize: "25px",
  };

  const blinkStyle = {
    animation: time ? "blink-animation 1s step-start infinite" : "none",
  };
  

  return (
    <div style={styles}>
      {time ? (
        <>
          Redirecting to Home Page{" "}
          <span style={blinkStyle}>......</span> 
        </>
      ) : (
        <center>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </center>
      )}
    </div>
  );
}
