// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
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
const Selector = function SelectorScrollWheel({
  start, end, unit, textForButtons, dispatchDate,
}) {
  const displayButtons = function buildDisplayButtons() {
    const buttons = [];
    for (let i = start; i <= end; i++) {
      const buttonText = textForButtons(i);
      buttons.push(
        <button
          key={buttonText}
          type="button"
          onClick={() => {
            dispatchDate({ type: 'set', unit: 'months', number: i });
          }}
        >
          {buttonText}
        </button>,
      );
    }
    return buttons;
  };
  return (
    <div>
      <button type="button" onClick={() => dispatchDate({ type: 'prev', unit })}>UP</button>

      {displayButtons()}

      <button type="button" onClick={() => dispatchDate({ type: 'next', unit })}>Down</button>
    </div>

  );
};

Selector.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  textForButtons: PropTypes.func.isRequired,
  dispatchDate: PropTypes.func.isRequired,
};

const SelectorController = function MonthAndYearSelector({ dateObject, ...props }) {
  return (
    <>
      <Selector
        className={style.monthContainer}
        start={handleMonthOverflow(dateObject.month() - 2)}
        end={handleMonthOverflow(dateObject.month() + 2)}
        textForButtons={(month) => getMonth(handleMonthOverflow(month)).short}
        unit="months"
        {...props}
      />
      <Selector
        className={style.yearContainer}
        start={dateObject.year() - 2}
        end={dateObject.year() + 2}
        textForButtons={(year) => year}
        unit="years"
        {...props}
      />
    </>
  );
};

SelectorController.propTypes = {
  dateObject: PropTypes.shape({
    month: PropTypes.func.isRequired,
    year: PropTypes.func.isRequired,
  }).isRequired,
};

export default SelectorController;
