import React, { useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const send = JSON.stringify({ email: email, password: password });

    const response = await fetch("http://localhost:5000/posts/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: send,
    });

    if (response.status === 200) {
      const res = await response.json();
      sessionStorage.setItem("btoken", res.accessToken);
      sessionStorage.setItem("usertype", "USER");
      navigate("/");
      window.location.reload(false);
    } else {
      alert("Email or Password wrong!!");
    }
  }

  return (
    <div className={classes.body1}>
      <div className={classes.contactForm}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <p>Username</p>
          <input
            type="text"
            name=""
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            name=""
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            <input type="checkbox" />{" "}
            <span className={classes.checkboxText}>Remember Me</span>
          </p>
          <input type="submit" name="" value="Sign In" />
        </form>
        <div>
          <p>
            <a href="/register" style={{ color: "white" }}>
              New user to Tap Waste? Sign up here
            </a>
          </p>
          <p>
            <a href="/loginvendor" style={{ color: "white" }}>
              login/signup for vendors
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
