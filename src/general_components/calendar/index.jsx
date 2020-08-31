// Modified from https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/

// Dependencies
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import Header from './header';
import CalendarRows from './calendar_rows';

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

const Calendar = function Calendar({ onDateRender }) {
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
        date={monthYear}
        prev={() => dispatchDate('prev')}
        next={() => dispatchDate('next')}
        isThisToday={dateObject.startOf('month').isSame(moment().startOf('month'))}
        goToToday={() => dispatchDate('current')}
      />
      <table className={style.table} role="grid">
        <thead>
          <ColumnHeaders />
        </thead>
        <CalendarRows dateObject={dateObject} onDateRender={onDateRender} />
      </table>
    </div>
  );
};

Calendar.propTypes = {
  onDateRender: PropTypes.func,
};

Calendar.defaultProps = {
  onDateRender: () => {},
};

export default Calendar;
