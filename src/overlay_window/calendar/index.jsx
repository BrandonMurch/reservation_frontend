// Dependencies
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import fetchWrapper from 'shared/fetch';

// Components
import Loading from 'general_components/loading';

// Stylesheets
import style from './calendar.module.css';

const disableDate = function addDisabledAttributeToElement(element) {
  element.setAttribute('data-testid', 'disabledDate');
  element.className += ' fc-day-disabled';
  element.disabled = true;
};

const Calendar = function PopulateUsingFullCalendar(props) {
  const { dateClick, setError } = props;
  const [loaded, setIsLoaded] = useState(false);
  const dates = useRef({});

  useEffect(() => {
    const getValidRange = function getAvailableDatesFromServer() {
      setIsLoaded(false);
      fetchWrapper('/restaurant/availability', 'GET')
        .then(
          (response) => {
            dates.current.availableDates = response.availableDates;
            dates.current.startDate = response.start;
            dates.current.endDate = response.end;
            setIsLoaded(true);
          },
          (error) => {
            setError(error.message);
          },
        );
    };
    getValidRange();
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
        dateClick={dateClick}
        validRange={{ start: dates.current.startDate, end: dates.current.endDate }}
        dayCellDidMount={({ date, el }) => {
          const dateString = date.toLocaleString('en-ca').slice(0, 10);
          const { availableDates } = dates.current;

          if (!availableDates.includes(dateString)) {
            disableDate(el);
          }
        }}
      />
    </div>
  );
};

Calendar.propTypes = {
  dateClick: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default Calendar;
