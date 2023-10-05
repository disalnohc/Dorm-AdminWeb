import React, { useState, useEffect } from 'react';
import './profile.css';
import { firestore, auth, storage } from '../../../firebase';
import { Button, Modal } from 'react-bootstrap';

const Profile = () => {
    const [data, setData] = useState([]);
    const [showUploadImg, setShowUploadImg] = useState(false);
    const [ImgaeInput, setImageInput] = useState(null);
    const [Profile, setProfile] = useState("https://via.placeholder.com/150");
    const user = auth.currentUser.uid;

    useEffect(() => {
        try {
            firestore.collection('profiles').doc(user).get().then((doc) => {
                if (doc.exists) {
                    setData(doc.data());
                    //console.log(doc.data());

                    storage.ref().child(`profiles_image/${user}.jpg`).getDownloadURL().then((url) => {
                        setProfile(url);
                    })
                } else {
                    console.log('not found user profile')
                }
            }).catch((error) => {
                console.log('error fetch data user profile : ', error)
            })
        } catch (error) {
            console.log('error fetch profile data : ', error)
        }
    })

    const handleUploadImages = async () => {
        try {
            const ImgRef = await storage.ref().child(`profiles_image/${user}.jpg`);
            ImgRef.put(ImgaeInput).then((url) => {
                alert('Upload Success');
            })
        } catch (error) {
            console.log('error upload images profile : ', error)
        }
    }

    const handleFileInputChange = (e) => {
        if (e.target.files[0]) {
            setImageInput(e.target.files[0]);
        }
    };


    const handleModalClose = () => {
        setShowUploadImg(false);
    }

    return (
        <div className="container-fluid mt-5 profile-container align-items-center">
            <div className="row justify-content-center">
                <div className="col-md-4 mx-auto">
                    <img
                        src={Profile}
                        alt="Profile pic"
                        className="img-fluid rounded-circle"
                        style={{ width: '100%' }}
                        onClick={() => setShowUploadImg(true)}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="profile-name">User's : {data.name}</h1>
                    <p className="profile-info">Email: {data.email}</p>
                    <p className="profile-info">Phone: {data.phone}</p>
                </div>
            </div>
            <div className="row md">
                <div className="col-md-12 text-right">
                    <button className="btn btn-primary float-md-end">Edit Profile</button>
                </div>
            </div>
            <Modal show={showUploadImg} onHide={handleModalClose}>
                <Modal.Header closeButton><h2>Upload Profile Picture</h2></Modal.Header>
                <Modal.Body>
                    <input type='file' placeholder='รายละเอียด' id='text' onChange={handleFileInputChange}></input>
                    <img src={ImgaeInput === null ? 'https://via.placeholder.com/150' : URL.createObjectURL(ImgaeInput)} alt="Uploaded" style={{ width: '150px', height: '150px' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleUploadImages}>Save</Button>
                    <Button onClick={handleModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Profile;
