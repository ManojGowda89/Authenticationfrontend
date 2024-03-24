import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { decrypt } from "n-krypta";
import Page from "./Page"
import Loading from './Loading';

export default function Dashboard() {
  const Navigate = useNavigate();
  const [token, setToken] = useState("");
  const storedKey = sessionStorage.getItem("2");
  const key = storedKey ? decrypt(storedKey, "manoj") : null;
  const storedEmail =sessionStorage.getItem("1");
  const email = storedEmail ? decrypt(storedEmail, key) : null;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (email) {
      axios
        .get(`https://authentication-lisz.onrender.com/tokenvalidate/${email}`)
        .then((result) => setToken(result.data))
        .catch((error) => console.error(error));
    }
  }, [email]);

  function Authentication(e) {
    e.preventDefault();
    const uuid = crypto.randomUUID();
    axios
      .put("https://authentication-lisz.onrender.com/token", { email, jwt: uuid })
      .then(() => {

        setLoading(true)
        sessionStorage.clear();
        setTimeout(() => {
          setLoading(false);
          Navigate("/");
          alert("Logout successful");
          
        }, 1000);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      sessionStorage.clear();
      window.location.reload();
    }, 1000 * 60 * 60);

    return () => clearTimeout(timeoutId);
  }, []);


if(loading){
  return <Loading/>
}

  if (key === token.jwt) {
    return (
      <div>
        <h1>{token.username}</h1>
        <h1>Login successful</h1>
        <Link onClick={Authentication}>Sign out</Link>
      </div>
    );
  } else {
    return (
      <Page/>
    );
  }
}
