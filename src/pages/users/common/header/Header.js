import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Navbar.module.css';
import { auth } from "../../../../firebase";
import logo from "../../../../logo.svg";
import { Link } from "react-router-dom";

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
              <Link to="/user/home" className="menu-bars">
                <a className={`${styles.logo}`}>Dorm</a>
              </Link>
            </div>
          </div>

          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <Link to="/user/home" >
                <a className={`${styles.navLink}`}>Home</a>
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/user/about" >
                <a className={`${styles.navLink}`}>About</a>
              </Link>
            </li>

            {isLoggedIn && (
              <li onClick={removeActive}>
                <Link to="/user/booking" >
                  <a className={`${styles.navLink}`}>Book a room</a>
                </Link>
              </li>
            )}
            {/* <li onClick={removeActive}>
              <Link to="/user/review" >
                <a className={`${styles.navLink}`}>Review</a>
              </Link>
            </li> */}
            {isLoggedIn && (
              <li onClick={removeActive}>
                <Link to="/user/service" >
                  <a className={`${styles.navLink}`}>Service</a>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li onClick={removeActive}>
                <Link to="/user/cost" >
                  <a className={`${styles.navLink}`}>Cost of utilities</a>
                </Link>
              </li>
            )}
            <li onClick={removeActive}>
              <Link to="/user/blog">
                <a className={`${styles.navLink}`}>Blog</a>
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/user/contact">
                <a className={`${styles.navLink}`}>Contact</a>
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li onClick={removeActive}>
                  <Link to="/user/profile" >
                    <a className={`${styles.navLink}`}>Profile</a>
                  </Link>
                </li>
                <button onClick={handleLogoutClick}  className="btn-signup" >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li onClick={removeActive}>
                  <Link to="/user/login" >
                    <a className={`${styles.navLink}`}>login</a>
                  </Link>
                </li>
                <button onClick={handleSignUpClick} className="btn-signup">
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