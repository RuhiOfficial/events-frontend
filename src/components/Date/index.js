import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../pages/Custom.css'; // Custom styles for DateRangePicker
import { Placeholder } from 'react-bootstrap';

const Date = ({ startDate, onChange, placeholder }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  console.log(selectedStartDate,"dtuy fg qwuybcftquwndxzbnrxqwkdknxybidehnxymdefjmslwxzfjmrs")

  useEffect(() => {
    // Update the state when the startDate prop changes
    setSelectedStartDate(startDate);
  }, [startDate]);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);

    // Call the parent component's onChange function with the updated date
    onChange(date);
  };

  return (
    <DatePicker
      selected={selectedStartDate}
      onChange={handleStartDateChange}
      selectsStart
      startDate={selectedStartDate}
      showMonthDropdown
      showYearDropdown
      placeholderText={placeholder}
      dateFormat="EEE, MMM dd, yyyy"  // Set the desired date format
      className="rounded-l-md px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
      showTimeInput={false}
      popperClassName="dark-popper"
    />
  );
};

export default Date;
