// Dependencies
import React, { useState } from 'react';
import useFetch from 'shared/useFetch';
import { Redirect } from 'react-router-dom';

// Components
import Calendar from 'general_components/calendar';

// Stylesheets
import { useTokenContext } from 'contexts/token_context';
import style from './monthly.module.css';

const Monthly = () => {
  const token = useTokenContext.getToken;
  const [redirect, setRedirect] = useState('');
  let skipFetch;
  if (redirect) {
    skipFetch = true;
  }
  const { alternativeRender, response, status } = useFetch('/bookings/dailyCount', { headers: { authorization: `Bearer: ${token}` }, skipFetch });
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  if (status >= 400 && status < 500) {
    return <Redirect to="/admin-login" />;
  }
  if (alternativeRender) {
    return alternativeRender;
  }
  return (
    <div className={style.container}>
      <Calendar
        onDateRender={({ date, setMessage }) => {
          if (response[date]) {
            setMessage(`${response[date]} reservations`);
          }
        }}
        onClick={(date) => {
          setRedirect(`/admin/daily/${date}`);
        }}
      />
    </div>
  );
};

export default Monthly;
