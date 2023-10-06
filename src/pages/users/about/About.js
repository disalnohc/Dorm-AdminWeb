import React from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "../images/about.jpg";
import "./about.css";
import home from "../images/immio.jpg"
const About = () => {
  return (
    <>
      <section className="about">
        <Back name="About Us" title="About Us - Who We Are?" cover={img} />
        <div className="container-blog">
          <h1>About Us</h1>
          <p>It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.</p>
          </div>
        <div className="container-user flex mtop">
          <div className="left row">
            <Heading title="Our Agency Story" subtitle="Check out our company story and work process" />

            <div className="about-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>

            <button className="btn2">Learn More About Us</button>
          </div>

          <div className="right row">
            <img src={home} alt="Our Team" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
