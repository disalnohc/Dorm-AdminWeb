import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './calendar.css';
import { firestore } from '../../../../firebase';
import Modal from 'react-bootstrap/Modal';

const localizer = momentLocalizer(moment);

const Calendars = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [event, setEvent] = useState([]);


  const handleEventModalOpen = event => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleFetchData = () => {
    try {
      const collRef = firestore.collection('Apartment').doc('Event').collection('EventData');

      collRef.onSnapshot((querySnap) => {
        const newEvent = querySnap.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          startTimeEvent: new Date(doc.data().startTimeEvent),
          endTimeEvent: new Date(doc.data().endTimeEvent),
        }));
        //console.log(newEvent)
        setEvent(newEvent);
      })
    } catch (error) {
      console.log("Error fetch data : ", error)
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleModalClose = () => {
    setShowEventModal(false);
  }

  return (
    <>
      <section className="blog-out mb">
        <div className="container recent" style={{ display: "flex", width: "1200px", flexDirection: "column", alignItems: "center", gap: "52px" }}>
          <h4>Calendar</h4>
          <p>It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.</p>
          <Calendar
            localizer={localizer}
            events={event}
            startAccessor="startTimeEvent"
            endAccessor="endTimeEvent"
            onSelectEvent={handleEventModalOpen}
            selectable={true}
            className='calender-main'
          />
        </div>
      </section>
      <Modal show={showEventModal} onHide={handleModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton><h2>กิจกรรม</h2></Modal.Header>
        <Modal.Body>
          <h5>หัวข้อ : {selectedEvent.title}</h5>
          <h5>รายละเอียด : {selectedEvent.text}</h5>
          <h5>เริ่มวันที่ : {moment(selectedEvent.startTimeEvent).format(' DD/MM/YYYY เวลา HH:mm น.')}</h5>
          <h5>จบวันที่ : {moment(selectedEvent.endTimeEvent).format(' DD/MM/YYYY เวลา HH:mm น.')}</h5>
        </Modal.Body>
        <Modal.Footer>
          <button variant="danger" onClick={handleModalClose} className="delete-button" >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Calendars;