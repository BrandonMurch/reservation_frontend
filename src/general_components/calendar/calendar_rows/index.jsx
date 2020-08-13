// Dependencies
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Components
import Box from './calendar_box';

// Stylesheets
import style from './calendar_rows.module.css';

const getBlanks = function getBlanksToAlignCalendarCorrectly(number, numberForStartingKey = 0) {
  const blanks = [];
  for (let i = 0; i < number; i++) {
    blanks.push(
      <Box key={numberForStartingKey + i} />,
    );
  }
  return blanks;
};

const getDays = function getCalendarBoxesForEachDay(dateObject, onDateRender) {
  const currentMonth = dateObject.month();
  const days = [];
  while (dateObject.month() === currentMonth) {
    const date = dateObject.format('YYYY-MM-DD');
    let message;
    const boxProps = {
      date,
      setMessage: (string) => {
        message = string;
      },
      innerHTML: '',
    };
    onDateRender(boxProps);
    days.push(
      <Box key={dateObject} date={date} message={message} />,
    );
    dateObject.add(1, 'days');
  }
  return days;
};

const CalendarRows = function PopulateCalendarRowsWithCalendarBoxes({ dateObject, onDateRender }) {
  const startOfMonth = moment(dateObject).startOf('month');
  const numberOfBlanksNeeded = startOfMonth.format('d');
  const days = [...getBlanks(numberOfBlanksNeeded), ...getDays(startOfMonth, onDateRender)];
  const rows = [];
  let cells = [];

  days.forEach((day, i) => {
    if (i % 7 === 0) {
      rows.push(cells);
      cells = [];
    }
    cells.push(day);

    if (i === days.length - 1) {
      getBlanks((7 % i) - cells.length, days.length).forEach((blank) => {
        cells.push(blank);
      });
      rows.push(cells);
    }
  });
  return (
    <tbody className={style.calendarBody}>
      {
      // There is no suitable key for these rows.
      // eslint-disable-next-line react/no-array-index-key
      rows.map((row, i) => <tr key={i}>{row}</tr>)
      }
    </tbody>
  );
};

CalendarRows.propTypes = {
  dateObject: PropTypes.shape({}).isRequired,
  onDateRender: PropTypes.func.isRequired,
};

export default CalendarRows;
