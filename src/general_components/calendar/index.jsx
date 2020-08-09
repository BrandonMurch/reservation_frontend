// Dependencies
import React, { useState, useReducer } from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import Header from './header';

// Stylesheets
import style from './calendar.module.css';

const ColumnHeaders = function GetTitlesForDaysOfWeek() {
  return moment.weekdaysShort().map((day) => (
    <th key={day} className="dayTitles">
      {day}
    </th>
  ));
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
        prev={() => { dispatchDate('prev'); }}
        next={() => { dispatchDate('next'); }}
      />
      <table>
        <tbody>
          <tr>
            <ColumnHeaders />
          </tr>
        </tbody>

      </table>
    </div>
  );
};

export default Cal;
