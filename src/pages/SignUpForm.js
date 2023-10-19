import React from "react";
import { auth } from "../firebase";
import { firestore, storage } from "../firebase";
import profile from "../pages/users/images/profiles.jpg"
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    number: "",
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

    const { name, email, password, confirmpassword } = state;

    try {
      if (password !== confirmpassword) {
        alert('รหัสผ่านไม่ตรงกัน');
      } else if (password.length < 6) {
        alert('รหัสผ่านต้องมากกว่า 6 ตัวอักษร');
      } else if (!name || !email || !password || !confirmpassword) {
        alert(`กรุณากรอกข้อมูลให้ครบถ้วน`);
      } else {
        const userCreate = await auth.createUserWithEmailAndPassword(email, password);

        const imageUrl = profile;
        const filename = `${userCreate.user.uid}.jpg`;

        downloadImageFromUrl(imageUrl)
          .then(blob => {
            return uploadImageToFirebaseStorage(blob, filename);
          })
          .then(snapshot => {
            console.log('อัพโหลดรูปภาพแล้ว');
          })
          .catch(error => {
            console.error("เกิดข้อผิดพลาดในกระบวนการดาวน์โหลดและเก็บภาพ:", error);
          });

        if (userCreate) {
          await firestore.collection('profiles').doc(userCreate.user.uid).set({
            email: state.email,
            name: state.name,
            phone: state.number,
            role: "user"
          });
          alert('สมัครสมาชิกเรียบร้อย');
          setState({
            name: "",
            email: "",
            number: "",
            password: "",
            confirmpassword: "",
          });
        }
      }
    } catch (error) {
      console.log('error create new account : ', error)
    }
  };

  async function downloadImageFromUrl(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  }

  async function uploadImageToFirebaseStorage(blob, filename) {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`profiles_image/${filename}`);
    const snapshot = await imageRef.put(blob);
    console.log("Uploaded a blob or file!", snapshot);
    return snapshot;
  }

  return (
    <div className="form-container-2 sign-up-container-2">
      <form onSubmit={handleOnSubmit} className='form'>
        <h1>Create Account</h1>
        <input
          className="login-input"
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="login-input"
          type="tel"
          name="number"
          pattern="[0-9]{10}"
          value={state.number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          className="login-input"
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="login-input"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          className="login-input"
          type="password"
          name="confirmpassword"
          value={state.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button className="btn-login">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
