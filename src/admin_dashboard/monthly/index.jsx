// Dependencies
import React, { useState, useEffect } from 'react';
import fetchWrapper from 'shared/fetch';

// Components
import Calendar from 'general_components/calendar';
import Loading from 'general_components/loading';
import Banner, { bannerTypes } from 'general_components/banner';

// Stylesheets
import style from './monthly.module.css';

const Monthly = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reservationMap, setReservationMap] = useState({});
  const [error, setError] = useState('');
  useEffect(() => {
    fetchWrapper('/bookings/dailyCount', 'GET')
      .then(
        (response) => {
          setIsLoaded(true);
          setReservationMap(response);
        },
        (e) => {
          setError(e);
        },
      );
  }, []);
  if (!isLoaded) {
    return <Loading />;
  }
  return (
    <div className={style.container}>
      {error && <Banner type={bannerTypes.ERROR} message={error} />}
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
