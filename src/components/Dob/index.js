import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Placeholder } from 'react-bootstrap';

const DateComponent = ({ dob, onChange, placeholder }) => {
  const [selectedDate, setSelectedDate] = useState(dob);

  useEffect(() => {
    // Update the state when the dob prop changes
    setSelectedDate(dob);
  }, [dob]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Call the parent component's onChange function with the updated date
    onChange(date);
  };

  return (
<DatePicker
  selected={selectedDate}
  onChange={handleDateChange}
  selectsStart
  showMonthDropdown
  showYearDropdown
  placeholderText={placeholder}
  dateFormat="yyyy-MM-dd"
  className="rounded-l-md px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
  showTimeInput={false}
  popperClassName="light-popper"
  utcOffset={new Date().getTimezoneOffset()}
  yearDropdownItemNumber={200}  // Adjust the number of visible years as needed
  scrollableYearDropdown  // Enable scrollable year dropdown
  dropdownMode="scroll"
/>

  );
};

export default DateComponent;
