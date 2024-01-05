import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingEvents = ({ exodusVenue }) => {
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingUpcoming(true);

        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const response = await axios.get('https://event-backend.isdemo.in/api/v1/upcoming_events', {
          params: {
            // Include any parameters you need for the API call
            // For example: city: 'New York', category: 'Music', etc.
            "number_of_events":"3",
            "venue_id":"1",
          },
        });
        // Assuming the response data has a property 'upcoming' containing the event array
        console.log(response.data.data)
        setUpcoming(response.data.data);
        // console.log(response,"res: ");
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      } finally {
        setLoadingUpcoming(false);
        }
    };
    console.log(upcoming,"res: ");  

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once, like componentDidMount

  return (
    <div className={`upcoming-events ${!loadingUpcoming ? 'ng-scope' : ''}`} ngif={!loadingUpcoming}>
      <div className="flex flex-wrap -mx-4">
        {upcoming && Array.isArray(upcoming) && upcoming.length > 0 ? (
          // console.log(upcoming,"up: "),
          upcoming.slice(0, 5).map((event, index) => (
            <EventCard
              key={index}
              event={event}
              showMeta={!exodusVenue}
              // Pass any additional parameters or functions as needed
            />
          ))
        ) : (
          <div className="container mx-auto">
      <div className="flex justify-center m-8">
        {/* Image 1 */}
        <div className="m-2">
          <img
            src="https://dzbwcqs3bd4zb.cloudfront.net/bab479e3-b12c-4736-824f-1499da4fca0b.png" // Replace with your image URL
            alt="Event 1"
            className="w-full h-auto"
          />
          <div className="text-center mt-2">Grand Opening: NYE 2024!</div>
          <div className="text-center mt-2">
            <span className="text-center mt-2">DEC</span>
            <span className="text-center mt-2">31</span></div>
            <div className="text-center mt-2">1920 Market Street</div>
            <div className="text-center mt-2">Book Table Service</div>
        </div>

        {/* Image 2 */}
        <div className="m-2">
          <img
            src="https://dzbwcqs3bd4zb.cloudfront.net/bab479e3-b12c-4736-824f-1499da4fca0b.png" // Replace with your image URL
            alt="Event 2"
            className="w-full h-auto"
          />
          <div className="text-center mt-2">Thursday: Riot House Denver</div>
          <div className="text-center mt-2">
            <span className="text-center mt-2">DEC</span>
            <span className="text-center mt-2">31</span></div>
            <div className="text-center mt-2">1920 Market Street</div>
            <div className="text-center mt-2">Book Table Service</div>
        </div>

        {/* Image 3 */}
        <div className="m-2">
          <img
            src="https://dzbwcqs3bd4zb.cloudfront.net/bab479e3-b12c-4736-824f-1499da4fca0b.png" // Replace with your image URL
            alt="Event 3"
            className="w-full h-auto"
          />
          <div className="text-center mt-2">Saturday: Riot House Denver</div>
          <div className="text-center mt-2">
            <span className="text-center mt-2">DEC</span>
            <span className="text-center mt-2">31</span></div>
            <div className="text-center mt-2">1920 Market Street</div>
            <div className="text-center mt-2">Book Table Service</div>
        </div>
      </div>
    </div>
          // <div>No Upcoming Events</div>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event, showMeta }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
      <div className="event-card-wrap">
      <div className="">Upcoming Events</div>
        <div className="card-image">
          <img
            className="w-full h-64 object-cover"
            src={event.imageUrl}
            alt="Event Image"
          />
        </div>
        <div className="event-card-info mt-2">
          <div className={`info ${!showMeta ? 'center' : ''}`}>
            <div className="name ng-binding">{event.name}</div>
            {showMeta && (
              <div className="ng-scope">
                <div className="over ng-binding">{event.location}</div>
                <div className="over ng-binding">Book Table Service</div>
              </div>
            )}
          </div>
          {showMeta && (
            <div className="date ng-scope mt-2">
              <span className="orange ng-binding">{event.month}</span>
              <br />
              <span className="ng-binding">{event.day}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
  
export default UpcomingEvents;

