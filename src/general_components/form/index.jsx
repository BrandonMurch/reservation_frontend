// Dependencies
import React, { useState, createRef, useRef } from 'react';
import PropTypes from 'prop-types';
import { enumeration } from 'shared/helpers';

// Components
import TextInput from './inputs/text';
import Checkbox from './inputs/checkbox';

// Stylesheets
import defaultStyles from './form.module.css';

const inputFields = enumeration.keyValue(
  { key: 'checkbox', value: Checkbox },
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
  inputs,
  updateFields,
  displayErrors,
  counterToResetChildren,
  fields,
  style,
) {
  return inputs.map((input) => {
    const Component = input.component || inputFields[input.type] || inputFields.default;
    if (!fields.current[input.name]) {
      fields.current[input.name] = input.value;
    }
    return (
      <Component
        key={input.name + counterToResetChildren}
        onBlur={updateFields}
        {...input}
        doDisplayErrors={displayErrors}
        style={style}
      />
    );
  });
};

const Form = function CreateFormWithInputs(props) {
  const {
    inputs,
    onSubmit,
    submitLabel,
    resetChildrenOnSubmit,
    styleProp,
  } = props;

  const elementRef = createRef();
  const style = { ...defaultStyles, ...styleProp };
  const fields = useRef({});
  const updateFields = function updateFieldsOnBlur(value, name) {
    fields.current[name] = value;
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
      ref={elementRef}
      noValidate
      data-testid="form"
      onSubmit={async (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
          setSubmitButtonText('Submitting...');
          await onSubmit(fields.current);
          resetChildren();
          if (elementRef.current) {
            setSubmitButtonText(submitLabel);
          }
        } else {
          touchInputs(event.target.children);
          setDisplayErrors(true);
        }
      }}
      className={style.container}
    >
      {getInputs(
        inputs,
        updateFields,
        displayErrors,
        counterToResetChildren,
        fields,
        style,
      )}
      <input
        key="submit"
        className={style.button}
        type="submit"
        value={submitButtonText}
        disabled={submitButtonText !== submitLabel}
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
  submitLabel: PropTypes.string.isRequired,
  resetChildrenOnSubmit: PropTypes.bool,
  styleProp: PropTypes.shape({}),
};

Form.defaultProps = {
  resetChildrenOnSubmit: false,
  styleProp: null,
};

export default Form;
