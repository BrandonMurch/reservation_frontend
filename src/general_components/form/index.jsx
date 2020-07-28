// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/helpers';

// Components
import Checkbox from './checkbox';
import Input from './input';
import ConfirmPassword from './confirm-password';

// Stylesheets
import style from './form.module.css';

const inputFields = enumeration.keyValue(
  { key: 'checkbox', value: Checkbox },
  { key: 'confirmPassword', value: ConfirmPassword },
  { key: 'default', value: Input },
);

const getInputs = function getListOfInputChildren(inputs, onTextBlur, onCheckboxClick) {
  return inputs.map((input) => {
    input.updateValue = input.type === 'checkbox' ? onCheckboxClick : onTextBlur;
    const Component = inputFields[input.type] || inputFields.default;
    return <Component key={input.name} {...input} />;
  });
};

const Form = function CreateFormWithInputs(props) {
  const {
    inputs, onSubmit, onTextBlur, onCheckboxClick, submitLabel,
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
    onTextBlur(value, name);
  };
  return (
    <form
      noValidate
      data-testid="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (errors.size === 0) {
          onSubmit(event);
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
};

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

export default Form;
