import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const Timepicker = ({ value, onChange, className }) => {
  // Convert string value to moment object
  const momentValue = value ? moment(value, 'h:mm a') : null;

  return (
    <TimePicker
      onChange={onChange}
     
      showSecond={false}
      format="h:mm a"
      use12Hours
      placeholder="Select Time"
      className={`custom-timepicker ${className}`}
    />
  );
};

export default Timepicker;