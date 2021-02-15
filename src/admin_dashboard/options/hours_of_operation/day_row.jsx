// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheet
import style from './day_row.module.css';
import { getDayOfWeek } from 'shared/dateHelper';

const getHourString = (hours) => (
  hours.length > 0
    ? hours.join(', ')
    : 'closed');

const DayRow = ({ day: dayIndex, hours, setEditWindow }) => (
  <>
    <tr>
      <td>
        {getDayOfWeek(dayIndex)}
      </td>
      <td>{getHourString(hours)}</td>
      <td>
        <button
          className={style.button}
          type="button"
          onClick={() => setEditWindow(dayIndex)}
        >
          edit
        </button>
      </td>
    </tr>
  </>
);

DayRow.propTypes = {
  day: PropTypes.number.isRequired,
  hours: PropTypes.arrayOf(PropTypes.string).isRequired,
  setEditWindow: PropTypes.func.isRequired,
};

export default DayRow;
