// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './header.module.css';
import DatePicker from './date_picker';

const Header = function CalendarMonthAndButtons({
  date, prev, next, isThisToday, goToToday, dateObject, dispatchDate, monthlyView,
}) {
  const [displayDatePicker, setDisplayDatePicker] = useState(false);
  const datePickerProps = { dateObject, dispatchDate, setDisplayDatePicker };
  return (
    <div className={style.container}>
      <div className={style.monthTextContainer}>
        <button
          className={style.monthText}
          type="button"
          aria-label="date-picker"
          onClick={() => setDisplayDatePicker(!displayDatePicker)}
        >
          {date}
        </button>

        {displayDatePicker && <DatePicker {...datePickerProps} onlyMonth={monthlyView} />}
      </div>
      <div className={style.buttonContainer}>
        {isThisToday || (
        <button className={style.button} type="button" onClick={goToToday}>
          Today
        </button>
        )}
        <button className={style.prevButton} type="button" onClick={prev} aria-label="previous-date">
          ➤
        </button>
        <button className={style.button} type="button" onClick={next} aria-label="next-date">
          ➤
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  date: PropTypes.string.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isThisToday: PropTypes.bool.isRequired,
  goToToday: PropTypes.func.isRequired,
  dateObject: PropTypes.shape({}).isRequired,
  dispatchDate: PropTypes.func.isRequired,
  monthlyView: PropTypes.bool,
};

Header.defaultProps = {
  monthlyView: false,
};

export default Header;
