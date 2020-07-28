// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from '../form.module.css';

const Checkbox = function CheckboxAndLabel(props) {
  const [value, setValue] = useState(false);
  const { name, label, updateValue } = props;

  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor={name}>
        {`${label}:`}
      </label>
      <input
        onClick={() => {
          updateValue(name, !value);
          setValue(!value);
        }}
        id={name}
        value={value}
        type="checkbox"
        name={name}
      />
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
};

export default Checkbox;
