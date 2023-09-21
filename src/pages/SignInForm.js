import React, { useState } from 'react';

const SignInForm = ({ onLogin }) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      onLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="form-container-2 sign-in-container-2">
      <form>
        <h1>Sign in</h1>
        <div className="social-container-2">
          <a href="/facebook" className="social-2">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="/google" className="social-2">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="/linkedin" className="social-2">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/forgot-password">Forgot your password?</a>
        <button onClick={handleLogin}>Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
