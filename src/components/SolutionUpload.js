import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";

const SolutionUpload = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [problem, setProblem] = useState("");
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/api/auth/loginExpert");
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if(problem===""||advice===""){
      M.toast({
        html: "Problem/Advice cannot be empty",
        classes: "#f44336 red",
      });
      return;
    }
    axios({
      url: `/solution/${id}`,
      method: "POST",
      data: {problem:problem, advice:advice},
      headers: {
        "auth": `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
    .then((res) => {
        if (res.data.success) {
          setAdvice("");
          setProblem("");
          console.log("Data submitted");
          M.toast({
            html: res.data.message,
            classes: "#64dd17 light-green accent-4",
          });
          navigate('/expert/ViewResults');
        }
        else{
          setAdvice("");
          setProblem("");
          M.toast({
            html: res.data.message,
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
        <h2>Provide Advice</h2>
        <form onSubmit={submit}>                                                                                        
            <input
              type="text"
              placeholder="Problem Name"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required
            />
            <textarea
              placeholder="Advice"
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              required
            />
            <br />
            <button
                className="btn waves-effect waves-light #2b67ab blue darken-3 white-text text-lighten-3"
                type="submit">
                Submit
            </button>
        </form>
      </div>
    </div>
  );
};

export default SolutionUpload;
