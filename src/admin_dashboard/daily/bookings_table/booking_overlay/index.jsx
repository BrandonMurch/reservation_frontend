// Dependencies
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import types from './window_types';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';

// Components
import DeleteConfirmation from './confirmation/delete_confirmation';
import ForcibleConfirmation from './confirmation/forcible_confirmation';
import EditBooking from './edit_window/edit_booking';
import CreateBooking from './create_booking';
import Loading from 'general_components/loading';
import EditUser from './edit_window/edit_user';
import OverlayContainer from './overlay_container';

const BookingOverlay = ({
  booking, exit, entryWindow, date, user,
}) => {
  const [windowToDisplay, setWindowToDisplay] = useState(entryWindow || types.CREATE);

  const previousFetch = useRef({});
  const setBanner = useBannerContext();

  const handleFetchAndExit = async function handleLoadingAndErrorsForFetch(fetchCall) {
    setWindowToDisplay(types.LOADING);
    previousFetch.current = await fetchCall();
    if (previousFetch.current.forceFetch) {
      setWindowToDisplay(types.FORCIBLE);
    } else {
      setBanner(bannerTypes.ERROR, previousFetch.current.error);
      exit();
    }
  };

  const getOverlay = ({ value }) => ({
    create: (
      <CreateBooking
        date={date}
        onSubmit={(fetchCall) => handleFetchAndExit(fetchCall)}
      />
    ),
    edit_booking: (
      <EditBooking
        booking={booking}
        onSubmit={(fetchCall) => handleFetchAndExit(fetchCall)}
        deleteBooking={() => {
          setWindowToDisplay(types.DELETE);
        }}
      />),
    edit_user: (
      <EditUser
        user={user || booking.user}
        onSubmit={(fetchCall) => handleFetchAndExit(fetchCall)}
      />),
    delete: (
      <DeleteConfirmation
        booking={booking}
        cancelDelete={() => {
          setWindowToDisplay(types.EDIT_BOOKING);
        }}
        onSubmit={(fetchCall) => handleFetchAndExit(fetchCall)}
      />
    ),
    loading: (
      <div style={{ height: '200px' }}>
        <Loading />
      </div>
    ),
    forcible: (
      <ForcibleConfirmation
        exit={exit}
        previousFetch={async () => {
          handleFetchAndExit(previousFetch.current.forceFetch);
        }}
        error={previousFetch.current.fetchError}
      />
    ),

  })[value];

  return (
    <OverlayContainer exit={exit}>
      {getOverlay(windowToDisplay)}
    </OverlayContainer>
  );
};

BookingOverlay.propTypes = {
  entryWindow: PropTypes.shape({}).isRequired,
  exit: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({}),
  }),
  date: PropTypes.string,
  user: PropTypes.shape({}),
};

BookingOverlay.defaultProps = {
  date: moment().format('YYYY-MM-DD'),
  user: {},
  booking: {
    id: 0,
    startTime: '',
    partySize: 0,
    user: {
      firstName: '',
    },
  },
};

export default BookingOverlay;
