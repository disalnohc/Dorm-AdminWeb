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
      {selectedServices.cleaning && (
        <div>
          <h2>บริการทำความสะอาดห้อง</h2>
        </div>
      )}
      {selectedServices.laundry && (
        <div>
          <h2>บริการซักผ้า</h2>
        </div>
      )}
      {selectedServices.dishwashing && (
        <div>
          <h2>บริการล้างจาน</h2>
        </div>
      )}
      {selectedServices.Repair && (
        <div>
          <h2>ซ่อมลูกบิดประตู</h2>
        </div>
      )}
      {selectedServices.cleanAir && (
        <div>
          <h2>ล้างแอร์</h2>
        </div>
      )}
      {selectedServices.Flush && (
        <div>
          <h2>ล้างซิงค์ห้องน้ำ</h2>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
