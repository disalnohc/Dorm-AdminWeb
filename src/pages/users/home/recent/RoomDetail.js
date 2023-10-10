import React from "react";
import './RoomDetail.css'; 

const RoomDetail = () => {
  const room = {
    cover: "../images/list/p-1.png",
    name: "Red Carpet Real Estate",
    location: "210 Zirak Road, Canada",
    category: "For Rent",
    price: "$3,700",
    type: "Apartment",
  };

  return (
    <div className="main-room">
      <img src={room.cover} alt={room.name} className="img-room" />
      <div className="room-details">
        <h2 className="room-title">{room.name}</h2> 
        <p className="room-location">{room.location}</p> 
        <p className="room-category">{room.category}</p>
        <p className="room-price">{room.price}</p> 
        <p className="room-type">{room.type}</p>
        <button className="room-button"><a href='/user/agreement'>Book Now</a></button> 
      </div>
    </div>
  );
};

export default RoomDetail;
