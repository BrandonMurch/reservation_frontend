// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { emptyOption } from './shared';

// Stylesheets
import style from './select.module.css';

const timeOptions = function getTimeOptionsForASelectInput(availableTimes) {
  const options = [emptyOption];

  availableTimes.forEach((time) => {
    options.push(
      <option key={time} value={time}>
        {time}
      </option>,
    );
  });
  return options;
};

const TimeSelect = function CreateATimeDropDownSelectForAForm(props) {
  const {
    onChange,
    value,
    label,
    disabled,
    availableTimes,
  } = props;

  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor="time">
        {label}
        <select
          key="time"
          className={style.selectBox}
          value={value}
          aria-label="time"
          disabled={disabled}
          onChange={(event) => {
            onChange(event);
          }}
        >
          {timeOptions(availableTimes)}
        </select>
      </label>

    </div>
  );
};

TimeSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  availableTimes: PropTypes.arrayOf(String),
};

TimeSelect.defaultProps = {
  value: '',
  disabled: false,
  availableTimes: [],
};

export default TimeSelect;
