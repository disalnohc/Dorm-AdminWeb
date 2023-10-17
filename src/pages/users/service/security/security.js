import React, { useState, useEffect } from "react";
import "./service.css";
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

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageSrc = e.target.result;
                setImageUrl(imageSrc);
            };

            reader.readAsDataURL(file);
        }
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
            <div className="container-blog">
                <h1>บริการรักษาความปลอดภัย</h1>
                <button className="top-right-button" onClick={handlePayment}>
                    ชำระเงิน
                </button>
                <div class="sections-container">
                    <section className="section1">
                        <div className="security-header">
                            <text className="security-text">หัวข้อการบริการ</text>
                        </div>
                        <label className="security-label">
                            <input
                                className="custom-checkbox"
                                type="checkbox"
                                checked={selectedServices.catchDangerousAnimals}
                                onChange={() => handleCheckboxChange("catchDangerousAnimals")}
                            />
                            บริการจับสัตว์อันตราย (ราคา: 20 บาท)
                        </label>
                        <br />
                        <label className="security-label">
                            <input
                                className="custom-checkbox"
                                type="checkbox"
                                checked={selectedServices.environmentProtection}
                                onChange={() => handleCheckboxChange("environmentProtection")}
                            />
                            บริการรักษาสิ่งแวดล้อมบริเวณหอ (ฟรี)
                        </label>
                        <br />
                        <label className="security-label">
                            <input
                                className="custom-checkbox"
                                type="checkbox"
                                checked={selectedServices.foodDelivery}
                                onChange={() => handleCheckboxChange("foodDelivery")}
                            />
                            บริการนำอาหารและเครื่องไปส่งที่ห้อง (ราคา: {foodDeliveryPrice} บาท)
                        </label>
                        <div className="security-img">
                            <div className="security-header">
                                <text className="security-text">อัปโหลดรูปภาพ</text>
                            </div>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="security-input"/>
                            <img className="security-imageUrl" src={imageUrl || 'https://via.placeholder.com/150'} alt="Uploaded" />
                        </div>
                    </section>
                    <div class="sections-main">
                        <section className="section2">
                            <div className="security-head">
                                <text className="security-text">หัวข้อที่รับบริการ</text>
                            </div>
                            <ServiceDetails selectedServices={selectedServices} />
                            <text className="total-price">ยอดรวม: {totalAmount} บาท</text>
                        </section>
                        <section className="section3">
                            <div className="security-head">
                                <text className="security-text">รายเอียดการบริการ</text>
                            </div>
                            <text className="left-align">เวลาให้บริการ : 08.00 - 20.00 น.</text><br />
                            <text className="left-align">**ไม่พร้อมให้บริการในวันหยุด เสาร์ อาทิตย์ และวันหยุดนักขัตฤกษ **</text>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Service;