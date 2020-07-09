// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Checkbox from './Checkbox';
import Input from './Input';
import ConfirmPassword from './ConfirmPassword';

// CSS
import style from './form.module.css';

const getInputs = function createListOfInputsForForm(inputs, onBlur, onClick) {
  const inputList = [];

  inputs.forEach((input, index) => {
    const autoFocus = (index === 0);
    switch (input.type) {
      case 'checkbox':
        inputList.push(
          <Checkbox
            key={input.name}
            onClick={(name, value) => onClick(name, value)}
            name={input.name}
            label={input.label}
            autoFocus={autoFocus}
          />,
        );
        break;
      case 'confirmPassword':
        inputList.push(
          <ConfirmPassword
            key={input.name}
            onBlur={onBlur}
            validator={input.validator}
          />,
        );
        break;
      default:
        inputList.push(
          <Input
            key={input.name}
            name={input.name}
            type={input.type}
            label={input.label}
            onBlur={onBlur}
            autoFocus={autoFocus}
            validator={input.validator}
          />,
        );
    }
  });

  return inputList;
};

export default function Form(props) {
  const {
    inputs, onSubmit, onBlur, onClick, submitLabel,
  } = props;

  const [errors, setErrors] = useState(new Set());

  const checkError = function checkForErrorsInForm(value, name, error) {
    const inErrorsList = errors.has(name);
    if (error && !inErrorsList) {
      const newSet = new Set(errors);
      newSet.add(name);
      setErrors(newSet);
    } else if (!error && inErrorsList) {
      const newSet = new Set(errors);
      newSet.delete(name);
      setErrors(newSet);
    }
    onBlur(value, name);
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (errors.size === 0) {
          onSubmit(event, onSubmit);
        }
      }}
      className={style.container}
    >
      {getInputs(inputs, checkError, onClick)}
      <input
        key="submit"
        className={style.submit}
        type="submit"
        value={submitLabel}
      />
    </form>
  );
}

Form.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  submitLabel: PropTypes.string.isRequired,
};

Form.defaultProps = {
  onClick() {},
};
