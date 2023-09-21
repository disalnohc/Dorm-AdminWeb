import React, { useState } from "react";
import "./UI.css";
const SignInForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      onLogin();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="form-container-2 sign-in-container-2">
      <form>
        <h1>Sign in</h1>
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="LabelBox">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
            <a className="forgot" href="/forgot-password">Forgot your password?</a>
          </label>
        </div>
        <button className="button" onClick={handleLogin}>Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
