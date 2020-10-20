// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getMonth } from 'shared/dateHelper';

// StyleSheets
import style from './month_selector.module.css';

const handleMonthOverflow = function handleMonthOverflowOver12Under0(monthNumber) {
  if (monthNumber > 11) {
    return monthNumber - 12;
  }
  if (monthNumber < 0) {
    return monthNumber + 12;
  }

  return monthNumber;
};

// TODO: minimize this into one common function for months/years
const MonthSelector = function MonthSelectorScrollWheel({
  start, end, unit, textForButton, dateObject, dispatchDate,
}) {
  const displayButtons = function buildDisplayButtons() {
    const buttons = [];
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          type="button"
          onClick={() => {
            dispatchDate({ type: 'set', unit: 'months', number: i });
          }}
        >
          {textForButton(i)}
        </button>,
      );
    }
    return buttons;
  };
  return (
    <div>
      <button type="button" onClick={dispatchDate({ type: 'prev', unit })}>UP</button>

      {displayButtons()}

      <button type="button" onClick={dispatchDate({ type: 'next', unit })}>Down</button>
    </div>

  );
};

const YearSelector = function YearSelectorScrollWheel({ dateObject, dispatchDate }) {
  /*
    handle monthOverflow before method

    formatting button text...?
    create function outside of method that returns the proper date Format

    */
  const startYear = dateObject.months() - 2;
  const endYear = dateObject.months() + 2;
  const displayYears = function getDisplayYears() {
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(
        <button
          type="button"
          onClick={() => {
            dispatchDate({ type: 'set', unit: 'years', number: i });
          }}
        >
          {moment().year(i).format('YYYY')}
        </button>,
      );
    }
    return years;
  };
  return (
    <div className={style.yearContainer}>
      {/* if month is < 0, then take month number and +12 */}
      {/* shift month up one (-1) */}
      <button type="button" onClick={dispatchDate({ type: 'prev', unit: 'years' })}>UP</button>

      {/* 5 months display here (-2 to +2) */}
      {displayYears()}

      {/* if month is > 12, then take month number and -12 */}
      {/* shift month down (+1) */}
      <button type="button" onClick={dispatchDate({ type: 'next', unit: 'years' })}>Down</button>
    </div>

  );
};

const Selector = function MonthAndYearSelector(dateObject, { ...props }) {
  return (
    <>
      <MonthSelector
        className={style.monthContainer}
        start={handleMonthOverflow(dateObject.months() - 2)}
        end={handleMonthOverflow(dateObject.months() + 2)}
        textForButtons={(month) => {
          getMonth(month);
        }}
        unit="months"
        {...props}
      />
      <YearSelector
        className={style.yearContainer}
        start={dateObject.years() - 2}
        end={dateObject.years() + 2}
        textForButtons={(year) => year}
        unit="years"
        {...props}
      />
    </>
  );
};

export default Selector;
