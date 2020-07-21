// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Checkbox from './checkbox';
import Input from './input';
import ConfirmPassword from './confirm-password';

// Stylesheets
import style from './form.module.css';

const getInputs = function inputFactory(inputs, onTextBlur, onCheckboxClick) {
  const inputList = [];

  inputs.forEach((input) => {
    switch (input.type) {
      case 'checkbox':
        inputList.push(
          <Checkbox
            key={input.name}
            onClick={(name, value) => onCheckboxClick(name, value)}
            name={input.name}
            label={input.label}
          />,
        );
        break;
      case 'confirmPassword':
        inputList.push(
          <ConfirmPassword
            key={input.name}
            onBlur={onTextBlur}
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
            onBlur={onTextBlur}
            validator={input.validator}
          />,
        );
    }
  });

  return inputList;
};

export default function Form(props) {
  const {
    inputs, onSubmit, onTextBlur, onCheckboxClick, submitLabel,
  } = props;

  const [errors, setErrors] = useState(new Set());
  // TODO: check for errors on submit too, not just on blur
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
    onTextBlur(value, name);
  };
  return (
    <form
      data-testid="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (errors.size === 0) {
          onSubmit(event, onSubmit);
        }
      }}
      className={style.container}
    >
      {getInputs(inputs, checkError, onCheckboxClick)}
      <input
        key="submit"
        className={style.submit}
        type="submit"
        value={submitLabel}
        disabled={errors.size !== 0}
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
  onTextBlur: PropTypes.func.isRequired,
  onCheckboxClick: PropTypes.func,
  submitLabel: PropTypes.string.isRequired,
};

Form.defaultProps = {
  onCheckboxClick() {},
};
