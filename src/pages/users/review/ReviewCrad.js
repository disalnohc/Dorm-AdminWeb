import React from "react";
import Review from "../images/pricing.jpg";

const ReviewCard = ({ review }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{review.title}</h5>
          <p className="card-text">{review.text}</p>
          <p className="card-text">Rating: {review.rating}/5</p>
          <p className="card-text">By: {review.author}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
