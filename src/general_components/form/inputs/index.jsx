// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import BaseInput from './base_input';
import ErrorWrapper from './error_wrapper';

export const TextInput = function CreateTextInputAndLabel({ style, ...props }) {
  props.inputStyle = style.input;
  props.inputStyleWithErrors = style.displayError;

  return <BaseInput {...props} style={style} hiddenLabel />;
};

TextInput.propTypes = {
  doDisplayErrors: PropTypes.bool,
  onBlur: PropTypes.func,
  style: PropTypes.shape({
    hiddenLabelText: PropTypes.string,
    input: PropTypes.string,
    displayError: PropTypes.string,
  }).isRequired,
};

TextInput.defaultProps = {
  doDisplayErrors: false,
  onBlur: () => {},
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
        value={value}
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
