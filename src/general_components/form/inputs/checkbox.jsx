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
  setErrorMessage,
  onFocus,
  style,
  onMouseEnter,
  onMouseLeave,
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
        className={style.checkboxLabel}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={style.checkbox}
        onFocus={onFocus}
        required={required}
        type="checkbox"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        checked={value}
        id={name}
        name={name}
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
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  setErrorMessage: PropTypes.func,
  onFocus: PropTypes.func,
  style: PropTypes.shape({
    hiddenLabelText: PropTypes.string,
    checkboxLabel: PropTypes.string,
    inputGroup: PropTypes.string,
    checkbox: PropTypes.string,
    displayError: PropTypes.string,
    errorText: PropTypes.string,
  }).isRequired,
};

Checkbox.defaultProps = {
  key: '',
  value: false,
  setErrorMessage: () => {},
  required: false,
  onFocus: () => {},
  updateValue: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

export default CheckboxWithError;
