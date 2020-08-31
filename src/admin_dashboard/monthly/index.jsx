// Dependencies
import React from 'react';
import useFetch from 'shared/useFetch';

// Components
import Calendar from 'general_components/calendar';

// Stylesheets
import style from './monthly.module.css';

const Monthly = () => {
  const { alternativeRender, response } = useFetch('/bookings/dailyCount');
  if (alternativeRender) {
    return alternativeRender;
  }
  return (
    <div className={style.container}>
      <Calendar onDateRender={({ date, setMessage }) => {
        if (response[date]) {
          setMessage(`${response[date]} reservations`);
        }
      }}
      />
    </div>
  );
};

export default Monthly;
