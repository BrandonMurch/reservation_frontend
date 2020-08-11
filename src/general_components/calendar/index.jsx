// Modified from https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/

// Dependencies
import React, { useReducer } from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import Header from './header';
import Box from './calendar_box';

// Stylesheets
import style from './calendar.module.css';

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

const getBlanks = function blankSquares(number, numberForStartingKey = 0) {
  const blanks = [];
  for (let i = 0; i < number; i++) {
    blanks.push(
      <Box key={numberForStartingKey + i} style={style.emptyDay} />,
    );
  }
  return blanks;
};

// TODO: Callback to modify these squares from outside.
//
const getDays = function daySquares(dateObject, blanks = 0) {
  const days = [];
  for (let i = 0; i < dateObject.daysInMonth(); i++) {
    days.push(<Box key={blanks + i} date={i + 1} dateObject={dateObject} style={style.day} />);
  }
  return days;
};

const Body = function CalendarBody({ dateObject }) {
  const startOfMonth = moment(dateObject).startOf('month');
  const blanksBefore = startOfMonth.format('d');
  const days = [...getBlanks(blanksBefore), ...getDays(startOfMonth, blanksBefore)];
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

  return rows.map((row, i) => <tr key={i}>{row}</tr>);
};

const Cal = function Calendar() {
  const initialDateObject = {
    dateObject: moment(),
  };
  const monthReducer = ((state, action) => {
    switch (action) {
      case 'prev':
        return { dateObject: state.dateObject.subtract(1, 'months') };
      case 'next':
        return { dateObject: state.dateObject.add(1, 'months') };
      case 'current':
        return { dateObject: moment() };
      default: throw new Error('No such action exists.');
    }
  });
  const [{ dateObject }, dispatchDate] = useReducer(monthReducer, initialDateObject);
  const currentMonth = moment.months()[dateObject.month()];
  const currentYear = dateObject.year();
  const monthYear = `${currentMonth} ${currentYear}`;

  return (
    <div className={style.container}>
      <Header
        month={monthYear}
        prev={() => dispatchDate('prev')}
        next={() => dispatchDate('next')}
        isThisMonth={dateObject.startOf('month').isSame(moment().startOf('month'))}
        goToCurrentMonth={() => dispatchDate('current')}
      />
      <table className={style.table}>
        <thead>
          <ColumnHeaders />
        </thead>
        <tbody>
          <Body dateObject={dateObject} />
        </tbody>
      </table>
    </div>
  );
};

export default Cal;
