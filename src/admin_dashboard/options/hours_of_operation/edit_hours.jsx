// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/helpers';

// Components
import AutoCompleteInput from 'general_components/form/inputs/autocomplete_input';
import NumberInput from 'general_components/form/inputs/number';

// Stylesheet
import style from './edit_hours.module.css';
import TextInput from 'general_components/form/inputs/text';

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
  return (
    <>
      <AutoCompleteInput
        key={bookingTimeMode.value}
        possibleEntries={Object.keys(bookingTimeModes)}
        onBlur={({ value }) => setBookingTimeMode(bookingTimeModes[value])}
        name="BookingTimeMode"
        label="Booking time type"
        hiddenLabel
        value={bookingTimeMode.value}
      />
      {(bookingTimeMode.value === bookingTimeModes.INTERVAL.value
        && <NumberInput style={style} name="Interval" label="Interval in minutes" />)}
      {(bookingTimeMode.value === bookingTimeModes.SPECIFIC.value
        && <TextInput style={style} name="BookingTimes" label="List booking times" />)}
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
