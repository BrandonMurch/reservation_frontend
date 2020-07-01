import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from '../form.module.css';

const Input = function CreateInputAndLabel(props) {
  const [
    value,
    setValue,
  ] = useState('');
  const {
    autoFocus,
    type,
    name,
    onBlur,
    label,
  } = props;

  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor={name}>
        {`${label}:`}
      </label>
      <input
        className={style.input}
        value={value}
        onChange={({ target }) => {
          setValue(target.value);
        }}
        onBlur={onBlur}
        type={type}
        name={name}
        required
        // TODO: autofocus??
        autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
      />
    </div>
  );
};

Input.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
