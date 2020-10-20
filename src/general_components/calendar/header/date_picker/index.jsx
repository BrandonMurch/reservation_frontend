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
    <div className={style.container}>
      <button type="button" onClick={() => setDisplayMonthSelector(!displayMonthSelector)}>
        {dateObject.format('MMMM YYYY')}
      </button>

      {displayMonthSelector
        ? (
          <MonthYearSelector
            className={style.datePicker}
            dateObject={dateObject}
            dispatchDate={dispatchDate}
          />
        )
        : (
          <div className={style.calendarContainer}>
            <CalendarBody
              titleStyle={style.dayTitles}
              className={style.datePicker}
              dateObject={dateObject}
              onClick={(date) => {
                dispatchDate({ type: 'goTo', date });
              }}
            />

          </div>
        )}
    </div>

  );
};

DatePicker.propTypes = {
  dateObject: PropTypes.shape({
    format: PropTypes.func.isRequired,
  }).isRequired,
  dispatchDate: PropTypes.func.isRequired,
};

export default DatePicker;
