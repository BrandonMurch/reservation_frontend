import React from 'react';
import DayRow from './day_row';
import { getDayOfWeek } from 'shared/dateHelper';

const getHoursStub = () => {
  const hours = [];
  hours[1] = [['17:00', '20:00']];
  hours[5] = [['17:00', '20:00']];
  hours[6] = [['12:00', '14:00'], ['17:00', '20:00']];
  return hours;
};

const HoursOfOperation = () => {
  const days = getHoursStub();
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
            day={getDayOfWeek(index)}
            hours={hours}
            update={() => console.log('hours updated')}
          />
        ))}
      </tbody>

    </table>
  );
};

export default HoursOfOperation;
