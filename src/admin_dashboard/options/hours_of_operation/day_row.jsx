// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheet
import style from './day_row.module.css';

const getHourString = (hours) => (
  hours.length > 0
    ? hours.join(', ')
    : 'closed');

const DayRow = ({ day, hours, setEditWindow }) => (
  <>
    <tr>
      <td>
        {day}
      </td>
      <td>{getHourString(hours)}</td>
      <td>
        <button
          className={style.button}
          type="button"
          onClick={() => setEditWindow(day)}
        >
          edit
        </button>
      </td>
    </tr>
  </>
);

DayRow.propTypes = {
  day: PropTypes.string.isRequired,
  hours: PropTypes.arrayOf(PropTypes.string).isRequired,
  setEditWindow: PropTypes.func.isRequired,
};

export default DayRow;
