import React from 'react';
import PropTypes from 'prop-types';
import Confirmation from '.';

const ForcibleConfirmation = function AskUserIfTheyWouldLikeToForcePreviousFetch({
  error, previousFetch, exit,
}) {
  // TODO: how do you modify previousFetch headers from here...?

  const props = {
    message: `The following error occured: \n ${error} \n Would you like to force this action to occur?`,
    confirm: () => previousFetch(),
    cancel: () => exit(),
  };

  return (<Confirmation {...props} />);
};

ForcibleConfirmation.propTypes = {
  error: PropTypes.string,
  previousFetch: PropTypes.func.isRequired,
  exit: PropTypes.func.isRequired,
};

ForcibleConfirmation.defaultProps = {
  error: 'Unexpected error',
};

export default ForcibleConfirmation;
