/* eslint-disable import/order */

// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import CalendarBody from '../../calendar_body';
import MonthYearSelector from './month_selector';

// Stylesheets
import style from './date_picker.module.css';

const DatePicker = function SmallWindowToSelectDate({ dateObject, dispatchDate }) {
  const [displayMonthSelector, setDisplayMonthSelector] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setDisplayMonthSelector(!displayMonthSelector)}>
        {dateObject.format('MMMM YYYY')}
      </button>
      <div className={style.container}>
        {displayMonthSelector
          ? (
            <MonthYearSelector
              className={style.datePicker}
              dateObject={dateObject}
              dispatchDate={dispatchDate}
            />
          )
          : (
            <CalendarBody
              className={style.datePicker}
              dateObject={dateObject}
              onClick={(date) => {
                dispatchDate({ type: 'goTo', date });
              }}
            />
          )}
      </div>

    </>
  );
};

DatePicker.propTypes = {
  dateObject: PropTypes.shape({
    format: PropTypes.func.isRequired,
  }).isRequired,
  dispatchDate: PropTypes.func.isRequired,
};

export default DatePicker;
