import React from "react";
import { auth } from "../firebase";
import { firestore } from "../firebase";

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { name, email, password , confirmpassword } = state;

    try {
      if(password !== confirmpassword) {
        alert('รหัสผ่านไม่ตรงกัน');
      } else if (password.length < 6) {
        alert('รหัสผ่านต้องมากกว่า 6 ตัวอักษร');
      } else if (!name || !email || !password || !confirmpassword) {
        alert(`กรุณากรอกข้อมูลให้ครบถ้วน`);
      } else {
        const userCreate = await auth.createUserWithEmailAndPassword(email,password);

         if(userCreate){
          await firestore.collection('profiles').doc(userCreate.user.uid).set({
            email: state.email,
            name:state.name,
            imgprofile: "",
            phone: "",
            role: "user"
          });
          alert('สมัครสมาชิกเรียบร้อย');
          setState({
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
          });
         }
      }
    } catch (error) {
      console.log('error create new account : ',error)
    }
  };

  return (
    <div className="form-container-2 sign-up-container-2">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="confirmpassword"
          value={state.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
