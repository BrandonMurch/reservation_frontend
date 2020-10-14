// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/helpers';

// Components
import ConfirmPassword from './confirm-password';
import { TextInput, Checkbox } from './inputs';

// Stylesheets
import styleSheet from './form.module.css';

const inputFields = enumeration.keyValue(
  { key: 'checkbox', value: Checkbox },
  { key: 'confirmPassword', value: ConfirmPassword },
  { key: 'default', value: TextInput },
);

const touchInputs = function focusAndBlurAllInputChildren(children) {
  for (let i = 0; i < children.length; i++) {
    if (children[i].children[1] !== undefined) {
      if (children[i].children[1].type === 'checkbox') {
        children[i].children[1].click();
        children[i].children[1].click();
      } else {
        children[i].children[1].focus();
        children[i].children[1].blur();
      }
    }
  }
};

const getInputs = function getListOfInputChildren(
  inputs, onBlur, displayErrors, counterToResetChildren, fields, style,
) {
  return inputs.map((input) => {
    const Component = inputFields[input.type] || inputFields.default;
    fields[input.name] = input.value;
    return (
      <Component
        key={input.name + counterToResetChildren}
        updateValue={onBlur}
        {...input}
        doDisplayErrors={displayErrors}
        style={style}
      />
    );
  });
};

const Form = function CreateFormWithInputs(props) {
  const {
    inputs, onSubmit, submitLabel, resetChildrenOnSubmit, styleProp,
  } = props;

  const style = styleProp === null ? styleSheet : styleProp;

  const fields = {};
  const onBlur = function updateFieldsOnBlur(value, name) {
    fields[name] = value;
  };
  const [displayErrors, setDisplayErrors] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState(submitLabel);
  const [counterToResetChildren, setCounterToResetChildren] = useState(0);
  const resetChildren = function addOneToKeyToResetChildren() {
    if (resetChildrenOnSubmit) {
      setCounterToResetChildren(counterToResetChildren + 1);
    }
  };

  return (
    <form
      noValidate
      data-testid="form"
      onSubmit={async (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
          setSubmitButtonText('Submitting...');
          await onSubmit(fields);
          resetChildren();
          // FIXME: this doesn't work if the component gets unmounted.
          // setSubmitButtonText(submitLabel);
        } else {
          touchInputs(event.target.children);
          setDisplayErrors(true);
        }
      }}
      className={style.container}
    >
      {getInputs(inputs, onBlur, displayErrors, counterToResetChildren, fields, style)}
      <input key="submit" className={style.button} type="submit" value={submitButtonText} disabled={submitButtonText !== submitLabel} />
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
  resetChildrenOnSubmit: PropTypes.bool,
  styleProp: PropTypes.shape({}).isRequired,
};

Form.defaultProps = {
  resetChildrenOnSubmit: false,
};

export default Form;
