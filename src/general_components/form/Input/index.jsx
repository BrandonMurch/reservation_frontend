import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from '../form.module.css';

const Input = function CreateInputAndLabel(props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const {
    autoFocus,
    type,
    name,
    label,
    validator,
  } = props;

  const onBlur = function validateOnBlur({ target }) {
    const errorMessage = validator(target.value);
    let errorFound = false;
    if (errorMessage) {
      setError(errorMessage);
      errorFound = true;
    } else {
      setError('');
    }
    props.onBlur(target.value, target.name, errorFound);
  };

  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor={name}>
        {`${label}:`}
      </label>
      <input
        className={style.input}
        value={value}
        onChange={({ target }) => {
          setValue(target.value);
        }}
        onBlur={onBlur}
        type={type}
        name={name}
        required
        // TODO: autofocus??
        autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
      />
      {error !== '' && <p className={style.errorText}>{error}</p>}
    </div>
  );
};

Input.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  validator: PropTypes.func,
  label: PropTypes.string.isRequired,
};

Input.defaultProps = {
  validator: () => '',
};

export default Input;
