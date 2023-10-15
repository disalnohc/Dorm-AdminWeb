import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './RoomDetail.css';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import { firestore, storage, auth } from "../../../../firebase";

const RoomDetail = () => {
  const location = useLocation();
  const { roomNumber, roomLocation, roomStatus, roomPrice, roomType, roomImg } = location.state;

  const [modalBooking, setModalBooking] = useState(false);
  const [fileupload, setfileupload] = useState(null);

  const timestamp = Date.now();
  const timestampString = timestamp.toString();

  const OwnerUid = auth.currentUser.uid;

  function handleOpen() {
    setModalBooking(true);
  }

  function handleClose() {
    setModalBooking(false);
    setfileupload(null);
  }

  function handleFileInput(e) {
    if (e.target.files[0]) {
      setfileupload(e.target.files[0]);
    }
  }

  async function handleBookroom() {
    try {
      const filename = `${roomNumber}_${roomType}_${timestampString}`
      const ImgRef = await storage.ref().child(`slip_image/${filename}`);

      // FormattedDate
      const datein = document.querySelector('#starttime').value;
      const timeToStayInput = document.querySelector('input[name="timetostay"]:checked');
      const timeToStay = timeToStayInput ? timeToStayInput.value : null;

      const startDate = new Date(datein);

      const startDateDay = startDate.getDate();
      const startDateMonth = startDate.getMonth() + 1;
      const startDateYear = startDate.getFullYear();

      const formattedStartDate = `${startDateDay}/${startDateMonth}/${startDateYear}`;

      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + parseInt(timeToStay));
      const endDateDay = endDate.getDate();
      const endDateMonth = endDate.getMonth() + 1;
      const endDateYear = endDate.getFullYear();

      const formattedEndDate = `${endDateDay}/${endDateMonth}/${endDateYear}`;
      //End FormattedDate

      if (ImgRef.put(fileupload)) {
        alert('Booking a room success');

        firestore.collection('rooms').doc(roomNumber).update({
          status: 'Assign',
          owner: OwnerUid,
          img: filename,
          datein: formattedStartDate,
          dateout: formattedEndDate
        })

      } else {
        alert('Booking a room failed');
      }
      handleClose();
    } catch (error) {
      console.log('error booking a room : ', error)
    }
  }

  return (
    <div className="main-room">
      <img src={roomImg} alt={roomNumber} className="img-room" />
      <div className="room-details">
        <h2 className="room-title">Room Number : {roomNumber}</h2>
        <p className="room-location">Room Location : {roomLocation}</p>
        <p className="room-category">Room Status : {roomStatus}</p>
        <p className="room-price">Room Price : {roomPrice}</p>
        <p className="room-type">Room Type : {roomType}</p>
        <button className="room-button" onClick={handleOpen}><p>Booking</p></button>
      </div>
      {/* Modal Booking */}
      <Modal show={modalBooking} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Room {roomNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '20px' }}>
            <img src="https://images.ctfassets.net/lzny33ho1g45/6TK1TbLNZQ4iHr0PjdZS2Y/ffb5c5646b914435f10b085b012bc78d/zap-qr-1.png?w=1400" alt="QrCode" style={{ width: '300px', height: '300px' }} />
            <p>
              <span style={{ color: "red", display: "inline" }}>**กรุณาใส่หมายเหตุว่าเป็นค่ามัดจำตามด้วยห้องพักและชื่อหอพัก**</span>
            </p>
          </div>
          <div>
            <input type='file' placeholder='รายละเอียด' id='text' onChange={handleFileInput}></input>
            <img src={fileupload === null ? 'https://via.placeholder.com/150' : URL.createObjectURL(fileupload)} alt="Uploaded" style={{ width: '300px', height: '300px' }} />
            <p>ราคามัดจำ : {roomPrice * 3}</p>
            <p>ราคาห้อง : {roomPrice}</p>
            <p>ราคามัดจำ : {roomPrice * 4}</p>
            <p>วันที่เข้าพัก</p>
            <input type='datetime-local' id='starttime'></input>
            <p>เลือกระยะเวลาที่เข้าพัก:</p>
            <input type="radio" value="3" name="timetostay" /> 3 เดือน.
            <input type="radio" value="6" name="timetostay" /> 6 เดือน.
            <input type="radio" value="12" name="timetostay" /> 1 ปี.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" variant="outlined" onClick={handleBookroom}>
            Book a room
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Booking */}
    </div>
  );
};

export default RoomDetail;
