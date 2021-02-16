// Dependencies
import React, { useReducer, useState } from 'react';
import { getDayOfWeek } from 'shared/dateHelper';

// Components
import DayRow from './day_row';
import EditHours from './edit_hours';

const getHours = function getHoursOfOperationStub() {
  const hours = {};
  for (let i = 0; i < 7; i++) {
    hours[getDayOfWeek(i)] = [];
  }
  hours.Monday = ['17:00 - 20:00'];
  hours.Friday = ['17:00 - 20:00'];
  hours.Saturday = ['12:00 - 14:00', '17:00 - 20:00'];
  return hours;
};

const update = (state) => {
  console.log(`updated ${state}`);
};

const hoursReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      state[action.day].push(action.hours);
      update(state);
      return { ...state };
    }
    case 'remove': {
      state[action.day].splice(action.hoursIndex, 1);
      update(state);
      return { ...state };
    }
    default: {
      return state;
    }
  }
};

const HoursOfOperation = () => {
  const [days, dispatchDays] = useReducer(hoursReducer, getHours());
  const [editWindowDay, setEditWindowDay] = useState('');
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>

          {Object.entries(days).map(([day, hours]) => (
            <DayRow
              key={day}
              day={day}
              hours={hours}
              setEditWindow={setEditWindowDay}
            />
          ))}
        </tbody>
      </table>
      { editWindowDay !== ''
        ? (
          <EditHours
            day={editWindowDay}
            hours={days[editWindowDay]}
            add={(hours) => dispatchDays({ type: 'add', day: editWindowDay, hours })}
            remove={(hoursIndex) => dispatchDays({ type: 'remove', day: editWindowDay, hoursIndex })}
            cancel={() => setEditWindowDay('')}
          />
        )
        : null}
    </>
  );
};

export default HoursOfOperation;
