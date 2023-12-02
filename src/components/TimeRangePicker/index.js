// TimeRangePicker.js
import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

const TimeRangePicker = ({ startTime, endTime, onChange }) => {
  const [selectedStartTime, setSelectedStartTime] = useState(startTime);
  const [selectedEndTime, setSelectedEndTime] = useState(endTime);

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
    // Optionally, you can add further validation or adjustments here
  };

  const handleEndTimeChange = (time) => {
    // Check if the selected end time is earlier than the start time
    if (selectedStartTime && time.isBefore(selectedStartTime)) {
      // Display an error message or reset the end time to start time
      console.error("End time cannot be earlier than start time");
      // Resetting end time to start time (you can adjust this behavior)
      setSelectedEndTime(selectedStartTime);
    } else {
      setSelectedEndTime(time);
      onChange(selectedStartTime, time);
    }
  };

  return (
    <div className="flex">
      <TimePicker
        value={selectedStartTime ? moment(selectedStartTime) : undefined}
        onChange={handleStartTimeChange}
        className="rounded-l-md px-3 py-2 border-b border-r border-gray-300 focus:outline-none focus:border-blue-500 flex-1"
      />
      <TimePicker
        value={selectedEndTime ? moment(selectedEndTime) : undefined}
        onChange={handleEndTimeChange}
        className="rounded-r-md px-3 py-2 border-b border-l border-gray-300 focus:outline-none focus:border-blue-500 flex-1"
      />
    </div>
  );
};

export default TimeRangePicker;
