import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './calendar.css';
import { firestore } from '../../../../firebase';

const localizer = momentLocalizer(moment);

const Calendars = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEmptyModal, setShowEmptyModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [event, setEvent] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);


  const handleEventModalOpen = event => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleEmptyModalOpen = date => {
    setSelectedEvent(date);
    //alert(`Select Date : ${date.toLocaleDateString()}`);
    setShowEmptyModal(true);
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
              onSelectSlot={({ start }) => handleEmptyModalOpen(start)}
              selectable={true}
              className='calender-main'
            />
           </div>
      </section>
    </>
  );
};

export default Calendars;