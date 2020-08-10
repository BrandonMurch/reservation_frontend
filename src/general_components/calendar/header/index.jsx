// depedencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from './header.module.css';

const Header = function CalendarMonthAndButtons({ month, prev, next }) {
  return (
    <div className={style.container}>
      <div>
        <h1 className={style.monthText}>{month}</h1>
      </div>
      <div className={style.buttonContainer}>
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
  month: PropTypes.string.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default Header;
