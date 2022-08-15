import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";

const VerifyLogin = () => {

  const navigate = useNavigate();
  const { phone } = useParams();
  const [code, setCode] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const submit = (e) => {
    e.preventDefault();
    axios({
      url: `/api/auth/verifyLoginExpert/${phone}`,
      method: "POST",
      data: { code: code },
    })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        
          M.toast({
            html: res.data.message,
            classes: "#64dd17 light-green accent-4",
          });
          navigate("/");
          console.log("Data submitted");
        } else {
          M.toast({ html: "Invalid OTP", classes: "#f44336 red" });
          navigate("/api/auth/loginExpert");
        }
        setCode("");
      })
      .catch((e) => {
        console.log("Internal Server error");
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>OTP Verification</h2>
        <form onSubmit={submit}>
          <input
            type="number"
            placeholder="OTP"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button
            className="btn waves-effect waves-light #2b67ab blue darken-3 white-text text-lighten-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyLogin;
