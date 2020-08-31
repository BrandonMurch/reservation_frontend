// depedencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './header.module.css';

const Header = function CalendarMonthAndButtons({
  date, prev, next, isThisToday, goToToday,
}) {
  return (
    <div className={style.container}>
      <div>
        <h1 className={style.monthText}>{date}</h1>
      </div>
      <div className={style.buttonContainer}>
        {isThisToday || (
        <button className={style.button} type="button" onClick={goToToday}>
          Today
        </button>
        )}
        <button className={style.button} type="button" onClick={prev}>
          {'<'}
        </button>
        <button className={style.button} type="button" onClick={next}>
          {'>'}
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
};

export default Header;
