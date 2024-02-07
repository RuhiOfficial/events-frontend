// EventCalendar.js

import React,{useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Img } from 'components';
import { getEvent } from 'service/api';
import SingleEvent from 'pages/SingleEvent';

const localizer = momentLocalizer(moment);

// const eventsWithImages = [
//     {
//       id: 1,
//       title: 'Meeting',
//       start: new Date(2024, 1, 8, 10, 0),
//       end: new Date(2024, 1, 8, 12, 0),
//       image: 'https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/_WIDTH_x_HEIGHT_/dam/jcr:13b44ec2-6678-4ed5-a33d-f9ea29995ae6/85954576-People-silhouette-by-tree-at-sunset.jpg', // Add the image URL
//     },
//     {
//         id: 2,
//         title: 'Second',
//         start: new Date(2024, 2, 7, 10, 0),
//         end: new Date(2024, 2, 7, 12, 0),
//         image: 'https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/_WIDTH_x_HEIGHT_/dam/jcr:13b44ec2-6678-4ed5-a33d-f9ea29995ae6/85954576-People-silhouette-by-tree-at-sunset.jpg', // Add the image URL
//       },
//     // Add more events with images as needed
//   ];


  







const CustomEvent = ({ event }) => {
  const startDate = new Date(event.date_from);
  const endDate = new Date(event.date_to);

  return (
    <div key={event.id}>
      <strong>{event.name}</strong>
      <br />
      {/* {event.featured_image && (
        <Img
          src={event.featured_image}
          alt="Event"
          style={{ maxWidth: '100%', maxHeight: '500px', marginTop: '5px', marginBottom: '20px' }}
        />
      )}
      <span>{`Start: ${moment(startDate).format('MMMM D, YYYY HH:mm')}`}</span>
      <br />
      <span>{`End: ${moment(endDate).format('MMMM D, YYYY HH:mm')}`}</span>
      <br /> */}
    </div>
  );
};



  

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = isSelected ? '#3174ad' : '#F2AD04'; // Selected and regular events background color
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0',
      display: 'block',
      
    };
    return {
      style,
    };
  };

  const buttonStyle = {
    color: 'white',
   
    background: 'transparent',
    cursor: 'pointer',
  };
  const globalStyles = {
    color: 'white',
    background: '#333', // Change to your preferred background color
    borderRadius: '5px',
    height:"100vh",
    width:"100%"
  };
const Calender = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setSelectedEventId(event.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setSelectedEventId(null);
    setIsModalOpen(false);
  };


  const fetchData = async () => {
    const venueId=localStorage.getItem('Venue')
    const req = { 
      data:{venue_id:venueId }};

    try {
      const res = await getEvent(req);
      console.log(res.data,"list of events on the bases of venue id ")
      
      setEventList(res.data.data);
    }
    catch {
      console.error("Unable to fetch the Event List ");
    };
  
   
  };

useEffect(()=>{
  fetchData();
},[])


  const handleSelectEvent = (event) => {
    // Set the selected event when an event is clicked
    setSelectedEvent(event);
    console.log(event, "event is --------->>>")
  };

  const handleClosePopup = () => {
    // Close the popup/modal by resetting the selected event
    setSelectedEvent(null);
  };

    <div>
    <h1>Event List</h1>
    {eventList.map((event) => (
      <CustomEvent key={event.id} event={event} />
    ))}
  </div>
const formatDate = (dateString) => {
  // Function to format date strings into JavaScript Date objects
  return moment(dateString).toDate();
};
      return (
        <div style={{ height: '100vh', background: '#222', padding: '20px' }}>
        {/* Popup/Modal for displaying event details */}
        {selectedEvent && (
          <div className="popup">
            {/* Display event details and include a close button */}
            <h3>{selectedEvent.id}</h3>
            {/* Add more event details here as needed */}
            <button onClick={handleClosePopup}>Close</button>
          </div>
        )}
  
  <Calendar
        localizer={localizer}
        events={eventList.map((event) => ({
          ...event,
          start: formatDate(event.date_from),
          end: formatDate(event.date_to),
        }))}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView="month"
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
        style={globalStyles}
        popup
        onSelectEvent={openModal} // Handle event selection
      />
       <SingleEvent isOpen={isModalOpen}  onRequestClose={closeModal} eventId={selectedEventId}/>
      </div>
      );
};


// CustomToolbar component
const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToToday = () => {
    toolbar.onNavigate('TODAY');
  };

  const changeView = (view) => {
    toolbar.onView(view);
  };

  return (
    <div className="rbc-toolbar " >
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack} style={buttonStyle}>
          {'<'}
        </button>
        <button type="button" onClick={goToToday} style={buttonStyle}>
          Today
        </button>
        <button type="button" onClick={goToNext} style={buttonStyle}>
          {'>'}
        </button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
    
    </div>
  );
};

export default Calender;
