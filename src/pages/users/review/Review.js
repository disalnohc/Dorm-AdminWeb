import React from "react";
import img from "../images/services.jpg";
import Back from "../common/Back";
import ReviewCard from "./ReviewCrad"; 
import "./review.css";

const Review = () => {

  const reviews = [
    {
      title: "Great Service",
      text: "The service was excellent. The staff were friendly and attentive. I highly recommend it.",
      rating: 5,
      author: "John Doe",
      image: "image1.jpg", 
    },
    {
      title: "Excellent Experience",
      text: "I had an excellent experience with this company. Their products are top-notch.",
      rating: 4,
      author: "Jane Smith",
      image: "image2.jpg", 
    },
    {
      title: "Not Satisfied",
      text: "Unfortunately, I was not satisfied with the service. It could have been better.",
      rating: 2,
      author: "Alice Johnson",
      image: "image3.jpg", 
    },
    {
      title: "Great Service",
      text: "The service was excellent. The staff were friendly and attentive. I highly recommend it.",
      rating: 5,
      author: "John Doe",
      image: "image1.jpg", 
    },
    {
      title: "Excellent Experience",
      text: "I had an excellent experience with this company. Their products are top-notch.",
      rating: 4,
      author: "Jane Smith",
      image: "image2.jpg", 
    },
    {
      title: "Not Satisfied",
      text: "Unfortunately, I was not satisfied with the service. It could have been better.",
      rating: 2,
      author: "Alice Johnson",
      image: "image3.jpg", 
    },
  ];

  return (
    <>
      <section className="services mb">
        <Back name="Review" title="Reviews - All Reviews" cover={img} />
        <div className="container-review">
          <h1>Review Us</h1>
          <p>It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.</p>
          <div className="row">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
