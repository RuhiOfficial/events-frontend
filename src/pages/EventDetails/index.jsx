import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import Map from "../Map";
import UpcomingEvents from "../EventDetails/UpcomingEvents";

const EventDetails = () => {
    const { id } = useParams();
    // const [selectedDate, setSelectedDate] = useState(null);
    const [startTime] = useState(null);
    const [dob] = useState(null);
    const [date] = useState(null);
    const [bookingNote] = useState("");
    const [guestsNumber] = useState(0);

    // getDayClassName = (date) => {
    //     // Add custom styling for specific days if needed
    //     return date.getDay() === 0 || date.getDay() === 6 ? "weekend-day" : "";
    // };

    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleClick = () => {
        // Toggle the state to open/close the popup
        setPopupOpen(!isPopupOpen);
    };

    return (
        <div className="container-event  mx-auto p-8">
            <h1 className="text-white text-8xl mb-4 text-center">GRAND OPENING: NYE 2024!</h1>
            <div className="flex justify-center items-center mb-4 event-main">
                <div className="w-full">
                    <div className="flex">
                        <div className="w-4/12 py-2">
                            <img className="h-41  event-image" src="/friday.png" alt="Event Image" />
                        </div>
                        <div className="w-8/12 py-2">
                            <div className="flex space-x-4">
                                <div className="space-y-4">
                                    <input type="date" id="date" className="input" />
                                    {/* <label htmlFor="datepicker" className="mb-2">
                                    Date:
                                </label> */}
                                    {/* <DatePicker
                                    id="datepicker"
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd MMMM yyyy (eee)" // Include full month name
                                    dayClassName={getDayClassName}
                                    className="border rounded p-2 w-full  border border border-black bg-transparent"
                                    placeholder="Select Date"
                                /> */}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded" onClick={handleClick}>
                                            <input type="text" id="tableselection" className="input" placeholder="table selection" />
                                        </button>

                                        {isPopupOpen && (
                                            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                                                <div className="bg-white p-8 rounded shadow-md">
                                                    <p>Popup content goes here.</p>
                                                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Map Image */}
                            <div className="row-block no-padding">
                                {/* Location Section */}
                                <div className="pad-block">
                                    <div className="form-title sm">LOCATION</div>
                                    <div className="m-b-sm">
                                        <a
                                            target="_blank"
                                            // onClick={(e) => openLink(e,)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {/* {event.address} */}
                                        </a>
                                    </div>
                                    <Map />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center event-main">
                <div class="px-4 w-full">
                    <div class="flex">
                        <div className="container mx-auto">
                            <div className="flex space-x-4">
                                <div className="flex-1 space-y-4">
                                    <label htmlFor="preferredSection" className="text-gray-700">
                                        Preferred Section:
                                    </label>
                                    <input type="text" id="preferredSection" className="input" placeholder="VIP Section" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <label htmlFor="estimatedTime" className="text-gray-700">
                                        Estimated Time of Arrival:
                                    </label>
                                    <input type="text" id="estimatedTime" className="input" placeholder="HH:mm AM/PM" />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                {/* First Name */}
                                <div className="flex-1 space-y-4">
                                    <label htmlFor="firstName" className="text-gray-700">
                                        First Name:
                                    </label>
                                    <input type="text" id="firstName" className="input" placeholder="John" />
                                </div>
                                {/* Last Name */}
                                <div className="flex-1 space-y-4">
                                    <label htmlFor="lastName" className="text-gray-700">
                                        Last Name:
                                    </label>
                                    <input type="text" id="lastName" className="input" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1 space-y-4">
                                    <label htmlFor="phoneNumber" className="text-white-700">
                                        Phone Number:
                                    </label>
                                    <input type="tel" id="phoneNumber" className="input" placeholder="555-1234" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <label htmlFor="email" className="text-white-700">
                                        Email:
                                    </label>
                                    <input type="email" id="email" className="input" placeholder="john.doe@example.com" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label htmlFor="dob" className="text-white-700">
                                    Date of Birth:
                                </label>
                            </div>
                            <div className="space-y-4">
                                <input type="date" id="dob" className="input" />
                            </div>
                            <div className="space-y-4">
                                <label htmlFor="bookingNote" className="text-white-700">
                                    Booking Note:
                                </label>
                                <textarea id="bookingNote" className="input" placeholder="your occasion or special request?" />
                            </div>
                            <div className="space-y-4">
                                <input type="number" id="totalGuests" className="input" placeholder="Total Guests:" />
                            </div>
                            <div className="space-y-4">
                                <input type="checkbox" id="agreeTerms" />
                                <label htmlFor="agreeTerms" className="text-white-700">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                            <button type="submit" className="w-full bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                                Submit inquiry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UpcomingEvents />
        </div>
    );
};

export default EventDetails;
