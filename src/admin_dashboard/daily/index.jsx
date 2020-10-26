// Dependences
import React, { useState } from 'react';
import useFetch from 'shared/useFetch';
import useTimeHandler from 'shared/useTimeHandler';
import moment from 'moment';
import { Redirect, useParams } from 'react-router-dom';
import { useTokenContext } from 'contexts/token_context';

// Components
import Header from 'general_components/calendar/header';
import Bookings from './bookings_table';

// Style sheets
import style from './daily.module.css';
import { RefreshDailyBookingContextProvider } from './refresh_booking_context';

const Daily = function DisplayDailyReservations() {
  const { date } = useParams();
  const { dateObject, dispatchDate } = useTimeHandler(date);
  const token = useTokenContext.getToken;
  const path = `/bookings?date=${dateObject.format('yyyy-MM-DD')}`;
  const [fetchToggle, toggleFetch] = useState(false);
  const { alternativeRender, response, status } = useFetch(path, { headers: { authorization: `Bearer: ${token}` } }, fetchToggle);
  if (status >= 400 && status < 500) {
    return <Redirect to="/admin-login" />;
  }
  if (alternativeRender) {
    return alternativeRender;
  }

  return (
    <RefreshDailyBookingContextProvider refreshFunction={() => toggleFetch(!fetchToggle)}>
      <div className={style.container}>
        <Header
          date={dateObject.format('dddd MMMM Do[,] YYYY')}
          prev={() => dispatchDate({ type: 'prev', unit: 'day' })}
          next={() => dispatchDate({ type: 'next', unit: 'day' })}
          isThisToday={dateObject.startOf('day').isSame(moment().startOf('day'))}
          goToToday={() => dispatchDate({ type: 'current' })}
          dateObject={dateObject}
          dispatchDate={dispatchDate}
        />
        <Bookings bookings={response} />
      </div>
    </RefreshDailyBookingContextProvider>
  );
};

export default Daily;
