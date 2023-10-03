import React from "react"
import "./team.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons/faFacebookF";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";


const team = [
  {
    list: "50",
    cover: "../images/customer/team-1.jpg",
    address: "Liverpool, Canada",
    name: "Sargam S. Singh",
    icon: [
      <FontAwesomeIcon icon={faFacebookF} />,
      <FontAwesomeIcon icon={faLinkedin} />,
      <FontAwesomeIcon icon={faTwitter} />,
      <FontAwesomeIcon icon={faInstagram} />
    ],
  },
  {
    list: "70",
    cover: "../images/customer/team-2.jpg",
    address: "Montreal, Canada",
    name: "Harijeet M. Siller",
    icon: [
      <FontAwesomeIcon icon={faFacebookF} />,
      <FontAwesomeIcon icon={faLinkedin} />,
      <FontAwesomeIcon icon={faTwitter} />,
      <FontAwesomeIcon icon={faInstagram} />
    ],
  },
  {
    list: "80",
    cover: "../images/customer/team-3.jpg",
    address: "Denever, USA",
    name: "Anna K. Young",
    icon: [
      <FontAwesomeIcon icon={faFacebookF} />,
      <FontAwesomeIcon icon={faLinkedin} />,
      <FontAwesomeIcon icon={faTwitter} />,
      <FontAwesomeIcon icon={faInstagram} />
    ],
  },
  {
    list: "51",
    cover: "../images/customer/team-4.jpg",
    address: "2272 Briarwood Drive",
    name: "Michael P. Grimaldo",
    icon: [
      <FontAwesomeIcon icon={faFacebookF} />,
      <FontAwesomeIcon icon={faLinkedin} />,
      <FontAwesomeIcon icon={faTwitter} />,
      <FontAwesomeIcon icon={faInstagram} />
    ],
  },
  {
    list: "42",
    cover: "../images/customer/team-5.jpg",
    address: "2272 Briarwood Drive",
    name: "Michael P. Grimaldo",
    icon: [
      <FontAwesomeIcon icon={faFacebookF} />,
      <FontAwesomeIcon icon={faLinkedin} />,
      <FontAwesomeIcon icon={faTwitter} />,
      <FontAwesomeIcon icon={faInstagram} />
    ],
  },
  {
    list: "38",
    cover: "../images/customer/team-5.jpg",
    address: "Montreal, USA",
    name: "Adam K. Jollio",
    icon: [
      <FontAwesomeIcon icon={faFacebookF} />,
      <FontAwesomeIcon icon={faLinkedin} />,
      <FontAwesomeIcon icon={faTwitter} />,
      <FontAwesomeIcon icon={faInstagram} />
    ],
  },
]

const Team = () => {
    return (
      <>
        <section className='team background'>
          <div className='container'>
            <div className='content-user mtop grid3'>
              {team.map((val, index) => (
                <div className='box' key={index}>
                  <button className='btn3'>{val.list} Listings</button>
                  <div className='details'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <label>{val.address}</label>
                    <h4>{val.name}</h4>
  
                    <ul>
                      {val.icon.map((icon, index) => (
                        <li key={index}>{icon}</li>
                      ))}
                    </ul>
                    <div className='button flex'>
                      <button>
                        <i className='fa fa-envelope'></i>
                        Message
                      </button>
                      <button className='btn4'>
                        <FontAwesomeIcon icon={faPhoneAlt} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default Team;