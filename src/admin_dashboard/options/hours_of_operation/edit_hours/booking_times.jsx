// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/helpers';

// Components
import NumberInput from 'general_components/form/inputs/number';
import RadioOptions from 'general_components/form/radio';
import SpecificTime from './specific_time';

// Stylesheets
import style from './edit_hours.module.css';

const BookingTimes = ({ hours }) => {
  const bookingTimeModes = enumeration.singleValue('INTERVAL', 'SPECIFIC');
  const [bookingTimeMode, setBookingTimeMode] = useState(bookingTimeModes.INTERVAL);

  const getBookingTimeModeOptions = () => {
    const options = Object.keys(bookingTimeModes);
    return options.map((option) => option[0] + option.slice(1, option.length).toLowerCase());
  };

  return (
    <>
      <RadioOptions
        listOfOptions={getBookingTimeModeOptions()}
        name="BookingTimeMode"
        value={bookingTimeMode.value}
        onChange={(value) => {
          setBookingTimeMode(bookingTimeModes[value.toUpperCase()]);
        }}
      />
      {(bookingTimeMode.value === bookingTimeModes.INTERVAL.value
        && (
          <>
            <div className={style.intervalContainer}>
              <NumberInput style={style} name="interval" hiddenLabel label="Interval in minutes" min="0" hideErrors />
            </div>
            <p className={style.intervalText}>minutes</p>
          </>
        ))}
      {(bookingTimeMode.value === bookingTimeModes.SPECIFIC.value
        && (
          <SpecificTime
            hours={hours}
            style={style}
            name="bookingTimes"
            label="Booking times in 24h, seperated by commas"
            pattern="^(\d{2}:\d{2}((, ?)|$))+"
          />
        ))}
    </>
  );
};
BookingTimes.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BookingTimes;
