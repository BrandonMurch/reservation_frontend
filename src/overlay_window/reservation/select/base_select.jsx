// Dependencies
import React from 'react';
import PropTypes, { node } from 'prop-types';

// Stylesheets
import style from './select.module.css';

const BaseSelect = function BaseForDropDownSelect({
  onChange,
  value,
  label,
  disabled,
  options,
  type,
}) {
  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor={type}>
        {label}
        <select
          key={type}
          className={style.selectBox}
          value={value}
          aria-label={type}
          disabled={disabled}
          onChange={(event) => {
            onChange(event);
          }}
        >
          {options}
        </select>
      </label>

    </div>
  );
};

BaseSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(node),
  type: PropTypes.string.isRequired,
};

BaseSelect.defaultProps = {
  value: '',
  disabled: false,
  options: [],
};

export default BaseSelect;
