import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { Form } from "react-bootstrap";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [m_email, setMemail] = useState("");
  const [m_password, setMpassword] = useState("");
  const [ischecked , setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const setCheck = () => {
    setIsChecked(true);
  }

  // const url = "/api/users/login";
  
  // if(ischecked){
  //   url = "api/users/hotel-login"
  // }

  async function Login() {
    setLoading(true);
    
    const user = {
      email,
      password,
    };

    const merchant = {
      m_email,
      m_password
    }

        try{
          var result;
          console.log(ischecked);
          !ischecked ? result = (await axios.post("/api/users/login", user)).data : result = (await axios.post("api/users/hotel-login", merchant)).data;
          localStorage.setItem("currentUser", JSON.stringify(result));
          ischecked ? window.location.href = "/merchantadmin" : result.isAdmin ? window.location.href = "/admin" : window.location.href = "/newhome";
        }        catch (error) {
         console.log(error);
         setError("Invalid Credentials");
         console.log(result);
       }
       setLoading(false);
      }

        // if(ischecked){
        //   const result = (await axios.post("/api/users/login", user)).data;
        // }else {
        //   const result = (await axios.post("api/users/hotel-login", merchant)).data;
        // }
    //console.log(user);
  
  return (
    <div>
      {loading && <Loader></Loader>}

      <div className="row justify-content-center mt-5" style = {{paddingBottom : "16rem"}}>
        <div className="col-md-5 mt-5" >
          {error.length > 0 && <Error msg={error}></Error>}
          <div className="bs" style = {{paddingBottom : "16rem"}}>
            <h2>Login</h2>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Merchant Login"
              onChange={setCheck}
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMpassword(e.target.value);
              }}
            />
            {loading ? (
              <div>Login...Please Wait...</div>
            ) : (
              <button className="btn btn-primary mt-3" onClick={Login}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
