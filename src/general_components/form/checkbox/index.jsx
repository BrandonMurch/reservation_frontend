// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../form.module.css';

const Checkbox = function CheckboxAndLabel({
  name,
  label,
  updateValue,
  required,
  doDisplayErrors,
}) {
  const [value, setValue] = useState(false);
  const [displayErrors, setDisplayErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (doDisplayErrors) {
      setDisplayErrors(doDisplayErrors);
    }
  }, [doDisplayErrors]);

  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor={name}>
        {`${label}:`}
      </label>
      <input
        required={required}
        onClick={({ target }) => {
          if (target.validationMessage) {
            setErrorMessage(target.validationMessage);
          } else {
            setErrorMessage('');
          }
          setDisplayErrors(true);
          updateValue(!value, name);
          setValue(!value);
        }}
        id={name}
        value={value}
        type="checkbox"
        name={name}
      />
      {displayErrors && errorMessage !== '' && <p className={style.errorText}>{errorMessage}</p>}
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
  doDisplayErrors: PropTypes.bool,
};

Checkbox.defaultProps = {
  required: false,
  doDisplayErrors: false,
};

export default Checkbox;
