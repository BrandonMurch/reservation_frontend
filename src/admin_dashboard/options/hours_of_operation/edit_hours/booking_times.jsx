// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/enum';
import { fetchWrapper } from 'shared/useFetch';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';

// Components
import NumberInput from 'general_components/form/inputs/number';
import RadioOptions from 'general_components/form/inputs/radio';
import SpecificTime from './specific_time';

// Stylesheets
import style from './edit_hours.module.css';

const updateTypes = {
  BOOKING_TIMES: 'booking-times',
  INTERVAL: 'interval',
};

const updateServer = (day, value, type, setError) => {
  const { error } = fetchWrapper(
    `/hours-of-operation/${type}/${day}`,
    { body: JSON.stringify(value), method: 'PUT' },
  );
  if (error) {
    setError(error);
  }
};
const BookingTimes = ({
  day, hours, type, times,
}) => {
  const bookingTimeModes = enumeration.singleValue('INTERVAL', 'BOOKING_TIMES');
  const [bookingTimeMode, setBookingTimeMode] = useState(bookingTimeModes[type]);
  const [bookingTimes, setBookingTimes] = useState(times);
  const setBanner = useBannerContext();

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
          const mode = bookingTimeModes[value.toUpperCase()];
          setBookingTimeMode(mode);
          if (mode === bookingTimeModes.INTERVAL) {
            setBookingTimes('0');
            fetchWrapper(`/hours-of-operation/interval/${day}`, { method: 'PUT', body: '0' });
          } else if (mode === bookingTimeModes.BOOKING_TIMES) {
            setBookingTimes('');
            fetchWrapper(`/hours-of-operation/interval/${day}`, { method: 'PUT', body: '0' });
          }
          fetchWrapper();
        }}
      />
      {(bookingTimeMode.value === bookingTimeModes.INTERVAL.value
        && (
          <>
            <div className={style.intervalContainer}>
              <NumberInput
                key={day}
                style={style}
                value={bookingTimes ? parseInt(bookingTimes, 10) : 0}
                name="interval"
                hiddenLabel
                label="Interval in minutes"
                min="0"
                hideErrors
                onBlur={(value) => {
                  updateServer(
                    day,
                    value,
                    updateTypes.INTERVAL,
                    (message) => setBanner(bannerTypes.ERROR, message),
                  );
                }}
              />
            </div>
            <p className={style.intervalText}>minutes</p>
          </>
        ))}
      {(bookingTimeMode.value === bookingTimeModes.BOOKING_TIMES.value
        && (
          <SpecificTime
            key={bookingTimes}
            hours={hours}
            style={style}
            name="bookingTimes"
            value={bookingTimes}
            label="Booking times in 24h, seperated by commas"
            pattern="^(\d{2}:\d{2}((, ?)|$))+"
            onUpdate={(value) => {
              updateServer(
                day,
                value,
                updateTypes.BOOKING_TIMES,
                (message) => setBanner(bannerTypes.ERROR, message),
              );
            }}
          />
        ))}
    </>
  );
};
BookingTimes.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.string).isRequired,
  day: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  times: PropTypes.string.isRequired,
};

export default BookingTimes;
