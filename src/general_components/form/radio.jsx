import React from 'react';
import PropTypes from 'prop-types';

const RadioOptions = ({
  listOfOptions, name, onChange, value,
}) => (
  <div>
    {listOfOptions.map((option) => (
      <div key={option}>
        <input type="radio" id={option} name={name} value={option} onClick={() => onChange(option)} checked={option.toLowerCase() === value.toLowerCase()} />
        <label htmlFor={option}>{option}</label>
      </div>
    ))}
  </div>
);

RadioOptions.propTypes = {
  listOfOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RadioOptions;
