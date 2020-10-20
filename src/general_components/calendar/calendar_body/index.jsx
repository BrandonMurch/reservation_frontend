// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import CalendarRows from './calendar_rows';

// Stylesheets
import style from './calendar_body.module.css';

const ColumnHeaders = function GetTitlesForDaysOfWeek({ titleStyle }) {
  const dayTitles = moment.weekdaysShort().map((day) => (
    <th key={day} className={titleStyle || style.column}>
      {day}
    </th>
  ));

  return (
    <tr>
      {dayTitles}
    </tr>
  );
};

ColumnHeaders.propTypes = {
  titleStyle: PropTypes.shape({}),
};

ColumnHeaders.defaultProps = {
  titleStyle: null,
};

const CalendarBody = function CalendarWithDayCells({
  dateObject, onDateRender, onClick, titleStyle,
}) {
  return (
    <table className={style.table} role="grid">
      <thead>
        <ColumnHeaders titleStyle={titleStyle} />
      </thead>
      <CalendarRows dateObject={dateObject} onDateRender={onDateRender} onClick={onClick} />
    </table>
  );
};

CalendarBody.propTypes = {
  dateObject: PropTypes.shape({}).isRequired,
  onDateRender: PropTypes.func,
  onClick: PropTypes.func,
  titleStyle: PropTypes.shape({}),
};

CalendarBody.defaultProps = {
  onDateRender: () => {},
  onClick: () => {},
  titleStyle: {},
};

export default CalendarBody;
