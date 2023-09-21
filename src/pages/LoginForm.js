import React, { useState } from "react";
import "./login.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function LoginForm({ onLogin }) {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container-2 " + (type === "signUp" ? "right-panel-active-2" : "");
  return (
    <div className="App">
      <div className={containerClass} id="container-2">
        <SignUpForm />
        <SignInForm onLogin={onLogin} />
        <div className="overlay-container-2">
          <div className="overlay-2">
            <div className="overlay-panel-2 overlay-left-2">
              <p className="h1">Welcome Back!</p>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
              </div>
            <div className="overlay-panel-2 overlay-right-2">
              <p>Hello, Friend!</p>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}