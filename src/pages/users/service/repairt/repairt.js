import React, { useState } from "react";
import "./service.css";
import ServiceDetails from "../ServiceDetails";
import { Modal, Button } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import PaymentModal from "../PaymentModal";

const Repairt = () => {
  const userUID = firebase.auth().currentUser.uid;
  const db = firebase.firestore();

  const [selectedServices, setSelectedServices] = useState({
    Repair: false,
    cleanAir: false,
    Flush: false,
    Order: false,
  });

  const [cleanAirPrice, setCleanAirPrice] =
    useState(0);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [confirmation, setConfirmation] = useState(false);

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
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`images/${selectedFile.name}`);

      try {
        await fileRef.put(selectedFile);
        console.log("อัปโหลดรูปภาพเสร็จสิ้น");

        const imageUrl = await fileRef.getDownloadURL();
        setImageUrl(imageUrl);

        const servicesRef = db
          .collection("Services")
          .doc("Repairt")
          .collection(userUID);

        await servicesRef.add({
          title: "Repairt",
          selectedServices,
          totalAmount,
          imageUrl,
        });

        console.log("บริการถูกเพิ่มลงใน Firestore");
        setConfirmation(true);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด: ", error);
      }
    } else {
      try {
        const servicesRef = db
          .collection("Services")
          .doc("Repairt")
          .collection(userUID);
        await servicesRef.add({
          title: "Repairt",
          selectedServices,
          totalAmount,
          imageUrl: "",
        });

        console.log("บริการถูกเพิ่มลงใน Firestore");
        setConfirmation(true);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด: ", error);
      }
    }
  };

  const totalAmount =
    (selectedServices.Repair ? 20 : 0) +
    (selectedServices.cleanAir ? 0 : 0) +
    (selectedServices.Flush ? 0 : 0) +
    (selectedServices.Order ? 0 : 0) ;

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container-blog">
        <h1>บริการซ่อมแซม</h1>
        <button className="top-right-button" onClick={handleOpenModal}>
          ชำระเงิน
        </button>
        <div className="sections-container">
          <section className="section1">
            <div className="security-header">
              <text className="security-text">หัวข้อการบริการ</text>
            </div>
            <label className="security-label">
              <input
                className="custom-checkbox"
                type="checkbox"
                checked={selectedServices.Repair}
                onChange={() => handleCheckboxChange("Repair")}
              />
              ซ่อมลูกบิดประตู (ราคา: 20 บาท)
            </label>
            <br />
            <label className="security-label">
              <input
                className="custom-checkbox"
                type="checkbox"
                checked={selectedServices.cleanAir}
                onChange={() => handleCheckboxChange("cleanAir")}
              />
              ล้างแอร์ (ฟรี)
            </label>
            <br />
            <label className="security-label">
              <input
                className="custom-checkbox"
                type="checkbox"
                checked={selectedServices.Flush}
                onChange={() => handleCheckboxChange("Flush")}
              />
              ล้างซิงค์ห้องน้ำ (ฟรี)
            </label>
            <br />
            <label className="security-label">
              <input
                className="custom-checkbox"
                type="checkbox"
                checked={selectedServices.Order}
                onChange={() => handleCheckboxChange("Order")}
              />
              อื่นๆ
            </label>
            <div className="security-img">
              <div className="security-header">
                <text className="security-text">อัปโหลดรูปภาพ</text>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="security-input"
              />
              <img
                className="security-imageUrl"
                src={imageUrl || "https://via.placeholder.com/150"}
                alt="Uploaded"
              />
            </div>
          </section>
          <div className="sections-main">
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
              <text className="left-align">
                เวลาให้บริการ : 08.00 - 20.00 น.
              </text>
              <br />
              <text className="left-align">
                **ไม่พร้อมให้บริการในวันหยุด เสาร์ อาทิตย์ และวันหยุดนักขัตฤกษ
                **
              </text>
            </section>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดการบริการ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceDetails selectedServices={selectedServices} />
          <p>ยอดรวม: {totalAmount} บาท</p>

          {/* -- เผื่อใช้ --
          <div className="mb-3">
            <label htmlFor="slipFile" className="form-label">
              Slip การโอน
            </label>
            <input
              type="file"
              className="form-control"
              id="slipFile"
              accept="image/*"
              onChange={handleSlipFileChange}
            />
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePayment}>
            ยืนยัน
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
      {confirmation && <div>รายการถูกยืนยันแล้ว</div>} {/* เพิ่มบรรทัดนี้ */}
    </>
  );
};

export default Repairt;
