// Dependencies
import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';

// Stylesheet
import style from './day_row.module.css';
import EditHours from './edit_hours';

const hoursReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      state[action.index] = action.item;
      return [...state];
    }
    case 'remove': {
      state.splice(action.index, 1);
      return state;
    }
    case 'reset': {
      return [];
    }
    default: {
      return state;
    }
  }
};

const DayRow = ({ day, hours: propHours }) => {
  const [editWindow, toggleEditWindow] = useState(false);
  const [hours, dispatchHours] = useReducer(hoursReducer, propHours);

  let hoursText;
  if (day) {
    const joinedHours = hours.map((hourArray) => hourArray.join('-'));
    hoursText = joinedHours.join(', ');
  } else {
    hoursText = 'closed';
  }

  console.log(hours);

  return (
    <>
      <tr>
        <td>
          {day}
        </td>
        <td>{hoursText}</td>
        <td>
          {editWindow
            ? (
              <EditHours
                day={day}
                hours={hours}
                remove={(index) => dispatchHours({ type: 'remove', index })}
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
  day: PropTypes.string.isRequired,
  hours: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,

};

export default DayRow;
