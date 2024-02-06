// EventCalendar.js

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Img } from 'components';

const localizer = momentLocalizer(moment);

const eventsWithImages = [
    {
      id: 1,
      title: 'Meeting',
      start: new Date(2024, 1, 7, 10, 0),
      end: new Date(2024, 1, 7, 12, 0),
      image: 'https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/_WIDTH_x_HEIGHT_/dam/jcr:13b44ec2-6678-4ed5-a33d-f9ea29995ae6/85954576-People-silhouette-by-tree-at-sunset.jpg', // Add the image URL
    },
    {
        id: 2,
        title: 'Second',
        start: new Date(2024, 2, 7, 10, 0),
        end: new Date(2024, 2, 7, 12, 0),
        image: 'https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/_WIDTH_x_HEIGHT_/dam/jcr:13b44ec2-6678-4ed5-a33d-f9ea29995ae6/85954576-People-silhouette-by-tree-at-sunset.jpg', // Add the image URL
      },
    // Add more events with images as needed
  ];
  const CustomEvent = ({ event }) => (
    <div className='h-[500px]' key={event.id}>
      <strong>{event.title}</strong>
      <br />
      <span>{`Start: ${moment(event.start).format('MMMM D, YYYY HH:mm')}`}</span>
      <br />
      <span>{`End: ${moment(event.end).format('MMMM D, YYYY HH:mm')}`}</span>
      <br />
      {event.image && (
        <img
          src={event.image}
          alt="Event"
          style={{ maxWidth: '100%', maxHeight: '100px', marginTop: '5px' }}
        />
      )}
      <hr />
    </div>
  );
  

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = isSelected ? '#3174ad' : '#7FDBFF'; // Selected and regular events background color
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
const toolbarStyle = {
    color: 'white',
    background: '#333', // Change to your preferred background color
    borderRadius: '5px',
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
  };
const Calender = () => {
    <div>
    <h1>Event List</h1>
    {eventsWithImages.map((event) => (
      <CustomEvent key={event.id} event={event} />
    ))}
  </div>

      return (
        <div style={{ height: '100vh', background: '#222', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
            {moment().format('MMMM D, YYYY')}
          </h2>
          <style>
            {`
              
    
              .rbc-today {
                background-color: #cab39f !important;
              
              
              }
            `}
          </style>
          <Calendar
        localizer={localizer}
        events={eventsWithImages}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView="month"
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent, // Use a custom component for event rendering
        }}
        style={globalStyles}
        popup
      />
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
