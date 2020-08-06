// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from '../form.module.css';

const Input = function CreateInputAndLabel(props) {
  const [value, setValue] = useState('');
  const [displayErrors, setDisplayErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    type,
    name,
    label,
    required,
    pattern,
    updateValue,
    patternMessage,
    doDisplayErrors,
  } = props;

  useEffect(() => {
    if (doDisplayErrors) {
      setDisplayErrors(doDisplayErrors);
    }
  }, [doDisplayErrors]);

  const onBlur = function validateOnBlur({ target }) {
    if (!displayErrors) {
      setDisplayErrors(true);
    }
    setErrorMessage(target.validationMessage);
    updateValue(target.value, target.name);
  };

  if (errorMessage === 'Please match the requested format.') {
    setErrorMessage(patternMessage);
  }
  return (
    <div className={style.inputGroup}>
      <label className={style.hiddenLabelText} htmlFor={name}>
        {`${label}:`}
      </label>
      <input
        required={required}
        pattern={pattern}
        placeholder={label}
        className={displayErrors ? style.displayError : style.input}
        value={value}
        onChange={({ target }) => {
          setErrorMessage(target.validationMessage);
          setValue(target.value);
        }}
        id={name}
        onBlur={onBlur}
        type={type}
        name={name}
      />
      {displayErrors && errorMessage !== '' && <p className={style.errorText}>{errorMessage}</p>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  label: PropTypes.string.isRequired,
  doDisplayErrors: PropTypes.bool,
  patternMessage: PropTypes.string,
};

Input.defaultProps = {
  required: false,
  pattern: null,
  patternMessage: null,
  doDisplayErrors: false,
};

export default Input;
