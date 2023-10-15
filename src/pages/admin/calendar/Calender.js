import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './calendar.css';
import { Button, Modal } from 'react-bootstrap';
import { firestore } from '../../../firebase';

const localizer = momentLocalizer(moment);

const Calender = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEmptyModal, setShowEmptyModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [event, setEvent] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSaveEvent = async () => {

    const startTime = document.querySelector("#title").value;
    const endTime = document.querySelector("#text").value;

    try {
      const newEvent = {
        startTimeEvent: document.querySelector("#starttime").value,
        endTimeEvent: document.querySelector("#endtime").value,
        title: startTime,
        text: endTime
      }

      if(startTime>=endTime){
        alert("วันที่สิ้นสุดต้องอยู่หลังวันที่เริ่มต้น");
      } else {
        const docRef = firestore.collection('Apartment').doc('Event').collection('EventData');
      const addedDoc = await docRef.add(newEvent);

      if (addedDoc) {
        alert('เพิ่มข้อมูลสำเร็จ');
        handleModalClose();
      }
      }
    } catch (error) {
      console.log("Error add event : ", error);
    }
  };

  const handleEventModalOpen = event => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleEmptyModalOpen = date => {
    setSelectedEvent(date);
    //alert(`Select Date : ${date.toLocaleDateString()}`);
    setShowEmptyModal(true);
  };

  const handleModalClose = () => {
    setShowEventModal(false);
    setShowEmptyModal(false);
    setSelectedEvent(null);
    setIsEditMode(false);
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

  const handleUpdate = () => {
    try {

      const updateStartTime = new Date(selectedEvent.startTimeEvent).toISOString();
      const updateEndTime = new Date(selectedEvent.endTimeEvent).toISOString()

      const newUpdate = {
        title: selectedEvent.title,
        text: selectedEvent.text,
        startTimeEvent: updateStartTime,
        endTimeEvent: updateEndTime
      }

      if(updateStartTime>=updateEndTime){
        alert("วันที่สิ้นสุดต้องอยู่หลังวันที่เริ่มต้น");
      } else {
        const docRef = firestore.collection('Apartment').doc('Event').collection('EventData').doc(selectedEvent.id);
      if (docRef.update(newUpdate)) {
        alert('อัพเดทเรียบร้อย');
        setIsEditMode(false);
      }
      }
    } catch (error) {
      console.log('Error update data : ', error)
    }
  };

  const handleDeleteEvent = () => {
    try {
      console.log(selectedEvent.id)
      const docRef = firestore.collection('Apartment').doc('Event').collection('EventData').doc(selectedEvent.id);
      if (docRef.delete()) {
        alert('ลบกิจกรรมเรียบร้อย');
        handleModalClose();
      }
    } catch (error) {
      console.log('Error delete event : ', error)
    }
  };

  return (
    <div>
      <div className="main-content">
        <div className="content-header">
          <div className="header-content">
            <h2>ปฏิทินข่าวสาร</h2>
          </div>
          <div className='calender-card'>
            <Calendar
              localizer={localizer}
              events={event}
              startAccessor="startTimeEvent"
              endAccessor="endTimeEvent"
              onSelectEvent={handleEventModalOpen}
              onSelectSlot={({ start }) => handleEmptyModalOpen(start)}
              selectable={true}
              className='calender-main'
            />

          </div>
          {selectedEvent && selectedEvent.title && (
            <Modal show={showEventModal} onHide={handleModalClose}
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Modal.Header closeButton>{isEditMode ? (
                <input
                  type="text"
                  value={selectedEvent.title}
                  id='updateEventTitle'
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setSelectedEvent((prevEvent) => ({ ...prevEvent, title: newTitle }));
                  }}
                />
              ) : (
                <h4>หัวข้อ : {selectedEvent.title}</h4>
              )}</Modal.Header>
              <Modal.Body>
                {isEditMode ? (
                  <input
                    type="text"
                    value={selectedEvent.text}
                    id='updateEventText'
                    onChange={(e) => {
                      const newText = e.target.value;
                      setSelectedEvent((prevEvent) => ({ ...prevEvent, text: newText }));
                    }}
                  />
                ) : (
                  <p>รายละเอียด : {selectedEvent.text}</p>
                )}
                {isEditMode ? (
                  <div>
                    <p>วันเริ่มต้น</p>
                    <input
                      type='datetime-local'
                      value={selectedEvent.startTimeEvent ? moment(selectedEvent.startTimeEvent).format('YYYY-MM-DDTHH:mm') : ''}
                      id='updateEventStartTime'
                      onChange={(e) => {
                        const newStartTime = moment(e.target.value, 'YYYY-MM-DDTHH:mm').toDate();
                        setSelectedEvent((prevEvent) => ({ ...prevEvent, startTimeEvent: newStartTime }));
                      }}
                    />
                    <p>วันสิ้นสุด</p>
                    <input
                      type='datetime-local'
                      value={selectedEvent.endTimeEvent ? moment(selectedEvent.endTimeEvent).format('YYYY-MM-DDTHH:mm') : ''}
                      id='updateEventStartTime'
                      onChange={(e) => {
                        const newStartTime = moment(e.target.value, 'YYYY-MM-DDTHH:mm').toDate();
                        setSelectedEvent((prevEvent) => ({ ...prevEvent, endTimeEvent: newStartTime }));
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <p>เริ่มวันที่ : {moment(selectedEvent.startTimeEvent).format(' DD/MM/YYYY เวลา HH:mm น.')}</p>
                    <p>จบวันที่ : {moment(selectedEvent.endTimeEvent).format(' DD/MM/YYYY เวลา HH:mm น.')}</p>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={() => {
                  if (isEditMode) {
                    handleUpdate();
                  } else {
                    setIsEditMode(true); // สลับไปเป็นโหมดแก้ไข
                  }
                }}>
                  {isEditMode ? 'Save' : 'Edit'}
                </Button>
                {isEditMode ? (
                  <>
                    <Button variant="secondary" onClick={() => setIsEditMode(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="danger" onClick={handleDeleteEvent}>
                    Delete
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          )}
          {selectedEvent instanceof Date && (
            <Modal show={showEmptyModal} onHide={handleModalClose}>
              <Modal.Header closeButton><h2>สร้างกิจกรรม</h2></Modal.Header>
              <Modal.Body>
                <p>วันเริ่มต้น</p>
                <input type='datetime-local' id='starttime'></input>
                <p>วันสิ้นสุด</p>
                <input type='datetime-local' id='endtime'></input> <br />
                <input type='text' placeholder='หัวข้อ' id='title'></input> <br />
                <input type='text' placeholder='รายละเอียด' id='text'></input>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleSaveEvent}>Save</Button>
                <Button onClick={handleModalClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calender;