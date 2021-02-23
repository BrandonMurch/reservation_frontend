// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/helpers';

// Components
import NumberInput from 'general_components/form/inputs/number';
import RadioOptions from 'general_components/form/radio';
import NewRow from './new_row';

// Stylesheet
import style from './edit_hours.module.css';
import SpecificTime from './specific_time';

const HoursRow = ({ open, close, remove }) => (
  <tr>
    <td>{open}</td>
    <td>{close}</td>
    <td><button className={style.button} type="button" onClick={() => remove()}>Remove</button></td>
  </tr>
);

HoursRow.propTypes = {
  open: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

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

const EditHours = ({
  day, hours, cancel, remove, add,
}) => (
  <div className={style.container}>
    <button
      className={style.exitButton}
      type="button"
      onClick={() => cancel()}
    >
      x
    </button>
    <h1>{day}</h1>
    <BookingTimes hours={hours} />
    <table className={style.table}>
      <thead>
        <tr>
          <td>Open</td>
          <td>Close</td>
        </tr>
      </thead>
      <tbody>
        {hours.map((hoursString, index) => {
          const set = hoursString.split(' - ');
          return (
            <HoursRow
              key={hoursString}
              open={set[0]}
              close={set[1]}
              remove={() => remove(index)}
            />
          );
        })}
        <NewRow addHours={add} />
      </tbody>
    </table>
  </div>
);

EditHours.propTypes = {
  day: PropTypes.string.isRequired,
  hours: PropTypes.arrayOf(PropTypes.string).isRequired,
  cancel: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};

export default EditHours;
