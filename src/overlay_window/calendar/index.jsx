// Dependencies
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import PropTypes from 'prop-types';

// CSS
import style from './calendar.module.css';

const getValidRange = function getAvailableDatesFromServer(
  setError, setIsLoaded, setStartDate, setEndDate, setDates,
) {
  // TODO find dates from backend.

  fetch('http://localhost:8080/bookings/free-dates')
    .then((res) => res.json())
    .then(
      (result) => {
        setDates(result.availableDates);
        setStartDate(result.start);
        setEndDate(result.end);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      },
    );
};

const dayRenderHook = function disableCertainDaysFromList({ date, el }, dates) {
  const dateStr = date.toISOString().slice(0, 10);

  if (!dates.includes(dateStr)) {
    el.className += ' fc-day-disabled';
    el.disabled = true;
  }
};

const Calendar = function PopulateUsingFullCalendar(props) {
  const { dateClick } = props;
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dates, setDates] = useState([]);
  useEffect(() => {
    getValidRange(setError, setIsLoaded, setStartDate, setEndDate, setDates);
  }, []);
  if (error) {
    return (
      <div>{error.message}</div>
    );
  }
  if (!loaded) {
    return (
      <div>Loading...</div>
    );
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
        // dateClick={dateClick}
        dateClick={dateClick}
      />
    </div>
  );
};

Calendar.propTypes = {
  dateClick: PropTypes.func.isRequired,
};

export default Calendar;
