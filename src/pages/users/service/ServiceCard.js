import React from "react";
import { Service } from "../data/Data";
import "./service.css";

const FeaturedCard = () => {
  return (
    <>
      <div className="content-user grid-service servicetop">
        {Service.map((item, index) => (
          <div className="box-service" key={index}>
            <div className="image-container">
              <img className="img-service" src={item.cover} alt="" />
              <h4 className="text-service">{item.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedCard;
