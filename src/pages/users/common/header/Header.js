import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../../../logo.svg";
import { auth } from "../../../../firebase";

const Header = ({ setIsAuthenticated, setIsAdmin }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignUpClick = () => {
    navigate("/user/regsiter");
  };

  const handleLogoutClick = async () => {
    auth
      .signOut()
      .then(() => {
        alert("Sign Out");
        setIsAuthenticated(false);
        setIsAdmin(false);
        navigate("/");
      })
      .catch((error) => {
        console.log("error sign out: ", error);
      });
  };

  return (
    <header>
      <div className="container flex">
        <div className="logo">
          <Link to="/" className="menu-bars logo-content">
            <img src={logo} alt="" />
            <p className="example-text">Dorm</p>
          </Link>
        </div>

        <div className="nav flex">
          <Link to="/" className="menu-bars">
            <p className="example-text">Home</p>
          </Link>
          <Link to="/user/about" className="menu-bars">
            <p className="example-text">About</p>
          </Link>
          {isLoggedIn && (
            <Link to="/user/booking" className="menu-bars">
              <p className="example-text">Book a room</p>
            </Link>
          )}
          <Link to="/user/review" className="menu-bars">
            <p className="example-text">Review</p>
          </Link>
          {isLoggedIn && (
            <Link to="/user/service" className="menu-bars">
              <p className="example-text">Service</p>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/user/cost" className="menu-bars">
              <p className="example-text">cost of utilities</p>
            </Link>
          )}
          <Link to="/user/blog" className="menu-bars">
            <p className="example-text">Blog</p>
          </Link>
          <Link to="/user/contact" className="menu-bars">
            <p className="example-text">Contact</p>
          </Link>
        </div>

        <div className="button flex">
          {isLoggedIn ? (
            <>
              <Link to="/user/profile">
                <h4>Profile</h4>
              </Link>
              <button className="btn1" onClick={handleLogoutClick}>
                <i className="fa fa-sign-out"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/user/login">
                <h4>Login</h4>
              </Link>
              <button className="btn1" onClick={handleSignUpClick}>
                <i className="fa fa-sign-out"></i> Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
