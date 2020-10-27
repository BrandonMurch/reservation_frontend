/* eslint-disable import/order */

// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTimeHandler from 'shared/useTimeHandler';

// Components
import CalendarBody from '../../calendar_body';
import MonthYearSelector from './selector';

// Stylesheets
import style from './date_picker.module.css';

const DatePicker = function SmallWindowToSelectDate(
  { dateObject, dispatchDate, setDisplayDatePicker },
) {
  const [displayMonthSelector, setDisplayMonthSelector] = useState(false);
  const { dateObject: dateBuilder, dispatchDate: dispatchDateBuilder } = useTimeHandler(dateObject);
  return (
    <div className={style.container}>
      <button type="button" onClick={() => setDisplayMonthSelector(!displayMonthSelector)}>
        {dateBuilder.format('MMMM YYYY')}
      </button>

      {displayMonthSelector
        ? (
          <MonthYearSelector
            dateObject={dateBuilder}
            dispatchDate={dispatchDateBuilder}
          />
        )
        : (
          <div className={style.calendarContainer}>
            <CalendarBody
              titleStyle={style.dayTitles}
              dateObject={dateBuilder}
              onClick={async (date) => {
                setDisplayDatePicker(false);
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
  setDisplayDatePicker: PropTypes.func.isRequired,
};

export default DatePicker;
