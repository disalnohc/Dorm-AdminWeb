import React, { useState } from 'react';
import { auth } from '../firebase';
import { firestore } from '../firebase';
const SignInForm = ({ onLogin }) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(username, password);
      const user = userCredential.user.uid;
      
      const userData = await firestore.collection('profiles').doc(user).get();
      
      if (userData.exists) {
        const userRole = userData.data().role;
        if(userRole === 'admin'){
          alert('Admin');
          onLogin();
        } else {
          alert('User');
        }
      } else {
        console.log('ไม่พบข้อมูลผู้ใช้');
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("เข้าสู่ระบบไม่สำเร็จ: ", errorCode, errorMessage);
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
