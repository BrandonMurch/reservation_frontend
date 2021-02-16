// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import ErrorWrapper from './error_wrapper';

// Stylesheet
import defaultStyle from '../form.module.css';

const TextInputWithError = function TextInputWithErrorWrapper(props) {
  return (
    <ErrorWrapper {...props}>
      <TextInput {...props} />
    </ErrorWrapper>
  );
};

const TextInput = function CreateTextInputAndLabel({
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
  style: propStyle,
  hiddenLabel,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  min,
}) {
  const [value, setValue] = useState(initialValue);
  updateValue(initialValue);
  const style = { ...defaultStyle, ...propStyle };
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
        placeholder={hiddenLabel ? label : ''}
        type={type}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={displayErrors ? style.displayError : style.input}
        value={value}
        id={name}
        name={name}
        min={min}
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

TextInput.propTypes = {
  key: PropTypes.string,
  type: PropTypes.string,
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
  min: PropTypes.string,
  style: PropTypes.shape({
    hiddenLabelText: PropTypes.string,
    labelText: PropTypes.string,
    inputGroup: PropTypes.string,
    input: PropTypes.string,
    displayError: PropTypes.string,
    errorText: PropTypes.string,
  }).isRequired,
};

TextInput.defaultProps = {
  key: '',
  value: '',
  type: 'text',
  setErrorMessage: () => {},
  required: false,
  pattern: null,
  displayErrors: false,
  hiddenLabel: false,
  min: undefined,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  updateValue: () => {},
  onKeyDown: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

export default TextInputWithError;
