// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from '../form.module.css';

const ConfirmPassword = function CreateConfirmPasswordInputPair({ doDisplayErrors, updateValue }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayErrors, setDisplayErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmError, setConfirmError] = useState('');

  useEffect(() => {
    if (doDisplayErrors) {
      setDisplayErrors(doDisplayErrors);
    }
  }, [doDisplayErrors]);

  const onBlur = function submitValue() {
    if (!displayErrors) {
      setDisplayErrors(true);
    }
    if (errorMessage === '' && confirmError === '') {
      updateValue(confirmPassword, 'password');
    }
  };
  const onConfirmBlur = function displayErrorMessageForConfirm({ target }) {
    setConfirmError(target.validationMessage);
    onBlur();
  };

  const onPassBlur = function displayErrorMessageForPassword({ target }) {
    setErrorMessage(target.validationMessage);
    onBlur();
  };

  return (
    <>
      <div key="password" className={style.inputGroup}>
        <label className={style.hiddenLabelText} htmlFor="password">
          Password
          <input
            required
            placeholder="Password"
            className={style.input}
            value={password}
            onBlur={onPassBlur}
            type="password"
            name="password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </label>
        {displayErrors && errorMessage !== '' && <p className={style.errorText}>{errorMessage}</p>}
      </div>
      <div key="confirm" className={style.inputGroup}>
        <label className={style.hiddenLabelText} htmlFor="confirm">
          Confirm Password:
          <input
            pattern={password}
            required
            placeholder="Confirm Password"
            className={style.input}
            value={confirmPassword}
            onBlur={onConfirmBlur}
            type="password"
            name="confirm"
            onChange={({ target }) => {
              setConfirmPassword(target.value);
            }}
          />
        </label>
        {displayErrors && confirmError !== '' && <p className={style.errorText}>{confirmError}</p>}
      </div>
    </>
  );
};

ConfirmPassword.propTypes = {
  updateValue: PropTypes.func.isRequired,
  doDisplayErrors: PropTypes.bool,
};

ConfirmPassword.defaultProps = {
  doDisplayErrors: false,
};

export default ConfirmPassword;
