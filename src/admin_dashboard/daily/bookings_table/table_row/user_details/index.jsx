// Dependencies
import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import windowTypes from '../../booking_overlay/window_types';

// Components
import ToolTip from 'general_components/tooltip';
import BookingOverlay from '../../booking_overlay';

// Stylesheets
import style from './user_details.module.css';
import useEventListener from 'shared/useEventListener';

const UserDetails = function DisplayUserDetails({ user }) {
  const [displayToolTip, setDisplayToolTip] = useState(false);
  const [displayOverlay, setDisplayOverlay] = useState(false);
  const elementRef = createRef();

  const handleClick = function handleClickForMobile({ target }) {
    if (target === elementRef.current) {
      setDisplayToolTip(true);
    } else {
      setDisplayToolTip(false);
    }
  };
  useEventListener('click', handleClick);
  return (
    <td>
      {displayOverlay
      && (
        <BookingOverlay
          user={user}
          entryWindow={windowTypes.EDIT_USER}
          exit={() => setDisplayOverlay(false)}
        />
      )}
      <div
        ref={elementRef}
        role="presentation"
        onMouseEnter={() => setDisplayToolTip(true)}
        onMouseLeave={() => setDisplayToolTip(false)}
      >
        {displayToolTip && (
        <ToolTip>
          <p>
            { `${user.username}`}
          </p>
          <p>
            {`${user.phoneNumber}`}
          </p>
          {user.comments == null ? null
            : `${user.comments}`}

          <div className={style.buttonContainer}>
            <button
              className={style.button}
              type="button"
              onClick={() => {
                setDisplayToolTip(false);
                setDisplayOverlay(true);
              }}
            >
              Edit
            </button>

          </div>
        </ToolTip>
        )}
        {`${user.firstName} ${user.lastName}`}

      </div>
    </td>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    comments: PropTypes.string,
  }).isRequired,
};

export default UserDetails;
