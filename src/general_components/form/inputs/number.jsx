// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import ErrorWrapper from './error_wrapper';
import TextInput from './text';

const NumberInputWithError = function NumberInputWithErrorWrapper(props) {
  return (
    <ErrorWrapper {...props}>
      <NumberInput {...props} />
    </ErrorWrapper>
  );
};

const NumberInput = function CreateNumberInputAndLabel({
  value: initialValue, onBlur, ...props
}) {
  props.type = 'number';
  return (
    <TextInput
      value={initialValue.toString()}
      onBlur={(value, name) => onBlur(parseInt(value, 10), name)}
      {...props}
    />

  );
};

NumberInput.propTypes = {
  value: PropTypes.number,
  onBlur: PropTypes.func,
};

NumberInput.defaultProps = {
  value: 0,
  onBlur: () => {},
};

export default NumberInputWithError;
