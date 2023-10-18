import React, { useState, useEffect } from "react";
import "./profile.css";
import { firestore, auth, storage } from "../../../firebase";
import { Button, Modal } from "react-bootstrap";

const Profile = () => {
  const [data, setData] = useState([]);
  const [showUploadImg, setShowUploadImg] = useState(false);
  const [ImageInput, setImageInput] = useState(null);
  const [Profile, setProfile] = useState("https://via.placeholder.com/150");
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [roomsData, setRoomsData] = useState([]);
  const user = auth.currentUser.uid;

  useEffect(() => {
    try {
        firestore.collection('profiles').doc(user).get().then((doc) => {
            if (doc.exists) {
                setData(doc.data());

                storage.ref().child(`profiles_image/${user}.jpg`).getDownloadURL().then((url) => {
                    setProfile(url);
                });

                if (doc.data().name) {
                    setNewName(doc.data().name);
                }

                // Fetch rooms based on userId
                firestore.collection('rooms').where('owner', '==', user).get().then((querySnapshot) => {
                    const roomsData = [];
                    querySnapshot.forEach((doc) => {
                        const { title, status, type } = doc.data();
                        roomsData.push({ title, status, type });
                    });
                    setRoomsData(roomsData);
                }).catch((error) => {
                    console.log('error fetching room data: ', error)
                });
            } else {
                console.log('not found user profile')
            }
        }).catch((error) => {
            console.log('error fetching user profile data: ', error)
        });
    } catch (error) {
        console.log('error fetching data: ', error)
    }
}, [user]);

  const handleUploadImages = async () => {
    try {
      const ImgRef = await storage.ref().child(`profiles_image/${user}.jpg`);
      ImgRef.put(ImageInput).then((url) => {
        alert("Upload Success");
      });
    } catch (error) {
      console.log("error upload images profile : ", error);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files[0]) {
      setImageInput(e.target.files[0]);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await firestore.collection("profiles").doc(user).update({
        name: newName,
      });
      setIsEditing(false);
      alert("บันทึกข้อมูลสำเร็จ");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล: ", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewName(data.name); // กลับไปใช้ค่าเดิม
  };

  const handleModalClose = () => {
    setShowUploadImg(false);
  };

  return (
    <div className="header-content">
      <h2>Profile</h2>
      <div className="container-fluid mt-5 profile-container align-items-center">
        <div className="row justify-content-center">
          <div className="col-md-4 mx-auto">
            <img
              src={Profile}
              alt="Profile pic"
              className="img-fluid rounded-circle"
              style={{ width: "100%" }}
              onClick={() => setShowUploadImg(true)}
            />
          </div>
          <div className="col-md-6">
            {isEditing ? (
              <div className="mb-3">
                <label htmlFor="newName" className="form-label">
                  New Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
            ) : (
              <h1 className="profile-name">User's : {data.name}</h1>
            )}
            <p className="profile-info">Email: {data.email}</p>
            <p className="profile-info">Phone: {data.phone}</p>

            <h3>Room Data</h3>

            {roomsData.map((room, index) => (
                <li key={index}>
                  <p className="profile-info">Title: {room.title}</p>
                  <p className="profile-info">Status: {room.status}</p>
                  <p className="profile-info">Type: {room.type}</p>
                </li>
              ))}
          </div>
        </div>
        <div className="row md">
          <div className="col-md-12 text-right">
            {isEditing ? (
              <div>
                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  Save Profile
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleEditClick}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <Modal show={showUploadImg} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <h2>Upload Profile Picture</h2>
          </Modal.Header>
          <Modal.Body>
            <input
              type="file"
              placeholder="รายละเอียด"
              id="text"
              onChange={handleFileInputChange}
            ></input>
            <img
              src={
                ImageInput === null
                  ? "https://via.placeholder.com/150"
                  : URL.createObjectURL(ImageInput)
              }
              alt="Uploaded"
              style={{ width: "150px", height: "150px" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUploadImages}>Save</Button>
            <Button onClick={handleModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
