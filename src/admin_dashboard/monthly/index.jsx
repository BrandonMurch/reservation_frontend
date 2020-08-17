// Dependencies
import React, { useState, useEffect } from 'react';
import fetchWrapper from 'shared/fetch';

// Components
import Calendar from 'general_components/calendar';
import Loading from 'general_components/loading';

// Stylesheets
import style from './monthly.module.css';

const Monthly = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reservationMap, setReservationMap] = useState({});
  useEffect(() => {
    fetchWrapper('/bookings/dailyCount', 'GET')
      .then(
        (response) => {
          setIsLoaded(true);
          setReservationMap(response);
        },
        (error) => {
        // TODO: SetError banner
          console.error(error);
          setIsLoaded(true);
        },
      );
  }, []);
  if (!isLoaded) {
    return <Loading />;
  }
  return (
    <div className={style.container}>
      <Calendar onDateRender={({ date, setMessage }) => {
        if (reservationMap[date]) {
          setMessage(`${reservationMap[date]} reservations`);
        }
      }}
      />
    </div>
  );
};

export default Monthly;
