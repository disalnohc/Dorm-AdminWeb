import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faBriefcase, faLightbulb, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./awards.css";

const awards = [
  {
    icon: <FontAwesomeIcon icon={faTrophy} />,
    num: "32 M",
    name: "Blue Burmin Award",
  },
  {
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    num: "43 M",
    name: "Mimo X11 Award",
  },
  {
    icon: <FontAwesomeIcon icon={faLightbulb} />,
    num: "51 M",
    name: "Australian UGC Award",
  },
  {
    icon: <FontAwesomeIcon icon={faHeart} />,
    num: "42 M",
    name: "IITCA Green Award",
  },
];

const Awards = () => {
  return (
    <>
      <section className='awards padding'>
        <div className='container'>
          <div className='content-user grid4 mtop'>
            {awards.map((val, index) => (
              <div className='box' key={index}>
                <div className='icon'>
                  {val.icon}
                </div>
                <h1>{val.num}</h1>
                <p>{val.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Awards;