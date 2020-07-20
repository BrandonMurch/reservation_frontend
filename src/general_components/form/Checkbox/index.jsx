// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from '../form.module.css';

const Checkbox = function CheckboxAndLabel(props) {
  const [
    value,
    setValue,
  ] = useState(false);
  const {
    name,
    label,
    onClick,
  } = props;

  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor={name}>
        {`${label}:`}
      </label>

      <input
        onClick={() => {
          onClick(name, !value);
          setValue(!value);
        }}
        value={value}
        data-testid="checkbox"
        type="checkbox"
        name={name}
        required
      />
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Checkbox;
