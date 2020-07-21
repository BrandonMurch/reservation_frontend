import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from '../form.module.css';

const Input = function CreateInputAndLabel(props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const {
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
        id={name}
        onBlur={onBlur}
        type={type}
        name={name}
        required
      />
      {error !== '' && <p className={style.errorText}>{error}</p>}
    </div>
  );
};

Input.propTypes = {
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
