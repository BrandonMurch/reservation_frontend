// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import BaseInput from './base_input';

export const TextInput = function TestParent({ doDisplayErrors, style, ...props }) {
  props.inputStyle = style.input;
  props.inputStyleWithErrors = style.displayError;
  const [displayErrors, setDisplayErrors] = useState(false);

  useEffect(() => {
    if (doDisplayErrors) {
      setDisplayErrors(doDisplayErrors);
    }
  }, [doDisplayErrors]);

  props.onBlur = function validateOnBlur() {
    if (!displayErrors) {
      setDisplayErrors(true);
    }
  };

  props.displayErrors = displayErrors;

  return <BaseInput {...props} style={style} hiddenLabel />;
};

TextInput.propTypes = {
  doDisplayErrors: PropTypes.bool,
  style: PropTypes.shape({
    hiddenLabelText: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    displayError: PropTypes.string.isRequired,
  }).isRequired,
};

TextInput.defaultProps = {
  doDisplayErrors: false,
};

export const Checkbox = function TestParent({
  updateValue, doDisplayErrors, style, ...props
}) {
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

  props.onChange = (target) => {
    setDisplayErrors(true);
    reverseUpdateValue(target.value, target.name);
  };

  return <BaseInput {...props} style={style} />;
};

Checkbox.propTypes = {
  updateValue: PropTypes.func.isRequired,
  doDisplayErrors: PropTypes.bool,
  style: PropTypes.shape({
    labelText: PropTypes.string.isRequired,
  }).isRequired,
};

Checkbox.defaultProps = {
  doDisplayErrors: false,
};
