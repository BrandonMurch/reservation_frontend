// Dependencies
import React from 'react';
import PropTypes, { node } from 'prop-types';

// Components
import Loading from 'general_components/loading';

// Stylesheets
import style from './select.module.css';

const BaseSelect = function BaseForDropDownSelect({
  onChange,
  value,
  label,
  disabled,
  options,
  type,
  loading,
}) {
  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor={type}>
        {label}
        {loading ? <div className={style.loadingContainer}><Loading size="small" /></div>
          : (
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
          )}
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
  loading: PropTypes.bool,
};

BaseSelect.defaultProps = {
  value: '',
  disabled: false,
  options: [],
  loading: false,
};

export default BaseSelect;
