// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import CalendarRows from './calendar_rows';

// Stylesheets
import style from './calendar_body.module.css';

const ColumnHeaders = function GetTitlesForDaysOfWeek() {
  const dayTitles = moment.weekdaysShort().map((day) => (
    <th key={day} className={style.column}>
      {day}
    </th>
  ));

  return (
    <tr>
      {dayTitles}
    </tr>
  );
};

const CalendarBody = function CalendarWithDayCells({ dateObject, onDateRender, onClick }) {
  return (
    <table className={style.table} role="grid">
      <thead>
        <ColumnHeaders />
      </thead>
      <CalendarRows dateObject={dateObject} onDateRender={onDateRender} onClick={onClick} />
    </table>
  );
};

export default CalendarBody;
