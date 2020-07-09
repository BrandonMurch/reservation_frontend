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
    autoFocus,
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
        type="checkbox"
        name={name}
        required
        // TODO: autofocus??
        autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
      />
    </div>
  );
};

Checkbox.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Checkbox;
