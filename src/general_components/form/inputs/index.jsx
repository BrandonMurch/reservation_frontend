// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import BaseInput from './base_input';

// Stylesheets
import style from '../form.module.css';

export const TextInput = function TestParent({ doDisplayErrors, ...props }) {
  props.labelStyle = style.hiddenLabelText;
  props.inputStyle = style.input;
  props.inputStyleWithErrors = style.displayError;
  const [displayErrors, setDisplayErrors] = useState(false);

  useEffect(() => {
    if (doDisplayErrors) {
      setDisplayErrors(doDisplayErrors);
    }
  }, [doDisplayErrors]);

  props.onBlurBasedOnInputType = function validateOnBlur() {
    if (!displayErrors) {
      setDisplayErrors(true);
    }
  };

  props.displayErrors = displayErrors;

  return <BaseInput {...props} />;
};

TextInput.propTypes = {
  doDisplayErrors: PropTypes.bool,
};

TextInput.defaultProps = {
  doDisplayErrors: false,
};

export const Checkbox = function TestParent({ updateValue, doDisplayErrors, ...props }) {
  props.labelStyle = style.labelText;
  const [displayErrors, setDisplayErrors] = useState(false);

  function reverseUpdateValue(value, name) {
    /*
     * Using not(!) on event.target.value sometimes leads to the
     * value always being false. This should fix that.
     */
    // eslint-disable-next-line no-unneeded-ternary
    const newValue = value === false ? true : false;
    updateValue(newValue, name);
  }

  props.updateValue = reverseUpdateValue;
  props.displayErrors = displayErrors;

  props.onChangeBasedOnInputType = (target) => {
    setDisplayErrors(true);
    reverseUpdateValue(target.value, target.name);
  };

  return <BaseInput {...props} />;
};

Checkbox.propTypes = {
  updateValue: PropTypes.func.isRequired,
  doDisplayErrors: PropTypes.bool,
};

Checkbox.defaultProps = {
  doDisplayErrors: false,
};
