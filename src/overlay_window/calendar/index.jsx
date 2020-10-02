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

const Calendar = function PopulateUsingFullCalendar({ dateClick }) {
  const [redirect, setRedirect] = useState('');
  const { alternativeRender, response } = useFetch({ path: '/restaurant/availability' });

  if (alternativeRender) {
    return alternativeRender;
  }

  let availableDates;
  let startDate;
  let endDate;
  if (response) {
    availableDates = response.availableDates;
    startDate = response.start;
    endDate = response.end;
  }

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
        validRange={{ start: startDate, end: endDate }}
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
