/* eslint-disable import/order */

// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import CalendarBody from '../../calendar_body';
import MonthYearSelector from './month_selector';

// Stylesheets
import style from './date_picker.module.css';

const DatePicker = function SmallWindowToSelectDate({ dateObject, dispatchDate, dateClick }) {
  const [displayMonthSelector, setDisplayMonthSelector] = useState(false);
  console.log(dateObject);
  return (
    <>
      <button type="button" onClick={() => setDisplayMonthSelector(true)}>
        {dateObject.format('MMMM YYYY')}
      </button>
      <div className={style.container}>
        {displayMonthSelector
          ? (
            <MonthYearSelector
              dateObject={dateObject}
              dispatchDate={dispatchDate}
              className={style.datePicker}
            />
          )
          : (
            <CalendarBody
              dateObject={dateObject}
              onClick={dateClick}
              className={style.datePicker}
            />
          )}
      </div>

    </>
  );
};

export default DatePicker;
