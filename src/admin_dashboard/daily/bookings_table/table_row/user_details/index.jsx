// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import ToolTip from 'general_components/tooltip';

const UserDetails = function DisplayUserDetails({ user }) {
  const [displayToolTip, setDisplayToolTip] = useState(false);
  return (
    <td
      onMouseEnter={() => setDisplayToolTip(true)}
      onMouseLeave={() => setDisplayToolTip(false)}
    >
      {displayToolTip && (
      <ToolTip>
        { `${user.username}`}
        <br />
        {`${user.phoneNumber}`}
      </ToolTip>
      )}
      {`${user.firstName} ${user.lastName}`}

    </td>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDetails;
