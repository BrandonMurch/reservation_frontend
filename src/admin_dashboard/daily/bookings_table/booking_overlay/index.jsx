// Dependencies
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import types from './window_types';

// Components
import DeleteConfirmation from './confirmation/delete_confirmation';
import ForcibleConfirmation from './confirmation/forcible_confirmation';
import EditWindow from './edit_window';
import LoadingWindow from './loading_window';
import CreateBooking from './create_booking';

// Stylesheets
import OverlayContainer from './overlay_container';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';

const BookingOverlay = ({
  booking, exit, entryWindow, date,
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
    edit: (
      <EditWindow
        booking={booking}
        onSubmit={(fetchCall) => handleFetchAndExit(fetchCall)}
        deleteBooking={() => setWindowToDisplay(types.DELETE)}
      />),
    delete: (
      <DeleteConfirmation
        booking={booking}
        cancelDelete={() => setWindowToDisplay(types.EDIT)}
        onSubmit={(fetchCall) => handleFetchAndExit(fetchCall)}
      />
    ),
    loading: (
      <LoadingWindow />
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
  }),
  date: PropTypes.string,
};

BookingOverlay.defaultProps = {
  date: moment().format('YYYY-MM-DD'),
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
