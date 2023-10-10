import React from "react"
import { list } from "../../data/Data"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const RecentCard = () => {
  return (
    <>
      <div className='content-user grid3 mtop'>
        {list.map((val, index) => {
          const { cover, category, location, name, price, type } = val
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>
                    {category}
                  </span>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <h4>{name}</h4>
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
                </p>

              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2' > <a href='/user/roomdetail'>{price}</a></button> <label htmlFor=''>/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
