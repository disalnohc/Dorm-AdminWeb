import React, { useState } from 'react';
import { auth } from '../firebase';

const SignInForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      if(auth.signInWithEmailAndPassword(username, password)){
        onLogin();
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("เข้าสู่ระบบไม่สำเร็จ: ", errorCode, errorMessage);
    }
  }

  return (
    <div className="form-container-2 sign-in-container-2">
      <form className='form'>
        <h1>Sign in</h1>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/forgot-password">Forgot your password?</a>
        <button onClick={handleLogin} className='btn-login'>Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
