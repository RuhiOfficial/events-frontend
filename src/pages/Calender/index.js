// // // new 
// // // EventCalendar.js

import React, { useState, useEffect } from 'react';
import { Button } from 'components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { getEvent } from 'service/api';
import SingleEvent from 'pages/SingleEvent';
import "../Custom.css"
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';
const localizer = momentLocalizer(moment);


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const CustomEvent = ({ event, onSelectEvent, isHovered, onMouseEnter, onMouseLeave }) => {
  const startDate = new Date(event.date_from);
  const endDate = new Date(event.date_to);

  const eventStyle = {
    backgroundColor: isHovered ? '#9c3e7c' : 'transparent', // Vibrant colors
    borderRadius: '8px',
    padding: '1px',
    marginBottom: '1px',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    height:"auto",
    
  };

  return (
    <div
      style={eventStyle}
      onClick={() => onSelectEvent(event)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      
    >
      <strong>{event.name}</strong>
      <br />
      
     
    </div>
  );
};

const Calender = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleHoverEvent = (eventId) => {
    setHoveredEventId(eventId);
  };

  const handleLeaveEvent = () => {
    setHoveredEventId(null);
  };

  const formatDate = (dateString) => {
    return moment(dateString).toDate();
  };

  const globalStyles = {
    color: 'rgba(218, 80, 170, 0.8)',
    borderRadius: '8px',
    height: '100vh',
    marginLeft:"20px",
    marginTop:"30px",
    width: '97%',
 
    position: 'relative',
    fontSize: '18px'
  };
  
  
  
 const backgroundImageStyles = {
  content: '""',
  position: 'absolute',
  top: '100px', // Adjust the top position as needed
  left: '100px', // Adjust the left position as needed
  width: 'calc(100% - 40px)', // Adjust the width to match the calendar width
  height: 'calc(100% - 40px)', // Adjust the height to match the calendar height
  // backgroundImage: 'url("https://images.unsplash.com/photo-1556035511-3168381ea4d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHQlMjBjbHVifGVufDB8fDB8fHww")',
  // backgroundSize: 'cover',
  // filter: 'blur(40px)', // Adjust the blur intensity
};
  

  
  useEffect(() => {
    const fetchData = async () => {
      const venueId = localStorage.getItem('Venue');
      const req = { data: { venue_id: venueId } };

      try {
        const res = await getEvent(req);
        setEventList(res.data.data);
        setIsLoading(false)
      } catch {
        console.error('Unable to fetch the Event List');
      }
    };

    fetchData();
  }, []);

  const dateCellWrapper = ({ children, value }) => {
    const isToday = moment(value).isSame(moment(), 'day');
    const isDifferentMonth = moment(value).month() !== moment().month();

    const style = {
      backgroundColor: isToday ? 'rgba(255, 255, 255, 0.1)' : isDifferentMonth ? 'transparent' : 'inherit',
    };

    return React.cloneElement(React.Children.only(children), { style });
  };


  return (
    <div style={{ height: '100vh', background: '#222', padding: '20px' }}>
      {/* {selectedEvent && (
        <div className="popup">
          <h3>{selectedEvent.id}</h3>
          <button onClick={closeModal}>Close</button>
        </div>
      )} */}
{/* <div style={backgroundImageStyles}></div> */}
{isLoading ? (
        <div style={{ display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', height: 'auto', width:"100%"}}>
          <ScaleLoader css={override} color={'#5051f9'} loading={isLoading} />
          
          <h1 style={{color:'#5051f9', fontSize:"20px"}}> Loading!</h1>
        </div>
      ) :(
 <Calendar
 
        localizer={localizer}
        events={eventList.map((event) => ({
          ...event,
          start: formatDate(event.date_from),
          end: formatDate(event.date_to),
          isSelected: selectedEventId === event.id,
        }))}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView="month"
        components={{
          toolbar: CustomToolbar,
          event: (props) => (
            <CustomEvent
              {...props}
              onSelectEvent={openModal}
              isHovered={hoveredEventId === props.event.id}
              onMouseEnter={() => handleHoverEvent(props.event.id)}
              onMouseLeave={handleLeaveEvent}
            />
          ),
          
        }}
        style={globalStyles}
        popup
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event, start, end, isSelected) => {
          const style = {
            zIndex: isSelected ? 1 : 0,
            backgroundColor: isSelected ? '#9c3e7c' : 'blue',
            borderRadius: '8px',
            padding: '4px',
            marginBottom: '2px',
            transition: 'background-color 0.3s',
            cursor: 'pointer',
            height: 'auto',
          };
      
          return { style };
        }}
      
      />)}
      


      <SingleEvent isOpen={isModalOpen} onRequestClose={closeModal} eventId={selectedEventId} />
    </div>
  );
};

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
    <div className="rbc-toolbar flex justify-between">
      <div>

      <span className="rbc-btn-group ">
        <button type="button" onClick={goToBack}  className="custom-btn">
          {'<'}
        </button>
        <button type="button" onClick={goToToday} style={{color:'white'}}>
          Today
        </button>
        <button type="button" onClick={goToNext} style={{color:'white'}}>
          {'>'}
        </button>
      </span>
      </div>
      <div>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
    </div>
    <div>
    <Button
                              className="cursor-pointer font-inter font-semibold leading-[normal] min-w-[128px] rounded-lg text-center text-sm "
                              color="white"
                              size="sm"
                              onClick={()=>{window.location.href="/allEvents"}}
                              style={{color:'white'}}
                            >
                              View All
                            </Button>
    </div>
    </div>
  );
};

