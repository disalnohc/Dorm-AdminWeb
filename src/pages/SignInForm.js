import React, { useState } from 'react';
import { auth } from '../firebase';
import { firestore } from '../firebase';
const SignInForm = ({ onLogin }) => { 
  const [username, setUsername] = useState('a@a.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = async () => {
    try {
      const userLogin = await auth.signInWithEmailAndPassword('a@a.com', '123456');
      
      if (userLogin) {
        alert('ล็อกอินสำเร็จ');
        onLogin(); 
      } else {
        alert('ล็อกอินไม่สำเร็จ');
      }
    } catch (error) {
      console.log('เข้าสู่ระบบไม่สำเร็จ : ', error);
    }
  };
  

  return (
    <div className="form-container-2 sign-in-container-2">
      <form>
        <h1>Sign in</h1>
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
