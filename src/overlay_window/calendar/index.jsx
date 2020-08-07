// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Components
import Loading from 'general_components/loading';

// Stylesheets
import style from './calendar.module.css';

const getValidRange = function getAvailableDatesFromServer(
  setError,
  setIsLoaded,
  setStartDate,
  setEndDate,
  setDates,
) {
  setIsLoaded(false);
  fetch('http://localhost:8080/restaurant/availability')
    .then((res) => res.json())
    .then(
      (result) => {
        setDates(result.availableDates);
        setStartDate(result.start);
        setEndDate(result.end);
        setIsLoaded(true);
      },
      (error) => {
        setError(error.message);
      },
    );
};

const dayRenderHook = function disableCertainDaysFromList({ date, el }, dates) {
  const dateString = date.toLocaleString('en-ca').slice(0, 10);

  if (!dates.includes(dateString)) {
    el.setAttribute('data-testid', 'disabledDate');
    el.className += ' fc-day-disabled';
    el.disabled = true;
  }
  // else {
  //   el.setAttribute('data-testid', 'clickableDate');
  // }
};

const Calendar = function PopulateUsingFullCalendar(props) {
  const { dateClick, setError } = props;
  const [loaded, setIsLoaded] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dates, setDates] = useState([]);
  useEffect(() => {
    getValidRange(setError, setIsLoaded, setStartDate, setEndDate, setDates);
  }, [setError]);
  if (!loaded) {
    return <Loading />;
  }

  return (
    <div className={style.container}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        showNonCurrentDates={false}
        fixedWeekCount={false}
        height="100%"
        validRange={{ start: startDate, end: endDate }}
        dayCellDidMount={(args) => dayRenderHook(args, dates)}
        dateClick={dateClick}
      />
    </div>
  );
};

Calendar.propTypes = {
  dateClick: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default Calendar;
