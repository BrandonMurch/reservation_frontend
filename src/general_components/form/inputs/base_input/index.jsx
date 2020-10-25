// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Input = function CreateInputAndLabel(props) {
  const {
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
    labelStyle,
    onChangeBasedOnInputType,
    onBlurBasedOnInputType,
    style,
  } = props;

  const [value, setValue] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState('');

  if (errorMessage === 'Please match the requested format.') {
    setErrorMessage(patternMessage);
  }
  return (
    <div key={key} className={style.inputGroup}>
      <label className={labelStyle} htmlFor={name}>
        {`${label}`}
      </label>
      <input
        required={required}
        pattern={pattern}
        placeholder={label}
        className={displayErrors ? style.displayError : style.input}
        value={value}
        id={name}
        type={type}
        name={name}
        onKeyDown={((event) => {
          // Fixes where enter is clicked on last input, and the field isn't updated.
          if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
            event.target.parentElement.parentElement.requestSubmit();
          }
        })}
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
  key: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  updateValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  label: PropTypes.string.isRequired,
  displayErrors: PropTypes.bool,
  patternMessage: PropTypes.string,
  labelStyle: PropTypes.string,
  onChangeBasedOnInputType: PropTypes.func,
  onBlurBasedOnInputType: PropTypes.func,
  style: PropTypes.shape({
    inputGroup: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    displayError: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
  }).isRequired,
};

Input.defaultProps = {
  key: '',
  value: '',
  required: false,
  pattern: null,
  patternMessage: null,
  displayErrors: false,
  labelStyle: '',
  onChangeBasedOnInputType: () => {},
  onBlurBasedOnInputType: () => {},
};

export default Input;
