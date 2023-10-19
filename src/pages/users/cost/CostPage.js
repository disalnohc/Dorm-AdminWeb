import React from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./Cost.css";
  

const CostPage = () => {
  return (
    <div className="cost-page">
      <Back name='Contact Us' title='Get Help & Friendly Support' cover={img} />
      <div className='container-contact'>
        <h1>Cost of Utilities</h1>
        <p>It is a long established fact that a reader will be distracted by the of readable content of a page when looking at its layouts the points of using.</p>

      </div>
    </div>
  );
};

export default CostPage;
