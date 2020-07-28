// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from '../form.module.css';

const ConfirmPassword = function CreateConfirmPasswordInputPair(props) {
  const { validator } = props;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onBlur = function verifyPasswordsOnBlur() {
    const errorMessage = validator(password);
    let errorFound = false;
    if (errorMessage !== '') {
      setError(errorMessage);
      errorFound = true;
    } else if (password !== confirmPassword) {
      setError('Passwords must be identical');
      errorFound = true;
    } else {
      setError('');
    }
    props.updateValue(password, 'password', errorFound);
  };

  return (
    <>
      <div key="password" className={style.inputGroup}>
        <label className={style.hiddenLabelText} htmlFor="password">
          Password
          <input
            placeholder="Password"
            className={style.input}
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            data-testid="password"
            onBlur={onBlur}
            type="password"
            name="password"
            id="password"
          />
        </label>
        {error !== '' && <p className={style.errorText}>{error}</p>}
      </div>
      <div key="confirm" className={style.inputGroup}>
        <label className={style.hiddenLabelText} htmlFor="confirm">
          Confirm Password:
          <input
            placeholder="Confirm Password"
            className={style.input}
            value={confirmPassword}
            onChange={({ target }) => {
              setConfirmPassword(target.value);
            }}
            data-testid="confirm-password"
            onBlur={onBlur}
            type="password"
            name="confirm"
          />
        </label>
      </div>
    </>
  );
};

ConfirmPassword.propTypes = {
  updateValue: PropTypes.func.isRequired,
  validator: PropTypes.func,
};

ConfirmPassword.defaultProps = {
  validator: () => '',
};

export default ConfirmPassword;
