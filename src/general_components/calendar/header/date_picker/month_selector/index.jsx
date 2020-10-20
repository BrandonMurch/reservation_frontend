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
  start, end, unit, textForButtons, dispatchDate, selectorStyle,
}) {
  // FIXME: after clicking, the dialog is exited. The desired action is to stay in the dialog.
  const displayButtons = function buildDisplayButtons() {
    const buttons = [];
    for (let i = start; i !== end + 1; i++) {
      if (unit === 'months' && i > 11) {
        i -= 12;
      }
      const buttonText = textForButtons(i);
      buttons.push(
        <button
          className={style.wheelButton}
          key={buttonText}
          type="button"
          onClick={() => {
            dispatchDate({ type: 'set', unit, number: i });
          }}
        >
          {buttonText}
        </button>,
      );
    }
    return buttons;
  };
  return (
    <div className={selectorStyle}>
      <button
        className={style.directionButton}
        type="button"
        onClick={() => dispatchDate({ type: 'prev', unit })}
      >
        {'<'}
      </button>

      {displayButtons()}

      <button
        className={style.directionButton}
        type="button"
        onClick={() => dispatchDate({ type: 'next', unit })}
      >
        {'>'}
      </button>
    </div>

  );
};

Selector.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  textForButtons: PropTypes.func.isRequired,
  dispatchDate: PropTypes.func.isRequired,
  selectorStyle: PropTypes.string.isRequired,
};

const SelectorController = function MonthAndYearSelector({ dateObject, ...props }) {
  // FIXME: date isn't checked.
  return (
    <div className={style.container}>
      <Selector
        selectorStyle={style.monthContainer}
        start={handleMonthOverflow(dateObject.month() - 2)}
        end={handleMonthOverflow(dateObject.month() + 2)}
        textForButtons={(month) => getMonth(handleMonthOverflow(month)).short}
        unit="months"
        {...props}
      />
      <Selector
        selectorStyle={style.yearContainer}
        start={dateObject.year() - 2}
        end={dateObject.year() + 2}
        textForButtons={(year) => year}
        unit="years"
        {...props}
      />
    </div>
  );
};

SelectorController.propTypes = {
  dateObject: PropTypes.shape({
    month: PropTypes.func.isRequired,
    year: PropTypes.func.isRequired,
  }).isRequired,
};

export default SelectorController;
