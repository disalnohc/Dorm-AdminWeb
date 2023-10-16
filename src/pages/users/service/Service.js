import React, { useState, useEffect } from "react";
import img from "../images/services.jpg";
import Back from "../common/Back";
import "../home/featured/Featured.css";
import ServiceDetails from "./ServiceDetails";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const Service = () => {
  const userUID = firebase.auth().currentUser.uid;
  const db = firebase.firestore();

  const [selectedServices, setSelectedServices] = useState({
    catchDangerousAnimals: false,
    environmentProtection: false,
    foodDelivery: false,
  });

  const [foodDeliveryPrice, setFoodDeliveryPrice] = useState(20);
  const [environmentProtectionPrice, setEnvironmentProtectionPrice] = useState(0);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleCheckboxChange = (service) => {
    setSelectedServices({
      ...selectedServices,
      [service]: !selectedServices[service],
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handlePayment = async () => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`images/${selectedFile.name}`);

    try {
      await fileRef.put(selectedFile);
      console.log("อัปโหลดรูปภาพเสร็จสิ้น");

      const imageUrl = await fileRef.getDownloadURL();
      setImageUrl(imageUrl);

      const servicesRef = db.collection("Services").doc("Security").collection(userUID);

      await servicesRef.add({
        title: "Security", // เพิ่มข้อมูลหัวข้อบริการ
        selectedServices,
        totalAmount,
        imageUrl,
      });

      console.log("บริการถูกเพิ่มลงใน Firestore");
    } catch (error) {
      console.error("เกิดข้อผิดพลาด: ", error);
    }
  };

  useEffect(() => {
    if (selectedServices.foodDelivery) {
      setFoodDeliveryPrice(20);
    } else {
      setFoodDeliveryPrice(0);
    }

    if (selectedServices.environmentProtection) {
      setEnvironmentProtectionPrice(0);
    } else {
      setEnvironmentProtectionPrice(0);
    }
  }, [selectedServices]);

  const totalAmount =
    (selectedServices.catchDangerousAnimals ? 20 : 0) +
    (selectedServices.environmentProtection ? 0 : 0) +
    (selectedServices.foodDelivery ? foodDeliveryPrice : 0);

  return (
    <>
      <section className="services mb">
        <Back name="Services" title="Services -All Services" cover={img} />
        <div className="container-blog">
          <h1>บริการ</h1>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <label>
            <input
              type="checkbox"
              checked={selectedServices.catchDangerousAnimals}
              onChange={() => handleCheckboxChange("catchDangerousAnimals")}
            />
            บริการจับสัตว์อันตราย (ราคา: 20 บาท)
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedServices.environmentProtection}
              onChange={() => handleCheckboxChange("environmentProtection")}
            />
            บริการรักษาสิ่งแวดล้อมบริเวณหอ (ฟรี)
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedServices.foodDelivery}
              onChange={() => handleCheckboxChange("foodDelivery")}
            />
            บริการนำอาหารและเครื่องไปส่งที่ห้อง (ราคา: {foodDeliveryPrice} บาท)
          </label>
        </div>
        <div className="featured container">
          <ServiceDetails selectedServices={selectedServices} />
        </div>
        <div className="total-amount">
          <h2>ราคาทั้งหมด: {totalAmount} บาท</h2>
        </div>
        <button onClick={handlePayment}>ชำระเงิน</button>
      </section>
    </>
  );
};

export default Service;
