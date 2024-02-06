import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
// Create this file for your custom styling

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const addEvent = () => {
    const newEvent = {
      date: moment(date).format('YYYY-MM-DD'),
      title: prompt('Enter event title:'),
    };

    setEvents([...events, newEvent]);
  };

  return (
    <div className="event-calendar">
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <div className="events-container">
        <h2>Events for {moment(date).format('MMMM D, YYYY')}</h2>
        <ul>
          {events
            .filter((event) => moment(event.date).isSame(date, 'day'))
            .map((event, index) => (
              <li key={index}>{event.title}</li>
            ))}
        </ul>
        <button onClick={addEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default Calender;
