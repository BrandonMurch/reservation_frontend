// Modified from https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/

// Dependencies
import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import Header from './header';
import CalendarBody from './calendar_body';

// Stylesheets
import style from './calendar.module.css';

const Calendar = function Calendar({ onDateRender, onClick }) {
  const initialDateObject = {
    dateObject: moment(),
  };
  const monthReducer = ((state, action) => {
    switch (action.type) {
      case 'prev':
        return { dateObject: state.dateObject.subtract(1, action.unit) };
      case 'next':
        return { dateObject: state.dateObject.add(1, action.unit) };
      case 'current':
        return { dateObject: moment() };
      case 'goTo':
        return { dateObject: moment(action.date) };
      case 'set':
        return { dateObject: state.set(action.unit, action.number) };
      default: throw new Error('No such action exists.');
    }
  });
  const [{ dateObject }, dispatchDate] = useReducer(monthReducer, initialDateObject);
  const currentMonth = moment.months()[dateObject.month()];
  const currentYear = dateObject.year();
  const monthYear = `${currentMonth} ${currentYear}`;
  console.log(dateObject);
  return (
    <div className={style.container}>
      <Header
        date={monthYear}
        prev={() => dispatchDate({ type: 'prev', unit: 'months' })}
        next={() => dispatchDate({ type: 'next', unit: 'months' })}
        isThisToday={dateObject.startOf('month').isSame(moment().startOf('month'))}
        goToToday={() => dispatchDate({ type: 'current' })}
        goToDate={(date) => dispatchDate({ type: 'current', date })}
        dateObject={dateObject}
        dispatchDate={dispatchDate}
      />
      <CalendarBody dateObject={dateObject} onDateRender={onDateRender} onClick={onClick} />
    </div>
  );
};

Calendar.propTypes = {
  onDateRender: PropTypes.func,
  onClick: PropTypes.func,
};

Calendar.defaultProps = {
  onDateRender: () => {},
  onClick: () => {},
};

export default Calendar;
