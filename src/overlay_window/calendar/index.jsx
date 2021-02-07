// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Redirect } from 'react-router-dom';

// Stylesheets
import useFetch from 'shared/useFetch';
import style from './calendar.module.css';

const disableDate = function addDisabledAttributeToElement(element) {
  element.setAttribute('data-testid', 'disabledDate');
  element.className += ' fc-day-disabled';
  element.disabled = true;
};

const getLastDayString = function getLastDayOfMonthInYYYYMMDD(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const parseDate = function parseDateFromString(date) {
  const dateParts = date.split('-');
  return new Date(dateParts[0], (dateParts[1] - 1), dateParts[2]);
};

const getDateRange = function getDateRangeFromAvailableDatesIfPresent(dates) {
  const start = new Date();
  let end;
  if (dates.length > 0) {
    end = getLastDayString(parseDate(dates[dates.length - 1]));
  } else {
    const date = Date.now();
    end = getLastDayString(date);
  }

  return { start, end };
};

const Calendar = function PopulateUsingFullCalendar({ dateClick }) {
  const [redirect, setRedirect] = useState('');
  const { alternativeRender, response: availableDates } = useFetch('/restaurant/availability');

  if (alternativeRender) {
    return alternativeRender;
  }

  const dateRange = getDateRange(availableDates);

  return (
    <div className={style.container}>
      {redirect && <Redirect to={redirect} />}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        showNonCurrentDates={false}
        fixedWeekCount={false}
        height="100%"
        dateClick={({ dayEl, dateStr }) => {
          if (!dayEl.disabled) {
            dateClick(dateStr);
            setRedirect('/reservation');
          }
        }}
        validRange={dateRange}
        dayCellDidMount={({ date, el }) => {
          const dateString = date.toLocaleString('en-ca').slice(0, 10);

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
};

export default Calendar;
