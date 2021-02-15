// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheet
import style from './edit_hours.module.css';

const HoursRow = ({ open, close, remove }) => (
  <tr>
    <td>{open}</td>
    <td>{close}</td>
    <td><button type="button" onClick={() => remove()}>Remove</button></td>
  </tr>
);

HoursRow.propTypes = {
  open: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

const EditHours = ({
  day, hours, cancel, remove,
}) => (
  <div className={style.container}>
    <button className={style.button} type="button" onClick={() => cancel()}>x</button>
    <h1>{day}</h1>
    <table>
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
      </tbody>
    </table>
  </div>
);

EditHours.propTypes = {
  day: PropTypes.string.isRequired,
  hours: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  cancel: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default EditHours;
