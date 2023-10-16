import React from "react";

const ServiceDetails = ({ selectedServices }) => {
  return (
    <div>
      {selectedServices.catchDangerousAnimals && (
        <div>
          <h2>บริการจับสัตว์อันตราย</h2>
        </div>
      )}
      {selectedServices.environmentProtection && (
        <div>
          <h2>บริการรักษาสิ่งแวดล้อมบริเวณหอ</h2>
        </div>
      )}
      {selectedServices.foodDelivery && (
        <div>
          <h2>บริการนำอาหารและเครื่องไปส่งที่ห้อง</h2>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