export default Calender;



// // EventCalendar.js

// import React,{useState,useEffect}from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';
// import { Img } from 'components';
// import { getEvent } from 'service/api';

// const localizer = momentLocalizer(moment);


// const eventsWithImages = [
//     {
//       id: 1,
//       title: 'Meeting',
//       start: new Date(2024, 1, 7, 10, 0),
//       end: new Date(2024, 1, 7, 12, 0),
//       image: 'https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/_WIDTH_x_HEIGHT_/dam/jcr:13b44ec2-6678-4ed5-a33d-f9ea29995ae6/85954576-People-silhouette-by-tree-at-sunset.jpg', // Add the image URL
//     },
//     {
//         id: 2,
//         title: 'Second',
//         start: new Date(2024, 1, 7, 10, 0),
//         end: new Date(2024, 1, 7, 12, 0),
//         image: 'https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/_WIDTH_x_HEIGHT_/dam/jcr:13b44ec2-6678-4ed5-a33d-f9ea29995ae6/85954576-People-silhouette-by-tree-at-sunset.jpg', // Add the image URL
//       },
//     // Add more events with images as needed
//   ];
//   const CustomEvent = ({ event }) => (
//     <div className='h-[20px]' key={event.id}>
//       <strong>{event.name}</strong>
//       <br />
      
      
//       <hr />
//     </div>
//   );
  

//   const eventStyleGetter = (event, start, end, isSelected) => {
//     const backgroundColor = isSelected ? '#3174ad' : '#7FDBFF'; // Selected and regular events background color
//     const style = {
//       backgroundColor,
//       borderRadius: '5px',
//       opacity: 0.8,
//       color: 'white',
//       border: '0',
//       display: 'block',
//     };
//     return {
//       style,
//     };
//   };
// const toolbarStyle = {
//     color: 'white',
//     background: '#333', // Change to your preferred background color
//     borderRadius: '5px',
//   };
//   const buttonStyle = {
//     color: 'white',
   
//     background: 'transparent',
//     cursor: 'pointer',
//   };
//   const globalStyles = {
//     color: 'white',
//     background: '#333', // Change to your preferred background color
//     borderRadius: '5px',
//   };
// const Calender = () => {
//   const [eventList, setEventList] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [hoveredEventId, setHoveredEventId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);



//   const formatDate = (dateString) => {
//     const isoFormat = moment(dateString, moment.ISO_8601, true);
  
//     if (isoFormat.isValid()) {
//       return isoFormat.toDate();
//     }
  
//     // If ISO format parsing fails, try a more flexible parsing approach
//     const parsedDate = moment(dateString, ['YYYY-MM-DDTHH:mm:ss.SSSZ', 'YYYY-MM-DD'], true);
  
//     if (parsedDate.isValid()) {
//       return parsedDate.toDate();
//     }
  
//     // If parsing still fails, log an error and return null
//     console.error(`Unable to parse date: ${dateString}`);
//     return null;
//   };
  
  
  
      

//   useEffect(() => {
//     const fetchData = async () => {
//       const venueId = localStorage.getItem('Venue');
//       const req = { data: { venue_id: venueId } };

//       try {
//         const res = await getEvent(req);
//         setEventList(res.data.data);
        
//       } catch {
//         console.error('Unable to fetch the Event List');
//       }
//     };

//     fetchData();
//   }, []);

//     <div>
//     <h1>Event List</h1>
//     {eventList.map((event) => (
//       <CustomEvent key={event.id} event={event} />
//     ))}
//   </div>

//       return (
//         <div style={{ height: '100vh', background: '#222', padding: '20px' }}>
//           <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
//             {moment().format('MMMM D, YYYY')}
//           </h2>
//           <style>
//             {`
              
    
//               .rbc-today {
//                 background-color: #cab39f !important;
              
              
//               }
//             `}
//           </style>
//           <Calendar
//         localizer={localizer}
//         events={eventList.map((event) => ({
//                     ...event,
//                     start: formatDate(event.date_from),
//                     end: formatDate(event.date_to),
                   
//                   }))}
//         startAccessor="start"
//         endAccessor="end"
//         views={['month', 'week', 'day']}
//         defaultView="month"
//         eventPropGetter={eventStyleGetter}
//         components={{
//           toolbar: CustomToolbar,
//           event: CustomEvent, // Use a custom component for event rendering
//         }}
//         style={globalStyles}
//         step={15}
//         showMultiDayTimes
  

//         popup
//       />
//         </div>
//       );
// };


// // CustomToolbar component
// const CustomToolbar = (toolbar) => {
//   const goToBack = () => {
//     toolbar.onNavigate('PREV');
//   };

//   const goToNext = () => {
//     toolbar.onNavigate('NEXT');
//   };

//   const goToToday = () => {
//     toolbar.onNavigate('TODAY');
//   };

//   const changeView = (view) => {
//     toolbar.onView(view);
//   };

//   return (
//     <div className="rbc-toolbar " >
//       <span className="rbc-btn-group">
//         <button type="button" onClick={goToBack} style={buttonStyle}>
//           {'<'}
//         </button>
//         <button type="button" onClick={goToToday} style={buttonStyle}>
//           Today
//         </button>
//         <button type="button" onClick={goToNext} style={buttonStyle}>
//           {'>'}
//         </button>
//       </span>
//       <span className="rbc-toolbar-label">{toolbar.label}</span>
    
//     </div>
//   );
// };

// export default Calender;