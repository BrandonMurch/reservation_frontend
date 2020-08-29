// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { emptyOption } from './shared';
import BaseSelect from './base_select';

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

const TimeSelect = function CreateATimeDropDownSelectForAForm({ availableTimes, ...props }) {
  return (
    <BaseSelect
      {...props}
      options={timeOptions(availableTimes)}
      type="time"
    />
  );
};

TimeSelect.propTypes = {
  availableTimes: PropTypes.arrayOf(String),
};

TimeSelect.defaultProps = {
  availableTimes: [],
};

export default TimeSelect;
