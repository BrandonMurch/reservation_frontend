// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import NewRow from './new_row';

// Stylesheet
import style from './edit_hours.module.css';
import BookingTimes from './booking_times';

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