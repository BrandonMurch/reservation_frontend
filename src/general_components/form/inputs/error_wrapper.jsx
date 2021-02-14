// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ErrorWrapper = function InputErrorWrapper(
  {
    displayErrors: forceDisplayErrors, style, children, patternMessage,
  },
) {
  const [errorMessage, setErrorMessage] = useState('');
  const [displayErrors, setDisplayErrors] = useState(false);
  useEffect(() => {
    if (forceDisplayErrors) {
      setDisplayErrors(forceDisplayErrors);
    }
  }, [forceDisplayErrors]);

  if (errorMessage === 'Please match the requested format.') {
    setErrorMessage(patternMessage);
  }

  return (
    <>
      {React.cloneElement(children, {
        displayErrors,
        setErrorMessage: (message) => {
          if (!displayErrors) {
            setDisplayErrors(true);
          }
          setErrorMessage(message);
        },
      })}
      {displayErrors
      && errorMessage !== ''
      && <p className={style.errorText}>{errorMessage}</p>}
    </>

  );
};

ErrorWrapper.propTypes = {
  displayErrors: PropTypes.bool,
  style: PropTypes.shape({
    errorText: PropTypes.string.isRequired,
  }).isRequired,
  patternMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ErrorWrapper.defaultProps = {
  patternMessage: '',
  displayErrors: false,
};

export default ErrorWrapper;
