// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Stylesheet
import style from './day_row.module.css';
import EditHours from './edit_hours';
import { getDayOfWeek } from 'shared/dateHelper';

const DayRow = ({ day: dayIndex, hours, dispatchDays }) => {
  const [editWindow, toggleEditWindow] = useState(false);
  const dayString = getDayOfWeek(dayIndex);
  let hoursText;
  if (hours.length > 0) {
    hoursText = hours.join(', ');
  } else {
    hoursText = 'closed';
  }

  return (
    <>
      <tr>
        <td>
          {dayString}
        </td>
        <td>{hoursText}</td>
        <td>
          {editWindow
            ? (
              <EditHours
                day={dayString}
                hours={hours}
                remove={(hoursIndex) => dispatchDays({ type: 'remove', day: dayIndex, hoursIndex })}
                cancel={() => toggleEditWindow(false)}
              />
            )
            : null}
          <button
            className={style.button}
            type="button"
            onClick={() => toggleEditWindow((previousState) => !previousState)}
          >
            edit
          </button>
        </td>
      </tr>
    </>
  );
};

DayRow.propTypes = {
  day: PropTypes.number.isRequired,
  hours: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchDays: PropTypes.func.isRequired,
};

export default DayRow;
