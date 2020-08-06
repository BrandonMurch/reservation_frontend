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

const getInputs = function getListOfInputChildren(inputs, onBlur, displayErrors) {
  return inputs.map((input) => {
    const Component = inputFields[input.type] || inputFields.default;
    return (
      <Component key={input.name} updateValue={onBlur} {...input} doDisplayErrors={displayErrors} />
    );
  });
};

const Form = function CreateFormWithInputs(props) {
  const { inputs, onSubmit, submitLabel } = props;

  const fields = {};
  const onBlur = function updateFieldsOnBlur(value, name) {
    fields[name] = value;
  };
  const [displayErrors, setDisplayErrors] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState(submitLabel);

  return (
    <form
      noValidate
      data-testid="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!event.target.checkValidity()) {
          setDisplayErrors(true);
        } else {
          event.target.lastChild.disabled = true;
          setSubmitButtonText('Submitting...');
          onSubmit(fields);
        }
      }}
      className={style.container}
    >
      {getInputs(inputs, onBlur, displayErrors)}
      <input key="submit" className={style.submit} type="submit" value={submitButtonText} />
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
  submitLabel: PropTypes.string.isRequired,
};

export default Form;
