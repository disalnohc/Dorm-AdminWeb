import React from 'react';
import './profile.css';

const Profile = () => {
    return (
        <div className="header-content">
            <h2>Profile</h2>
            <div className="container-fluid mt-5 profile-container align-items-center">
                <div className="row justify-content-center">
                    <div className="col-md-4 mx-auto">
                        <img
                            src="https://via.placeholder.com/150"
                            alt=""
                            className="img-fluid rounded-circle"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1 className="profile-name">User's Full Name</h1>
                        <p className="profile-info">Location: City, Country</p>
                        <p className="profile-info">Email: user@example.com</p>
                        <p className="profile-info">Phone: +1234567890</p>
                        <p className="profile-info">Website: www.example.com</p>
                        <p className="profile-info">About Me: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra velit at justo dapibus, in cursus libero varius. Sed venenatis est a lectus dictum, nec congue nulla tincidunt.</p>
                    </div>
                </div>
                <div className="row md">
                    <div className="col-md-12 text-right">
                        <button className="btn btn-primary float-md-end">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
