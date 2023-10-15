import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Navbar.module.css';
import { auth } from "../../../../firebase";
import logo from "../../../../logo.svg";

const Header = ({ setIsAuthenticated, setIsAdmin }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => { //<--- this useEffect is creact loading when change view in navigate
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
    navigate("/user/login");
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

  // adding the states 
  const [isActive, setIsActive] = useState(false);

  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false)
  }

  return (
    <div className="App">
      <header className="App-header">

        <nav className={`${styles.navbar}`}>

          {/* logo */}
          <div className={styles.newLogoClass}>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: "10vh" }}>
              <img src={logo} alt="" style={{ width: "60px", height: "60px" }} />
              <a href='/user/home' className={`${styles.logo}`}>Dorm</a>
            </div>
          </div>

          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <a href='/user/home' className={`${styles.navLink}`}>Home</a>
            </li>
            <li onClick={removeActive}>
              <a href='/user/about' className={`${styles.navLink}`}>About</a>
            </li>
            {isLoggedIn && (
              <li onClick={removeActive}>
                <a href='/user/booking' className={`${styles.navLink}`}>Book a room</a>
              </li>
            )}
            <li onClick={removeActive}>
              <a href='/user/review' className={`${styles.navLink}`}>Review</a>
            </li>
            {isLoggedIn && (
              <li onClick={removeActive}>
                <a href='/user/service' className={`${styles.navLink}`}>Service</a>
              </li>
            )}
            {isLoggedIn && (
              <li onClick={removeActive}>
                <a href='/user/cost' className={`${styles.navLink}`}>Cost of utilities</a>
              </li>
            )}
            <li onClick={removeActive}>
              <a href='/user/blog' className={`${styles.navLink}`}>Blog</a>
            </li>
            <li onClick={removeActive}>
              <a href='/user/contact' className={`${styles.navLink}`}>Contact</a>
            </li>
            {isLoggedIn ? (
              <>
                <li onClick={removeActive}>
                  <a href='/user/profile' className={`${styles.navLink}`}>Profile</a>
                </li>
                <button onClick={handleLogoutClick} className="btn-nav">
                  Logout
                </button>
              </>
            ) : (
              <>
                <li onClick={removeActive}>
                  <a href='/user/login' className={`${styles.navLink}`}>login</a>
                </li>
                <button onClick={handleSignUpClick} className="btn-nav">
                  Sign Up
                </button>
              </>
            )}
          </ul>

          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>

      </header>
    </div>
  );
}

export default Header;