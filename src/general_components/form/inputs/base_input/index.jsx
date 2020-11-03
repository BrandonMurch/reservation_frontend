// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Input = function CreateInputAndLabel({
  key,
  value: initialValue,
  type,
  name,
  label,
  required,
  pattern,
  updateValue,
  patternMessage,
  displayErrors,
  onChange,
  onFocus,
  onBlur,
  style,
  hiddenLabel,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
}) {
  const [value, setValue] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState('');

  updateValue(initialValue);
  if (errorMessage === 'Please match the requested format.') {
    setErrorMessage(patternMessage);
  }

  const reset = () => {
    setValue(initialValue);
  };

  return (
    <div key={key} className={style.inputGroup}>
      <label
        className={hiddenLabel ? style.hiddenLabelText : style.labelText}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        onFocus={onFocus}
        pattern={pattern}
        required={required}
        placeholder={label}
        type={type}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={displayErrors ? style.displayError : style.input}
        value={value}
        id={name}
        name={name}
        onKeyDown={((event) => {
          // Fixes where enter is clicked on last input, and the field isn't updated.
          if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
          }
          onKeyDown(event);
        })}
        onBlur={({ target }) => {
          setErrorMessage(target.validationMessage);
          updateValue(target.value, target.name);
          onBlur(target, () => reset());
        }}
        onChange={({ target }) => {
          setErrorMessage(target.validationMessage);
          setValue(target.value);
          onChange(target);
        }}
      />
      {displayErrors && errorMessage !== '' && <p className={style.errorText}>{errorMessage}</p>}
    </div>
  );
};

Input.propTypes = {
  key: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  updateValue: PropTypes.func,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  label: PropTypes.string.isRequired,
  displayErrors: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  patternMessage: PropTypes.string,
  hiddenLabel: PropTypes.bool,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  style: PropTypes.shape({
    hiddenLabelText: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    inputGroup: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    displayError: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
  }).isRequired,
};

Input.defaultProps = {
  key: '',
  value: '',
  patternMessage: null,
  required: false,
  pattern: null,
  displayErrors: false,
  hiddenLabel: false,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  updateValue: () => {},
  onKeyDown: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

export default Input;
