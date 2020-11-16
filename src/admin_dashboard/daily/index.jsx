// Dependences
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'shared/useFetch';
import useTimeHandler from 'shared/useTimeHandler';
import moment from 'moment';
import { Redirect, useParams } from 'react-router-dom';
import { useTokenContext } from 'contexts/token_context';
import { RefreshDailyBookingContextProvider } from './refresh_booking_context';

// Components
import Header from 'general_components/calendar/header';
import Bookings from './bookings_table';

// Style sheets
import style from './daily.module.css';

const DailyController = function ControlDailyDate() {
  const { date } = useParams();
  const timeHandler = useTimeHandler(date);
  const dateString = timeHandler.dateObject.format('yyyy-MM-DD');
  if (date !== dateString) {
    return <Redirect to={`/admin/daily/${dateString}`} />;
  }

  return <Daily {...timeHandler} />;
};

const Daily = function DisplayDailyReservations({ dateObject, dispatchDate }) {
  const token = useTokenContext.getToken;
  const dateString = dateObject.format('yyyy-MM-DD');
  const path = `/bookings?date=${dateString}`;
  const [fetchToggle, toggleFetch] = useState(false);
  const { alternativeRender, response, status } = useFetch(path, { headers: { authorization: `Bearer: ${token}` } }, fetchToggle);
  if (status === 401) {
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
          prev={() => {
            dispatchDate({ type: 'prev', unit: 'day' });
          }}
          next={() => {
            dispatchDate({ type: 'next', unit: 'day' });
          }}
          isThisToday={dateObject.startOf('day').isSame(moment().startOf('day'))}
          goToToday={() => dispatchDate({ type: 'current' })}
          dateObject={dateObject}
          dispatchDate={dispatchDate}
        />
        <Bookings bookings={response} date={dateString} />
      </div>
    </RefreshDailyBookingContextProvider>
  );
};

Daily.propTypes = {
  dispatchDate: PropTypes.func.isRequired,
  dateObject: PropTypes.shape({
    format: PropTypes.func.isRequired,
    startOf: PropTypes.func.isRequired,
  }).isRequired,
};

export default DailyController;
