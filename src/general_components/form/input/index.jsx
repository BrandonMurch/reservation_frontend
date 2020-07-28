// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from '../form.module.css';

const Input = function CreateInputAndLabel(props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const {
    type, name, label, validator, updateValue,
  } = props;

  const onBlur = function validateOnBlur({ target }) {
    const errorMessage = validator(target);
    let errorFound = false;
    if (errorMessage) {
      setError(errorMessage);
      errorFound = true;
    } else {
      setError('');
    }
    updateValue(target.value, target.name, errorFound);
  };
  return (
    <div className={style.inputGroup}>
      <label className={style.hiddenLabelText} htmlFor={name}>
        {`${label}:`}
      </label>
      <input
        placeholder={label}
        className={error ? style.inputError : style.input}
        value={value}
        onChange={({ target }) => {
          setValue(target.value);
        }}
        id={name}
        onBlur={onBlur}
        type={type}
        name={name}
      />
      {error !== '' && <p className={style.errorText}>{error}</p>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  validator: PropTypes.func,
  label: PropTypes.string.isRequired,
};

Input.defaultProps = {
  validator: () => '',
};

export default Input;
