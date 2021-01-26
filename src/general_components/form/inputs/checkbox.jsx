// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import ErrorWrapper from './error_wrapper';

const CheckboxWithError = function CheckboxWithErrorWrapper(props) {
  return (
    <ErrorWrapper {...props}>
      <Checkbox {...props} />
    </ErrorWrapper>
  );
};

const Checkbox = function CreateCheckboxAndLabel({
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

Checkbox.propTypes = {
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

Checkbox.defaultProps = {
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

export default CheckboxWithError;
