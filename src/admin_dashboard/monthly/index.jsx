// Dependencies
import React from 'react';
import useFetch from 'shared/useFetch';
import { Redirect } from 'react-router-dom';

// Components
import Calendar from 'general_components/calendar';

// Stylesheets
import { useTokenContext } from 'contexts/token_context';
import style from './monthly.module.css';

const Monthly = () => {
  const token = useTokenContext.getToken;
  const { alternativeRender, response, status } = useFetch({ path: '/bookings/dailyCount', headers: { authorization: `Bearer: ${token}` } });
  if (alternativeRender) {
    return alternativeRender;
  }
  if (status >= 400 && status < 500) {
    return <Redirect to="/admin-login" />;
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
