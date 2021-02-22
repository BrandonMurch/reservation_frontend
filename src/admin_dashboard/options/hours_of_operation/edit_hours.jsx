// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/helpers';

// Components
import NumberInput from 'general_components/form/inputs/number';

// Stylesheet
import style from './edit_hours.module.css';
import TextInput from 'general_components/form/inputs/text';
import RadioOptions from 'general_components/form/radio';

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

const NewRow = ({ addHours }) => {
  const [open, setOpen] = useState('');
  const [close, setClose] = useState('');
  return (
    <tr className={style.newRow}>
      <td>
        <input
          type="time"
          value={open}
          onChange={({ target }) => setOpen(target.value)}
        />
      </td>
      <td>
        <input
          type="time"
          value={close}
          onChange={({ target }) => setClose(target.value)}
        />
      </td>
      <td>
        <button
          className={style.button}
          type="submit"
          onClick={() => addHours(`${open} - ${close}`)}
        >
          Add
        </button>
      </td>
    </tr>
  );
};

NewRow.propTypes = {
  addHours: PropTypes.func.isRequired,
};

const BookingTimes = () => {
  const bookingTimeModes = enumeration.singleValue('INTERVAL', 'SPECIFIC');
  const [bookingTimeMode, setBookingTimeMode] = useState(bookingTimeModes.INTERVAL);

  const updateBookingTimes = (value) => {
    console.log(`updated ${value}`);
  };

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
        <TextInput
          style={style}
          name="bookingTimes"
          label="Booking times in 24h, seperated by commas"
          pattern="^(\d{2}:\d{2}((, ?)|$))+"
          onBlur={updateBookingTimes}
        />
        ))}
    </>
  );
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
    <BookingTimes />
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
