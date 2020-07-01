// Dependencies
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import PropTypes from 'prop-types';

// CSS
import style from './calendar.module.css';

function getValidRange() {
  // TODO find dates from backend.
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);

  const startDateString = startDate.toISOString().slice(0, 10);
  const endDateString = endDate.toISOString().slice(0, 10);

  return { start: startDateString, end: endDateString };
}

function Calendar(props) {
  const { dateClick } = props;
  return (
    <div className={style.container}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        showNonCurrentDates={false}
        fixedWeekCount={false}
        height="100%"
        validRange={getValidRange()}
        dateClick={dateClick}
      />
    </div>
  );
}

Calendar.propTypes = {
  dateClick: PropTypes.func.isRequired,
};

export default Calendar;
