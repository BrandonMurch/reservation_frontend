// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from '../../form.module.css';

const Input = function CreateInputAndLabel(props) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    type,
    name,
    label,
    required,
    pattern,
    updateValue,
    patternMessage,
    displayErrors,
    labelStyle,
    inputStyle,
    inputStyleWithErrors,
    onChangeBasedOnInputType,
    onBlurBasedOnInputType,
  } = props;

  if (errorMessage === 'Please match the requested format.') {
    setErrorMessage(patternMessage);
  }
  return (
    <div className={style.inputGroup}>
      <label className={labelStyle} htmlFor={name}>
        {`${label}:`}
      </label>
      <input
        required={required}
        pattern={pattern}
        placeholder={label}
        className={displayErrors ? inputStyleWithErrors : inputStyle}
        value={value}
        id={name}
        type={type}
        name={name}
        onBlur={({ target }) => {
          setErrorMessage(target.validationMessage);
          updateValue(target.value, target.name);
          onBlurBasedOnInputType(target);
        }}
        onChange={({ target }) => {
          setErrorMessage(target.validationMessage);
          setValue(target.value);
          onChangeBasedOnInputType(target);
        }}
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
  displayErrors: PropTypes.bool,
  patternMessage: PropTypes.string,
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  inputStyleWithErrors: PropTypes.string,
  onChangeBasedOnInputType: PropTypes.func,
  onBlurBasedOnInputType: PropTypes.func,
};

Input.defaultProps = {
  required: false,
  pattern: null,
  patternMessage: null,
  displayErrors: false,
  labelStyle: '',
  inputStyle: '',
  inputStyleWithErrors: '',
  onChangeBasedOnInputType: () => {},
  onBlurBasedOnInputType: () => {},
};

export default Input;
