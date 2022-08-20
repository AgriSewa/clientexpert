import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const submit = (e) => {
    e.preventDefault();
    axios({
      url: "/api/auth/loginExpert",
      method: "POST",
      data: { phone: phone },
    })
      .then((res) => {
        if (res.data.success) {
          navigate(`/api/auth/verifyLoginExpert/${phone}`);
          setPhone("");
          console.log("Data submitted");
        }else{
          M.toast({
            html: "Phone not registered",
            classes: "#f44336 red",
          }); 
        }
      })
      .catch((e) => {
        console.log("Internal Server error");
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            className="btn waves-effect waves-light #2b67ab blue darken-3 white-text text-lighten-3"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
