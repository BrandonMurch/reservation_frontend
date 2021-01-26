// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import ErrorWrapper from './error_wrapper';

export const TextInput = function TextInputWithErrorWrapper(props) {
  return (
    <ErrorWrapper {...props}>
      <TextInputNoError {...props} />
    </ErrorWrapper>
  );
};

const TextInputNoError = function CreateTextInputAndLabel({
  key,
  value: initialValue,
  type,
  name,
  label,
  required,
  pattern,
  updateValue,
  displayErrors,
  setErrorMessage,
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
  updateValue(initialValue);

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
        onKeyDown={(event) => {
          // Fixes where enter is clicked on last input, and the field isn't updated.
          if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur();
          }
          onKeyDown(event);
        }}
        onBlur={({ target }) => {
          setErrorMessage(target.validationMessage);
          onBlur(target.value, target.name);
        }}
        onChange={({ target }) => {
          setErrorMessage(target.validationMessage);
          setValue(target.value);
          onChange(target);
        }}
      />
    </div>
  );
};

TextInputNoError.propTypes = {
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
  setErrorMessage: PropTypes.func,
  hiddenLabel: PropTypes.bool,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  style: PropTypes.shape({
    hiddenLabelText: PropTypes.string,
    labelText: PropTypes.string,
    inputGroup: PropTypes.string,
    input: PropTypes.string,
    displayError: PropTypes.string,
    errorText: PropTypes.string,
  }).isRequired,
};

TextInputNoError.defaultProps = {
  key: '',
  value: '',
  setErrorMessage: () => {},
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

export const Checkbox = function CheckboxWithErrorWrapper(props) {
  return (
    <ErrorWrapper {...props}>
      <CheckboxNoError {...props} />
    </ErrorWrapper>
  );
};

const CheckboxNoError = function CreateCheckboxAndLabel({
  key,
  value: initialValue,
  name,
  label,
  required,
  updateValue,
  displayErrors,
  setErrorMessage,
  onFocus,
  style,
  hiddenLabel,
  onMouseEnter,
  onMouseLeave,
  min,
}) {
  const [value, setValue] = useState(initialValue);

  const onChange = ({ target }) => {
    setErrorMessage(target.validationMessage);
    setValue((previousValue) => {
      updateValue(!previousValue, target.name);
      return !previousValue;
    });
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
        className={displayErrors ? style.displayError : style.input}
        onFocus={onFocus}
        required={required}
        type="checkbox"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        checked={value}
        id={name}
        name={name}
        min={min}
        onChange={onChange}
      />
    </div>
  );
};

CheckboxNoError.propTypes = {
  key: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  updateValue: PropTypes.func,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  displayErrors: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  setErrorMessage: PropTypes.func,
  hiddenLabel: PropTypes.bool,
  onFocus: PropTypes.func,
  min: PropTypes.number,
  style: PropTypes.shape({
    hiddenLabelText: PropTypes.string,
    labelText: PropTypes.string,
    inputGroup: PropTypes.string,
    input: PropTypes.string,
    displayError: PropTypes.string,
    errorText: PropTypes.string,
  }).isRequired,
};

CheckboxNoError.defaultProps = {
  key: '',
  value: false,
  setErrorMessage: () => {},
  required: false,
  displayErrors: false,
  hiddenLabel: false,
  min: undefined,
  onFocus: () => {},
  updateValue: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};
