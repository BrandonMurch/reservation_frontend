// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Input = function CreateInputAndLabel({
  key,
  value: initialValue,
  name,
  label,
  updateValue,
  patternMessage,
  displayErrors,
  onChange,
  onBlur,
  style,
  hiddenLabel,
  onKeyDown,
  ...props
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
        // eslint-disable-next-line
        {...props}
        placeholder={label}
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
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  updateValue: PropTypes.func,
  label: PropTypes.string.isRequired,
  displayErrors: PropTypes.bool,
  patternMessage: PropTypes.string,
  hiddenLabel: PropTypes.bool,
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
  displayErrors: false,
  hiddenLabel: false,
  onChange: () => {},
  onBlur: () => {},
  updateValue: () => {},
  onKeyDown: () => {},
};

export default Input;
