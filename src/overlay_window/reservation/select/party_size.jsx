// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { emptyOption } from './shared';

// Stylesheets
import style from './select.module.css';

const partySizeOptions = function createAListOfPartySizeOptionsForASelectInput() {
  // TODO: get max party size from server;
  const maxPartySize = 8;
  const options = [emptyOption];

  for (let i = 1; i <= maxPartySize; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }
  return options;
};

const PartySizeSelect = function CreateAPartySizeDropDownSelectForForm(props) {
  const {
    onChange,
    value,
    label,
    disabled,
  } = props;

  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor="party-size">
        {label}
      </label>
      <select
        key="party-size"
        className={style.selectBox}
        value={value}
        name="party-size"
        id="party-size"
        disabled={disabled}
        onChange={(event) => {
          onChange(event);
        }}
      >
        {partySizeOptions()}
      </select>
    </div>
  );
};

PartySizeSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  disabled: PropTypes.bool,
};

PartySizeSelect.defaultProps = {
  value: 0,
  disabled: false,
};

export default PartySizeSelect;
