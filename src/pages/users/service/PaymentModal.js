import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap'; 
import ServiceDetails from "./ServiceDetails";
const PaymentModal = ({ selectedServices, totalAmount, handlePayment }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = async () => {
    handlePayment();
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ชำระเงิน
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดการบริการ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceDetails selectedServices={selectedServices} />
          <p>ยอดรวม: {totalAmount} บาท</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentModal;
