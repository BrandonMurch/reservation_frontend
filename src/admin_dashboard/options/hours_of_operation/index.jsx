import React, { useReducer } from 'react';
import DayRow from './day_row';
import { getDayOfWeek } from 'shared/dateHelper';

const getHours = function getHoursOfOperationStub() {
  const hours = [];
  for (let i = 0; i < 7; i++) {
    hours[i] = [];
  }
  hours[1] = ['17:00 - 20:00'];
  hours[5] = ['17:00 - 20:00'];
  hours[6] = ['12:00 - 14:00', '17:00 - 20:00'];
  return hours;
};

const hoursReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      state[action.day] = action.push(action.hours);
      return [...state];
    }
    case 'remove': {
      state[action.day].splice(action.hoursIndex, 1);
      return [...state];
    }
    case 'removeAll': {
      state[action.day] = [];
      return [...state];
    }
    default: {
      return state;
    }
  }
};

const HoursOfOperation = () => {
  const [days, dispatchDays] = useReducer(hoursReducer, getHours());
  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        {days.map((hours, index) => (
          <DayRow
            key={getDayOfWeek(index)}
            day={index}
            hours={hours}
            update={() => console.log('hours updated')}
            dispatchDays={dispatchDays}
          />
        ))}
      </tbody>

    </table>
  );
};

export default HoursOfOperation;
